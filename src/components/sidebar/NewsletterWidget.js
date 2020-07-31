import React from 'react'
import { Subscribe } from '../members'

/**
 * Newsletter widget
 */

const NewsletterWidget = () => {
  const SubscribeSection = () => (
    <section className="subscribe-form">
      <Subscribe />
    </section>
  )

  return (
    <>
      <div className="widget newsletter">
        <SubscribeSection />
      </div>
    </>
  )
}

export default NewsletterWidget
