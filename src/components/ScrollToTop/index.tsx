import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

type PropTypes = RouteComponentProps

class ScrollToTop extends Component<PropTypes> {
  componentDidUpdate(prevProps: PropTypes) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return <></>
  }
}

export default withRouter(ScrollToTop)
