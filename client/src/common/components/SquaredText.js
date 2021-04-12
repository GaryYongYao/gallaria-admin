import * as React from 'react'
import Box from '@material-ui/core/Box'

function SquaredText({ text, color, paddingSize = '10px', ...props }) {
  return (
    <Box
      direction="row"
      justify="center"
      style={{
        color: '#fff',
        backgroundColor: color,
        padding: `5px ${paddingSize}`,
        width: 'fit-content',
        borderRadius: '5px'
      }}
      {...props}
    >
      {text}
    </Box>
  )
}

export default SquaredText
