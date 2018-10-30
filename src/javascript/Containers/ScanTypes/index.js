import React, {Component} from 'react'
import PropTypes from 'prop-types';
import List from './List';

export default class ScanTypes extends Component {
  render() {
    return (
      <div class="page-wrapper">
        <section class="content-header">
          <h4>
            Scan Types
          </h4>
          <ol class="breadcrumb">
            <li>
              <a href="/">
                <i class="fa fa-home"></i>
                Home
              </a>
            </li>
            <li class="active">
              <a href="#">
                <i class="fa fa-cog"></i>
                Settings
              </a>
            </li>
            <li class="active">
              Scan Types
            </li>
          </ol>
        </section>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="card">
                <div class="card-body">
                  <List/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
