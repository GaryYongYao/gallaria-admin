import { Route } from 'react-router-dom'
import { UserAddScreen, UserListScreen, ChangePasswordScreen } from 'modules/users'

function UserRoute() {
  return (
    <>
      <Route exact path="/change-password" component={ChangePasswordScreen} />
      <Route exact path="/users" component={UserListScreen} />
      <Route exact path="/users-add" component={UserAddScreen} />
    </>
  )
}

export default UserRoute
