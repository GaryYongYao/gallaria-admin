import Link from '@material-ui/core/Link'
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import { startCase } from 'lodash'

export const columns = [
  {
    title: 'Code',
    headerStyle: { width: '15%' },
    filtering: true,
    field: 'code',
    searchable: true
  },
  {
    title: 'Name',
    field: 'name',
    headerStyle: { width: '15%' },
    filtering: true,
    render: ({ name }) => startCase(name)
  },
  {
    title: 'Price',
    field: 'price',
    headerStyle: { width: '5%' },
    filtering: false,
    sorting: true,
    render: ({ price }) => price
  },
  {
    title: 'Variants',
    headerStyle: { width: '2.5%' },
    filtering: false,
    sorting: false,
    render: ({ variants }) => variants.length
  },
  {
    title: 'Category/Sub-Category',
    field: 'category',
    headerStyle: { width: '30%' },
    filtering: false,
    sorting: true,
    render: ({ category, sub }) => `${category? category : 'Not Chosen' }${sub ? `/${sub}` : ''}`
  },
  {
    title: 'Draft',
    field: 'isDraft',
    headerStyle: { width: '2.5%' },
    filtering: false,
    render: ({ isDraft }) => isDraft ? 'Yes' : 'No'
  },
]

export const actions = ( history, setChosen, setIsAlertOpen) => [
  rowData => ({
    icon: () => (
      <Link href={`/product/${rowData._id}`}>
        <EditIcon color="primary" />
      </Link>
    ),
    tooltip: 'Edit Product'
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
export const queryGetAllProducts = `
query {
  getAllProducts {
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
    altCode
    category,
    sub
    series
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
    featureImage
    features
    isDraft
    link3d
    priceDesc
    createdBy
    updatedBy
    isArchive
    size {
      w
      h
      d
    }
  }
}
`

export const queryGetSubCategoriesOption = `
query getSubCategoriesOption($id: ID!) {
  getSubCategoriesOption(_id: $id) {
    sub
    series
  }
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
    editProduct(productUpdate: $productUpdate) {
      _id
      code
      name
      price
      desc
      variants
      altCode
      category
      sub
      series
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
      featureImage
      features
      isDraft
      link3d
      priceDesc
      createdBy
      updatedBy
      isArchive
      size {
        w
        h
        d
      }
    }
  }
`

export const mutationDeleteProduct = `
  mutation deleteProduct($id: ID!) {
    deleteProduct(_id: $id)
  }
`