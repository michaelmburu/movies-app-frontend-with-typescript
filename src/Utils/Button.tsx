import React from 'react'

const Button = (props: ButtonProps) => {
  return (
    <button 
    type={props.type} 
    disabled={props.disabled}
    className={props.className}
    onClick={props.onClick}
    >{props.children}
    </button>
  )
}

interface ButtonProps {
    children: React.ReactNode
    onClick?(): void
    className?: string
    type: 'button' | 'submit'
    disabled: boolean
}

//Default props
Button.defaultProps = {
  type: 'button',
  disabled: false,
  className: "btn btn-primary"
}

export default Button