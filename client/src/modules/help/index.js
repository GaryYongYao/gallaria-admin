import {
  Grid
} from '@material-ui/core'
import DashboardLayout from 'common/layout/dashboardLayout'
import HelpSection from './component/Faq'
import LinksSection from './component/Links'

function HelpScreen() {

  return (
    <>
      <DashboardLayout>
        <Grid container spacing={5}>
          <HelpSection />
          <LinksSection />
        </Grid>
      </DashboardLayout>
    </>
  )
}

export default HelpScreen
