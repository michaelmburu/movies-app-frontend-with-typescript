import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { urlAccounts } from '../../Endpoints'
import DisplayErrors from '../../Utils/DisplayErrors'
import { AuthenticationResponseDTO, UserCredentialsDTO } from './Auth.Model'
import AuthenticationContext from './AuthenticationContext'
import AuthForm from './AuthForm'
import { getClaims, saveToken } from './handleJWT'

const Login = () => {
  const [errors, setErrors] = useState<string[]>([])

  const { update } = useContext(AuthenticationContext)

  const navigate = useNavigate()

  const login = async (credentials: UserCredentialsDTO) => {
    try {
      const response = await axios.post<AuthenticationResponseDTO>(
        `${urlAccounts}/login`,
        credentials
      )
      console.log(response.data)
      saveToken(response.data)
      update(getClaims())
      navigate('/')
    } catch (error: any) {
      setErrors(error.response.data)
    }
  }

  return (
    <>
      <h3>Login</h3>
      <DisplayErrors errors={errors} />
      <AuthForm
        model={{ email: '', password: '' }}
        onSubmit={async (values) => await login(values)}
      />
    </>
  )
}

export default Login
