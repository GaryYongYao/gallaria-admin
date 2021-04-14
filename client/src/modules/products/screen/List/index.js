import { useState, useContext, useEffect } from 'react'
import DashboardLayout from 'common/layout/dashboardLayout'
// import { SnackbarContext } from 'common/components/Snackbar'
import CustomTable from 'common/components/CustomTable'
import AlertConfirm from 'common/components/AlertConfirm'
import FloatingButton from 'common/components/FloatingButton'
import { useRoutes } from 'utils'
import { UserContext } from 'utils/sessions'
// import request from 'utils/request'
import { columns, actions } from '../../constant'

function SupplierListScreen() {
  const [chosen, setChosen] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  // const { openSnackbar } = useContext(SnackbarContext)
  const { userRole } = useContext(UserContext)
  const [products, setSuppliers] = useState([])
  const { history } = useRoutes()

  useEffect(() => {
    getSuppliers()
    // eslint-disable-next-line
  }, [])

  const getSuppliers = () => {
  }

  return (
    <>
      <DashboardLayout>
        <CustomTable
          title="Products"
          columns={columns}
          data={products}
          actions={userRole === 'admin'
          && actions(
            setChosen,
            setIsOpen,
            setIsAlertOpen
          )}
        />
      </DashboardLayout>
      {userRole === 'admin' && <FloatingButton onClick={() => history.push({ pathname: '/supplier-add' })} />}
    </>
  )
}

export default SupplierListScreen
