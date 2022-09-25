import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { urlAccounts } from '../../Endpoints'
import DisplayErrors from '../../Utils/DisplayErrors'
import { AuthenticationResponseDTO, UserCredentialsDTO } from './Auth.Model'
import AuthenticationContext from './AuthenticationContext'
import AuthForm from './AuthForm'
import { getClaims, saveToken } from './handleJWT'

const Register = () => {
  const [errors, setErrors] = useState<any>([])

  const { update } = useContext(AuthenticationContext)

  const navigate = useNavigate()

  const register = async (credentials: UserCredentialsDTO) => {
    try {
      const response = await axios.post<AuthenticationResponseDTO>(
        `${urlAccounts}/create`,
        credentials
      )
      saveToken(response.data)
      update(getClaims())
      navigate('/')
    } catch (error: any) {
      setErrors(error.response.data)
      console.log(errors)
    }
  }

  return (
    <>
      <h3>Register</h3>
      <DisplayErrors errors={errors} />
      <AuthForm
        model={{ email: '', password: '' }}
        onSubmit={async (values) => await register(values)}
      />
    </>
  )
}

export default Register
