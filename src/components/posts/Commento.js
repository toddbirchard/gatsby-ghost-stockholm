import React, { useEffect } from 'react'

const insertScript = (src, id, parentElement) => {
  const script = window.document.createElement(`script`)
  script.async = true
  script.src = src
  script.id = id
  // script.setAttribute(`data-css-override`, `https://hackersandslackers.com/css/commento.css`)
  script.setAttribute(`data-no-fonts`, true)
  script.setAttribute(`data-auto-init`, true)
  parentElement.appendChild(script)
  return script
}

// Helper to remove scripts from our page
const removeScript = (id, parentElement) => {
  const script = window.document.getElementById(id)
  if (script) {
    parentElement.removeChild(script)
  }
}

const Commento = ({ id }) => {
  useEffect(() => {
    // If there's no window there's nothing to do for us
    if (!window) {
      return
    }
    const document = window.document
    // In case our #commento container exists we can add our commento script
    if (document.getElementById(`commento`)) {
      insertScript(`/js/commento.js`, `commento-script`, document.body)
    }
    // Cleanup; remove the script from the page
    return () => removeScript(`commento-script`, document.body)
  }, [id])
  return <div id={`commento`} />
}
export default Commento
