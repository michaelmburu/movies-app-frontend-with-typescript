import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { urlGenres } from '../../Endpoints'
import Button from '../../Utils/Button'
import GenericList from '../../Utils/GenericList'
import Pagination from '../../Utils/Pagination'
import RecordsPerPageSelect from '../../Utils/RecordsPerPageSelect'
import { GenreDTO } from './genres.model'
const Genres = () => {

  const [genres, setGenres] = useState<GenreDTO[]>()
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadGenres()
  }, [])

  const loadGenres = () => {
    axios.get(urlGenres, {
      params:{page, recordsPerPage}
     })
    .then((response: AxiosResponse<GenreDTO[]>) => {
      const totalAmountOfRecords = parseInt(response.headers['totalamountofrecords'], 10)
      setTotalAmountOfPages(Math.ceil(totalAmountOfRecords /recordsPerPage))
      setGenres(response.data)
    })
  }
  const deleteGenre = async (id: number) => {
    try {
      let del = window.confirm("Are you sure you want to delete the genre?")
      if(del){
        await axios.delete(`${urlGenres}/${id}`)
        loadGenres();
      }
      return
    }catch(error:any){
      console.error(error.response.data)
    }
  }
  return (
    <>
       <h3>Genres</h3>
       <Link className="btn btn-success" to="/genres/create">Create Genre</Link>

      {/* <RecordsPerPageSelect onChange={amountOfRecords => {
        setPage(1)
        setRecordsPerPage(amountOfRecords)
      }} />
       <Pagination currentPage={page} totalAmountOfPages={totalAmountOfPages} onChange={newPage => setPage(newPage)} /> */}
       <GenericList list={genres}>
          <table className='table table-borderless'>
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
                <td><Link className='btn btn-primary' 
                  to={`/genres/edit/${genre.id}`}>Edit</Link>
                  <Button className='btn btn-danger' onClick={() => deleteGenre(genre.id)}>Delete</Button>
                </td>
              </tr>
              )}
            </tbody>
          </table>
       </GenericList>
    </>
  )
}

export default Genres