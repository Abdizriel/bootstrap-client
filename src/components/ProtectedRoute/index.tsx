import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// import Layout from 'components/Layout';

const ProtectedRoute = ({ render: C, props: childProps, ...rest }) => (
  <Route
    {...rest}
    render={(rProps) =>
      childProps.isLoggedIn ? (
        // <Layout>
        <C {...rProps} {...childProps} />
      ) : (
        // </Layout>
        <Redirect
          to={`/sign-in?redirect=${rProps.location.pathname}${rProps.location.search}`}
        />
      )
    }
  />
)

export default ProtectedRoute
