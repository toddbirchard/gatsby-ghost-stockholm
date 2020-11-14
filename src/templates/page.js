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
  const featureImage = page.feature_image
  const featureImageSlash = page.feature_image && page.feature_image.lastIndexOf(`/`)
  const featureMobileImage = featureImageSlash && [featureImage.slice(0, featureImageSlash), `/_mobile`, featureImage.slice(featureImageSlash)].join(``).replace(`.jpg`, `@2x.jpg`).replace(`.png`, `@2x.png`)
  const featureRetinaImagePath = featureImageSlash && [featureImage.slice(0, featureImageSlash), `/_retina`, featureImage.slice(featureImageSlash)].join(``)
  const featureRetinaImage = featureRetinaImagePath && featureRetinaImagePath.indexOf(`@2x`) !== -1 ? featureRetinaImagePath : featureRetinaImagePath.replace(`.jpg`, `@2x.jpg`)

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
                <picture className="post-image">
                  <source
                    media="(max-width:600px)"
                    data-srcset={featureMobileImage}
                  />
                  <source data-srcset={featureRetinaImage} />
                  <img
                    className="post-card-image lazyload"
                    data-src={featureImage}
                    alt={page.title}
                    title={page.title}
                  />
                </picture>
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
    pageNumber: PropTypes.number,
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
