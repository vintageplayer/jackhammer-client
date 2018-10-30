import React, {Component} from 'react'
import {connect} from 'react-redux'

class Breadcrumb extends Component {
  renderOwnerType(ownerType) {
    if (ownerType === null)
      return ownerType;
    return ownerType.name;
  }
  render() {
    const {currentOwnerType} = this.props;

    return (
      <section class="content-header">
        <h4>
          Analytics
        </h4>
        <ol class="breadcrumb">
          <li>
            <a href="/">
              <i class="fa fa-home"></i>
              Home
            </a>
          </li>
          <li>
            <a href="#">
              <i class='fa fa-line-chart'></i>
              Analytics
            </a>
          </li>
          <li class="active">
            <a href="#">
              <i class='fa fa-user'></i>
              {this.renderOwnerType(currentOwnerType)}
            </a>
          </li>
        </ol>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({currentOwnerType: state.analytics.currentOwnerType});
export default connect(mapStateToProps)(Breadcrumb);
