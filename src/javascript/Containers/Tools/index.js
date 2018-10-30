import React, {Component} from 'react'
import List from './List'
import '../../../stylesheets/settings.css'

export default class Tools extends Component {
  render() {
    return (
      <div>
        <section class="content-header">
          <h4>
            Tools
          </h4>
          <ol class="breadcrumb">
            <li>
              <a href="#">
                <i class="fa fa-home"></i>
                Home
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-cog"></i>
                Settings
              </a>
            </li>
            <li class="active">
              <a href="#">
                Tools
              </a>
            </li>
          </ol>
        </section>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="card">
                <div class="card-body">
                  <div class="tools-list-table">
                    <List/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
