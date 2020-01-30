import React, { useEffect } from 'react'
import config from '../../utils/siteConfig'

// Helper to add scripts to our page
const insertScript = (src, id, parentElement) => {
    const script = window.document.createElement(`script`)
    script.async = true
    script.src = src
    script.id = id
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

// The actual component
const Commento = ({ id }) => {
    useEffect(() => {
        // If there's no window there's nothing to do for us
        if (!window) {
            return
        }
        const document = window.document
        // In case our #commento container exists we can add our commento script
        if (document.getElementById(`commento`)) {
            insertScript(config.siteUrl + `/js/commento.js`, `commento-script`, document.body)
        }
        // Cleanup; remove the script from the page
        return () => removeScript(`commento-script`, document.body)
    }, [id])
    return <div id={`commento`} data-css-override={`${config.siteUrl}/css/commento.css`} data-no-fonts={true} />
}

export default Commento