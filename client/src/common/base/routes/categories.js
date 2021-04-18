import { Route } from 'react-router-dom'
import { CategoryAddScreen, CategoryListScreen } from 'modules/categories'

function CategoriesRoute() {
  return (
    <>
      <Route exact path="/categories" component={CategoryListScreen} />
      <Route exact path="/categories-add" component={CategoryAddScreen} />
    </>
  )
}

export default CategoriesRoute
