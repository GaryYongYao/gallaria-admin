import {
  Visibility as View,
  Delete as DeleteIcon
} from '@material-ui/icons'
import moment from 'moment'

export const columns = [
  {
    title: 'Date',
    headerStyle: { width: '10%' },
    filtering: true,
    render: ({ createdDate }) => moment(createdDate).format('DD/MM/YYYY (ddd) hh:mm A')
  },
  {
    title: 'Name',
    headerStyle: { width: '20%' },
    filtering: false,
    field: 'name'
  },
  {
    title: 'Email',
    headerStyle: { width: '10%' },
    filtering: false,
    field: 'email'
  },
  {
    title: 'Phone',
    headerStyle: { width: '10%' },
    filtering: false,
    field: 'phone'
  },
  {
    title: 'Company',
    headerStyle: { width: '20%' },
    filtering: false,
    field: 'company'
  },
  {
    title: 'Products',
    headerStyle: { width: '5%' },
    filtering: false,
    render: ({ products }) => products.length
  }
]

export const actions = (setChosen, setIsOpen, setIsAlertOpen) => [
  {
    icon: () => <View color="primary" />,
    tooltip: 'View Message',
    onClick: (e, data) => {
      setChosen(data)
      setIsOpen(true)
    }
  },
  rowData => ({
    icon: () => <DeleteIcon color={(!rowData.read || !rowData.replied) ? "disabled" : "error"} />,
    tooltip: (!rowData.read || !rowData.replied) ? null :'Delete Lead',
    disabled: (!rowData.read || !rowData.replied),
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
      name
      email
      phone
      company
      profile
      subject
      message
      products {
        info {
          name
          price
        }
        quantity
        variant
      }
      read
      replied
      createdDate
    }
  }
`

export const mutationReadMessage = `
  mutation readEnquiry($id:ID!, $read:Boolean!) {
    readEnquiry(
      _id: $id,
      read: $read
    )
  }
`

export const mutationReplied = `
  mutation repliedEnquiry($id:ID!, $replied:Boolean!) {
    repliedEnquiry(
      _id: $id,
      replied: $replied
    )
  }
`

export const mutationDeleteEnquiry = `
  mutation deleteEnquiry( $id:ID! ) {
    deleteEnquiry( _id: $id )
  }
`
