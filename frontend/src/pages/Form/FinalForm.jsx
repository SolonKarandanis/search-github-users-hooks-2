import { Form, Field, FormSpy } from 'react-final-form';
import React from 'react';
import styled, { css } from 'styled-components'


const FinalForm = ({onSubmit}) =>{
    return (
        <Wrapper>
            <Form onSubmit={onSubmit}
                subscription={{
                    submitting:true,
                }}>
                {({handleSubmit, form, submitting, pristine, values}) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="email" 
                            subscription={{
                                error:true,
                                touched:true,
                                value:true,
                            }}>
                            {({input,meta}) => (
                                <div>
                                    <label>Εmail</label>
                                    <input {...input} 
                                        placeholder="Εmail" 
                                        name="email"
                                        autoComplete="email"/>
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="password" 
                            subscription={{
                                error:true,
                                touched:true,
                                value:true,
                            }}>
                            {({input,meta}) => (
                                <div>
                                    <label>Last Name</label>
                                    <input {...input} placeholder="Last Name" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <div className="buttons">
                            <button type="submit" disabled={submitting || pristine}>
                            Submit
                            </button>
                            <button
                            type="button"
                            onClick={form.reset}
                            disabled={submitting || pristine}
                            >
                            Reset
                            </button>
                        </div>
                        <FormSpy subscription={{values:true,pristine: true}}>
                            {props=>(
                                // <pre>
                                //     {JSON.stringify(values,undefined,2)}
                                // </pre>
                                <button
                                    type="button"
                                    disabled={props.pristine}
                                    onClick={() => props.form.reset()}
                                >
                                    Reset
                                </button>
                            )}
                        </FormSpy>
                    </form>
                )}
            </Form>
        </Wrapper>
    )
};

export default FinalForm;

const btn = (light, dark) => css`
  white-space: nowrap;
  display: inline-block;
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 16px;
  color: white;
  &:visited {
    color: white;
  }
  background-image: linear-gradient(${light}, ${dark});
  border: 1px solid ${dark};
  &:hover {
    background-image: linear-gradient(${light}, ${dark});
    &[disabled] {
      background-image: linear-gradient(${light}, ${dark});
    }
  }
  &:visited {
    color: black;
  }
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const btnDefault = css`
  ${btn('#ffffff', '#d5d5d5')} color: #555;
`;

const btnPrimary = btn('#4f93ce', '#285f8f')

const Wrapper = styled.div`
  font-family: sans-serif;

  h1 {
    text-align: center;
    color: #222;
  }

  & > div {
    text-align: center;
  }

  a {
    display: block;
    text-align: center;
    color: #222;
  }

  form {
    max-width: 500px;
    margin: 10px auto;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 3px;

    & > div {
      display: flex;
      flex-flow: row nowrap;
      line-height: 2em;
      margin: 5px;
      & > label {
        color: #333;
        width: 110px;
        font-size: 1em;
        line-height: 32px;
      }
      & > input,
      & > select,
      & > textarea {
        flex: 1;
        padding: 3px 5px;
        font-size: 1em;
        margin-left: 15px;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
      & > input[type='checkbox'] {
        margin-top: 7px;
      }
      & > div {
        margin-left: 16px;
        & > label {
          display: block;
          & > input {
            margin-right: 3px;
          }
        }
      }
    }
    & > .buttons {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      margin-top: 15px;
    }
    button {
      margin: 0 10px;
      &[type='submit'] {
        ${btnPrimary};
      }
      &[type='button'] {
        ${btnDefault};
      }
    }
    pre {
      border: 1px solid #ccc;
      background: rgba(0, 0, 0, 0.1);
      box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
      padding: 20px;
    }
  }
`;