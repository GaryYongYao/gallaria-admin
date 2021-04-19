import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import { startCase } from 'lodash'

export const columns = [
  {
    title: 'Name',
    field: 'name',
    headerStyle: { width: '15%' },
    filtering: true,
    render: ({ name }) => startCase(name)
  },
  {
    title: 'Code',
    headerStyle: { width: '15%' },
    filtering: true,
    render: ({ code }) => code
  },
  {
    title: 'Price',
    headerStyle: { width: '5%' },
    filtering: false,
    render: ({ price }) => price
  },
  {
    title: 'Variants',
    headerStyle: { width: '2.5%' },
    filtering: false,
    render: ({ variants }) => variants.length
  },
  {
    title: 'Category/Sub-Category',
    headerStyle: { width: '30%' },
    filtering: false,
    render: ({ category, sub }) => `${category}/${sub}`
  },
  {
    title: 'Featured',
    headerStyle: { width: '2.5%' },
    filtering: false,
    render: ({ isFeature }) => isFeature ? 'Yes' : 'No'
  },
  {
    title: 'Draft',
    headerStyle: { width: '2.5%' },
    filtering: false,
    render: ({ isDraft }) => isDraft ? 'Yes' : 'No'
  },
]

export const actions = ( history, setChosen, setIsAlertOpen) => [
  rowData => ({
    icon: () => <EditIcon color="primary" />,
    tooltip: 'Edit Product',
    onClick: () => {
      history.push({ pathname: `/product/${rowData._id}` })
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
export const queryGetProducts = `
query {
  getProducts {
    _id
    name
    code
    price
    variants
    category
    sub
    isFeature
    isDraft
  }
}
`

export const queryCheckProductCode = `
query checkProductCode($id: ID, $code: String!) {
  checkProductCode(_id: $id, code:$code)
}
`

export const queryGetProductById = `
query getProductById($id: ID!) {
  getProductById(_id: $id) {
    _id
    code
    name
    price
    desc
    variants
    category,
    sub
    details {
      title
      info
    }
    tags
    isFeature
    forSale
    file
    images
    primaryImage
    isDraft
    createdBy
    updatedBy
  }
}
`

export const queryGetSubCategoriesOption = `
query getSubCategoriesOption($id: ID!) {
  getSubCategoriesOption(_id: $id)
}
`

export const queryGetCategoriesOption = `
  query {
    getCategoriesOption {
      _id
      name
    }
  }
`

export const mutationCreateProduct = `
  mutation createProduct($productInput: ProductInput!) {
    createProduct(productInput: $productInput) {
      _id
      code
      name
      createdBy
    }
  }
`

export const mutationEditProduct = `
  mutation editProduct($productUpdate: ProductUpdate!) {
    editProduct(productUpdate: $productUpdate)
  }
`

export const mutationDeleteProduct = `
  mutation deleteProduct($id: ID!) {
    deleteProduct(_id: $id)
  }
`