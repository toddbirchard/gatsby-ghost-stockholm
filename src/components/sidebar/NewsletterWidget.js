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
        {/*<form name="newsletter" method="POST" netlify="true" data-netlify="true" netlify-honeypot="phone-number" action="/subscribed/">
          <input className="subscribe-input-class" type="name" name="name" placeholder="Your name" required />
          <input className="subscribe-input-class" type="email" name="email" placeholder="Your email address" required />
          <input className="phone-number" type="phone" name="phone-number" placeholder="Your phone number" style={{ display: `none` }} autoComplete="off" />
          <button type="submit">Sign Up <FaArrowRight /></button>
        </form>*/}
      </div>
    </>
  )
}

export default NewsletterWidget
