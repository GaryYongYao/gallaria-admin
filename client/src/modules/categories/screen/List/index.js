import { useState, useContext, useEffect } from 'react'
import DashboardLayout from 'common/layout/dashboardLayout'
import { SnackbarContext } from 'common/components/Snackbar'
import CustomTable from 'common/components/CustomTable'
import AlertConfirm from 'common/components/AlertConfirm'
import FloatingButton from 'common/components/FloatingButton'
import { useRoutes } from 'utils'
import { UserContext } from 'utils/sessions'
import request from 'utils/request'
import { EditDrawer } from '../../components'
import { columns, actions, queryGetCategories, mutationEditCategory, mutationDeleteCategory } from '../../constant'

function CategoryListScreen() {
  const [chosen, setChosen] = useState({
    name: '',
    sub: []
  })
  const [isOpen, setIsOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const { openSnackbar } = useContext(SnackbarContext)
  const { userContext } = useContext(UserContext)
  const { login } = userContext
  const [categories, setCategories] = useState([])
  const { history } = useRoutes()

  useEffect(() => {
    getCategories()
    // eslint-disable-next-line
  }, [])

  const getCategories = () => {
    request(queryGetCategories)
      .then(res => {
        const { getCategories, errors } = res.data.data
        if (errors) {
          openSnackbar(
            errors.message,
            'error'
          )
        }
        if (getCategories) {
          setCategories(getCategories)
        }
      })
  }

  const editCategory = () => {
    const { _id, name, sub } = chosen

    request(mutationEditCategory, {
      categoryUpdate: {
        _id,
        name,
        sub,
        updatedBy: login._id
      }
    })
      .then(res => {
        const { editCategory } = res.data.data
        openSnackbar(editCategory, 'success')
        getCategories()
        setChosen({
          name: '',
          sub: []
        })
        setIsOpen(false)
      })
      .catch(err => {
        openSnackbar(
          err.message,
          'error'
        )
      })
  }

  const setValue = e => {
    const { name, value } = e.target
    setChosen({
      ...chosen,
      [name]: value
    })
  }
  
  const setArray = (value, name) => {
    setChosen({
      ...chosen,
      [name]: value
    })
  }

  const deleteCategory = () => {
    request(mutationDeleteCategory, { id: chosen._id })
      .then(res => {
        const { deleteCategory } = res.data.data
        openSnackbar(deleteCategory, 'success')
        getCategories()
        setChosen({
          name: '',
          sub: []
        })
        setIsAlertOpen(false)
      })
      .catch(err => {
        openSnackbar(
          err.message,
          'error'
        )
      })
  }

  const closeEdit = () => {
    setIsOpen(false)
    setChosen({
      name: '',
      sub: []
    })
  }

  return (
    <>
      <DashboardLayout>
        <CustomTable
          title="Categories"
          columns={columns}
          data={categories}
          actions={actions(setChosen, setIsOpen, setIsAlertOpen, login._id)}
        />
      </DashboardLayout>
      <FloatingButton onClick={() => history.push({ pathname: '/categories-add' })} />
      <EditDrawer
        chosen={chosen}
        isOpen={isOpen}
        editCategory={editCategory}
        closeEdit={closeEdit}
        setValue={setValue}
        setArray={setArray}
      />
      <AlertConfirm
        open={isAlertOpen}
        title={`Delete ${chosen.name}`}
        text={`Do you want to delete ${chosen.name}?`}
        confirmClick={deleteCategory}
        handleModalOpen={setIsAlertOpen}
      />
    </>
  )
}

export default CategoryListScreen
