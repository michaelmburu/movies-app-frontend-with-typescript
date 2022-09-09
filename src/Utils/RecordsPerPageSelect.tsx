import React from 'react'

const RecordsPerPageSelect = (props: RecordsPerPage) => {
  return (
    <div className='mb-3' style={{width: '30%'}}>
        <label>Records Per Page</label>
        <select className='form-control' defaultValue={5} onChange={e => {
        props.onChange(parseInt(e.currentTarget.value, 10))}}
        >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
        </select>
    </div>
  )
}

interface RecordsPerPage {
    onChange(recordsPerPage: number): void
}

export default RecordsPerPageSelect