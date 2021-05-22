import { useState, useContext, useEffect } from 'react'
import { Typography, Tabs, Tab } from '@material-ui/core'
import DashboardLayout from 'common/layout/dashboardLayout'
import { SnackbarContext } from 'common/components/Snackbar'
import CustomTable from 'common/components/CustomTable'
import AlertConfirm from 'common/components/AlertConfirm'
import request from 'utils/request'
import { ReadMessage } from '../../components'
import { columns, actions, queryGetEnquiries, mutationReadMessage, mutationReplied, mutationDeleteEnquiry } from '../../constant'

function EnquiryListScreen() {
  const [chosen, setChosen] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const { openSnackbar } = useContext(SnackbarContext)
  const [enquiries, setEnquiries] = useState([])
  const [display, setDisplay] = useState([])
  const [list, setList] = useState(0)

  useEffect(() => {
    getEnquiries()
    // eslint-disable-next-line
  }, [])

  const getEnquiries = () => {
    request(queryGetEnquiries)
      .then(res => {
        const { getEnquiries, errors } = res.data.data
        if (errors) {
          openSnackbar(
            errors.message,
            'error'
          )
        }
        if (getEnquiries) {
          setEnquiries(getEnquiries)
        }
      })
  }

  useEffect(() => {
    setDisplayList()
  }, [enquiries])

  const setDisplayList = () => {
    let newDisplay = []
    if (list === 0) {
      newDisplay = enquiries.filter(u => !u.read)
    }
    if (list === 1) {
      newDisplay = enquiries.filter(u => (u.read && !u.replied))
    }
    if (list === 2) {
      newDisplay = enquiries.filter(u => (u.read && u.replied))
    }
    setDisplay(newDisplay)
  }

  useEffect(() => {
    setDisplayList()
  }, [list])

  const read = () => {
    if (chosen.read) return
    request(mutationReadMessage, {id: chosen._id, read: true})
      .then(res => {
        const { readEnquiry } = res.data.data
        openSnackbar(readEnquiry, 'success')
        getEnquiries()
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

  const setReplied = e => {
    const { name, checked } = e.target
    setChosen({
      ...chosen,
      [name]: checked
    })
    request(mutationReplied, {id: chosen._id, replied: checked})
      .then(res => {
        const { repliedEnquiry } = res.data.data
        openSnackbar(repliedEnquiry, 'success')
        getEnquiries()
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

  const deleteEnquiry = () => {
    request(mutationDeleteEnquiry, { id: chosen._id })
      .then(res => {
        const { deleteEnquiry } = res.data.data
        openSnackbar(deleteEnquiry, 'success')
        getEnquiries()
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
    setIsOpen(false)
    setChosen({})
  }

  return (
    <>
      <DashboardLayout>
        <CustomTable
          CustomTitle={() => (
            <>
              <Typography variant="h6">
                Enquiries
              </Typography>
              <Tabs
                value={list}
                indicatorColor="primary"
                textColor="primary"
                onChange={(e, val) => setList(val)}
              >
                <Tab label="Unread" id="unread" />
                <Tab label="Haven't Reply" id="not-replied" />
                <Tab label="Replied" id="replied" />
              </Tabs>
            </>
          )}
          columns={columns}
          data={display}
          actions={actions(setChosen, setIsOpen, setIsAlertOpen)}
        />
      </DashboardLayout>
      <ReadMessage
        chosen={chosen}
        isOpen={isOpen}
        read={read}
        closeEdit={closeEdit}
        setReplied={setReplied}
      />
      <AlertConfirm
        open={isAlertOpen}
        title={`Delete message`}
        text={`Do you want to delete this message?`}
        confirmClick={deleteEnquiry}
        handleModalOpen={setIsAlertOpen}
      />
    </>
  )
}

export default EnquiryListScreen
