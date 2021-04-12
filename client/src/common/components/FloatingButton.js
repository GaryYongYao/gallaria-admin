import * as React from 'react'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import { styled } from '@material-ui/styles'
import { Add as AddIcon } from '@material-ui/icons'

const FloatButtonStyled = styled(Grid)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  padding: theme.spacing(2), // give some gap between the popover panel
  '&:hover': {
    backgroundColor: 'transparent',
  },
}))

function FloatingButton(props) {
  const { onClick, ...restProps } = props
  return (
    <FloatButtonStyled onClick={onClick}>
      <Fab color="primary" disableRipple {...restProps}>
        <AddIcon />
      </Fab>
    </FloatButtonStyled>
  )
}

export default FloatingButton
