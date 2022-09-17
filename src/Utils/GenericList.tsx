import React, { ReactElement } from 'react'
import Loading from './Loading'

// Generic list that can pass a list, loading UI and children movies to be rendered
const GenericList = (props: GenericListProps) => {

    //If there is not list passed, check if custom loading ui is passed
  if(!props.list){
    if(props.loadingUI) {
        return props.loadingUI
    }
    // Show default UI if generic is not passed
    return   <Loading />
    //If list is not passed, check if there empty list isnpassed
  } else if(props.list.length === 0) {
    if(props.emptyListUI) {
        return props.emptyListUI
    }
    // Show none if both lists are not passed
    return  <>There are no elements to display</>
  } else {
    // Show list passed
    return props.children
  }
}

interface GenericListProps {
    list: any
    loadingUI?: ReactElement
    emptyListUI?: ReactElement
    children: ReactElement
}

export default GenericList