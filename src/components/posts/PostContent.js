import React from "react"
import PropTypes from 'prop-types'
// import Prism from "prismjs"

const PostContent = ({ html }) => {
  const prefixedCodeHtml = html.replaceAll(`language--`, `prism--`)
  /* useEffect(() => {
    Prism.plugins.customClass.prefix(`prism--`)
    Prism.highlightAll()
  })*/

  return (
    <>
      <main
        className="post-content content-body load-external-scripts"
        dangerouslySetInnerHTML={{ __html: prefixedCodeHtml }}
      />
    </>
  )
}

PostContent.propTypes = {
  html: PropTypes.string.isRequired,
}

export default PostContent
