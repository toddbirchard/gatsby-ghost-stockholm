import { useEffect } from 'react'

export const useClickOutside = (boxRef, menuRef, handler, events) => {
  if (!events) {
    events = [`mousedown`, `touchstart`]
  }
  const detectClickOutside = event => !menuRef.current.contains(event.target) && handler()

  useEffect(() => {
    for (const event of events) {
      if (event.target !== event){}
      // window.addEventListener(event, detectClickOutside)
    }
    return () => {
      for (const event of events) {
        // window.removeEventListener(event, detectClickOutside)
      }
    }
  })
}
