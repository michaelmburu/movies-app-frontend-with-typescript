import React, { ReactElement, useState } from 'react'
import { ActorMovieDTO } from '../Components/Actors/actor.model'
import {AsyncTypeahead} from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import axios, { AxiosResponse } from 'axios';
import { urlActors } from '../Endpoints';
const AsyncTypeAheadActors = (props: TypeAheadActorProps) => {

    const [actors, setActors] = useState<ActorMovieDTO[]>([])

    const [isLoading, setIsLoading] = useState(false)

    const selected: ActorMovieDTO[] = []

    const [draggedElement, setDraggedElement] = useState<ActorMovieDTO | undefined>(undefined)

    const handleSearch = (query: string) => {
        setIsLoading(true)
        axios.get(`${urlActors}/searchByName/${query}`)
        .then((response: AxiosResponse<ActorMovieDTO[]>) => {
            setActors(response.data)
            setIsLoading(false)
        })
    }

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
        <AsyncTypeahead 
            id="typeahead"
            onChange={actors => {

                if(props.actors.findIndex(x => x.id === actors[0].id) === -1){
                    actors[0].character = ''
                    props.onAdd([...props.actors, actors[0]])
                }
               
            }}
            options={actors}
            filterBy={() => true}
            isLoading={isLoading}
            onSearch={handleSearch}
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

export default AsyncTypeAheadActors