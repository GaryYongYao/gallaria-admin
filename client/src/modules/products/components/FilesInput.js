import { useContext } from 'react'
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core'
import {
  Clear as ClearIcon,
  Publish as UploadIcon,
  Visibility as PreviewIcon
} from '@material-ui/icons'
import { SnackbarContext } from 'common/components/Snackbar'
import APIRequest from 'utils/API'
import { mediaBaseURL } from 'utils'

const FileUpload = ({
  code,
  files,
  disabled,
  posting,
  setArray,
  setPosting,
  deletedFiles,
  setDeletedFiles
}) => {
  const { openSnackbar } = useContext(SnackbarContext)

  const handleUpload = (file) => {
    setPosting(true)

    if (file) {
      const fileFormatName = `${code}-${file.name.split('.')[0]}`.replace(/ /g, '-')
      const document = new FormData()
      
      document.append('file', file)
      document.append('fileName', fileFormatName)
      document.append('bucketFolder', 'productDoc')

      APIRequest('POST', '/api/file-upload', document)
        .then(res => {
          if (res.errors) {
            openSnackbar('Upload failed!', 'error')
          } else {
            openSnackbar('Upload Success', 'success')
            const newFiles = files
            newFiles.push(res.data.name)

            const deletedIndex = deletedFiles.indexOf(res.data.name)
            if (deletedIndex > -1) {
              const newDeleted = deletedFiles
              newDeleted.splice(deletedIndex, 1)
              setDeletedFiles(newDeleted)
            } 
            
            setArray(newFiles, 'file')
          }
          setPosting(false)
        })
    }
  }

  const deleteFile = (i) => {
    const newFiles = files

    if (typeof files[i] !== 'object') {
      const newDeleted = deletedFiles
      newDeleted.push(files[i])
      setDeletedFiles(newDeleted)
    }
    newFiles.splice(i, 1)
    setArray(newFiles, 'file')
  }

  return (
    <Grid item xs={12} md={6}>
      <input
        accept="application/pdf"
        id="icon-button-file"
        type="file"
        disabled={disabled}
        onChange={e => {
          handleUpload(e.target.files[0])
        }}
        style={{ display: 'none' }}
      />

      <Box display="flex" pt={2}>
        <Typography variant="h5">Documents</Typography>
        <label htmlFor="icon-button-file" style={{ marginLeft: 'auto' }}>
          <IconButton disabled={disabled} color="primary" aria-label="Upload Documents" component="span" style={{ padding: 0 }}>
            {!posting && <UploadIcon />}
            {posting && (
              <CircularProgress size={14} />
            )}
          </IconButton>
        </label>
      </Box>
      {files.map((f, i) => (
        <Box key={f} display="flex" justifyContent="space-between" alignItems="center" py={3}>
          <Box width="70%">
            <Typography variant="body1">{f}</Typography>
          </Box>
          <Box width="30%">
            <IconButton onClick={() => window.open(`${mediaBaseURL}${encodeURIComponent(f)}`, '_blank')}>
              <PreviewIcon color="primary" />
            </IconButton>
          </Box>
          <IconButton onClick={() => deleteFile(i)}>
            {posting ? <CircularProgress size={14} />
              : <ClearIcon color="error" />
            }
          </IconButton>
        </Box>
      ))}
    </Grid>
  )
}

export default FileUpload
