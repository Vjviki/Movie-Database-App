import {Link, withRouter, useLocation} from 'react-router-dom'
import {useState} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose} from 'react-icons/io'

import MovieDataBaseContext from '../../context/MovieDataBaseContext'

import './index.css'

const NavBar = props => {
  const location = useLocation()
  const [toggleMenu, setToggleMenu] = useState(false)
  const onClickMenu = () => {
    setToggleMenu(preState => !preState)
  }

  const renderSearchBar = () => (
    <MovieDataBaseContext.Consumer>
      {value => {
        const {
          onTriggerSearchingQuery,
          onChangeSearchInput,
          searchInput,
        } = value

        const onChangeHandler = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = () => {
          const {history} = props
          onTriggerSearchingQuery()
          history.push(`/search`)
        }

        return (
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="me-2 search-input"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="Search"
            />
            <button
              className="btn btn-outline-info"
              type="button"
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
        )
      }}
    </MovieDataBaseContext.Consumer>
  )

  return (
    <>
      <nav className="navbar-container d-flex align-items-center p-3">
        <div className="logo-container">
          <h1 className="page-logo">MovieDB</h1>
        </div>
        <div className="desktop-navbar-contaier">
          <ul className="order-1 d-flex align-items-center p-0 mb-0 ms-3 nav-items-list">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/' ? 'active-option' : ''
                }`}
                to="/"
              >
                Popular
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/top-rated' ? 'active-option' : ''
                }`}
                to="/top-rated"
              >
                Top Rated
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/upcoming' ? 'active-option' : ''
                }`}
                to="/upcoming"
              >
                Upcoming
              </Link>
            </li>
          </ul>
          {renderSearchBar()}
        </div>
        <div className="mobile-navbar-contaier">
          <button type="button" className="menu-button" onClick={onClickMenu}>
            {toggleMenu ? (
              <IoMdClose size={20} color="#ffffff" />
            ) : (
              <GiHamburgerMenu size={20} color="#ffffff" />
            )}
          </button>
        </div>
      </nav>
      {toggleMenu && (
        <div className="menu-contaier">
          <ul className="menu-list-item-contaier">
            <li className="list-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/' ? 'active-option' : ''
                }`}
                to="/"
              >
                Popular
              </Link>
            </li>
            <li className="list-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/top-rated' ? 'active-option' : ''
                }`}
                to="/top-rated"
              >
                Top Rated
              </Link>
            </li>
            <li className="list-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/upcoming' ? 'active-option' : ''
                }`}
                to="/upcoming"
              >
                Upcoming
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default withRouter(NavBar)
