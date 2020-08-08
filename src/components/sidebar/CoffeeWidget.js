import React from 'react'
import PropTypes from 'prop-types'
import config from '../../utils/siteConfig'
import { StaticQuery, graphql } from 'gatsby'

/**
* BuyMeACoffee widget
*/

const CoffeeWidget = ({ data }) => {
  const coffeeImg = `/images/bmc-new-btn-logo.svg`
  const donateCopy = `We started sharing these tutorials to help and inspire new scientists and engineers around the world. If Hackers and Slackers has been helpful to you, feel free to buy us a coffee to keep us going :).`
  const donations = data.coffees.items.edges

  return (
    <>
      <div className="coffee widget">
        <h4 className="widget-title">Support us</h4>
        <p className="widget-description">{donateCopy}</p>
        <a rel="noopener noreferrer" target="_blank" href={config.links.buyMeACoffee}>
          <button className="widget-button" >
            <span className="button-content">Buy me a coffee</span>
            {donations.map(({ node }) => (
              <div key={node.id}>
                <div>
                  <span>{node.name}</span>
                  <p>{node.description}</p>
                </div>
                <div>
                  <span>{node.count}</span>
                </div>
              </div>
            ))}
            <img src={coffeeImg} className="coffee-icon" alt="Buy us a coffee" />
          </button>
        </a>
      </div>
    </>
  )
}

CoffeeWidget.propTypes = {
  data: PropTypes.shape({
    coffees: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        message: PropTypes.string,
        email: PropTypes.string,
        link: PropTypes.string.isRequired,
      }),
    ),
  }),
}

const CoffeeWidgetQuery = props => (
  <StaticQuery
    query={graphql`
      query coffeeQuery {
        coffees: mysqlDonations {
          id
          count
          name
          message
          link
          email
        }
      }`
    }
    render={data => <CoffeeWidget data={data} {...props} />}
  />
)

export default CoffeeWidgetQuery
