import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import * as fs from 'fs'
import * as nb from "notebookjs"


import { Layout } from '../components/common'

import '../styles/posts/index.less'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/

const JupyterNotebook = ({ data }) => {
    const notebook = data.githubFile
    const ipynb = JSON.parse(fs.readFileSync(`${notebook.fileAbsolutePath}`))
    const parsedotebook = nb.parse(ipynb)
    console.log(parsedotebook.render().outerHTML)

    return (
            <>
                <Helmet>
                    <style type="text/css"></style>
                </Helmet>
                <Layout template="post-template">
                    <h1>{notebook.base}</h1>
                    <p>{parsedotebook}</p>
                </Layout>
            </>
    )
}

JupyterNotebook.propTypes = {
    data: PropTypes.shape({
        jupyterNotebook: PropTypes.shape({
            url: PropTypes.string,
            fileAbsolutePath: PropTypes.string.isRequired,
            base: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}

export default JupyterNotebook

export const JupyterNotebookQuery = graphql`
  query($id: String!) {
     jupyterNotebook(id: {eq: $id}) {
      id
      metadata {
        language_info {
          file_extension
          name
          nbconvert_exporter
          pygments_lexer
          version
        }
      }
      fileAbsolutePath
      html
      }
    }
  `
