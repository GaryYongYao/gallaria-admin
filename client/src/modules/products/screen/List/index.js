import { useState, useContext, useEffect } from 'react'
import DashboardLayout from 'common/layout/dashboardLayout'
import { SnackbarContext } from 'common/components/Snackbar'
import CustomTable from 'common/components/CustomTable'
import AlertConfirm from 'common/components/AlertConfirm'
import { useRoutes } from 'utils'
import request from 'utils/request'
import { columns, actions, queryGetAllProducts, mutationDeleteProduct } from '../../constant'

function ProductListScreen() {
  const [chosen, setChosen] = useState({})
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const { openSnackbar } = useContext(SnackbarContext)
  const [products, setProducts] = useState([])
  const { history } = useRoutes()

  useEffect(() => {
    getAllProducts()
    // eslint-disable-next-line
  }, [])

  const getAllProducts = () => {
    request(queryGetAllProducts)
      .then(res => {
        const { getAllProducts, errors } = res.data.data
        if (errors) openSnackbar(errors.message, 'error')
        if (getAllProducts) setProducts(getAllProducts)
      })
      .catch(err => openSnackbar(err.message, 'error'))
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
      <DashboardLayout>
        <CustomTable
          title="Products"
          link="/product-add"
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
        title={`Delete ${chosen.name}`}
        text={`Do you want to delete ${chosen.code}?`}
        confirmClick={deleteCategory}
        handleModalOpen={setIsAlertOpen}
      />
    </>
  )
}

export default ProductListScreen
