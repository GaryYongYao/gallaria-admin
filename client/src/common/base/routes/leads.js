import { Route } from 'react-router-dom'
import { LeadListScreen } from 'modules/leads'

function CategoriesRoute() {
  return (
    <>
      <Route exact path="/leads" component={LeadListScreen} />
    </>
  )
}

export default CategoriesRoute
