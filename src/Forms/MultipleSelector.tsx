import React from 'react'
import { MultipleSelectorModel } from './MultipleSelectorModel'
import './MultipleSelector.css'

const MultipleSelector = (props: MultipleSelectorProps) => {

    const select = (item: MultipleSelectorModel) => {
        //Concatnate parameter with selected items with item
        const selected = [...props.selected, item]
        const noneselected = props.noneSelected.filter(value => value !== item)
        props.onChange(selected, noneselected)
    }

    const deselect = (item: MultipleSelectorModel) => {
        //Concatnate parameter with selected items with item
        const noneselected = [...props.noneSelected, item]
        const selected = props.selected.filter(value => value !== item)
        props.onChange(selected, noneselected)
    }

    const selectAll = () => {
        const selected = [...props.selected, ...props.noneSelected]
        const noneselected: MultipleSelectorModel[] = []
        props.onChange(selected, noneselected)
    }

    const deselectAll = () => {
        const noneselected = [...props.noneSelected, ...props.selected]
        const selected: MultipleSelectorModel[] = []
        props.onChange(selected, noneselected)
    }

  return (
        <div className='mb-3'>
            <label>{props.displayName}</label>
            <div className='multiple-selector'>
                <ul>
                    {props.noneSelected.map((item, index) => <li key={item.key} onClick={() => {select(item)}}>{item.value}</li>)}
                </ul>
            <div className='multiple-selector-buttons'>
                <button type='button' onClick={selectAll}>{'>>'}</button>
                <button type='button' onClick={deselectAll}>{'<<'}</button>
            </div>
                <ul>
                    {props.selected.map((item, index) => <li key={item.key} onClick={() => {deselect(item)}}>{item.value}</li>)}
                </ul>
        </div>
    </div>
  )
  
   
}

interface MultipleSelectorProps {
    displayName: string
    selected: MultipleSelectorModel[]
    noneSelected: MultipleSelectorModel[]
    onChange(selected: MultipleSelectorModel[], noneSelected: MultipleSelectorModel[]): void
}

export default MultipleSelector