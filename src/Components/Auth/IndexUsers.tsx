import axios from 'axios'
import React from 'react'
import { urlAccounts } from '../../Endpoints'
import Button from '../../Utils/Button'
import IndexEntity from '../../Utils/IndexEntity'
import { UserDTO } from './Auth.Model'

const IndexUsers = () => {
  const makeAdmin = async (id: string) => {
    const response = window.confirm('Do you want to make the user admin?')
    if (response) {
      await doAdmin(`${urlAccounts}/makeAdmin`, id)
    }
  }

  const removeAdmin = async (id: string) => {
    await doAdmin(`${urlAccounts}/removeAdmin`, id)
  }

  const doAdmin = async (url: string, id: string) => {
    await axios.post(url, JSON.stringify(id), {
      headers: { 'Content-Type': 'application/json' },
    })

    alert('Operation finished successfuly')
  }

  return (
    <IndexEntity<UserDTO> title='users' url={`${urlAccounts}/listUsers`}>
      {(users) => (
        <>
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>
                  <Button onClick={() => makeAdmin(user.id)}>Make Admin</Button>
                  <Button
                    className='btn btn-danger ms-2'
                    onClick={() => removeAdmin(user.id)}
                  >
                    Remove Admin
                  </Button>
                </td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </IndexEntity>
  )
}

export default IndexUsers
