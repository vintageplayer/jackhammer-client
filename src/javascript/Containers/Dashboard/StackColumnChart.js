import React, {Component} from 'react'
import Highcharts from 'highcharts'
import * as scanTypeActions from '../../Actions/ScanTypeActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class StackColumnChart extends Component {
  componentWillReceiveProps(nextProps) {
    const {fetchedScanTypes} = nextProps;
    const {currentOwnerType} = this.props;
    var categories = [];
    var pieChartData = [];
    var criticalData = [];
    var highData = [];
    var mediumData = [];
    var infoData = [];
    var lowData = [];
    var avgData = [];
    if (nextProps.dashboardData) {
      var dashboardData = nextProps.dashboardData;
      var groups = dashboardData.groups;
      categories = groups.map((group) => group.name);
      groups.forEach(function(group, index) {
        var groupInfo = {
          name: group.name,
          y: group.severityCount.totalCount,
        };
        avgData.push(group.severityCount.totalCount / 5);
        criticalData.push(group.severityCount.criticalCount);
        highData.push(group.severityCount.highCount);
        mediumData.push(group.severityCount.mediumCount);
        lowData.push(group.severityCount.lowCount);
        infoData.push(group.severityCount.infoCount);
        pieChartData.push(groupInfo);
      });
    }
    Highcharts.chart('stackBarColumnChart', {
      title: {
        text: 'Top Five Vulnerable Applications'
      },
      colors: [
        'rgb(255, 77, 77)',
        'rgb(255, 112, 77)',
        'rgb(247, 163, 92)',
        'rgb(124, 181, 236)',
        'rgb(144, 237, 125)',
      ],
      credits: {
        enabled: false
      },
      xAxis: {
        categories: categories
      },
      labels: {
        items: [
          {
            html: 'Consolidated Vulnerabilities',
            style: {
              left: '50px',
              top: '18px',
              color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
            }
          }
        ]
      },
      series: [
        {
          type: 'column',
          name: 'Critical',
          data: criticalData
        }, {
          type: 'column',
          name: 'High',
          data: highData
        }, {
          type: 'column',
          name: 'Medium',
          data: mediumData
        }, {
          type: 'column',
          name: 'Low',
          data: lowData
        }, {
          type: 'column',
          name: 'info',
          data: infoData
        }, {
          type: 'spline',
          name: 'Average',
          data: avgData,
          marker: {
            lineWidth: 2,
            lineColor: Highcharts
              .getOptions()
              .colors[3],
            fillColor: 'white'
          }
        }, {
          type: 'pie',
          name: 'Total Vulnerability',
          data: pieChartData,
          center: [
            100, 80,
          ],
          size: 100,
          showInLegend: true,
          dataLabels: {
            enabled: false
          }
        },
      ]
    });

  }
  render() {
    return (
      <div id="stackBarColumnChart"></div>
    );
  }
}
const mapStateToProps = (state) => ({dashboardData: state.dashboard.dashboardData});
export default connect(mapStateToProps)(StackColumnChart);
