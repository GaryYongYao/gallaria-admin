import { useState, useContext, useEffect } from 'react'
import { findIndex } from 'lodash'
import { Box, Button, Typography } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import MaterialTable from '@material-table/core'
import { SnackbarContext } from 'common/components/Snackbar'
import AlertConfirm from 'common/components/AlertConfirm'
import request from 'utils/request'
import AddFeature from '../components/AddFeature'
import { columns, actions, queryGetFeatured, mutationAddFeature, mutationDeleteFeature, queryGetProducts } from '../constant'

export const options = {
  pageSize: 11,
  pageSizeOptions: [],
  filtering: true,
  actionsColumnIndex: -1,
  sorting: true,
  paging: false,
  search: false
}

function FeatureProducts() {
  const [chosen, setChosen] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const { openSnackbar } = useContext(SnackbarContext)
  const [products, setProducts] = useState([])
  const [value, setValue] = useState('')
  const [productOption, setProductOption] = useState([])
  const [availableProduct, setAvailableProduct] = useState([])

  useEffect(() => {
    getAllProjects()
    request(queryGetProducts)
      .then(res => {
        const { getProducts, errors } = res.data.data
        if (errors) openSnackbar(errors.message, 'error')
        if (getProducts) {
          setProductOption(getProducts)
          setAvailableProduct(getProducts)
        }
      })
      .catch(err => openSnackbar(err.message, 'error'))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const filtered = productOption.filter(option => {
      const index = findIndex(products, item => {
        return item.product._id === option._id
      })
      return !(index > -1)
    })
    setAvailableProduct(filtered)
    // eslint-disable-next-line
  }, [isOpen])

  const getAllProjects = () => {
    request(queryGetFeatured)
      .then(res => {
        const { getFeaturedAdmin, errors } = res.data.data
        if (errors) openSnackbar(errors.message, 'error')
        if (getFeaturedAdmin) setProducts(getFeaturedAdmin)
      })
      .catch(err => openSnackbar(err.message, 'error'))
  }

  const openAdd = () => {
    if (products.length >= 11) {
      openSnackbar('Maximum 11 feature products', 'error')
      return
    }
    setIsOpen(true)
  }

  const addProduct = () => {
    request(mutationAddFeature, { id: value })
      .then(res => {
        const { addFeature } = res.data.data
        openSnackbar(addFeature, 'success')
        getAllProjects()
        setValue('')
        setIsOpen(false)
      })
      .catch(err => openSnackbar(err.message, 'error'))
  }

  const deleteCategory = () => {
    request(mutationDeleteFeature, { id: chosen._id })
      .then(res => {
        const { deleteFeature } = res.data.data
        openSnackbar(deleteFeature, 'success')
        getAllProjects()
        setChosen({})
        setIsAlertOpen(false)
      })
      .catch(err => openSnackbar(err.message, 'error'))
  }

  const closeEdit = () => {
    setValue('')
    setIsOpen(false)
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
              onClick={openAdd}
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
      <AddFeature
        value={value}
        addProduct={addProduct}
        options={availableProduct}
        isOpen={isOpen}
        closeEdit={closeEdit}
        setValue={setValue}
      />
      <AlertConfirm
        open={isAlertOpen}
        title={`Delete ${(chosen.product || {}).name}`}
        text={`Do you want to delete ${(chosen.product || {}).code}?`}
        confirmClick={deleteCategory}
        handleModalOpen={setIsAlertOpen}
      />
    </>
  )
}

export default FeatureProducts
