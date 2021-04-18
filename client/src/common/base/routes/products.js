import { Route } from 'react-router-dom'
import { ProductAddScreen, ProductListScreen } from 'modules/products'

function ProductsRoute() {
  return (
    <>
      <Route exact path="/products" component={ProductListScreen} />
      <Route exact path="/product-add" component={ProductAddScreen} />
      <Route exact path="/product/:id" component={ProductAddScreen} />
    </>
  )
}

export default ProductsRoute
