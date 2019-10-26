import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
* Newsletter widget
*/

const NewsletterWidget = () => {
    const newsletterCopy = `Are you into data to the point where it's almost embarrasing? Toss us your email and we'll promise to only give you the good stuff.`

    return (
      <>
        <div className="widget newsletter">
            <p className="newsletter-description">{newsletterCopy}</p>
            <form name="newsletter" method="POST" netlify="true" data-netlify="true" netlify-honeypot="phone-number" action="/confirmation" >
                <input className="subscribe-input-class" type="name" name="name" placeholder="Your name" required />
                <input className="subscribe-input-class" type="email" name="email" placeholder="Your email address" required />
                <input className="phone-number" type="phone" name="phone-number" placeholder="Your phone number" style={{ display: `none` }} autoComplete="off" />
                <button type="submit">Sign Up <FontAwesomeIcon icon={[`far`, `arrow-right`]} size="xs" /></button>
            </form>
        </div>
    </>
    )
}

export default NewsletterWidget
