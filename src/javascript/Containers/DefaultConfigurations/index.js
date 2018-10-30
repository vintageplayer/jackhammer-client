import React, {Component} from 'react'
import HardcodeSecretConfiguration from './HardcodeSecretConfiguration'
import CheckmarxConfiguration from './CheckmarxConfiguration'
import SeverityForm from './SeverityForm'
import ConfigureSignupRoleForm from './ConfigureSignupRoleForm'

export default class DefaultConfigurations extends Component {
  render() {
    return (
      <div class="page-wrapper">
        <section class="content-header">
          <h4>
            Default Configurations
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
                Default Configurations
              </a>
            </li>
          </ol>
        </section>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="card">
                <h4 class="card-title">Hardcode Secret</h4>
                <div class="card-body">
                  <HardcodeSecretConfiguration/>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div class="card">
                <h4 class="card-title">Default Role</h4>
                <div class="card-body">
                  <ConfigureSignupRoleForm/>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div class="card">
                <h4 class="card-title">Severity Levels</h4>
                <div class="card-body">
                  <SeverityForm/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
