import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'

export const userRoles = [
  'admin',
  'user'
]

export const columns = [
  {
    title: 'Username',
    headerStyle: { width: '20%' },
    field: 'username',
    filtering: true
  },
  {
    title: 'Role',
    headerStyle: { width: '20%' },
    filtering: false,
    render: ({ role }) => role
  },
  {
    title: 'Created by',
    headerStyle: { width: '20%' },
    filtering: false,
    render: ({ createdBy }) => createdBy
  }
]

export const actions = (setChosen, setIsOpen, setIsAlertOpen, id) => [
  rowData => ({
    icon: () => <EditIcon color={rowData.username === 'dev-admin' ? "info" : "primary" } />,
    tooltip: rowData.username === 'dev-admin' ? null : 'Edit User',
    disabled: rowData.username === 'dev-admin',
    onClick: (e, data) => {
      setChosen(data)
      setIsOpen(true)
    }
  }),
  rowData => ({
    icon: () => <DeleteIcon color={(rowData.username === 'dev-admin' || id === rowData._id) ? "info" : "error"} />,
    tooltip: (rowData.username === 'dev-admin' || id === rowData._id) ? null : 'Delete User',
    disabled: (rowData.username === 'dev-admin' || id === rowData._id),
    onClick: () => {
      setIsAlertOpen(true)
      setChosen(rowData)
    }
  })
]

// graphql
export const queryGetUsers = `
  query {
    getUsers {
      _id
      username
      role
      createdBy
    }
  }
`

export const mutationCreateUser = `
  mutation createUser($userInput:UserInput) {
    createUser(
      userInput: $userInput
    ) {
      _id
      username
    }
  }
`

export const mutationChangePassword = `
  mutation changePassword($id:ID!, $password:String!, $confirm:String!) {
    changePassword(
      _id: $id,
      password: $password,
      confirm: $confirm
    )
  }
`

export const mutationUpdateUser = `
  mutation editUser($id:ID!, $username: String, $role: String) {
    editUser(
      _id: $id,
      password: $password,
      confirm: $confirm
    )
  }
`

export const mutationDeleteUser = `
  mutation deleteUser( $id:ID! ) {
    deleteUser( _id: $id )
  }
`