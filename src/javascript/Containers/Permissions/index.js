import React, {Component} from 'react'
import List from './List';
import '../../../stylesheets/users-roles.css'

export default class Permissions extends Component {
  render() {
    return (
      <div>
        <section class="content-header">
          <h4>
            Permissions
          </h4>
          <ol class="breadcrumb">
            <li>
              <a href="#">
                <i class="fa fa-dashboard"></i>
                Home</a>
            </li>
            <li class="active">
              <a href="#">Permissions</a>
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
