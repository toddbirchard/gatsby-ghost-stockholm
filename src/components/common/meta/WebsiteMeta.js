import React from 'react'
import Helmet from "react-helmet"
import PropTypes from 'prop-types'
import _ from 'lodash'
import { StaticQuery, graphql } from 'gatsby'
import url from 'url'

import ImageMeta from './ImageMeta'
import config from '../../../utils/siteConfig'

const WebsiteMeta = ({ data, settings, canonical, title, description, image, type }) => {
    settings = settings.allGhostSettings.edges[0].node

    const publisherLogo = url.resolve(config.siteUrl, (settings.logo || config.siteIcon))
    let shareImage = image || data.feature_image || _.get(settings, `cover_image`, null)

    shareImage = shareImage ? url.resolve(config.siteUrl, shareImage) : null

    description = description || data.meta_description || data.description || config.siteDescriptionMeta || settings.description
    title = `${title || data.meta_title || data.name || data.title} - ${settings.title}`

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" to={canonical} />
                <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
                <meta property="og:site_name" content={settings.title} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonical} />
                <meta property="fb:page_id" content={config.appIDs.facebook} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:url" content={canonical} />
                {settings.twitter && <meta name="twitter:site" content={`https://twitter.com/${settings.twitter.replace(/^@/, ``)}/`} />}
                {settings.twitter && <meta name="twitter:creator" content={settings.twitter} />}
                <meta name="google-site-verification" content={config.appIDs.google} />
                <link rel="icon" type="image/png" sizes="72x72" href="images/icons/icon-72x72.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="images/icons/icon-96x96.png" />
                <link rel="icon" type="image/png" sizes="128x128" href="images/icons/icon-128x128.png" />
                <link rel="icon" type="image/png" sizes="144x144" href="images/icons/icon-144x144.png" />
                <link rel="icon" type="image/png" sizes="152x152" href="images/icons/icon-152x152.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="images/icons/icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="384x384" href="images/icons/icon-384x384.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="images/icons/icon-512x512.png" />
                <link rel="manifest" href="/manifest.json" />
                <script type="application/ld+json">{`
                    {
                        "@context": "https://schema.org/",
                        "@type": "${type}",
                        "url": "${canonical}",
                        ${shareImage ? `"image": {
                                "@type": "ImageObject",
                                "url": "${shareImage}",
                                "width": "${config.shareImageWidth}",
                                "height": "${config.shareImageHeight}"
                            },` : ``}
                        "publisher": {
                            "@type": "Organization",
                            "name": "${settings.title}",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "${publisherLogo}",
                                "width": 60,
                                "height": 60
                            }
                        },
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

WebsiteMeta.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        feature_image: PropTypes.string,
        description: PropTypes.string,
        bio: PropTypes.string,
        profile_image: PropTypes.string,
        meta_description: PropTypes.string,
        name: PropTypes.string,
        meta_title: PropTypes.string,
    }).isRequired,
    settings: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
        twitter: PropTypes.object,
        title: PropTypes.string,
        logo: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
    canonical: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.oneOf([`WebSite`, `Series`]).isRequired,
}

const WebsiteMetaQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettingsWebsiteMeta {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
            }
        `}
        render={data => <WebsiteMeta settings={data} {...props} />}
    />
)

export default WebsiteMetaQuery
