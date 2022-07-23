import React from 'react'
import styled from '@emotion/styled'

const ButtonBase = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 32px;
  padding: 0 10px;

  border: 1px solid #dde1e8;
  border-radius: 3px;
  text-align: left;
  box-shadow: 0 0 1px rgba(67, 90, 111, 0.03),
    0 2px 2px -2px rgba(67, 90, 111, 0.2);

  background: white;
  color: #575a5e;
  font-size: 12px;
`

type Props = React.ComponentProps<typeof ButtonBase>

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ type = 'button', ...props }, ref) => (
    <ButtonBase {...props} ref={ref} type={type} />
  )
)

export default Button
