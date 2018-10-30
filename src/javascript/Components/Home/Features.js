import React from 'react';

export default class Features extends React.Component {
  render() {
    return (
      <section id="service">
        <h2>Features</h2>
        <div class="service_area">
          <div class="row">
            <div class="col-xs-1"></div>
            <div class="col-xs-2">
              <div class="service_block">
                <div class="service_icon delay-03s animated wow  zoomIn">
                  <span>
                    <i class="fa fa-codepen"></i>
                  </span>
                </div>
                <h3 class="animated fadeInUp wow">Source Code Scan</h3>
                <p class="animated fadeInDown wow">Built-in scanning tools support a majority of popular languages such as Java, Ruby, Python, and Nodejs, etc.
                </p>
              </div>
            </div>
            <div class="col-xs-2">
              <div class="service_block">
                <div class="service_icon icon2  delay-03s animated wow zoomIn">
                  <span>
                    <i class="fa fa-mobile"></i>
                  </span>
                </div>
                <h3 class="animated fadeInUp wow">Mobile Scan</h3>
                <p class="animated fadeInDown wow">
                  Reverse engineering, Malware and goodware analysis of Android applications ... and more (ninja !)
                </p>
              </div>
            </div>
            <div class="col-xs-2">
              <div class="service_block">
                <div class="service_icon icon3  delay-03s animated wow zoomIn">
                  <span>
                    <i class="fa fa-globe"></i>
                  </span>
                </div>
                <h3 class="animated fadeInUp wow">Web Scan</h3>
                <p class="animated fadeInDown wow">It can scan all web applications with and without authentication and has a unique way of managing sessions for better identification of vulnerabilities.</p>
              </div>
            </div>
            <div class="col-xs-2">
              <div class="service_block">
                <div class="service_icon icon4  delay-03s animated wow zoomIn">
                  <span>
                    <i class="fa fa-wordpress"></i>
                  </span>
                </div>
                <h3 class="animated fadeInUp wow">Wordpress Scan</h3>
                <p class="animated fadeInDown wow">
                  it Checks include application security, WordPress plugins, hosting environment and web server.
                </p>
              </div>
            </div>
            <div class="col-xs-2">
              <div class="service_block">
                <div class="service_icon icon5  delay-03s animated wow zoomIn">
                  <span>
                    <i class="fa fa-sitemap"></i>
                  </span>
                </div>
                <h3 class="animated fadeInUp wow">Network Scan</h3>
                <p class="animated fadeInDown wow">
                  This allows you to discover which TCP ports are open on your target host.
                </p>
              </div>
            </div>
            <div class="col-xs-1"></div>
          </div>
        </div>
      </section>
    )
  }
}
