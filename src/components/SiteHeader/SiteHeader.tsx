import "./SiteHeader.scss"

type Props = {}

function Header({}: Props) {
  return (
    <header className="site-header">
      <div className="site-header__content">
        <h1>Yeats Art Class</h1>
        <span>One step every day</span>
      </div>
    </header>
  )
}

export default Header