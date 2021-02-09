import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import ModalManager from 'components/Modals'
import ScrollToTop from 'components/ScrollToTop'

import Routes from './Routes'

export default () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleUserSignIn = () => {
    setIsLoggedIn(true)
  }

  const childProps = {
    isLoggedIn,
    onUserSignIn: handleUserSignIn,
  }

  return (
    <Router>
      <Routes childProps={childProps} />
      <ModalManager />
      <ScrollToTop />
    </Router>
  )
}
