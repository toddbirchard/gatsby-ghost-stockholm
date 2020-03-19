import React, { useEffect } from 'react'

const insertScript = (src, id, parentElement) => {
  const script = window.document.createElement(`script`)
  script.defer = true
  script.src = src
  script.id = id
  script.setAttribute(`data-css-override`, `/css/commento.css`)
  script.setAttribute(`data-no-fonts`, `true`)
  script.setAttribute(`data-auto-init`, `true`)
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
    if (!window) {
      return
    }
    const document = window.document
    if (document.getElementById(`commento`)) {
      insertScript(`https://cdn.commento.io/js/commento.js`, `commento-script`, document.body)
    }
    // Remove the script from the page
    return () => removeScript(`commento-script`, document.body)
  }, [id])
  return <div id={`commento`} />
}
export default Commento
