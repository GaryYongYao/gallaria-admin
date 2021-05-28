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
        <FeaturedSection />
        <div style={{ marginBottom: '50px' }} />
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <HighlightOne />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighlightTwo />
          </Grid>
        </Grid>
        <div style={{ marginBottom: '50px' }} />
      </DashboardLayout>
    </>
  )
}

export default UserListScreen
