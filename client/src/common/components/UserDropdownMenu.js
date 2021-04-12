import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {
  ExitToApp as ExitToAppIcon,
  VpnKey as PasswordIcon,
  ExpandMore as ExpandIcon
} from '@material-ui/icons'
import { UserContext } from 'modules/utils/sessions'
import { useRoutes } from 'modules/utils'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

export default function CustomizedMenus() {
  const { history } = useRoutes()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { userContext, logout } = useContext(UserContext)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logoutClick = () => {
    logout()
  }

  return (
    <>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="text"
        style={{ minWidth: '200px', color: 'white' }}
        onClick={handleClick}
      >
        Welcome,&nbsp;
        {(userContext.user || {}).user}
        &nbsp;
        <ExpandIcon />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => history.push({ pathname: '/change-password' })}>
          <ListItemIcon>
            <PasswordIcon />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </MenuItem>
        <MenuItem onClick={() => logoutClick()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </StyledMenu>
    </>
  )
}
