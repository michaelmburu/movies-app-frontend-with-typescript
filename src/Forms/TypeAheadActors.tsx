import React, { ReactElement, useState } from 'react'
import { ActorMovieDTO } from '../Components/Actors/actor.model'
import {Typeahead} from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';
const TypeAheadActors = (props: TypeAheadActorProps) => {

    const actors: ActorMovieDTO[] = [
        {
            name: "Issa Rae", id: 1,  character: '', picture: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Issa_Rae_%28cropped%29.jpg'
        },
        {
           name: "Daniel Kaluuya",  id: 2,  character: '', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Daniel_Kaluuya_%2835411578144%29_%28cropped_2%29.jpg/440px-Daniel_Kaluuya_%2835411578144%29_%28cropped_2%29.jpg'
        },
        {
           name: "Tom Cruise",  id: 3,  character: '', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Tom_Cruise_by_Gage_Skidmore_2.jpg/440px-Tom_Cruise_by_Gage_Skidmore_2.jpg'
        }
    ]

    const selected: ActorMovieDTO[] = []

    const [draggedElement, setDraggedElement] = useState<ActorMovieDTO | undefined>(undefined)
    // List drag start
    const handleDragStart = (actor: ActorMovieDTO) => {
        setDraggedElement(actor)
    }   

    //List drag end
    const handleDragOver = (actor: ActorMovieDTO) => {
        if(!draggedElement){
            return
        }

        // If an actor goes over the other actor
        if(actor.id !== draggedElement.id){
            //Get index of the actor beibg dragged
            const draggedElementIndex = props.actors.findIndex(x => x.id === draggedElement.id)

            //Get actor bein dragged over
            const dragedActorOverIndex = props.actors.findIndex(x => x.id === actor.id)

            const actors = [...props.actors]
            //Swap actor dragged over
            actors[dragedActorOverIndex] = draggedElement
            actors[draggedElementIndex] = actor

            // Re Add the actors
            props.onAdd(actors)
        }
    }

  return (
   
    <div className='mb-3'>
        <label>{props.displayName}</label>
        <Typeahead 
            id="typeahead"
            onChange={actors => {

                if(props.actors.findIndex(x => x.id === actors[0].id) === -1){
                    props.onAdd([...props.actors, actors[0]])
                }
               
            }}
            options={actors}
            filterBy={['name']}
            labelKey={actor => actor.name}
            placeholder='Write the name of the actor'
            flip={true}
            selected={selected}
            renderMenuItemChildren={actor => (
                <>
                    <img alt='' src={actor.picture}
                         style={{
                            height: '64px',
                            marginRight: '10px',
                            width: '64px'
                         }}
                    />
                    <span>{actor.name}</span>
                </>
            )}
        />

        <ul className='list-group'>
            {props.actors.map(actor => <li 
            key={actor.id} 
            draggable={true}
            onDragStart={() => handleDragStart(actor)}
            onDragOver={() => handleDragOver(actor)}
            className="list-group-item list-group-item-action"
            >
                    {props.listUI(actor)}
                    <span className='badge badge-primary badge-pill pointer text-dark' style={{marginLeft: '0.5rem'}} onClick={() => props.onRemove(actor)}></span>
            </li>
            )}
        </ul>
    </div>
  )
}

interface TypeAheadActorProps {
    displayName: string
    actors: ActorMovieDTO[]
    onAdd(actors: ActorMovieDTO[]): void
    onRemove(actor: ActorMovieDTO): void
    listUI(actor: ActorMovieDTO): ReactElement
}

export default TypeAheadActors