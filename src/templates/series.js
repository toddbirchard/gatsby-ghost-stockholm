import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single page (/:slug)
*
* This file renders a single page and loads all the content.
*
*/
/*const Page = ({ data, location }) => {
    const page = data.ghostPage

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="website"
            />
            <Helmet>
                <style type="text/css">{`${page.codeinjection_styles}`}</style>
            </Helmet>
            <Layout template="post-template page-template">
                <article className="content">
                    { page.feature_image ?
                        <figure className="post-feature-image">
                            <img src={ page.feature_image } alt={ page.title } />
                        </figure> : null }
                    <div className="post-full-content">
                        <h1 className="content-title">{page.title}</h1>
                        <section
                            className="content-body load-external-scripts"
                            dangerouslySetInnerHTML={{ __html: page.html }}
                        />
                    </div>
                </article>
            </Layout>
        </>
    )
}

Page.propTypes = {
    data: PropTypes.shape({
        allGhostTag: PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            postCount: PropTypes.number.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
}

export default Page

export const seriesQuery = graphql`
query MyQuery {
  allGhostTag(filter: {visibility: {eq: "internal"}}) {
    edges {
      node {
        feature_image
        name
        url
        postCount
        description
      }
    }
  }
}
`
*/
