import React from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import { Layout } from '../components/common'
import { AuthorList } from '../components/authors'
import { MetaData } from '../components/common/meta'
import { graphql, Link } from 'gatsby'
import config from '../utils/siteConfig'

import '../styles/pages/page.less'
import '../styles/pages/about.less'

/**
* About page (/:slug)
*
* This file renders a single page and loads all the content.
*
*/
const AboutPage = ({ data, location, pageContext }) => {
  const title = pageContext.title
  const description = pageContext.description
  const introVideo = config.introVideo

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
        <main className="post-content page-content about">
          <div className="page-wrapper">
            <h1>About</h1>
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
                }}
              />
            </div>
            <p>We&apos;re a non-profit aiming to democratize knowledge in Data Science and Software Engineering. Thousands of developers worldwide rely on us every day to empower themselves with industry skills in a manner that is accessible, enjoyable, and free.</p>
            <p>Our global community is militantly open-source in both creation and collaboration, resembling a human-driven antithesis to 600-dollar bootcamps, paywalls, and barriers-to-entry, which collectively hold the growth of the technology industry in a stranglehold. Hackers and Slackers is a collective of humans serving humans... so that we may perhaps one day build robots.</p>
            <p>We’re all students and teachers of data-for-good. We code as a means to an end. Some of us aren’t even developers, but we like to blow stuff up and make an impact. If we get to pick up a few programming languages in the process, that’s pretty rad too.</p>
            <p>If you&apos;re somebody who likes to learn (and be casually badass), maybe you should <Link to="/about/"> join us.</Link></p>
            <AuthorList page="about" />
          </div>
        </main>
      </Layout>
    </>
  )
}

AboutPage.propTypes = {
  data: PropTypes.shape({
    ghostPage: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string,
      meta_description: PropTypes.string,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string,
    }),
  }).isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export const AboutPageQuery = graphql`
    query AboutPageMeta($slug: String) {
      ghostPage(slug: {eq: $slug}) {
        ...GhostPageFields
      }
  }`

export default AboutPage
