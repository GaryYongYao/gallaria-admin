import {
  Grid
} from '@material-ui/core'
import DashboardLayout from 'common/layout/dashboardLayout'
import FeaturedSection from './sections/featuring'
import StatsSection from './sections/stats'

function UserListScreen() {

  return (
    <>
      <DashboardLayout>
        <StatsSection />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} />
          <Grid item xs={12} md={6}>
            <FeaturedSection />
          </Grid>
        </Grid>
      </DashboardLayout>
    </>
  )
}

export default UserListScreen
