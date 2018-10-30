import React, {Component} from 'react'
import Breadcrumb from './Breadcrumb'
import List from './List'
import TopNabar from '../Common/TopNavbar'

export default class Repos extends Component {

  render() {
    const {ownerType, scanType, group,} = this.props.match.params;
    return (
      <div class="page-wrapper">
        <TopNabar scanType={scanType} ownerType={ownerType} page="repos"/>
        <section class="bottom-buffer">
          <Breadcrumb scanType={scanType} ownerType={ownerType}/>
        </section>
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
              <div class="card top-buffer">
                <div class="card-body">
                  <List scanType={scanType} ownerType={ownerType} group={group}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
