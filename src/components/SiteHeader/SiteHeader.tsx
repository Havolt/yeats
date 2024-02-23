import React from 'react'
import "./SiteHeader.scss"

type Props = {}

function Header({}: Props) {
  return (
    <header className="site-header">
      <h1>Yeats Art Class</h1>
      <span>One step every day</span>
    </header>
  )
}

export default Header