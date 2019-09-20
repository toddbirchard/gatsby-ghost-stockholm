import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { MetaData } from '../components/common/meta'
import { Layout } from '../components/common'

import '../styles/posts/index.less'
import '../styles/pages/jupyter.less'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/

const JupyterNotebook = ({ data, pageContext }) => {
    const notebook = data.jupyterNotebook
    const languageName = notebook.json.metadata.language_info.name
    const languageVersion = notebook.json.metadata.language_info.version

    return (
            <>
                <MetaData
                    data={data}
                    type="article"
                />
                <Layout template="jupyter-template">
                    <div className="jupyter-container">
                        <h1>{pageContext.title}</h1>
                        <div className="jupyter-meta">
                            <span>{languageName}</span>
                            <span>{languageVersion}</span>
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
        jupyterNotebook: PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string,
            title: PropTypes.string,
            html: PropTypes.string,
            fileAbsolutePath: PropTypes.string.isRequired,
            json: PropTypes.shape({
                metadata: PropTypes.shape({
                    language_info: PropTypes.shape({
                        name: PropTypes.string.isRequired,
                        version: PropTypes.string.isRequired,
                    }),
                }),
            }),
        }).isRequired,
    }).isRequired,
    pageContext: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }),
}

export default JupyterNotebook

export const JupyterNotebookQuery = graphql`
  query($id: String!) {
     jupyterNotebook(id: {eq: $id}) {
       id
       fileAbsolutePath
       html
       json {
         metadata {
           language_info {
             name
             version
           }
         }
       }
      }
    }
  `
