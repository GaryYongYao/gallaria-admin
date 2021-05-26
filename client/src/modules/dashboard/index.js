import DashboardLayout from 'common/layout/dashboardLayout'
import FeaturedSection from './sections/featuring'
import StatsSection from './sections/stats'

function UserListScreen() {

  return (
    <>
      <DashboardLayout>
        <StatsSection />
        <FeaturedSection />
      </DashboardLayout>
    </>
  )
}

export default UserListScreen
