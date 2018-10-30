import React, {Component} from 'react'
import TopNav from './TopNav'
import LeftNav from './LeftNav'
import Footer from './Footer'
export default class Layout extends Component {
  toggleNavigation(e) {
    e.preventDefault();
    //Enable sidebar push menu
    $("body").toggleClass('sidebar-collapse');
    $("body").toggleClass('sidebar-open');
    //Enable hide menu when clicking on the content-wrapper on small screens
    if ($(window).width() <= 767 && $("body").hasClass("sidebar-open")) {
      $("body").removeClass('sidebar-open');
    }
  }
  render() {
    return (
      <div class="skin-blue">
        <div class="wrapper">
          <TopNav toggleMethod={this.toggleNavigation}/>
          <LeftNav/>
          <div class="content-wrapper">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
