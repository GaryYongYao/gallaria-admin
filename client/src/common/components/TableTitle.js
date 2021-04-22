import { Box, Button, Typography } from '@material-ui/core'
import { useRoutes } from 'utils'
import { Add as AddIcon } from '@material-ui/icons'


function TablleAddTitle({ title, link }) {
  const { history } = useRoutes()
  return (
    <Box display="flex">
      <Typography variant="h6">
        {title}
      </Typography>
      <Button
        size="small"
        variant="contained"
        color="primary"
        endIcon={<AddIcon />}
        onClick={() => history.push({ pathname: link })}
        style={{ marginLeft: '15px' }}
      >
        Add New
      </Button>
    </Box>
  )
}

export default TablleAddTitle
