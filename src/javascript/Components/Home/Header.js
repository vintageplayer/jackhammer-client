import React from 'react'
import {Link} from 'react-router-dom'

export default class Header extends React.Component {
  render() {
    return (
      <header id="header_outer">
        <div class="header_section">
          <div class="logo">
            <a href="javascript:void(0)" class="learn_more2">
              Jackhammer
            </a>
          </div>
          <nav class="home-nav" id="nav">
            <ul class="">
              <li>
                <a href="#top_content">Home</a>
              </li>
              <li>
                <a href="#service">Features</a>
              </li>
              <li>
                <a href="#work_outer">Latest Work</a>
              </li>
              <li>
                <Link to="/login">
                  Sign in
                </Link>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
          <a class="res-nav_click animated wobble wow" href="javascript:void(0)">
            <i class="fa-bars"></i>
          </a>
        </div>
      </header>
    )
  }

}
