import React, { useMemo, useContext, createContext } from 'react'
import useLocalStorage from 'hooks/useLocalStorage'

interface ContextInterface {
  user: any
  setUser: Function
}

const UserContext = createContext<ContextInterface>({
  user: undefined,
  setUser: () => {},
})

const UserConsumer = UserContext.Consumer

interface ProviderPropTypes {
  children?: React.ReactElement
  value?: ContextInterface
}

// props.user could be set in localStorage or pulled from an API call
const UserProvider = (props: ProviderPropTypes) => {
  // const [user, setUser] = useState(false)
  const [user, setUser] = useLocalStorage('user_account', null)

  // useEffect(() => {
  //   console.log('user', user)
  // }, [user])

  console.log('UserProvider', user ? user.by : undefined)

  // Make sure to not force a re-render on the components that are reading these values,
  // unless the `User` value has changed. This is an optimisation that is mostly needed in cases
  // where the parent of the current component re-renders and thus the current component is forced
  // to re-render as well. If it does, we want to make sure to give the `UserContext.Provider` the
  // same value as long as the User data is the same. If you have multiple other "controller"
  // components or Providers above this component, then this will be a performance booster.
  const values: ContextInterface = useMemo(() => ({ user, setUser }), [
    user,
    setUser,
  ])

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  )
}

// useUser helper wrapper around UserContext.Consumer
const useUser = (): ContextInterface => {
  const context: ContextInterface = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within an UserProvider')
  }

  return context
}

export { UserProvider, UserConsumer, useUser }
