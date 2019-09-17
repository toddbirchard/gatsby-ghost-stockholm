import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/common'

import '../styles/pages/404.less'

const NotFoundPage = () => (
    <Layout template="bg-purple error-template">
        <div className="stars">
            <div className="central-body">
                <h1 className="error-title">404</h1>
                <Link to="/" className="home-button" target="_blank">GO BACK HOME</Link>
            </div>
            <div className="objects">
                <img className="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px" />
                <div className="earth-moon">
                    <img className="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px" />
                    <img className="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px" />
                </div>
                <div className="box_astronaut">
                    <img className="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px" />
                </div>
            </div>
            <div className="glowing_stars">
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
            </div>
        </div>
    </Layout>
)

export default NotFoundPage
