import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { Link } from 'react-router-dom';
import Button from './Button';
import GenericList from './GenericList';
import Pagination from './Pagination';
import RecordsPerPageSelect from './RecordsPerPageSelect';

function IndexEntity<T>(props: IndexEntityProps<T>) {

  const [entities, setEntities] = useState<T[]>()
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    axios.get(props.url, {
      params:{page, recordsPerPage}
     })
    .then((response: AxiosResponse<T[]>) => {
      const totalAmountOfRecords = parseInt(response.headers['totalamountofrecords'], 10)
      let total = Math.ceil(totalAmountOfRecords / recordsPerPage)
      setTotalAmountOfPages(total)
      setEntities(response.data)
    })
  }
  const deleteEntity = async (id: number) => {
    try {
      let del = window.confirm("Are you sure you want to delete?")
      if(del){
        await axios.delete(`${props.url}/${id}`)
        loadData();
      }
      return
    }catch(error:any){
      console.error(error.response.data)
    }
  }

  const buttons = (editUrl: string, id: number) => {
    return (
      <>
        <Link className='btn btn-primary' to={editUrl}>Edit</Link>
        <Button className='btn btn-danger' onClick={() => deleteEntity(id)}>
          Delete
        </Button>
    </>
    )
  }

  return (
    <div>
      <h3>{props.title}</h3>
       <Link className="btn btn-success" to={props.createUrl}>Create {props.entityName}</Link>

      <RecordsPerPageSelect onChange={amountOfRecords => {
        setPage(1)
        setRecordsPerPage(amountOfRecords);
      }} />
       <Pagination currentPage={page} totalAmountOfPages={totalAmountOfPages} onChange={(newPage) => {
        console.log('Changed', newPage)
        setPage(newPage)
        }} />

        <GenericList list={entities}>
          <table className='table table-borderless'>
            {props.children(entities!, buttons)}
          </table>
       </GenericList>
    </div>
  )
}

interface IndexEntityProps<T> {
  url: string
  title: string
  createUrl: string
  entityName: string
  children(entities: T[], buttons: (editUrl: string, id: number) => ReactElement): ReactElement
}

export default IndexEntity