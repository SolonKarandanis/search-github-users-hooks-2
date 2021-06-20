// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// null check
import WithCondition from '../HOC/WithCondition';

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

// STEP 2 - Chart Data

// STEP 3 - Creating the JSON object to store the chart configurations


const ChartComponent2 = React.memo(({data}) =>{
  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Stars Per Language",

        //Set the chart subcaption
        // subCaption: "In MMbbl = One Million barrels",

        //Set the x-axis name
        // xAxisName: "Country",

        //Set the y-axis name
        // yAxisName: "Reserves (MMbbl)",
        // numberSuffix: "K",

        decimals:0,
        doughnutRadius: '45%',
        showPercentValues:0,
        // paletteColors:'#f0db4f'
        //Set the theme for your chart
        theme: "candy"
      },
      // Chart Data
      data: data
    }
  };
  return (<ReactFC {...chartConfigs} />);
});

const nullConditionFn = (props) => {
  return !props.data;
};

const ChartwithCondition = WithCondition(nullConditionFn)(ChartComponent2);


const ChartComponent = (props) =>{
  return (
    <ChartwithCondition data={props.data} />
   );
}

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component

export default ChartComponent;