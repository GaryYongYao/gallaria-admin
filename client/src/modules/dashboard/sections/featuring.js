import { useState, useContext, useEffect } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import MaterialTable from '@material-table/core'
import { SnackbarContext } from 'common/components/Snackbar'
import AlertConfirm from 'common/components/AlertConfirm'
import request from 'utils/request'
import { columns, actions, queryGetFeatured } from '../constant'

export const options = {
  pageSize: 11,
  pageSizeOptions: [],
  filtering: true,
  actionsColumnIndex: -1,
  sorting: true
}

function FeatureProducts() {
  const [chosen, setChosen] = useState({})
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const { openSnackbar } = useContext(SnackbarContext)
  const [products, setProducts] = useState([])

  useEffect(() => {
    getAllProjects()
    // eslint-disable-next-line
  }, [])

  const getAllProjects = () => {
    request(queryGetFeatured)
      .then(res => {
        const { getFeaturedAdmin, errors } = res.data.data
        if (errors) openSnackbar(errors.message, 'error')
        if (getFeaturedAdmin) setProducts(getFeaturedAdmin)
      })
      .catch(err => openSnackbar(err.message, 'error'))
  }

  const handleAdd = () => {
    if (products.length >= 0) openSnackbar('Maximum 11 feature products', 'error')
    if (products.length >= 11) openSnackbar('Maximum 11 feature products', 'error')
  }

  const deleteCategory = () => {
    request(mutationDeleteProduct, { id: chosen._id })
      .then(res => {
        const { deleteProduct } = res.data.data
        openSnackbar(deleteProduct, 'success')
        getAllProducts()
        setChosen({})
        setIsAlertOpen(false)
      })
      .catch(err => openSnackbar(err.message, 'error'))
  }

  return (
    <>
      <MaterialTable
        title={
          <Box display="flex">
            <Typography variant="h6">
              Feature Products
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
        }
        columns={columns}
        data={products}
        options={options}
        actions={actions(
          setChosen,
          setIsAlertOpen
        )}
      />
      <AlertConfirm
        open={isAlertOpen}
        title={`Delete ${chosen.name}`}
        text={`Do you want to delete ${chosen.code}?`}
        confirmClick={deleteCategory}
        handleModalOpen={setIsAlertOpen}
      />
    </>
  )
}

export default FeatureProducts
