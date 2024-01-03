import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function formatDate(dateString: any) {
  var dateObject = new Date(dateString);
  var day = dateObject.getUTCDate();
  var month = dateObject.getUTCMonth() + 1;
  var year = dateObject.getUTCFullYear();
  return day + "/" + month + "/" + year;
}

const ChartComponent = ({ data = [] }: any) => {
  const chartOptions: any = {
    series: [
      {
        data: data.map((entry: any) => entry.amount || 0),
      },
    ],
    credits: {
      enabled: false,
    },
    chart: {
      scrollablePlotArea: {
        minWidth: 700,
      },
      type: "spline",
    },
    legend: {
      enabled: false,
    },
    yAxis: [
      {
        title: {
          text: "Amount of challenge fee earned",
          align: "middle",
        },
        labels: {
          align: "left",
          x: 2,
          format: "{value:.,0f}",
        },
        showFirstLabel: false,
        gridLineWidth: 0,
      },
      {
        linkedTo: 0,
        gridLineWidth: 1,
        opposite: true,
        title: {
          text: null,
        },
        labels: {
          enabled: false,
        },
        showFirstLabel: false,
      },
    ],
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },

    xAxis: {
      categories: data.map((entry: any) => formatDate(entry.createdAt)),
      tickWidth: 0,
      gridLineWidth: 0,
      title: {
        text: "Amount of earnings received from copying trades",
        align: "middle",
      },
    },
    tooltip: {
      shared: true,
      crosshairs: true,
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        className: "popup-on-click",
        marker: {
          enabled: false,
        },
      },
    },
  };

  useEffect(() => {
    Highcharts.setOptions(chartOptions);
  }, [chartOptions]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default ChartComponent;
