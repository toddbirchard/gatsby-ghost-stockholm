import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/common'

const title = `Subscribed`
const description = `You're all set to start receiving our newsletter! We try to only send things worth reading, so we won't be bothering you too often.`

const Confirmation = () => (
    <Layout template="page-template" hasSidebar={false}>
        <div className="container">
            <article className="confirmation-card">
                <h1 className="content-title">{title}</h1>
                <section className="content-body">
                    <p>{description}</p>
                    <Link to="/" className="back-button">Back Home</Link>
                </section>
            </article>
        </div>
    </Layout>
)

export default Confirmation
