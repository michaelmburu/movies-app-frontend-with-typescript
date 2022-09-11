import { urlGenres } from '../../Endpoints'
import IndexEntity from '../../Utils/IndexEntity'
import { GenreDTO } from './genres.model'
const Genres = () => {

  
  return (
    <>
       <IndexEntity<GenreDTO> 
        url={urlGenres}
        createURL="/genres/create"
        title="Genres"
        entityName='Genre'
       >
        {(genres, buttons) => 
          <>
            <thead>
                  <tr>
                  <th>Name</th>
                    <th></th>            
                  </tr>
              </thead>
              <tbody>
                {genres?.map(genre => 
                <tr key={genre.id}>
                  <td>
                    {genre.name}
                  </td>
                  <td>
                    {buttons(`genres/edit/${genre.id}`, genre.id)}
                  </td>
                </tr>
                )}
              </tbody>
          </>
        }
       
       </IndexEntity>
    </>
  )
}

export default Genres