import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import { startCase } from 'lodash'

export const columns = [
  {
    title: 'Project ID',
    field: '_id',
    headerStyle: { width: '5%' },
    filtering: true
  },
  {
    title: 'Name',
    field: 'name',
    headerStyle: { width: '15%' },
    filtering: true,
    render: ({ name }) => startCase(name)
  },
  {
    title: 'Location',
    field: 'location',
    headerStyle: { width: '10%' },
    filtering: false,
    render: ({ location }) => location
  },
  {
    title: 'Type',
    headerStyle: { width: '5%' },
    filtering: false,
    render: ({ type }) => type
  },
  {
    title: 'Date',
    headerStyle: { width: '5%' },
    filtering: false,
    render: ({ date }) => date
  },
  {
    title: 'Draft',
    headerStyle: { width: '2.5%' },
    filtering: false,
    render: ({ isDraft }) => isDraft ? 'Yes' : 'No'
  },
  {
    title: 'Created By',
    headerStyle: { width: '2.5%' },
    filtering: false,
    render: ({ createdBy }) => createdBy
  },
]

export const actions = ( history, setChosen, setIsAlertOpen) => [
  rowData => ({
    icon: () => <EditIcon color="primary" />,
    tooltip: 'Edit Product',
    onClick: () => {
      history.push({ pathname: `/project/${rowData._id}` })
    }
  }),
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
export const queryGetAllProjects = `
query {
  getAllProjects {
    _id
    name
    location
    type
    date
    isDraft
    createdBy
  }
}
`

export const queryGetProjectById= `
query getAdminProjectById($id: ID!) {
  getAdminProjectById(_id: $id) {
    _id
    name
    location
    type
    date
    desc
    cover
    photos
    products
    isDraft
    justCreated
    updatedBy
  }
}
`

export const mutationCreateProject = `
  mutation createProject($id: ID!) {
    createProject(id: $id)
  }
`

export const queryGetProducts = `
query {
  getProducts {
    _id
    name
  }
}
`

export const mutationEditProject = `
  mutation editProject($projectInput: ProjectInput!) {
    editProject(projectInput: $projectInput) {
      _id
      name
      location
      type
      date
      desc
      cover
      photos
      products
      isDraft
      justCreated
      createdBy
      updatedBy
      createdDate
    }
  }
`

export const mutationDeleteProject = `
  mutation deleteProject($id: ID!) {
    deleteProject(_id: $id)
  }
`