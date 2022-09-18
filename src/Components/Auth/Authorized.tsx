import React, { useContext, useEffect, useState } from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import AuthenticationContext from './AuthenticationContext'

const Authorized = (props: AuthorizedProps) => {

  const [isAuthorized, setIsAuthorized] = useState(true)
  const {claims} = useContext(AuthenticationContext)

  useEffect(() => {
    if(props.role){
      const index = claims.findIndex(claim => claim.name === 'role' && claim.value === props.role)
      // User is authorized if they have a role
      setIsAuthorized(index > -1)
    } else {
      // User is authenticated but not athorized
      setIsAuthorized(claims.length > 0)
    }
  }, [claims, props.role])

  return (
    <>
        {isAuthorized ? props.authorized : props.notAuthorized }
    </>
  )
}

interface AuthorizedProps {
    authorized: ReactElement
    notAuthorized?: ReactElement
    role?: string
}

export default Authorized