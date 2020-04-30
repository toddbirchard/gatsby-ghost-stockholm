import React from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import { Layout } from '../components/common'
import { AuthorList } from '../components/authors'
import { MetaData } from '../components/common/meta'
import { StaticQuery, graphql } from 'gatsby'
import config from '../utils/siteConfig'

import '../styles/pages/page.less'

/**
* About page (/:slug)
*
* This file renders a single page and loads all the content.
*
*/
const aboutPage = ({ data }) => {
  const introVideo = config.introVideo
  const title = data.ghostPage.title
  const description = data.ghostPage.meta_description
  const slug = data.ghostPage.slug
  const html = data.ghostPage.html

  return (
    <>
      <MetaData
        data={data}
        location={location}
        title={title}
        description={description}
        type="website"
      />
      <Layout template="page-template" hasSidebar={true}>
        <main className={`post-content page-content ${slug}`}>
          <h1>{title}</h1>
          <div className="about-video-wrapper">
            <ReactPlayer
              url={introVideo}
              width="100%"
              height="100%"
              className="about-video"
              config={{
                vimdeo: {
                  width: `100%`,
                },
              }}/>
          </div>
          <section
            className="content-body load-external-scripts"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <AuthorList page={`about`} />
        </main>
      </Layout>
    </>
  )
}

aboutPage.propTypes = {
  data: PropTypes.shape({
    ghostPage: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string,
      meta_description: PropTypes.string,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

const aboutPageQuery = props => (
  <StaticQuery
    query={graphql`
            query AboutPage {
                ghostSettings {
                    ...GhostSettingsFields
                }
                ghostPage(slug: {eq: "about"}) {
                    ...GhostPageFields
                }
            }
        `}
    render={data => <aboutPage data={data} {...props} />}
  />
)

export default aboutPageQuery
