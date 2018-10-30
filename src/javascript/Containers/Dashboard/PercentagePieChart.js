import React, {Component} from 'react'
import Highcharts from 'highcharts'
import {connect} from 'react-redux'
require('highcharts-3d')(Highcharts);

class PercentagePieChart extends Component {
  componentWillReceiveProps(nextProps) {
    var criticalCount = 0;
    var highCount = 0;
    var mediumCount = 0;
    var lowCount = 0;
    var infoCount = 0;
    if (nextProps.dashboardData) {
      const {severityCount} = nextProps.dashboardData;
      criticalCount = severityCount.criticalCount;
      highCount = severityCount.highCount;
      mediumCount = severityCount.mediumCount;
      lowCount = severityCount.lowCount;
      infoCount = severityCount.infoCount;
    }
    Highcharts.chart('percentagePieChart', {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Severity Percentage Summary'
      },
      credits: {
        enabled: false
      },
      colors: [
        'rgb(255, 77, 77)',
        'rgb(255, 112, 77)',
        'rgb(247, 163, 92)',
        'rgb(124, 181, 236)',
        'rgb(144, 237, 125)',
      ],
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true
          },
          showInLegend: true,
        }
      },
      series: [
        {
          name: 'Count',
          colorByPoint: true,
          data: [
            {
              name: 'Critical',
              y: criticalCount
            }, {
              name: 'High',
              y: highCount,
            }, {
              name: 'Medium',
              y: mediumCount,
            }, {
              name: 'Low',
              y: lowCount,
            }, {
              name: 'Info',
              y: infoCount,
            },
          ],
        }
      ],
    });
  }
  render() {
    return (
      <div id="percentagePieChart" width="100%"></div>
    );
  }
}

const mapStateToProps = (state) => ({dashboardData: state.dashboard.dashboardData});
export default connect(mapStateToProps)(PercentagePieChart);
