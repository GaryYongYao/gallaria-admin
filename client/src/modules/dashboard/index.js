import {
  Grid
} from '@material-ui/core'
import DashboardLayout from 'common/layout/dashboardLayout'
import FeaturedSection from './sections/featuring'
import StatsSection from './sections/stats'
import HighlightOne from './sections/highlight-one'
import HighlightTwo from './sections/highlight-two'

function UserListScreen() {

  return (
    <>
      <DashboardLayout>
        <StatsSection />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <HighlightOne />
            <HighlightTwo />
          </Grid>
          <Grid item xs={12} md={6}>
            <FeaturedSection />
          </Grid>
        </Grid>
      </DashboardLayout>
    </>
  )
}

export default UserListScreen
