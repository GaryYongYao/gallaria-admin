import {
  Box,
  Paper
} from '@material-ui/core'
import { styled } from '@material-ui/styles'

const PaperStyled = styled(Paper)(() => ({
  padding: '35px 25px',
  backgroundColor: '#FFFFFF',
  marginBottom: '40px'
}))

function FormPaper({ children }) {
  return (
    <PaperStyled>
      <Box>
        {children}
      </Box>
    </PaperStyled>
  )
}

export default FormPaper
