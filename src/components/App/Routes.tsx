import React, { Suspense, lazy } from 'react'
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom'
import styled from 'styled-components'

import ProppedRoute from 'components/ProppedRoute'
// import ProtectedRoute from 'components/ProtectedRoute'

const Landing = lazy(() => import('scenes/Landing'))

const NotFound = lazy(() => import('scenes/NotFound'))

const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Fallback = <LoadingWrapper>Loading...</LoadingWrapper>

interface Props extends RouteComponentProps {
  childProps: any
}

const View: React.FC<Props> = ({ childProps }) => {
  return (
    <Suspense fallback={Fallback}>
      <Switch>
        <ProppedRoute exact path="/" render={Landing} props={childProps} />
        <Route path="/*" render={() => <NotFound />} />
      </Switch>
    </Suspense>
  )
}

export default withRouter(View)
