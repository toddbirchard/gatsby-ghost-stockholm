import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/common'
import '../styles/pages/confirmation.less'

const title = `Subscribed`
const description = `You're all set to start receiving our newsletter! Don't worry, we try to only send things worth reading.`

const Subscribed = () => (
  <Layout template="page-template confirmation-template" hasSidebar={false}>
    <section className="confirmation-card">
      <h1 className="content-title">{title}</h1>
      <div className="content-body">
        <p>{description}</p>
        <Link to="/" className="back-button">
          Back Home
        </Link>
      </div>
    </section>
  </Layout>
)

export default Subscribed
