import React from 'react'
import {Link} from 'react-router-dom'
import { urlActors } from '../../Endpoints'
import IndexEntity from '../../Utils/IndexEntity'
import { ActorDTO } from './actor.model'
const Actors = () => {
  return (
    <>
        <IndexEntity<ActorDTO>
          url = {urlActors}
          createUrl = 'actors/create' 
          title="Actors"
          entityName='Actor'
          >
            {(actors, buttons) => <>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {actors?.map(actor => <tr key={actor.id}>
                    <td>
                      {buttons(`actors/edit/${actor.id}`, actor.id)}
                    </td>
                    <td>
                      {actor.name}
                    </td>
                  </tr>
                )}
              </tbody>
            </>}
        </IndexEntity>
    </>
  )
}

export default Actors