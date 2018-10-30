import React, {Component} from 'react'
import Highcharts from 'highcharts'
import {connect} from 'react-redux'
function percentage(previousCount, currentCount) {
  if (previousCount === 0 || currentCount === 0)
    return 0
  var increaseCount = previousCount - currentCount;
  var percentage = (increaseCount / previousCount) * 100;
  return percentage;
}

class PercentageTrendChart extends Component {
  componentWillReceiveProps(nextProps) {
    const dashboardData = nextProps.dashboardData;
    if (dashboardData) {
      const vulnerabilityTrend = dashboardData.vulnerabilityTrend;
      var vulnerabilityTrendResult = vulnerabilityTrend.vulnerabilityTrendResult;
      var criticalCount = [];
      var highCount = [];
      var mediumCount = [];
      var lowCount = [];
      var infoCount = [];
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
      var lastSixMonths = []
      for (var i = 6; i >= 0; i--) {
        var month = date.getMonth() - i;
        if (month < 0) {
          month = 12 + month;
        }
        lastSixMonths.push(monthList[month]);
      }
      lastSixMonths
        .map(function(eachMonth, index) {
          if (index > 0) {
            var previousCriticalCount = vulnerabilityTrendResult[lastSixMonths[index - 1]]['Critical'];
            var previousHighCount = vulnerabilityTrendResult[lastSixMonths[index - 1]]['High'];
            var previousMediumCount = vulnerabilityTrendResult[lastSixMonths[index - 1]]['Medium'];
            var previousLowCount = vulnerabilityTrendResult[lastSixMonths[index - 1]]['Low'];
            var previousInfoCount = vulnerabilityTrendResult[lastSixMonths[index - 1]]['Info'];
            criticalCount.push(percentage(previousCriticalCount, vulnerabilityTrendResult[eachMonth]['Critical']));
            highCount.push(percentage(previousHighCount, vulnerabilityTrendResult[eachMonth]['High']));
            mediumCount.push(percentage(previousMediumCount, vulnerabilityTrendResult[eachMonth]['Medium']));
            lowCount.push(percentage(previousLowCount, vulnerabilityTrendResult[eachMonth]['Low']));
            infoCount.push(percentage(previousInfoCount, vulnerabilityTrendResult[eachMonth]['Info']));
          }
        });
      Highcharts.chart('percentageTrendChart', {
        chart: {
          type: 'area'
        },
        colors: [
          'rgb(255, 77, 77)',
          'rgb(255, 112, 77)',
          'rgb(247, 163, 92)',
          'rgb(124, 181, 236)',
          'rgb(144, 237, 125)',
        ],
        title: {
          text: 'Vulnerabilities Percentage By Month Wise'
        },
        xAxis: {
          title: {
            text: 'Month'
          },
          categories: lastSixMonths,
          tickmarkPlacement: 'on',
          title: {
            enabled: false
          }
        },
        yAxis: {
          title: {
            text: 'Vulnerability'
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f})<br/>',
          split: true
        },
        plotOptions: {
          area: {
            stacking: 'percent',
            lineColor: '#ffffff',
            lineWidth: 1,
            marker: {
              lineWidth: 1,
              lineColor: '#ffffff'
            }
          }
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name: 'Critical',
            data: criticalCount,
          }, {
            name: 'High',
            data: highCount
          }, {
            name: 'Medium',
            data: mediumCount
          }, {
            name: 'Low',
            data: lowCount
          }, {
            name: 'Info',
            data: infoCount
          },
        ]
      });
    }
  }
  render() {
    return (
      <div id="percentageTrendChart"></div>
    );
  }
}
const mapStateToProps = (state) => ({dashboardData: state.dashboard.dashboardData});
export default connect(mapStateToProps)(PercentageTrendChart);
