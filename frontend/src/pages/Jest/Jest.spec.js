import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios';

import Jest, { Counter, dataReducer } from './Jest';

import { mount } from 'enzyme';

describe('Counter', () => {
    test('snapshot renders', () => {
      const component = renderer.create(<Counter counter={1} />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
});

const list = ['a', 'b', 'c'];
describe('Jest', () => {
    describe('Reducer', () => {
        it('should set a list', () => {
            const state = { list: [], error: null };
            const newState = dataReducer(state, {
              type: 'SET_LIST',
              list,
            });
       
            expect(newState).toEqual({ list, error: null });
          });

          it('should reset the error if list is set', () => {
            const state = { list: [], error: true };
            const newState = dataReducer(state, {
              type: 'SET_LIST',
              list,
            });
       
            expect(newState).toEqual({ list, error: null });
          });

          it('should set the error', () => {
            const state = { list: [], error: null };
            const newState = dataReducer(state, {
              type: 'SET_ERROR',
            });
       
            expect(newState.error).toBeTruthy();
          });
    });

    // enzyme tests
    it('renders the inner Counter', () => {
      const wrapper = mount(<Jest />);
      expect(wrapper.find(Counter).length).toEqual(1);
    });

    it('passes all props to Counter', ()=>{
      const wrapper = mount(<Jest />);
      const counterWrapper = wrapper.find(Counter);

      expect(counterWrapper.find('p').text()).toEqual('0');
    });

    it('increment the counter', ()=>{
      const wrapper = mount(<Jest />);
      wrapper.find('button').at(0).simulate('click');

      const counterWrapper = wrapper.find(Counter);
      expect(counterWrapper.find('p').text()).toBe('1');
    });

    it('decrements the counter', () => {
      const wrapper = mount(<Jest />);
      wrapper.find('button').at(1).simulate('click');
   
      const counterWrapper = wrapper.find(Counter);
      expect(counterWrapper.find('p').text()).toBe('-1');
    });

    // ASYNC TESTING
    it('fetches async data', done =>{
      const promise = new Promise((resolve, reject) =>
        setTimeout(
          () =>
            resolve({
              data: {
                hits: [
                  { objectID: '1', title: 'a' },
                  { objectID: '2', title: 'b' },
                ],
              },
            }),
          100
        )
      );

      axios.get = jest.fn(() => promise);

      const wrapper = mount(<Jest />);
      expect(wrapper.find('li').length).toEqual(0);
      promise.then(() => {
        setImmediate(() => {
          wrapper.update();
          expect(wrapper.find('li').length).toEqual(2);
   
          axios.get.mockClear();
          done();
        });
      });
    });

    it('fetches async data but fails', done => {
      const promise = new Promise((resolve, reject) =>
        setTimeout(() => reject(new Error('Whoops!')), 100)
      );
   
      axios.get = jest.fn(() => promise);
   
      const wrapper = mount(<Jest />);
   
      promise.catch(() => {
        setImmediate(() => {
          wrapper.update();
   
          expect(wrapper.find('li').length).toEqual(0);
          expect(wrapper.find('.error').length).toEqual(1);
   
          axios.get.mockClear();
          done();
        });
      });
    });
});