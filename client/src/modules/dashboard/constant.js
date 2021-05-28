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

export const queryGetProducts = `
query {
  getProducts {
    _id
    code
    name
  }
}
`

export const queryGetFeatured = `
  query {
    getFeaturedAdmin {
      _id
      product {
        _id
        code
        name
      }
    }
  }
`

export const mutationAddFeature = `
  mutation addFeature( $id:ID! ) {
    addFeature( _id: $id )
  }
`

export const mutationDeleteFeature = `
  mutation deleteFeature( $id:ID! ) {
    deleteFeature( _id: $id )
  }
`

export const queryGetCatHighlight = `
  query {
    getCatHighlight {
      _id
      title
      subtitle
      cat
    }
  }
`

export const mutationUpdateCatHighlight = `
  mutation updateCatHighlight($catHighlightInput: CatHighlightInput) {
    updateCatHighlight( catHighlightInput: $catHighlightInput )
  }
`

export const queryGetProductHighlight = `
  query {
    getProductHighlight {
      _id
      title
      subtitle
      products {
        _id
      }
    }
  }
`

export const mutationUpdateProductHighlight = `
  mutation updateProductHighlight($productHighlightInput: ProductHighlightInput) {
    updateProductHighlight( productHighlightInput: $productHighlightInput )
  }
`
