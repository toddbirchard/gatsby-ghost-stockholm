import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import ImageMeta from './ImageMeta'
import getAuthorProperties from './getAuthorProperties'
import config from '../../../utils/siteConfig'

const AuthorMeta = ({ data, settings, canonical }) => {
  settings = settings.allGhostSettings.edges[0].node

  const author = getAuthorProperties(data)
  const shareImage = settings.cover_image || settings.og_image || settings.twitter_image || config.images.shareImage
  const title = `${data.name} - ${settings.title}`
  const description =
    data.bio || config.siteDescriptionMeta || settings.description
  const twitterSiteUrl =
    settings.twitter &&
    `https://twitter.com/${settings.twitter.replace(/^@/, ``)}/`
  const siteCreatorTwitter = config.creator && config.creator.name

  const jsonLd = {
    '@context': `https://schema.org/`,
    '@type': `Person`,
    name: data.name,
    sameAs: author.sameAsArray ? author.sameAsArray : undefined,
    url: canonical,
    image: shareImage
      ? {
        '@type': `ImageObject`,
        url: shareImage,
        width: config.images.shareImageWidth,
        height: config.images.shareImageHeight,
      }
      : undefined,
    mainEntityOfPage: {
      '@type': `WebPage`,
      '@id': config.siteUrl,
    },
    description,
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta property="og:site_name" content={settings.title}/>
        <meta property="og:type" content="profile"/>
        <meta property="og:title" content={title}/>
        <meta property="og:description" content={description}/>
        <meta property="og:url" content={canonical}/>
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:description" content={description}/>
        <meta name="twitter:url" content={canonical}/>
        {twitterSiteUrl && (
          <meta name="twitter:site" content={twitterSiteUrl}/>
        )}
        {settings.twitter && (
          <meta name="twitter:creator" content={siteCreatorTwitter}/>
        )}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd, undefined, 4)}
        </script>
      </Helmet>
      <ImageMeta image={shareImage}/>
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
    facebook: PropTypes.string,
  }).isRequired,
  settings: PropTypes.shape({
    title: PropTypes.string.isRequired,
    twitter: PropTypes.string,
    description: PropTypes.string,
    cover_image: PropTypes.string,
    og_image: PropTypes.string,
    twitter_image: PropTypes.string,
    allGhostSettings: PropTypes.object.isRequired,
  }).isRequired,
  canonical: PropTypes.string.isRequired,
}

const AuthorMetaQuery = props => (
  <StaticQuery
    query={graphql`
      query GhostSettingsAuthorMeta {
        allGhostSettings {
          edges {
            node {
              ...GhostSettingsFields
            }
          }
        }
      }
    `}
    render={data => <AuthorMeta settings={data} {...props} />}
  />
)

export default AuthorMetaQuery
