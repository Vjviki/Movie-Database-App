import Loader from 'react-loader-spinner'
import MobileViewSearchBar from '../MobileViewSearchBar'
import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'

import MovieDataBaseContext from '../../context/MovieDataBaseContext'

import './index.css'

const SearchQuery = () => {
  const renderEmptyView = () => (
    <div className="empty-view-container">
      <img
        src="https://res.cloudinary.com/df73pocxs/image/upload/e_background_removal/f_png/v1750432691/ChatGPT_Image_Jun_20_2025_08_44_34_PM_xhy4wa.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="text-center">No Results Found</h1>
      <p className="text-center">
        We couldn’t locate the movie you’re looking for. Please double-check the
        spelling or try a different title.
      </p>
    </div>
  )

  const renderMoviesList = searchResponse => {
    const {results} = searchResponse

    if (!results.length) {
      return renderEmptyView()
    }
    return (
      <ul className="row p-0 ms-0 me-0 mt-3">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  const renderSearchResultViews = value => {
    const {searchResponse, apiStatus} = value

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderMoviesList(searchResponse)
      default:
        return renderEmptyView()
    }
  }

  return (
    <MovieDataBaseContext.Consumer>
      {value => {
        const {searchResponse, onTriggerSearchingQuery} = value

        return (
          <>
            <NavBar />
            <MobileViewSearchBar />
            <div className="route-page-body">
              {renderSearchResultViews(value)}
            </div>
            <Pagination
              totalPages={searchResponse.totalPages}
              apiCallback={onTriggerSearchingQuery}
            />
          </>
        )
      }}
    </MovieDataBaseContext.Consumer>
  )
}

export default SearchQuery
