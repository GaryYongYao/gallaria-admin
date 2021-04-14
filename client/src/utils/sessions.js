import React, { useContext } from 'react'
import request from 'utils/request'
import { SnackbarContext } from 'common/components/Snackbar'
import * as Cookies from 'js-cookie'
import { useRoutes } from 'utils'

export const setSessionCookie = session => {
  Cookies.remove('session')
  Cookies.set('session', session, { expires: 6 })
}

export const getSessionCookie = () => {
  const sessionCookie = Cookies.get('session')

  if (sessionCookie === undefined) return {}

  return JSON.parse(sessionCookie)
}

export const removeLogin = () => {
  Cookies.remove('session')
}

// user context
export const UserContextProvider = ({ children }) => {
  const [userContext, setUserContext] = React.useState(getSessionCookie())
  const { openSnackbar } = useContext(SnackbarContext)
  const { history } = useRoutes()

  const checkAdminRoute = path => {
    const adminRoutes = [
      { path: '/users', goto: '/dashboard' },
      { path: '/supplier-add', goto: '/supplier' }
    ]

    adminRoutes.forEach(route => {
      if (path === route.path) {
        history.push({ pathname: route.goto })
        openSnackbar(
          'You do not have access',
          'error'
        )
      }
    })
  }

  const login = (username, password) => {
    const data = `
      query{
        login(username: "${username}", password: "${password}") {
          _id
          username
          token
          role
        }
      }
    `

    request(data)
      .then(res => {
        const { data, errors } = res.data
        const { login } = data
        
        openSnackbar(
          !errors ? `Welcome ${login.username}` : errors[0].message,
          errors ? 'error' : 'success'
        )
        if (!errors) {
          setSessionCookie({ login })
          setUserContext({ login })
          history.push({ pathname: '/products' })
        }
      })
  }

  const userValue = {
    userContext,
    userRole: (userContext.login || {}).role,
    login,
    checkLogin: () => {
      if (userContext.login === undefined) {
        history.push({ pathname: '/' })
      } else if (history.location.pathname === '/') {
        history.push({ pathname: '/dashboard' })
      } else if (userContext.login.role !== 'admin') {
        checkAdminRoute(history.location.pathname)
      }
    },
    logout: () => {
      setUserContext({})
      removeLogin()
      history.push({ pathname: '/' })
    }
  }

  return (
    <UserContext.Provider value={userValue}>
      {children}
    </UserContext.Provider>
  )
}

export const UserContext = React.createContext()
