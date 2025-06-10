import {Component} from 'react'
import MovieCast from '../MovieCast'
import './index.css'

class MovieDetail extends Component {
  state = {
    movieDetail: [],
    cast: [],
  }

  componentDidMount() {
    this.getMovieDetail()
    this.getMovieCast()
  }

  getFormattedMovieData = data => ({
    id: data.id,
    title: data.title,
    originalTitle: data.original_title,
    tagline: data.tagline,
    overview: data.overview,
    releaseDate: data.release_date,
    runtime: data.runtime,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
    budget: data.budget,
    revenue: data.revenue,
    homepage: data.homepage,
    imdbId: data.imdb_id,
    posterUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    backdropUrl: data.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${data.backdrop_path}`
      : null,
    genres: data.genres.map(genre => genre.name),
    productionCompanies: data.production_companies.map(company => company.name),
    language: data.spoken_languages[0]?.english_name || '',
    country: data.production_countries[0]?.name || '',
    collection: data.belongs_to_collection?.name || null,
  })

  getMovieDetail = async () => {
    const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`

    const response = await fetch(apiUrl)
    const data = await response.json()
    const movieDataFormat = this.getFormattedMovieData(data)

    this.setState({movieDetail: movieDataFormat})
  }

  getFormattedCastData = data =>
    data.cast.map(actor => ({
      id: actor.id,
      name: actor.name,
      character: actor.character,
      profileUrl: actor.profile_path
        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
        : null,
    }))

  getMovieCast = async () => {
    const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`

    const response = await fetch(apiUrl)
    const data = await response.json()
    const movieCastFormat = this.getFormattedCastData(data)

    this.setState({cast: movieCastFormat})
  }

  render() {
    const {movieDetail, cast} = this.state
    console.log(cast)

    if (!movieDetail || !movieDetail.title) {
      return <div className="text-center mt-5">Loading movie details...</div>
    }

    return (
      <div className="container my-4">
        <div className="row">
          {/* Movie Poster */}
          <div className="col-md-4 text-center">
            <img
              src={movieDetail.posterUrl}
              alt={movieDetail.title}
              className="img-fluid rounded shadow"
            />
          </div>
          {/* Movie Info */}
          <div className="col-md-8">
            <h1>{movieDetail.originalTitle}</h1>
            <h5 className="text-muted fst-italic">{movieDetail.tagline}</h5>
            <p className="mt-3">{movieDetail.overview}</p>
            {/* Genres */}
            <div className="mb-2">
              {movieDetail.genres?.map(genre => (
                <span key={genre} className="badge bg-primary me-2">
                  {genre}
                </span>
              ))}
            </div>
            {/* Info */}
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Runtime: {movieDetail.runtime} mins
              </li>
              <li className="list-group-item">
                Release Date: {movieDetail.releaseDate}
              </li>
              <li className="list-group-item">
                Language: {movieDetail.language}
              </li>
              <li className="list-group-item">
                Rating: ⭐ {movieDetail.voteAverage} ({movieDetail.voteCount}
                votes)
              </li>
              <li className="list-group-item">
                Budget: ${movieDetail.budget.toLocaleString()}
              </li>
              <li className="list-group-item">
                Revenue: ${movieDetail.revenue.toLocaleString()}
              </li>
            </ul>
            {/* Production Companies */}
            <h6 className="mt-4">Production Companies:</h6>
            <ul>
              {movieDetail.productionCompanies?.map(company => (
                <li key={company}>{company}</li>
              ))}
            </ul>
            {/* Links */}
            <div className="mt-3">
              <a
                href={movieDetail.homepage}
                className="btn btn-outline-primary me-2"
                target="_blank"
                rel="noreferrer"
              >
                Official Website
              </a>
              <a
                href={`https://www.imdb.com/title/${movieDetail.imdbId}`}
                className="btn btn-outline-secondary"
                target="_blank"
                rel="noreferrer"
              >
                View on IMDb
              </a>
            </div>
          </div>
        </div>
        <MovieCast castList={cast} />
      </div>
    )
  }
}

export default MovieDetail
