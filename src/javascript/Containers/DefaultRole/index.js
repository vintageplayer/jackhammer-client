import React, {Component} from 'react'
import Form from './Form'

export default class Index extends Component {
  render() {
    return (
      <div class="page-wrapper">
        <section class="content-header">
          <h4>
            Default Signup Role Configuration
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
                Default Signup Role Configuration
              </a>
            </li>
          </ol>
        </section>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="card">
                <h4 class="card-title">Defualt Signup Role</h4>
                <div class="card-body">
                  <Form/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
