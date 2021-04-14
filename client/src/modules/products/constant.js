import React from 'react'
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import { startCase } from 'lodash'

export const columns = [
  {
    title: 'Name',
    field: 'name',
    filtering: false,
    render: ({ name }) => startCase(name)
  },
  {
    title: 'Contact',
    headerStyle: { width: '5%' },
    filtering: false,
    render: ({ contact }) => contact
  },
  {
    title: 'Address',
    filtering: false,
    render: ({ address }) => address
  },
]

export const actions = (setChosen, setIsOpen, setIsAlertOpen) => [
  {
    icon: () => <EditIcon color="primary" />,
    tooltip: 'Edit Supplier',
    onClick: (e, data) => {
      setChosen(data)
      setIsOpen(true)
    }
  },
  rowData => ({
    icon: () => <DeleteIcon color="error" />,
    tooltip: 'Delete Supplier',
    onClick: () => {
      setIsAlertOpen(true)
      setChosen(rowData)
    }
  })
]
