import React from 'react'

import { useModal } from 'context/ModalContext'

export enum ModalTypeEnum {
  TEST = 'Test',
}

interface ModalLookupTable {
  [key: string]: React.ComponentClass
}

const modalComponentLookupTable: ModalLookupTable = {}

const ModalManager = () => {
  const { modals } = useModal()

  const renderModals = modals.map(
    (modalDescription, index): React.ReactNode => {
      const { type, props } = modalDescription
      const ModalComponent = modalComponentLookupTable[type]
      return <ModalComponent {...props} key={type + index} />
    },
  )

  return <span>{renderModals}</span>
}

export default ModalManager
