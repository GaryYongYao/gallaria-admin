import { useState, useContext, useEffect } from 'react'
import DashboardLayout from 'common/layout/dashboardLayout'
import { Box, Button, Typography } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { SnackbarContext } from 'common/components/Snackbar'
import CustomTable from 'common/components/CustomTable'
import AlertConfirm from 'common/components/AlertConfirm'
import { useRoutes } from 'utils'
import request from 'utils/request'
import { UserContext } from 'utils/sessions'
import { columns, actions, queryGetAllProjects, mutationCreateProject, mutationDeleteProject } from '../../constant'

function ProductListScreen() {
  const { userContext } = useContext(UserContext)
  const [chosen, setChosen] = useState({})
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const { openSnackbar } = useContext(SnackbarContext)
  const { login } = userContext
  const [products, setProducts] = useState([])
  const { history } = useRoutes()

  useEffect(() => {
    getAllProjects()
    // eslint-disable-next-line
  }, [])

  const getAllProjects = () => {
    request(queryGetAllProjects)
      .then(res => {
        const { getAllProjects, errors } = res.data.data
        if (errors) openSnackbar(errors.message, 'error')
        if (getAllProjects) setProducts(getAllProjects)
      })
      .catch(err => openSnackbar(err.message, 'error'))
  }

  const deleteProject = () => {
    request(mutationDeleteProject, { id: chosen._id })
      .then(res => {
        const { deleteProject } = res.data.data
        openSnackbar(deleteProject, 'success')
        getAllProjects()
        setChosen({})
        setIsAlertOpen(false)
      })
      .catch(err => openSnackbar(err.message, 'error'))
  }

  const handleAdd = () => {
    request(mutationCreateProject, { id: login._id })
      .then(res => {
        const { createProject } = res.data.data
        getAllProjects()
        history.push({ pathname: `/project/${createProject}` })
      })
      .catch(err => openSnackbar(err.message, 'error'))
  }

  return (
    <>
      <DashboardLayout>
        <CustomTable
          CustomTitle={() => (
            <Box display="flex">
              <Typography variant="h6">
                Projects
              </Typography>
              <Button
                size="small"
                variant="contained"
                color="primary"
                endIcon={<AddIcon />}
                onClick={handleAdd}
                style={{ marginLeft: '15px' }}
              >
                Add New
              </Button>
            </Box>
          )}
          columns={columns}
          data={products}
          actions={actions(
            history,
            setChosen,
            setIsAlertOpen
          )}
        />
      </DashboardLayout>
      <AlertConfirm
        open={isAlertOpen}
        title={`Delete ${chosen._id}`}
        text={`Do you want to delete ${chosen._id}?`}
        confirmClick={deleteProject}
        handleModalOpen={setIsAlertOpen}
      />
    </>
  )
}

export default ProductListScreen
