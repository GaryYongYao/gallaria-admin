import { useState, useContext, useEffect } from 'react'
import DashboardLayout from 'common/layout/dashboardLayout'
import { SnackbarContext } from 'common/components/Snackbar'
import CustomTable from 'common/components/CustomTable'
import AlertConfirm from 'common/components/AlertConfirm'
import { useRoutes } from 'utils'
import request from 'utils/request'
import { columns, actions, queryGetLocations, mutationDeleteLocation } from '../constant'

function ProductListScreen() {
  const [chosen, setChosen] = useState({})
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const { openSnackbar } = useContext(SnackbarContext)
  const [showrooms, setShowrooms] = useState([])
  const { history } = useRoutes()

  useEffect(() => {
    getLocations()
    // eslint-disable-next-line
  }, [])

  const getLocations = () => {
    request(queryGetLocations)
      .then(res => {
        const { getLocations, errors } = res.data.data
        if (errors) openSnackbar(errors.message, 'error')
        if (getLocations) setShowrooms(getLocations)
      })
      .catch(err => openSnackbar(err.message, 'error'))
  }

  const deleteLocation = () => {
    request(mutationDeleteLocation, { id: chosen._id })
      .then(res => {
        const { deleteLocation } = res.data.data
        openSnackbar(deleteLocation, 'success')
        getLocations()
        setChosen({})
        setIsAlertOpen(false)
      })
      .catch(err => openSnackbar(err.message, 'error'))
  }

  return (
    <>
      <DashboardLayout>
        <CustomTable
          title="Showrooms"
          link="/showroom-add"
          columns={columns}
          data={showrooms}
          actions={actions(
            history,
            setChosen,
            setIsAlertOpen
          )}
        />
      </DashboardLayout>
      <AlertConfirm
        open={isAlertOpen}
        title={`Delete ${chosen.name}`}
        text={`Do you want to delete ${chosen.name}?`}
        confirmClick={deleteLocation}
        handleModalOpen={setIsAlertOpen}
      />
    </>
  )
}

export default ProductListScreen
