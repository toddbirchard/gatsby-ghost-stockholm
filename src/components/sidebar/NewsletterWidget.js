import React from 'react'
import { Subscribe } from '../members'

/**
 * Newsletter widget
 */

const NewsletterWidget = () => (
  <>
    <div className="widget newsletter">
      <section className="subscribe-form">
        <Subscribe />
      </section>
    </div>
  </>
)

export default NewsletterWidget
