import {
  Button,
  Grid
} from '@material-ui/core'

function LinksSection() {

  return (
    <Grid item xs={12} md={3}>
      <Grid container spacing={2} style={{ border: '1px solid #707070', borderRadius: '10px', padding: '20px' }}>
        <Grid item xs={6} md={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => window.open( 'https://app.netlify.com/sites/gallaria-website-prod/deploys', '_blank')}
          >
            Netlify Deploys
          </Button>
        </Grid>
        <Grid item xs={6} md={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => window.open( 'https://console.cloud.google.com/google/maps-apis/metrics?project=bionic-carving-313214', '_blank')}
          >
            Google API Metrics
          </Button>
        </Grid>
        <Grid item xs={6} md={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => window.open( 'https://dashboard.stripe.com/settings', '_blank')}
          >
            Stripe Settings
          </Button>
        </Grid>
        <Grid item xs={6} md={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => window.open( 'https://console.aws.amazon.com/console/home?nc2=h_ct&src=header-signin', '_blank')}
          >
            AWS Console
          </Button>
        </Grid>
        <Grid item xs={6} md={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => window.open( 'mailto:garyyongyao@imitationtech.com', '_blank')}
          >
            Contact Gary
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LinksSection
