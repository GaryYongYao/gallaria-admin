import { BrowserRouter, Route } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from 'common/theme'
import { CustomSnackbar, SnackbarContextProvider } from 'common/components/Snackbar'
import { UserContextProvider } from 'utils/sessions'
import LoginScreen from 'modules/login'
import UserRoute from './routes/users'
import ProductsRoute from './routes/products'

import './App.css'

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarContextProvider>
        <div className="container">
          <BrowserRouter>
            <UserContextProvider>
              <Route exact path="/" component={LoginScreen} />
              <UserRoute />
              <ProductsRoute />
            </UserContextProvider>
          </BrowserRouter>
        </div>
        <CustomSnackbar />
      </SnackbarContextProvider>
    </MuiThemeProvider>
  )
}

export default App
