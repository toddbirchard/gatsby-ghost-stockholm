import React from 'react'
import PropTypes from 'prop-types'
import config from '../../utils/siteConfig'
import { StaticQuery, graphql } from 'gatsby'
import { FiCoffee } from 'react-icons/fi'

/**
* BuyMeACoffee widget
*/

const CoffeeWidget = ({ data }) => {
  const coffeeImg = `/images/bmc-new-btn-logo.svg`
  const donateCopy = `If Hackers and Slackers has been helpful to you, feel free to buy us a coffee to keep us going :).`
  const donations = data.coffees.edges

  return (
    <>
      <div className="coffee widget">
        <h4 className="widget-title">Top Contributors</h4>
        <p className="widget-description">{donateCopy}</p>
        <div className="donations">
          {donations.map(({ node }) => (
            <div key={node.id} className="donation">
              <div className="contributor">
                <div className="name">{node.name}</div>
                <p className="message">{node.message}</p>
              </div>
              <div className="contributed">
                <div>
                  <span className="count">{node.count}</span>
                  <FiCoffee />
                </div>
              </div>
            </div>
          ))}
        </div>
        <a rel="noopener noreferrer" target="_blank" href={config.links.buyMeACoffee}>
          <button className="widget-button" >
            <span className="button-content">Buy me a coffee</span>
            <img src={coffeeImg} className="coffee-icon" alt="Buy us a coffee" />
          </button>
        </a>
      </div>
    </>
  )
}

CoffeeWidget.propTypes = {
  data: PropTypes.shape({
    coffees: PropTypes.shape({
      edges: PropTypes.arrayOf(
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
  }),
}

const CoffeeWidgetQuery = props => (
  <StaticQuery
    query={graphql`
      query coffeeQuery {
        coffees: allMysqlDonations(limit: 3, sort: {fields: count, order: DESC}) {
          edges {
            node {
              email
              id
              count
              link
              message
              name
            }
          }
        }
      }`
    }
    render={data => <CoffeeWidget data={data} {...props} />}
  />
)

export default CoffeeWidgetQuery
