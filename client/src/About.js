import React, { Component } from 'react'
import AboutBackground from './AboutBackground'
import BreadCrumbNCover from './BreadCrumbNCover'
import AboutServices from './AboutServices'

const pageName = "About us";
const About = () => {
        return (
            <div>
                <BreadCrumbNCover pageName={pageName}/>
                <AboutBackground/>
                <AboutServices/>
            </div>
        )
}

export default About;
