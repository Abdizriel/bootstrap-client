import * as React from 'react'
import { shallow } from 'enzyme'

import Button from '.'

describe('Button', () => {
  it('should render the Button Component correctly', () => {
    const element = shallow(<Button onClick={() => null}>Test</Button>)

    expect(element).toMatchSnapshot()
  })

  it('should render a text', () => {
    const element = shallow(<Button onClick={() => null}>Test</Button>)

    expect(element.text()).toEqual('Test')
  })

  it('should handle a click', () => {
    const onClick = jest.fn()
    const element = shallow(<Button onClick={onClick}>Test</Button>)
    element.simulate('click')

    expect(onClick).toBeCalled()
    expect(element.text()).toEqual('Test')
  })
})
