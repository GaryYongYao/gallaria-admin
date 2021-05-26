import {
  Delete as DeleteIcon
} from '@material-ui/icons'
import { startCase } from 'lodash'

export const columns = [
  {
    title: 'Code',
    headerStyle: { width: '15%' },
    filtering: true,
    field: 'code',
    render: ({ product }) => startCase(product.code)
  },
  {
    title: 'Name',
    field: 'name',
    headerStyle: { width: '15%' },
    filtering: true,
    render: ({ product }) => startCase(product.name)
  }
]

export const actions = ( setChosen, setIsAlertOpen) => [
  rowData => ({
    icon: () => <DeleteIcon color="error" />,
    tooltip: 'Delete Product',
    onClick: () => {
      setIsAlertOpen(true)
      setChosen(rowData)
    }
  })
]
// graphql
export const queryGetEnquiries = `
  query {
    getEnquiries {
      _id
      read
    }
  }
`

export const queryGetLeads = `
  query {
    getLeads {
      _id
      read
    }
  }
`

export const queryGetFeatured = `
  query {
    getFeaturedAdmin {
      _id
      product {
        code
        name
      }
    }
  }
`