import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

/**
 * Newsletter widget
 */


const NewsletterWidget = () => (
  <>
    <div className="widget newsletter">
      <h4 className="widget-title">Newsletter</h4>
      <form
        name="newsletter"
        method="POST"
        netlify
        data-netlify="true"
        netlify-honeypot="phone-number"
        action="/subscribed/"
      >
        <fieldset>
          <label className="hidden-label" htmlFor="name">Name</label>
          <input
            className="subscribe-input-class"
            type="name"
            name="name"
            placeholder="Your name"
            required
          />
        </fieldset>
        <fieldset>
          <label className="hidden-label" htmlFor="email">Email</label>
          <input
            className="subscribe-input-class"
            type="email"
            name="email"
            placeholder="Your email address"
            required
          />
        </fieldset>
        <fieldset>
          <label className="hidden-label" htmlFor="phone-number">Phone</label>
          <input
            className="hidden-label"
            type="phone"
            name="phone-number"
            placeholder="Your phone number"
            style={{ visibility: `hidden` }}
            autoComplete="off"
          />
        </fieldset>
        <button type="submit" className="newsletter-button">
          <span>Sign Up</span> <FaArrowRight />
        </button>
      </form>
    </div>
  </>
)

export default NewsletterWidget
