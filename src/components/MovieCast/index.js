import './index.css'

const MovieCast = props => {
  const {castList} = props

  if (!castList || castList.length === 0) {
    return null
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">Cast</h2>
      <div className="row">
        {castList.map(cast => (
          <div className="col-6 col-md-4 col-lg-3 mb-4" key={cast.id}>
            <div className="card h-100 shadow-sm cast-card">
              <img
                src={`https://image.tmdb.org/t/p/w300${cast.profileUrl}`}
                className="card-img-top"
                alt={cast.name}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{cast.name}</h5>
                <p className="card-text text-muted">as {cast.character}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieCast
