import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Form from "./Form"

export default class ChangePassword extends Component {
  render() {
    return (
      <div class="page-wrapper">
        <section class="content-header">
          Change Password
          <ul class="breadcrumb">
            <li>
              <a href="/">
                <i class="fa fa-home"></i>Home</a>
            </li>
            <li class="active">
              <a href="#">
                Change Password
              </a>
            </li>
          </ul>
        </section>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="card">
                <h4 class="card-title">Change Password</h4>
                <div class="card-body">
                  <Form/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
