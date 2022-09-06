import React from 'react'

const Button = (props: ButtonProps) => {
  return (
    <button className="btn btn-primary" onClick={props.onClick}>{props.children}</button>
  )
}

interface ButtonProps {
    children: React.ReactNode
    onClick?(): void
}
export default Button