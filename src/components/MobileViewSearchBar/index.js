import {FaSearch} from 'react-icons/fa'
import {withRouter} from 'react-router-dom'
import MovieDataBaseContext from '../../context/MovieDataBaseContext'
import './index.css'

const MobileViewSearchBar = props => (
  <MovieDataBaseContext.Consumer>
    {value => {
      const {onTriggerSearchingQuery, onChangeSearchInput, searchInput} = value

      const onChangeHandler = event => onChangeSearchInput(event.target.value)

      const onSearchHandler = event => {
        event.preventDefault()
        const {history} = props
        onTriggerSearchingQuery()
        history.push(`/search`)
      }

      return (
        <div className="mobile-view-search-bar-container">
          <input
            type="text"
            className="me-2 mobile-view-search-input"
            onChange={onChangeHandler}
            value={searchInput}
            placeholder="Search"
          />
          <button
            className="mobile-view-button"
            type="button"
            onClick={onSearchHandler}
          >
            <FaSearch size={22} color="#032541" />
          </button>
        </div>
      )
    }}
  </MovieDataBaseContext.Consumer>
)

export default withRouter(MobileViewSearchBar)
