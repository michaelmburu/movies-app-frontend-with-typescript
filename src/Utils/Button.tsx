import React from 'react'

const Button = (props: ButtonProps) => {
  return (
    <button className="btn btn-primary">{props.children}</button>
  )
}

interface ButtonProps {
    children: React.ReactNode
}
export default Button