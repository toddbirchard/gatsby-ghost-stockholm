import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/common'

import '../styles/pages/404.less'

const NotFoundPage = () => (
    <Layout template="error-template">
        <article className="error">
            <h1 className="content-title">404</h1>
            <section className="content-body">
                    Page not found, <Link to="/">return home</Link> to start over.
            </section>
        </article>
    </Layout>
)

export default NotFoundPage
