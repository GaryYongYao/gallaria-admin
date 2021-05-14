import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'

export const columns = [
  {
    title: 'Name',
    headerStyle: { width: '15%' },
    filtering: false,
    field: 'name'
  },
  {
    title: 'Address',
    headerStyle: { width: '20%' },
    filtering: false,
    field: 'address'
  },
  {
    title: 'Phone',
    headerStyle: { width: '10%' },
    filtering: false,
    field: 'phone'
  },
  {
    title: 'Website',
    headerStyle: { width: '20%' },
    filtering: false,
    field: 'website'
  }
]

export const actions = (history, setChosen, setIsAlertOpen) => [
  {
    icon: () => <EditIcon color="primary" />,
    tooltip: 'View Message',
    onClick: (e, data) => {
      history.push({ pathname: `/showroom/${data._id}` })
    }
  },
  rowData => ({
    icon: () => <DeleteIcon color="error" />,
    tooltip: 'Delete Showroom',
    onClick: () => {
      setIsAlertOpen(true)
      setChosen(rowData)
    }
  })
]

// graphql
export const queryGetLocations = `
  query {
    getLocations {
      _id
      name
      address
      phone
      website
      position
    }
  }
`

export const queryGetLocationById = `
query getLocationById($id: ID!) {
  getLocationById(_id: $id) {
    _id
    name
    address
    phone
    website
    position
  }
}
`

export const mutationCreateLocation = `
  mutation createLocation($locationInput:LocationInput!) {
    createLocation(
      locationInput: $locationInput
    ) {
      _id
      name
    }
  }
`

export const mutationEditLocation = `
  mutation editLocation($locationUpdate:LocationUpdate!) {
    editLocation(
      locationUpdate: $locationUpdate
    ) {
      _id
      name
      address
      phone
      website
      position
    }
  }
`

export const mutationDeleteLocation = `
  mutation deleteLocation( $id:ID! ) {
    deleteLocation( _id: $id )
  }
`
