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
    sorting: false,
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
export const queryGetLeads = `
  query {
    getLeads {
      _id
      name
      email
      phone
      company
      message
      read
      replied
      createdDate
    }
  }
`

export const mutationReadMessage = `
  mutation readMessage($id:ID!, $read:Boolean!) {
    readMessage(
      _id: $id,
      read: $read
    )
  }
`

export const mutationReplied = `
  mutation replied($id:ID!, $replied:Boolean!) {
    replied(
      _id: $id,
      replied: $replied
    )
  }
`

export const mutationDeleteLead = `
  mutation deleteLead( $id:ID! ) {
    deleteLead( _id: $id )
  }
`
