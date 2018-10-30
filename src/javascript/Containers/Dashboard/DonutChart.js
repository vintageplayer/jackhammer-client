import React, {Component} from 'react'
import Highcharts from 'highcharts'
import {connect} from 'react-redux'
require('highcharts-3d')(Highcharts);

class DonutChart extends Component {

  componentWillReceiveProps(nextProps) {
    var totalCount = 0;
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
      totalCount = criticalCount + highCount + mediumCount + lowCount + infoCount;
    }
    Highcharts.chart('donutChart', {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
        },
      },
      colors: [
        'rgb(255, 77, 77)',
        'rgb(255, 112, 77)',
        'rgb(247, 163, 92)',
        'rgb(124, 181, 236)',
        'rgb(144, 237, 125)',
      ],
      title: {
        text: 'Severity Count Summary'
      },
      subtitle: {
        text: 'Total Vulnerability Count: ' + totalCount,
        style: {
          'font-weight': 'bold',
          'color': 'rgb(255, 77, 77)'
        },
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          innerSize: 100,
          depth: 45,
        }
      },
      series: [
        {
          name: 'Count',
          data: [
            [
              'Critical', criticalCount,
            ],
            [
              'High', highCount,
            ],
            [
              'Medium', mediumCount,
            ],
            [
              'Low', lowCount,
            ],
            [
              'Info', infoCount,
            ],
          ],
          showInLegend: true
        }
      ],
    });
  }
  render() {
    return (
      <div id="donutChart" width="100%"></div>
    );
  }
}

const mapStateToProps = (state) => ({dashboardData: state.dashboard.dashboardData});
export default connect(mapStateToProps)(DonutChart);
