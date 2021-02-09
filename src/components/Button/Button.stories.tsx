import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import Button, { PropTypes } from './index'

export default {
  title: 'Button',
  component: Button,
} as Meta

const Template: Story<PropTypes> = (args) => <Button {...args}>Button</Button>

export const Default = Template.bind({})
Default.args = {}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
}
