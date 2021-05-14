import { Route } from 'react-router-dom'
import { LocationFormScreen, LocationListScreen } from 'modules/locations'

function ShowroomsRoute() {
  return (
    <>
      <Route exact path="/showrooms" component={LocationListScreen} />
      <Route exact path="/showroom-add" component={LocationFormScreen} />
      <Route exact path="/showroom/:id" component={LocationFormScreen} />
    </>
  )
}

export default ShowroomsRoute
