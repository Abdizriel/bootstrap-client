import styled from 'styled-components'

export interface PropTypes {
  size?: 'small' | 'default' | 'large'
}

const Button = styled.button<PropTypes>`
  border-radius: 8px;
`

Button.displayName = 'Button'

Button.defaultProps = {
  size: 'default',
}

export default Button
