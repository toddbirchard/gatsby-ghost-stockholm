import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { Layout } from '../components/common'
import { Pagination } from '../components/navigation'
import { MetaData } from '../components/common/meta'
import '../styles/jupyterarchive.less'
/**
* Series page (/series/)
*
* Loads all posts for the requested tag incl. pagination.
*
*/
const JupyterArchive = ({ data, location, pageContext }) => {
    const notebooks = data.allFile.edges
    const title = pageContext.title

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="series"
            />
          <Layout template="jupyter-archive-template page-template" hasSidebar={true}>
              <div className="page-content post-content">
                  {title ? <h1>{title}</h1> : null }
                  <div className="jupyter-list post-feed">
                      {notebooks.map(({ node }) => (
                          <div className="jupyter-card" key={node.id}>
                              <Link className="jupyter-card-title" to={`jupyter/${node.name.split(` `).join(`-`).toLowerCase()}/`} classes="notebook-link">{node.name}</Link>
                          </div>
                      ))}
                  </div>
              </div>
          </Layout>
        </>
    )
}

JupyterArchive.propTypes = {
    data: PropTypes.shape({
        allFile: PropTypes.shape({
            childJupyterNotebook: PropTypes.shape({
                fileAbsolutePath: PropTypes.string.isRequired,
            }),
            slug: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            modifiedTime: PropTypes.string,
            gitRemote: PropTypes.shape({
                webLink: PropTypes.string,
            }),
        }),
    }).isRequired,
    pageContext: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }),
}

export default JupyterArchive

export const jupyterArchiveQuery = graphql`
      query JupyterQuery {
          allFile(filter: {ext: {eq: ".ipynb"}}) {
            edges {
              node {
                childJupyterNotebook {
                  fileAbsolutePath
                  metadata {
                    language_info {
                      name
                      version
                    }
                  }
                }
                name
                modifiedTime(formatString: "DD MMMM, YYYY")
                gitRemote {
                  webLink
                }
                ext
                relativePath
              }
            }
          }
        }
`
