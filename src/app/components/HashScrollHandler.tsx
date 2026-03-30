'use client'

import {useEffect} from 'react'

function scrollToCurrentHash() {
  const hash = window.location.hash.replace('#', '')

  if (!hash) {
    return
  }

  const element = document.getElementById(hash)

  if (!element) {
    return
  }

  window.setTimeout(() => {
    element.scrollIntoView({behavior: 'smooth', block: 'start'})
  }, 80)
}

export function HashScrollHandler() {
  useEffect(() => {
    scrollToCurrentHash()
    window.addEventListener('hashchange', scrollToCurrentHash)

    return () => {
      window.removeEventListener('hashchange', scrollToCurrentHash)
    }
  }, [])

  return null
}
