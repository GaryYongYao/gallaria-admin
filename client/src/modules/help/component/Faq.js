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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
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
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
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
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
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
      </div>
    </Grid>
  )
}

export default HelpSection
