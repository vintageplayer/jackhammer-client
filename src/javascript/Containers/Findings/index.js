import React, {Component} from 'react'
import List from './List'
import ScanSummary from './ScanSummary'
import '../../../stylesheets/finding.css'

export default class Findings extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  render() {
    const {scan} = this.props.match.params;
    return (
      <div class="page-wrapper">
        <section class="content-header">
          <h4>
            Findings
          </h4>
          <ol class="breadcrumb">
            <li>
              <a href="#">
                <i class="fa fa-dashboard"></i>
                Home
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-search-plus"></i>
                scans
              </a>
            </li>
            <li class="active">
              <a href="#">Findings</a>
            </li>
          </ol>
        </section>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="card">
                <div class="card-title">
                  Scan Details
                </div>
                <div class="card-body">
                  <ScanSummary scanId={scan}/>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div class="card">
                <div class="card-title">
                  Scan Results
                </div>
                <div class="card-body">
                  <List scanId={scan}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
