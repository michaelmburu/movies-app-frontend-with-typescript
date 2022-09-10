import { urlGenres } from '../../Endpoints'
import EditEntity from '../../Utils/EditEntity'
import GenreForm from './GenreForm'
import { GenreCreationDTO, GenreDTO } from './genres.model'
const EditGenre = () => {
  
  return (
    <>
       <EditEntity<GenreCreationDTO, GenreDTO>
          Url={urlGenres} entityName="Genres" indexUrl='/genres'
        >
        {(entity, edit) => 
          <GenreForm model={entity} onSubmit = { async value =>{
            await edit(value)

        }}
     /> 
        }
       </EditEntity>
    </>
  )
}

export default EditGenre