import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import DisplayErrors from './DisplayErrors';

export default function EditEntity<TCreation, TRead>(props: EditEntityProps<TCreation, TRead>) {

  const {id}: any = useParams()
  const [entity, setEntity] = useState<TCreation>();
  const [errors, setErrors] = useState<string[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${props.url}/${id}`)
          .then((response: AxiosResponse<TRead>) => {
            setEntity(props.transform(response.data))
          })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const edit = async (entityToEdit: TCreation) => {
    try{
      await axios.put(`${props.url}/${id}`, entityToEdit)
      navigate(props.indexUrl)
    } catch(error: any){
      if(error && error.response)
      {
        setErrors(error.response.data)
      }
      
    }
  }
  return (
    <div>
         <h3>Edit {props.entityName}</h3>
          <DisplayErrors errors={errors} />
          {entity &&  props.children(entity, edit)}
    </div>
  )
}

interface EditEntityProps<TCreation, TRead> {
  url: string
  entityName: string
  indexUrl: string
  children(entity: TCreation, edit:  (entity: TCreation) => void): ReactElement
  transform(entity: TRead): TCreation
}

EditEntity.defaultProps = {
  transform: (entity: any) => entity
}
