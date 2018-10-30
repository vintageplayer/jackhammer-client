import React, {Component} from 'react'
import drilldown from 'highcharts-drilldown'
import Highcharts from 'highcharts'
import {connect} from 'react-redux'
drilldown(Highcharts);

class TopVulnerableReposChart extends Component {
  componentWillReceiveProps(nextProps) {
    const dashboardData = nextProps.dashboardData;
    if (dashboardData) {
      // Create the chart
      var topVulnerableRepos = dashboardData.topVulnerableRepos;
      var seriesData = [];
      var drillDownSeriesData = [];
      topVulnerableRepos.map(function(repo) {
        seriesData.push({name: repo.name, y: repo.severityCount.totalCount, drilldown: repo.id,})
        var severityData = [];
        severityData.push({name: 'Critical', y: repo.severityCount.criticalCount, color: 'rgb(255, 77, 77)'});
        severityData.push({name: 'High', y: repo.severityCount.highCount, color: 'rgb(255, 112, 77)'});
        severityData.push({name: 'Medium', y: repo.severityCount.mediumCount, color: 'rgb(247, 163, 92)'});
        severityData.push({name: 'Low', y: repo.severityCount.lowCount, color: 'rgb(124, 181, 236)'});
        severityData.push({name: 'Info', y: repo.severityCount.infoCount, color: 'rgb(144, 237, 125)'});
        drillDownSeriesData.push({name: repo.name, id: repo.id, data: severityData})
      })
      Highcharts.chart('stackChart', {
        chart: {
          type: 'column'
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
        title: {
          text: 'Top Vulnerable Applications'
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Number of vulnerabilities'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true
            },
          }
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b>',
        },

        "series": [
          {
            "name": "Applicaitons",
            "colorByPoint": true,
            "data": seriesData,
          }
        ],
        "drilldown": {
          "series": drillDownSeriesData
        },
      });
    }
  }
  render() {
    return (
      <div id="stackChart"></div>
    );
  }
}
const mapStateToProps = (state) => ({dashboardData: state.dashboard.dashboardData});
export default connect(mapStateToProps)(TopVulnerableReposChart);
