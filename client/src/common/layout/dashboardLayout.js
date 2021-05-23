import { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  AppBar,
  Box,
  Drawer,
  Divider,
  IconButton,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar
} from '@material-ui/core'
import {
  Menu as MenuIcon
} from '@material-ui/icons'
import { useRoutes } from 'utils'
import { UserContext } from 'utils/sessions'
import { menu } from '../constant'
import UserDropdownMenu from '../components/UserDropdownMenu'

import logo from 'common/img/logo.png'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#F0F0F0'
  },
  layerOverlay: {
    minHeight: 'calc(100vh - 100px)',
    display: 'flex',
    paddingTop: '36px'
  },
  contentStyle: {
    margin: '0 auto',
    width: '80%'
  }
}))

const DashLayout = ({ children }) => {
  const { menuButton, layerOverlay, contentStyle } = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const { history } = useRoutes()
  const { userRole, checkLogin } = useContext(UserContext)

  useEffect(checkLogin, [])

  const renderListItems = (e) => {
    if (e.divider) {
      return <Divider key={e.text} />
    }
    if (e.link) {
      return (
        <ListItem
          button
          key={e.text}
          onClick={() => {
            if (!e.target) history.push({ pathname: e.link })
            else window.open( e.link, '_blank')
          }}
        >
          <ListItemIcon>{e.icon}</ListItemIcon>
          <ListItemText primary={e.text} />
        </ListItem>
      )
    }
    return (
      <ListItem key={e.text}>
        <ListItemText primary={e.text} />
      </ListItem>
    )
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid container item xs={10} alignItems="center">
              <IconButton
                edge="start"
                className={menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => setIsOpen(!isOpen)}
              >
                <MenuIcon />
              </IconButton>
              <Hidden only="xs">
                <img src={logo} height="30px" />
              </Hidden>
            </Grid>
            <Grid container item xs={2} justify="flex-end">
              <UserDropdownMenu />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Box width="300px">
          <List>
            {menu.map(e => (
              (!e.admin || (e.admin && userRole === 'admin'))
              && renderListItems(e)
            ))}
          </List>
        </Box>
      </Drawer>
      <Box bgcolor="#FFFFFF">
        <Box className={layerOverlay}>
          <Box className={contentStyle}>
            {children}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default DashLayout
