import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import config from '../../utils/siteConfig'

/**
*
* Support widget
*
*/

const SupportWidget = () => {
  const coffeeUrl = config.links.buyMeACoffee
  const coffeeImg = config.images.buyMeACoffee
  const donateCopy = `We started sharing these tutorials to help and inspire new scientists and engineers around the world. If Hackers and Slackers has been helpful to you, feel free to buy us a coffee to keep us going :).`

  return (
    <>
      <div className="widget support">
        <div className="newsletter-section">
          <span className="post-footer-title">Monthly Newsletter</span>
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
            <button type="submit" className="support-widget-button"><span>Sign Up</span> <FaArrowRight /></button>
          </form>
        </div>
        <div className="donate-section">
          <span className="post-footer-title">Support us</span>
          <p className="support-description">{donateCopy}</p>
          <a className="support-widget-button" rel="noopener noreferrer" target="_blank" href={coffeeUrl}>
            <img data-src={coffeeImg} className="lazyload" alt="Buy us a coffee" title="Buy us a coffee" />
            <span className="coffee-button-text">Buy me a coffee</span>
          </a>
        </div>
      </div>
    </>
  )
}

export default SupportWidget
