import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout } from '../components/common'
import { AuthorList } from '../components/authors'
import { MetaData } from '../components/common/meta'

import '../styles/pages/page.less'

/**
 * Single page (/:slug)
 *
 * This file renders a single page and loads all the content.
 *
 */
const Page = ({ data, location, pageContext }) => {
  const page = data.ghostPage
  const pageNumber = pageContext.pageNumber
  const title = pageNumber > 1 ? page.title + `(page` + pageNumber + `)` : page.title
  const description = page.meta_description

  return (
    <>
      <MetaData
        data={data}
        location={location}
        title={title}
        description={description}
        type="website"
      />
      <Layout template="page-template" hasSidebar>
        <main className={`post-content page-content ${pageContext.slug}`}>
          <div className="page-wrapper">
            {page.feature_image
              ? <figure className="post-feature-image">
                <img className="lazyload" data-src={page.feature_image} alt={page.title}/>
              </figure>
              : null}
            <h1>{title}</h1>
            <section
              className="content-body load-external-scripts"
              dangerouslySetInnerHTML={{ __html: page.html }}
            />
            {pageContext.slug === `about` ? <AuthorList page="about"/> : null}
          </div>
        </main>
      </Layout>
    </>
  )
}

Page.propTypes = {
  data: PropTypes.shape({
    ghostPage: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string,
      meta_description: PropTypes.string,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }),
  location: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query($slug: String!) {
    ghostPage(slug: { eq: $slug }) {
      ...GhostPageFields
    }
  }
`
