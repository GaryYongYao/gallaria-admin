import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from 'common/theme'
import { CustomSnackbar, SnackbarContextProvider } from 'common/components/Snackbar'
import { UserContextProvider } from 'utils/sessions'
import LoginScreen from 'modules/login'
import CategoriesRoute from './routes/categories'
import LeadsRoute from './routes/leads'
import ShowroomsRoute from './routes/locations'
import ProductsRoute from './routes/products'
import UserRoute from './routes/users'

import './App.css'

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarContextProvider>
        <div className="container">
          <BrowserRouter>
            <Switch>
              <UserContextProvider>
                <Route exact path="/" component={LoginScreen} />
                <UserRoute />
                <ProductsRoute />
                <CategoriesRoute />
                <LeadsRoute />
                <ShowroomsRoute />
              </UserContextProvider>
            </Switch>
          </BrowserRouter>
        </div>
        <CustomSnackbar />
      </SnackbarContextProvider>
    </MuiThemeProvider>
  )
}

export default App
