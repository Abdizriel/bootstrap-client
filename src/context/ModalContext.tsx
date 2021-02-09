import React, { useMemo, useState, useContext, createContext } from 'react'

import { ModalTypeEnum } from 'components/Modals'

interface Modal {
  type: ModalTypeEnum
  props: any
}

interface ContextInterface {
  modals: Modal[]
  open: (type: ModalTypeEnum, props: any) => void
  close: () => void
}

const ModalContext = createContext<ContextInterface>({
  modals: [],
  open: () => {},
  close: () => {},
})

const ModalConsumer = ModalContext.Consumer

interface ProviderPropTypes {
  children?: React.ReactElement
  value?: ContextInterface
}

const ModalProvider = (props: ProviderPropTypes) => {
  const [modals, setModals] = useState<Modal[]>([])

  const open = (type: ModalTypeEnum, modalProps: any) => {
    const updatedModals = modals.concat({
      type,
      props: modalProps,
    })
    setModals(updatedModals)
  }

  const close = () => {
    const currentModals = modals.slice()
    currentModals.pop()
    setModals(currentModals)
  }

  // useEffect(() => {
  //   console.log('user', user)
  // }, [user])

  console.log('ModalProvider')

  // Make sure to not force a re-render on the components that are reading these values,
  // unless the `User` value has changed. This is an optimisation that is mostly needed in cases
  // where the parent of the current component re-renders and thus the current component is forced
  // to re-render as well. If it does, we want to make sure to give the `UserContext.Provider` the
  // same value as long as the User data is the same. If you have multiple other "controller"
  // components or Providers above this component, then this will be a performance booster.
  const values: ContextInterface = useMemo(() => ({ modals, close, open }), [
    modals,
    close,
    open,
  ])

  return (
    <ModalContext.Provider value={values}>
      {props.children}
    </ModalContext.Provider>
  )
}

const useModal = (): ContextInterface => {
  const context: ContextInterface = useContext(ModalContext)

  if (context === undefined) {
    throw new Error('useModal must be used within an ModalProvider')
  }

  return context
}

export { ModalProvider, ModalConsumer, useModal }
