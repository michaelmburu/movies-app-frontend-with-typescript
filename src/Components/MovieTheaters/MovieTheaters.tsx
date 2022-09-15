
import { urlMovieTheaters } from '../../Endpoints'
import IndexEntity from '../../Utils/IndexEntity'
import {MovieTheaterDTO } from './MovieTheater.model'
const MovieTheaters = () => {
  return (
    <>
        <IndexEntity<MovieTheaterDTO>
            url={urlMovieTheaters}
            createUrl="/movietheaters/create"
            title='Movie Theaters'
            entityName='Movie Theater'
          >
            {(entities, buttons) => <>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {entities?.map(entity => <tr key={entity.id}>
                  <td>
                  {entity.name}
                  </td>
                  <td>
                  {buttons(`/movietheaters/edit/${entity.id}`, entity.id)} 
                  </td>
                </tr>)}
              </tbody>
            </>}
        </IndexEntity>
    </>
  )
}

export default MovieTheaters