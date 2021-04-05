import { useEffect } from 'react'

export const useClickOutside = (boxRef, menuRef, handler, events) => {
  if (!events) {
    events = [`mousedown`, `touchstart`]
  }
  const detectClickOutside = event => !menuRef.current.contains(event.target) && handler()

  useEffect(() => {
    for (const event of events) {
      if (menuRef.current.contains(event.target)) {
        menuRef.current.classList.add()
      }
      addEventListener(event, detectClickOutside)
    }
    return () => {
      for (const event of events) {
        removeEventListener(event, detectClickOutside)
      }
    }
  })
}
