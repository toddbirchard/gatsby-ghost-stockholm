import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

import '../styles/pages/jupyterarchive.less'

/**
* Jupyter archive page (/jupyter/)
*
* Test playground for displaying notebooks via node.
*
*/

const JupyterArchive = ({ data, location, pageContext }) => {
    const notebooks = data.allFile.edges
    const title = pageContext.title
    const description = pageContext.description

    return (
        <>
            <MetaData
                data={data}
                location={location}
                title={title}
                description={description}
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
        allFile: PropTypes.arrayOf(
            PropTypes.shape({
                childJupyterNotebook: PropTypes.shape({
                    fileAbsolutePath: PropTypes.string.isRequired,
                }),
                slug: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                modifiedTime: PropTypes.string,
                gitRemote: PropTypes.shape({
                    href: PropTypes.string,
                }),
            }),
        ),
    }).isRequired,
    location: PropTypes.object,
    pageContext: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
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
                  href
                }
                ext
                relativePath
              }
            }
          }
        }`
