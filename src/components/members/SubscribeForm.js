import React from 'react'
import PropTypes from 'prop-types'
import { FaArrowRight, FaRegTimesCircle } from 'react-icons/fa'
import LoaderIcon from './icons/loader-icon'

class SubscribeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ``,
      message: ``,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleDismiss = this.handleDismiss.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleDismiss() {
    this.setState({ message: `` })
  }

  handleSubmit(event) {
    event.preventDefault()

    const cmsUrl = this.props.url
    const postURL = `${cmsUrl}members/api/send-magic-link/`

    const values = {
      email: this.state.value,
      emailType: `subscribe`,
      labels: [],
    }

    fetch(postURL, {
      method: `POST`,
      mode: `cors`,
      headers: { 'Content-Type': `application/json` },
      body: JSON.stringify(values),
    })
      .then(() => {
        this.setState({ message: `success` })
      })
      .catch(() => {
        this.setState({ message: `error` })
      })
  }

  render() {
    const text = this.props.text

    return (
      <div className={this.state.message}>
        <div className="announcement message-success">
          <div>
            <span className="summary">{`${text(`GREAT`)}!`}</span>
            {` `}
            <span>{text(`CHECK_YOUR_INBOX`)}.</span>
          </div>
          <div
            className="close-announcement"
            onClick={() => this.handleDismiss()}
          >
            <FaRegTimesCircle/>
          </div>
        </div>
        <div className="announcement message-error">
          <div>{text(`ENTER_VALID_EMAIL`)}!</div>
          <div
            className="close-announcement"
            onClick={() => this.handleDismiss()}
          >
            <FaRegTimesCircle/>
          </div>
        </div>
        <form data-members-form="subscribe" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="hidden-label" htmlFor="email">
              {text(`EMAIL`)}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={this.state.value}
              onChange={this.handleChange}
              className="subscribe-email"
              data-members-email
              placeholder="Your email"
              autoComplete="true"
            />
            <button className="widget-button" type="submit" value="Submit">
              <span className="button-content">{text(`SUBSCRIBE`)}</span>
              <span className="button-loader">
                <LoaderIcon/>
              </span>
              <FaArrowRight/>
            </button>
          </div>
        </form>
      </div>
    )
  }
}

SubscribeForm.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.func.isRequired,
}

export default SubscribeForm
