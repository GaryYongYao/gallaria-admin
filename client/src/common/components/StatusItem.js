import * as React from 'react'
import Box from '@material-ui/core/Box'

function StatusItem({ text, color, status, ...props }) {
  const statusDisplay = () => {
    if (status) {
      return (
        <Box display="flex">
          <Box
            borderRadius="5px"
            bgcolor={color}
            marginRight={1}
            textAlign="center"
            pl={1}
            pr={1}
            fontSize="14px"
            color="white"
            lineHeight="22px"
          >
            {text}
          </Box>
          {status}
        </Box>
      )
    }
    return (
      <Box
        width="15px"
        height="15px"
        borderRadius="50%"
        bgcolor={color}
        marginRight={1}
      />
    )
  }

  return (
    <Box
      borderRadius={5}
      border={1}
      borderColor="#ccc"
      p="5px"
      width="fit-content"
      display="flex"
      alignItems="center"
      {...props}
    >
      {color && statusDisplay()}
      {!status && text}
    </Box>
  )
}

export default StatusItem
