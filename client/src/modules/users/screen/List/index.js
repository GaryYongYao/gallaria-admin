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
import { columns, actions, queryGetUsers, mutationUpdateUser, mutationDeleteUser } from '../../constant'

function UserListScreen() {
  const [chosen, setChosen] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const { openSnackbar } = useContext(SnackbarContext)
  const { userContext } = useContext(UserContext)
  const { login } = userContext
  const [users, setUsers] = useState([])
  const { history } = useRoutes()

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line
  }, [])

  const getUsers = () => {
    request(queryGetUsers)
      .then(res => {
        const { getUsers, errors } = res.data.data
        if (errors) {
          openSnackbar(
            errors.message,
            'error'
          )
        }
        if (getUsers) {
          setUsers(getUsers)
        }
      })
  }

  const updateUser = () => {
    const { _id, username, role } = chosen

    request(mutationUpdateUser, {
      id: _id,
      username,
      role
    })
      .then(res => {
        const { editUser } = res.data.data
        openSnackbar(editUser, 'success')
        getUsers()
        setChosen({})
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

  const deleteUser = () => {
    request(mutationDeleteUser, { id: chosen._id })
      .then(res => {
        const { deleteUser } = res.data.data
        openSnackbar(deleteUser, 'success')
        getUsers()
        setChosen({})
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
    setChosen({})
    setIsOpen(false)
  }

  return (
    <>
      <DashboardLayout>
        <CustomTable
          title="Users"
          columns={columns}
          data={users}
          actions={actions(setChosen, setIsOpen, setIsAlertOpen, login._id)}
        />
      </DashboardLayout>
      <FloatingButton onClick={() => history.push({ pathname: '/users-add' })} />
      <EditDrawer
        chosen={chosen}
        isOpen={isOpen}
        updateUser={updateUser}
        closeEdit={closeEdit}
        setValue={setValue}
      />
      <AlertConfirm
        open={isAlertOpen}
        title={`Delete ${chosen.username}`}
        text={`Do you want to delete ${chosen.username}?`}
        confirmClick={deleteUser}
        handleModalOpen={setIsAlertOpen}
      />
    </>
  )
}

export default UserListScreen
