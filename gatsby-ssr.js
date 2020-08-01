exports.onPreRenderHTML = ({ getHeadComponents }) => {
  const headComponents = getHeadComponents()
  console.log(headComponents)
}
