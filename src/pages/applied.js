import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/common'
import '../styles/pages/confirmation.less'

const title = `Applied`
const description = `Application received! You'll hear from us shortly.`

const Applied = () => (
    <Layout template="page-template" hasSidebar={false}>
        <section className="confirmation-card">
            <h1 className="content-title">{title}</h1>
            <div className="content-body">
                <p>{description}</p>
                <Link to="/" className="back-button">Back Home</Link>
            </div>
        </section>
    </Layout>
)

export default Applied
