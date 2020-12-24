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
  const donations = data.coffees.edges

  return (
    <>
      <div className="coffee widget">
        <h4 className="widget-title">Donations</h4>
        <div className="donations">
          {donations.map(({ node }) => (
            <a rel="noopener noreferrer" target="_blank" href={node.link} className="donation" key={node.id}>
              <div>
                <div className="contributor-name">
                  <div className="name">{node.name}</div>
                </div>
                <div className="number-coffees">
                  <div>
                    <span className="count">{node.count}</span>
                    <FiCoffee />
                  </div>
                </div>
              </div>
              <p>{node.message.replace(`\\`, ``)}</p>
            </a>
          ))}
        </div>
        <a rel="noopener noreferrer" target="_blank" href={config.links.buyMeACoffee}>
          <button className="widget-button coffee-button" >
            <span className="button-content">Buy me a coffee</span>
            <img data-src={coffeeImg} className="coffee-icon lazyload" alt="Buy us a coffee" />
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
          id: PropTypes.string,
          name: PropTypes.string,
          count: PropTypes.number,
          message: PropTypes.string,
          link: PropTypes.string,
        }),
      ),
    }),
  }),
}

const CoffeeWidgetQuery = props => (
  <StaticQuery
    query={graphql`
      query coffeeQuery {
        coffees: allMysqlDonations(limit: 5, sort: {fields: created_at, order: DESC}) {
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
