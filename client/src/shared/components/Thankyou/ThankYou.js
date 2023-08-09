import React, { Component } from 'react'
import AboutBackground from '../../../AboutBackground'
import BreadCrumbNCover from '../../../BreadCrumbNCover'
import AboutServices from '../../../AboutServices'
import './ThankYou.css'

const pageName = "";
export default class About extends Component {
    render() {
        return (
            <div>
                <BreadCrumbNCover pageName={pageName} />
                <div className='thankyou-body'>
                    <div className='mes-1'>Thank You!</div>
                    <div className='mes-2'><strong>Your order has been placed.</strong> Thank you for shopping with us!</div>
                </div>
            </div>
        )
    }
}