import React, {Component} from 'react'
import Highcharts from 'highcharts'
import * as scanTypeActions from '../../Actions/ScanTypeActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'
function getScanTypeLink(ownerType, scanTypes, scanType) {
  if (scanType == 'Source Code') {
    var selectedScanType = scanTypes.find((scanType) => scanType.isStatic);
    return ("<a href=/scans/" + ownerType + "/" + selectedScanType.id + ">Source Code</a>");
  }
  if (scanType == 'Wordpress') {
    var selectedScanType = scanTypes.find((scanType) => scanType.isWordpress);
    return ("<a href=/scans/" + ownerType + "/" + selectedScanType.id + ">Wordpress</a>");
  }
  if (scanType == 'Network') {
    var selectedScanType = scanTypes.find((scanType) => scanType.isNetwork);
    return ("<a href=/scans/" + ownerType + "/" + selectedScanType.id + ">Network</a>");
  }
  if (scanType == 'Mobile') {
    var selectedScanType = scanTypes.find((scanType) => scanType.isMobile);
    return ("<a href=/scans/ " + ownerType + "/" + selectedScanType.id + ">Mobile</a>");
  }
  if (scanType == 'Web') {
    var selectedScanType = scanTypes.find((scanType) => scanType.isWeb);
    return ("<a href=/scans/ " + ownerType + "/" + selectedScanType.id + ">Web</a>");
  }
}
class StackBarChart extends Component {
  componentWillMount() {
    const {ownerType, scanType} = this.props;
    var payload = {
      limit: -1
    };
    if (ownerType != null)
      payload['ownerTypeId'] = ownerType;
    if (scanType != null)
      payload['scanTypeId'] = scanType;
    if (this.props.auth.authenticated) {
      this
        .props
        .actions
        .fetchAllScanTypes(payload);
    }
  }
  componentWillReceiveProps(nextProps) {
    const {fetchedScanTypes} = nextProps;
    const {currentOwnerType} = this.props;
    const {dashboardData} = nextProps;
    var data = [];
    var criticalData = [];
    var highData = [];
    var mediumData = [];
    var lowData = [];
    var infoData = [];
    if (dashboardData) {
      var scanTypeCount = dashboardData.scanTypeCount;
      criticalData.push(scanTypeCount.sourceCodeCount.criticalCount);
      criticalData.push(scanTypeCount.wordpressCount.criticalCount);
      criticalData.push(scanTypeCount.networkCount.criticalCount);
      criticalData.push(scanTypeCount.mobileCount.criticalCount);
      criticalData.push(scanTypeCount.webCount.criticalCount);

      highData.push(scanTypeCount.sourceCodeCount.highCount);
      highData.push(scanTypeCount.wordpressCount.highCount);
      highData.push(scanTypeCount.networkCount.highCount);
      highData.push(scanTypeCount.mobileCount.highCount);
      highData.push(scanTypeCount.webCount.highCount);

      mediumData.push(scanTypeCount.sourceCodeCount.mediumCount);
      mediumData.push(scanTypeCount.wordpressCount.mediumCount);
      mediumData.push(scanTypeCount.networkCount.mediumCount);
      mediumData.push(scanTypeCount.mobileCount.mediumCount);
      mediumData.push(scanTypeCount.webCount.mediumCount);

      lowData.push(scanTypeCount.sourceCodeCount.lowCount);
      lowData.push(scanTypeCount.wordpressCount.lowCount);
      lowData.push(scanTypeCount.networkCount.lowCount);
      lowData.push(scanTypeCount.mobileCount.lowCount);
      lowData.push(scanTypeCount.webCount.lowCount);

      infoData.push(scanTypeCount.sourceCodeCount.infoCount);
      infoData.push(scanTypeCount.wordpressCount.infoCount);
      infoData.push(scanTypeCount.networkCount.infoCount);
      infoData.push(scanTypeCount.mobileCount.infoCount);
      infoData.push(scanTypeCount.webCount.infoCount);

    }
    Highcharts.chart('stackBarChart', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Scan types summary'
      },
      colors: [
        'rgb(255, 77, 77)',
        'rgb(255, 112, 77)',
        'rgb(247, 163, 92)',
        'rgb(124, 181, 236)',
        'rgb(144, 237, 125)',
      ],
      xAxis: {
        categories: [
          'Source Code',
          'Wordpress',
          'Network',
          'Mobile',
          'Web',
        ],
        labels: {
          formatter: function() {
            return getScanTypeLink(currentOwnerType, fetchedScanTypes, this.value)
          },
          useHTML: true
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Vulnerability Count'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false,
      },
      plotOptions: {
        bar: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Critical',
          data: criticalData,
        }, {
          name: 'High',
          data: highData,
        }, {
          name: 'Medium',
          data: mediumData
        }, {
          name: 'Low',
          data: lowData
        }, {
          name: 'Info',
          data: infoData
        },
      ]
    });
  }
  render() {
    return (
      <div id="stackBarChart"></div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(scanTypeActions, dispatch)
});
const mapStateToProps = (state) => ({dashboardData: state.dashboard.dashboardData, fetchedScanTypes: state.scanTypes.fetchedScanTypes, auth: state.auth});
export default connect(mapStateToProps, mapDispatchToProps)(StackBarChart);
