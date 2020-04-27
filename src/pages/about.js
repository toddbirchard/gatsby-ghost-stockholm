import React from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import { Layout } from '../components/common'
import { AuthorList } from '../components/authors'
import config from '../utils/siteConfig'

import '../styles/pages/page.less'

/**
* Single page (/:slug)
*
* This file renders a single page and loads all the content.
*
*/
const aboutPage = ({ data, location, pageContext }) => {
  const introVideo = config.introVideo
  const title = pageContext.title
  const description = pageContext.description

  return (
    <>
      <Layout template="page-template" hasSidebar={true}>
        <article className={`post-content page-content ${pageContext.slug}`}>
          <h1>{title}</h1>
          <div className="about-video-wrapper">
            <ReactPlayer url={introVideo} width="100%" height="100%" className="about-video" />
          </div>
          <section className="content-body load-external-scripts">
            <p>{`We're a non-profit aiming to democratize knowledge in Data Science and Software Engineering. Thousands of developers worldwide rely on us every day to empower themselves with industry skills in a manner that is accessible, enjoyable, and free.`}</p>
            <p>{`Our global community is militantly open-source in both creation and collaboration, resembling a human-driven antithesis to 600-dollar bootcamps, paywalls, and barriers-to-entry, which collectively hold the growth of the technology industry in a stranglehold. Hackers and Slackers is a collective of humans serving humans... so that we may perhaps one day build robots.`}</p>
            <p>{`We’re all students and teachers of data-for-good. We code as a means to an end. Some of us aren’t even developers, but we like to blow stuff up and make an impact. If we get to pick up a few programming languages in the process, that’s pretty rad too.`}</p>
            <p>{`If you're somebody who likes to learn (and be casually badass), maybe you should join us.`}</p>
          </section>
          <AuthorList page={`about`} />
        </article>
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

export default aboutPage
