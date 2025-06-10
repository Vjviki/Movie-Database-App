import {createContext} from 'react'

const MovieDataBaseContext = createContext({
  searchResponse: {},
  onTriggerSearchingQuery: () => {},
})

export default MovieDataBaseContext
