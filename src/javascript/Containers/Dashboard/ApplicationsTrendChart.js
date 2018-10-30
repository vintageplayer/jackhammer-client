import React, {Component} from 'react'
import Highcharts from 'highcharts'
import {connect} from 'react-redux'
require('highcharts-3d')(Highcharts);

class ApplicationsTrendChart extends Component {
  componentWillReceiveProps(nextProps) {
    var monthList = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    var date = new Date();
    var lastOneYearMonths = [];
    for (var i = 11; i >= 0; i--) {
      var month = date.getMonth() - i;
      if (month < 0) {
        month = 12 + month;
      }
      lastOneYearMonths.push(monthList[month]);
    }
    var seriesData = [];
    var currentSeverity = this.props.severity;
    if (nextProps.dashboardData) {
      if (currentSeverity === 'Critical') {
        const {criticalVulnerabilityTrend} = nextProps.dashboardData;
        var vulnerabilityTrends = criticalVulnerabilityTrend;
      } else {
        const {highVulnerabilityTrend} = nextProps.dashboardData;
        var vulnerabilityTrends = highVulnerabilityTrend;
      }
      vulnerabilityTrends
        .forEach(function(group, index) {
          var count = [];
          var vulnerabilityTrendResult = group.vulnerabilityTrendResult;
          lastOneYearMonths.map(function(eachMonth) {
            count.push(vulnerabilityTrendResult[eachMonth][currentSeverity]);
          });
          seriesData.push({name: group.groupName, data: count,});
        });
    }
    var chartTitle = this.props.title;
    Highcharts.chart(this.props.containerId, {
      title: {
        text: chartTitle
      },
      colors: [
        'rgb(255, 77, 77)',
        'rgb(255, 112, 77)',
        'rgb(247, 163, 92)',
        'rgb(124, 181, 236)',
        'rgb(144, 237, 125)',
      ],
      yAxis: {
        title: {
          text: 'Vulnerability Count'
        }
      },
      legend: {
        x: 0,
        verticalAlign: 'top',
        align: 'right',
        y: 50,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false,
      },
      xAxis: [
        {
          title: {
            text: 'Month'
          },
          categories: lastOneYearMonths,
        }
      ],

      series: seriesData,
      credits: {
        enabled: false
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              }
            },
          }
        ]
      },
    });
  }
  render() {
    return (
      <div id={this.props.containerId}></div>
    );
  }
}

const mapStateToProps = (state) => ({dashboardData: state.dashboard.dashboardData});
export default connect(mapStateToProps)(ApplicationsTrendChart);
