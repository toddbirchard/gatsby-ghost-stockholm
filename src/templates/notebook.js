import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout } from '../components/common'

import '../styles/posts/index.less'
import '../styles/pages/jupyter.less'

/**
* Single notebook view (/jupyter/:slug)
*
* This file renders a single notebook and loads all the content.
*
*/

const JupyterNotebook = ({ data, pageContext }) => {
    const file = data.file
    const notebook = file.childJupyterNotebook
    const languageName = notebook.metadata ? notebook.metadata.language_info.name : null
    const languageVersion = notebook.metadata ? notebook.metadata.language_info.version : null
    const githubLink = file.gitRemote.href + file.relativePath
    const githubRepoName = file.gitRemote.full_name

    return (
            <>
                <Layout template="jupyter-template">
                    <div className="jupyter-container">
                        <h1>{pageContext.title}</h1>
                        <div className="jupyter-meta">
                            <div className="meta-item jupyter-language">{languageName} {languageVersion}</div>
                            <div className="meta-item jupyter-origin-url"><a href={githubLink}>{githubRepoName}</a></div>
                            <div className="meta-item jupyter-date">{file.modifiedTime}</div>
                        </div>
                        <section
                            className="content-body load-external-scripts"
                            dangerouslySetInnerHTML={{ __html: notebook.html }}
                        />
                    </div>
                </Layout>
            </>
    )
}

JupyterNotebook.propTypes = {
    data: PropTypes.shape({
        file: PropTypes.shape({
            childJupyterNotebook: PropTypes.shape({
                id: PropTypes.string.isRequired,
                fileAbsolutePath: PropTypes.string.isRequired,
                html: PropTypes.string.isRequired,
                internal: PropTypes.shape({
                    content: PropTypes.object.isRequired,
                }),
                metadata: PropTypes.shape({
                    language_info: PropTypes.shape({
                        name: PropTypes.string.isRequired,
                        version: PropTypes.string.isRequired,
                    }),
                }),
            }).isRequired,
            slug: PropTypes.string,
            name: PropTypes.string.isRequired,
            modifiedTime: PropTypes.string,
            relativePath: PropTypes.string,
            gitRemote: PropTypes.shape({
                href: PropTypes.string,
                full_name: PropTypes.string.isRequired,
            }),

        }).isRequired,
    }),
    pageContext: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }),
    location: PropTypes.object.isRequired,
}

export default JupyterNotebook

export const JupyterNotebookQuery = graphql`
  query($id: String!) {
    file(id: {eq: $id}) {
     childJupyterNotebook {
       fileAbsolutePath
       id
       html
       internal {
        content
      }
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
       full_name
     }
     ext
     relativePath
   }
 }`
