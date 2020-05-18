import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout } from '../components/common'
//import NotebookPreview from "@nteract/notebook-preview"
// import * as ipynb from 'ipynb2html'
// import { Document } from 'nodom'

import '../styles/ipynb.less'

/**
* Single notebook view (/jupyter/:slug)
*
* This file renders a single notebook and loads all the content.
*
*/

const JupyterNotebook = ({ data, pageContext }) => {
  const file = data.file
  const notebook = file.childJupyterNotebook
  const languageName = notebook.metadata
    ? notebook.metadata.language_info.name
    : null
  const languageVersion = notebook.metadata
    ? notebook.metadata.language_info.version
    : null
  const githubLink = file.gitRemote.href + file.relativePath
  const githubRepoName = file.gitRemote.full_name
  // const renderNotebook = ipynb.createRenderer(new Document())

  return (
    <>
      <Layout template="jupyter-template">
        <div className="jupyter-container">
          <h1>{pageContext.title}</h1>
          <div className="jupyter-meta">
            <div className="meta-item jupyter-language">{languageName}
              {languageVersion}</div>
            <div className="meta-item jupyter-origin-url">
              <a href={githubLink}>{githubRepoName}</a>
            </div>
            <div className="meta-item jupyter-date">{file.modifiedTime}</div>
          </div>
          <main className="post-content content-body load-external-scripts" dangerouslySetInnerHTML={{
            __html: notebook.html,
          }} />
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
        json: PropTypes.object,
        internal: PropTypes.shape({ content: PropTypes.string.isRequired }),
        metadata: PropTypes.shape({
          language_info: PropTypes.shape({ name: PropTypes.string.isRequired, version: PropTypes.string.isRequired }),
        }),
      }).isRequired,
      slug: PropTypes.string,
      name: PropTypes.string.isRequired,
      modifiedTime: PropTypes.string,
      relativePath: PropTypes.string,
      gitRemote: PropTypes.shape({ href: PropTypes.string, full_name: PropTypes.string.isRequired }),
    }).isRequired,
  }),
  pageContext: PropTypes.shape({ title: PropTypes.string.isRequired }),
  location: PropTypes.object.isRequired,
}

export default JupyterNotebook

export const JupyterNotebookQuery = graphql `
  query($id: String!) {
    file(id: {eq: $id}) {
     childJupyterNotebook {
       id
        html
        internal {
          content
          contentDigest
          description
          fieldOwners
          ignoreType
          mediaType
          owner
          type
        }
        metadata {
          kernelspec {
            name
            language
            display_name
          }
          language_info {
            file_extension
            mimetype
            name
            nbconvert_exporter
            pygments_lexer
            version
          }
        }
        json {
          nbformat
          nbformat_minor
          metadata {
            kernelspec {
              display_name
              language
              name
            }
            language_info {
              codemirror_mode {
                name
                version
              }
              file_extension
              mimetype
              name
              nbconvert_exporter
              pygments_lexer
              version
            }
          }
          cells {
            cell_type
            outputs {
              ename
              execution_count
              name
              text
              traceback
              output_type
              evalue
              data {
                image_png
                text_html
                text_plain
                application_vnd_vegalite_v2_json {
                  _schema
                  width
                  encoding {
                    y {
                      field
                      type
                    }
                    x {
                      field
                      type
                    }
                    color {
                      field
                      type
                    }
                  }
                  mark
                  data {
                    name
                    values {
                      max_depth
                      min_samples_leaf
                      min_weight_fraction_leaf
                      value
                      variable
                    }
                  }
                  config {
                    view {
                      height
                      width
                    }
                  }
                }
              }
            }
            execution_count
            source
          }
        }
        fileAbsolutePath
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
