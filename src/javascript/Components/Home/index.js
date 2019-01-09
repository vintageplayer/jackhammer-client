import React from 'react'
import Header from './Header'
import Overview from './Overview'
import Features from './Features'
import HowItWorks from './HowItWorks'
import Team from './Team'
import Contact from './Contact'
import Footer from '../Layout/Footer'

export default class Home extends React.Component {
  render() {
    return (
      <div class="home-page">
        <Header/>
        <Overview/>
        <Features/>
        <HowItWorks/>
        <Team/>
        <Contact/>
        <Footer/>
      </div>
    )
  }
}
