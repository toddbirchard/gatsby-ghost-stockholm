import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { navigate } from 'gatsby';

/**
 * Newsletter widget
 */

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + `=` + encodeURIComponent(data[key]))
    .join(`&`);
}

const NewsletterWidget = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch(`/`, {
      method: `POST`,
      headers: { 'Content-Type': `application/x-www-form-urlencoded` },
      body: encode({
        'form-name': form.getAttribute(`name`),
        name: form.elements.namedItem(`name`).value,
        email: form.elements.namedItem(`email`).value,
      }),
    })
      .then(() => navigate(`/subscribed/`))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="widget newsletter">
        <h4 className="widget-title">Newsletter</h4>
        <form
          name="newsletter"
          method="POST"
          netlify="true"
          data-netlify="true"
          netlify-honeypot="phone-number"
          onSubmit={handleSubmit}
        >
          <fieldset>
            <label className="hidden-label" htmlFor="name">
              Name
            </label>
            <input
              id="newsletter-name-field"
              className="subscribe-input-class"
              type="text"
              name="name"
              placeholder="Your name"
              required
            />
          </fieldset>
          <fieldset>
            <label className="hidden-label" htmlFor="email">
              Email
            </label>
            <input
              id="newsletter-email-field"
              className="subscribe-input-class"
              type="text"
              name="email"
              placeholder="Your email address"
              required
            />
          </fieldset>
          <fieldset>
            <label className="hidden-label" htmlFor="phone-number">
              Phone
            </label>
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
  );
};

export default NewsletterWidget;
