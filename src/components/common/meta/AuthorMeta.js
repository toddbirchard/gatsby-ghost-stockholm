import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { StaticQuery, graphql } from 'gatsby'

import ImageMeta from './ImageMeta'
import getAuthorProperties from './getAuthorProperties'
import config from '../../../utils/siteConfig'

const AuthorMeta = ({ data, settings, canonical, pageContext }) => {
  settings = settings.ghostSettings

  const author = getAuthorProperties(data)
  const shareImage = author.image || _.get(settings, `cover_image`, null)
  const title = `${data.name} - ${settings.title}`
  const description = data.bio || config.siteDescriptionMeta || settings.description
  const previousPagePath = pageContext ? pageContext.previousPagePath : null
  const nextPagePath = pageContext ? pageContext.nextPagePath : null

  return (
    <>
      <Helmet>
        <title>{title}</title>
        {/*canonical && <link rel="canonical" to={canonical} />*/}
        {previousPagePath ? <link rel="prev" href={pageContext.previousPagePath} /> : null }
        {nextPagePath ? <link rel="next" href={pageContext.nextPagePath} /> : null}
        <meta name="description" content={description} />
        <meta property="og:site_name" content={settings.title} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={canonical} />
        {settings.twitter && <meta name="twitter:site" content={`https://twitter.com/${settings.twitter.replace(/^@/, ``)}/`} />}
        {settings.twitter && <meta name="twitter:creator" content={settings.twitter} />}
        <script type="application/ld+json">{`
                    {
                        "@context": "https://schema.org/",
                        "@type": "Person",
                        "name": "${data.name}",
                        ${author.sameAsArray ? `"sameAs": ${author.sameAsArray},` : ``}
                        "url": "${canonical}",
                        ${shareImage ? `"image": {
                                "@type": "ImageObject",
                                "url": "${shareImage}",
                                "width": "${config.shareImageWidth}",
                                "height": "${config.shareImageHeight}"
                            },` : ``}
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "${config.siteUrl}"
                        },
                        "description": "${description}"
                    }
                `}</script>
      </Helmet>
      <ImageMeta image={shareImage} />
    </>
  )
}

AuthorMeta.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    bio: PropTypes.string,
    profile_image: PropTypes.string,
    website: PropTypes.string,
    twitter: PropTypes.string,
  }).isRequired,
  settings: PropTypes.shape({
    ghostSettings: PropTypes.object.isRequired,
    twitter: PropTypes.string,
    facebook: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  pageContext: PropTypes.object,
  canonical: PropTypes.string.isRequired,
}

const AuthorMetaQuery = props => (
  <StaticQuery
    query={graphql`
            query GhostSettingsAuthorMeta {
                ghostSettings {
                            ...GhostSettingsFields
                        }
                    }
        `}
    render={data => <AuthorMeta settings={data} {...props} />}
  />
)

export default AuthorMetaQuery
