import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'

export const columns = [
  {
    title: 'Name',
    headerStyle: { width: '20%' },
    field: 'name',
    filtering: true,
    render: ({ name }) => name
  },
  {
    title: 'Sub-Categories Count',
    headerStyle: { width: '20%' },
    filtering: false,
    render: ({ sub }) => sub.length
  },
  {
    title: 'Created by',
    headerStyle: { width: '20%' },
    filtering: false,
    render: ({ createdBy }) => createdBy
  },
  {
    title: 'Updated by',
    headerStyle: { width: '20%' },
    filtering: false,
    render: ({ updatedBy }) => updatedBy
  }
]

export const actions = (setChosen, setIsOpen, setIsAlertOpen, id) => [
  {
    icon: () => <EditIcon color="primary" />,
    tooltip: 'Edit Categories',
    onClick: (e, data) => {
      console.log(data)
      setChosen(data)
      setIsOpen(true)
    }
  },
  rowData => ({
    icon: () => <DeleteIcon color={id === rowData._id ? "info" : "error"} />,
    tooltip: 'Delete Categories',
    onClick: () => {
      setIsAlertOpen(true)
      setChosen(rowData)
    }
  })
]

// graphql
export const queryGetCategories = `
  query {
    getCategories {
      _id
      name
      sub
      createdBy
      updatedBy
    }
  }
`

export const mutationCreateCategory = `
  mutation createCategory($categoryInput:CategoryInput!) {
    createCategory(
      categoryInput: $categoryInput
    ) {
      _id
      name
    }
  }
`

export const mutationEditCategory = `
  mutation editCategory($categoryUpdate:CategoryUpdate!) {
    editCategory(
      categoryUpdate: $categoryUpdate
    )
  }
`

export const mutationDeleteCategory = `
  mutation deleteCategory( $id:ID! ) {
    deleteCategory( _id: $id )
  }
`