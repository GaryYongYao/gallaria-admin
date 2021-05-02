import { useState } from 'react'
import { useParams, useLocation, useHistory } from 'react-router'
import qs from 'qs'
// breakpoint
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

function useRoutes() {
  const params = useParams()
  const location = useLocation()
  const history = useHistory()
  const query = qs.parse(location.search, { ignoreQueryPrefix: true })

  return {
    params,
    location,
    history,
    query,
  }
}

const useForm = initialValue => {
  const [values, setValues] = useState(initialValue)

  return {
    values,
    setText: e => {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      })
    },
    setSwitch: e => {
      setValues({
        ...values,
        [e.target.name]: e.target.checked
      })
    },
    setDate: (value, name) => {
      setValues({
        ...values,
        [name]: value
      })
    },
    setArray: (value, name) => {
      setValues({
        ...values,
        [name]: value
      })
    },
    setAll: v => {
      setValues({
        ...v
      })
    },
    emptyState: emptyState => {
      setValues(emptyState)
    }
  }
}

const useBreakpointUpCheck = (breakpoint) => {
  const theme = useTheme()
  
  return useMediaQuery(theme.breakpoints.up(breakpoint))
}

const useBreakpointDownCheck = (breakpoint) => {
  const theme = useTheme()
  
  return useMediaQuery(theme.breakpoints.down(breakpoint))
}

export {
  useForm,
  useRoutes,
  useBreakpointDownCheck,
  useBreakpointUpCheck
}
