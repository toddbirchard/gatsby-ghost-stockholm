import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import config from '../../../utils/siteConfig'
import ArticleMeta from './ArticleMeta'
import WebsiteMeta from './WebsiteMeta'
import AuthorMeta from './AuthorMeta'

/**
 * MetaData will generate all relevant meta data information incl.
 * JSON-LD (schema.org), Open Graph (Facebook) and Twitter properties.
 *
 */
const MetaData = ({
  data,
  settings,
  title,
  description,
  image,
  location,
  pageContext,
}) => {
  const canonical = config.siteUrl + location.pathname
  const { ghostPost, ghostTag, ghostAuthor, ghostPage, ghostSettings } = data
  settings = ghostSettings

  if (ghostPost) {
    return <ArticleMeta data={ghostPost} canonical={canonical}/>
  } else if (ghostTag) {
    return (
      <WebsiteMeta
        data={ghostTag}
        canonical={canonical}
        pageContext={pageContext}
        image={image}
        type="Series"
      />
    )
  } else if (ghostAuthor) {
    return (
      <AuthorMeta
        data={ghostAuthor}
        canonical={canonical}
        image={image}
        pageContext={pageContext}
      />
    )
  } else if (ghostPage) {
    return (
      <WebsiteMeta
        data={ghostPage}
        canonical={canonical}
        pageContext={pageContext}
        image={image}
        type="WebSite"
      />
    )
  } else {
    title = title || config.siteTitleMeta || settings.title
    description =
      description || config.siteDescriptionMeta || settings.description
    image = image || config.images.shareImage || settings.og_image || settings.twitter_image || ``

    return (
      <WebsiteMeta
        data={{}}
        canonical={canonical}
        title={title}
        description={description}
        image={image}
        pageContext={pageContext}
        type="WebSite"
      />
    )
  }
}

MetaData.propTypes = {
  data: PropTypes.shape({
    ghostPost: PropTypes.object,
    ghostTag: PropTypes.object,
    ghostAuthor: PropTypes.object,
    ghostPage: PropTypes.object,
    ghostSettings: PropTypes.object,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
  settings: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.object,
  image: PropTypes.object,
}

const MetaDataQuery = props => (
  <StaticQuery
    query={graphql`
      query GhostSettingsMetaData {
        ghostSettings {
              title
              description
              cover_image
              og_image
              twitter_image
        }
      }
    `}
    render={data => <MetaData settings={data} {...props} />}
  />
)

export default MetaDataQuery
