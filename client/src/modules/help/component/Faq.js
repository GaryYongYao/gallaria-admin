import { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Link,
  Typography
} from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  accordionBreak: {
    marginBottom: 10
  },
  sectionBreak: {
    marginBottom: 20
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  paraList: {
    display: 'block'
  },
}))

function HelpSection() {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Grid item xs={12} md={9}>
      <div className={classes.root}>
        <Typography variant="h5" className={classes.sectionBreak}>Help</Typography>
        <Accordion className={classes.accordionBreak} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>Process of website publish</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Update entry on any content &gt; Netlify receive the update & start build &gt; Netlify publishes the new content
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.sectionBreak} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>Change of bank on Stripe Payment</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Link href="https://dashboard.stripe.com/settings/payouts">
              <Typography>
                Follow this link to change bank or currencies for the Stripe payout.
              </Typography>
            </Link>
          </AccordionDetails>
        </Accordion>
        <Typography variant="h5" className={classes.sectionBreak}>Quotas and Cost after quota</Typography>
        <Accordion className={classes.sectionBreak} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>Netlify (Website Hosting)</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.paraList}>
            <Typography paragraph>
              <b>Build Minute</b>
            </Typography>
            <Typography paragraph>
              Quota: 300 minutes / month
            </Typography>
            <Typography paragraph>
              Quota Refresh: 24th every month
            </Typography>
            <Typography paragraph>
              Overquota cost: $7 / 500 minutes
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.sectionBreak} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>Google Maps API</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.paraList}>
            <Typography paragraph>
              <b>Monthly Google Quotas</b>
            </Typography>
            <Typography paragraph>
              $200 per month
            </Typography>
            <Typography paragraph>
              Refresh on 1st of every month
            </Typography>
            <Typography paragraph>
              <b>Geocoding (only backend)</b>
            </Typography>
            <Typography paragraph>
              Cost: $0.005 per request
              <br />
              <Typography variant="caption">
                *Only will be billed if the request is over $200
              </Typography>
            </Typography>
            <Typography paragraph>
              <b>Google Maps API</b>
            </Typography>
            <Typography paragraph>
              Cost: $0.007 per request
              <br />
              <Typography variant="caption">
                *Only will be billed if the request is over $200
              </Typography>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.sectionBreak} expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>AWS S3 (Media Storage)</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.paraList}>
            <Typography paragraph>
              <b>Monthly Data Transfer Quota</b>
            </Typography>
            <Typography paragraph>
              Quota: 15GB / month
            </Typography>
            <Typography paragraph>
              Quota Refresh: 1st every month
            </Typography>
            <Typography paragraph>
              Overquota cost: $0.114 / GB
            </Typography>
            <Typography paragraph>
              <b>Storage Usage</b>
            </Typography>
            <Typography paragraph>
              Storage Quota: 15GB
            </Typography>
            <Typography paragraph>
              Storage Request: 20,000 Request / month
            </Typography>
            <Typography paragraph>
              Quota Refresh: 1st every month
            </Typography>
            <Typography paragraph>
              Overquota cost: $0.0044 per 10,000 requests
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.sectionBreak} expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>MongoDB Database</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.paraList}>
            <Typography paragraph>
              <b>Database</b>
            </Typography>
            <Typography paragraph>
              Quota: 512MB
            </Typography>
            <Typography paragraph>
              Impossible to overquota, unless you have millions of products
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.sectionBreak} expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>Heroku (Backend Hosting)</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.paraList}>
            <Typography paragraph>
              <b>Hosting</b>
            </Typography>
            <Typography paragraph>
              Included with maintenance
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </Grid>
  )
}

export default HelpSection
