import { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Typography
} from '@material-ui/core'
import { useRoutes } from 'utils'
import request from 'utils/request'
import { queryGetLeads, queryGetEnquiries } from '../constant'

function StatsSection() {
  const { history } = useRoutes()
  const [lead, setLead] = useState(0)
  const [enquiry, setEnquiry] = useState(0)

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    request(queryGetLeads)
      .then(res => {
        const { getLeads, errors } = res.data.data
        if (errors) openSnackbar( errors.message, 'error' )

        const filteredLeads = getLeads.filter(item => !item.read)
        setLead(filteredLeads.length)
      })

    request(queryGetEnquiries)
      .then(res => {
        const { getEnquiries, errors } = res.data.data
        if (errors) openSnackbar( errors.message, 'error' )

        const filteredEnquiries = getEnquiries.filter(item => !item.read)
        console.log(filteredEnquiries)
        setEnquiry(filteredEnquiries.length)
      })
  }

  return (
    <Grid container spacing={2} style={{ marginBottom: '20px' }}>
      <Grid item xs={12} md={4}>
        <Box
          bgcolor="#1A1A1A"
          p={5}
          borderRadius="10px"
          display="flex"
          justifyContent="space-between"
          style={{ cursor: 'pointer' }}
          onClick={() => history.push({ pathname: '/leads' })}
        >
          <Typography variant="h5" color="secondary">
            New Lead
          </Typography>
          <Typography variant="h3" color="secondary">
            {lead}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box
          bgcolor="#1A1A1A"
          p={5}
          borderRadius="10px"
          display="flex"
          justifyContent="space-between"
          style={{ cursor: 'pointer' }}
          onClick={() => history.push({ pathname: '/enquiries' })}
        >
          <Typography variant="h5" color="secondary">
            New Enquiry
          </Typography>
          <Typography variant="h3" color="secondary">
            {enquiry}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box
          bgcolor="#1A1A1A"
          p={5}
          borderRadius="10px"
          display="flex"
          justifyContent="center"
          style={{ cursor: 'pointer' }}
          onClick={() => window.open('https://dashboard.stripe.com/payments?status%5B%5D=successful', '_blank')}
        >
          <Typography variant="h3" color="secondary">
            Stripe
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default StatsSection
