import { useContext } from 'react'
import {
  Box,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core'
import {
  Add as AddIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import { mediaBaseURL } from 'utils'
import { SnackbarContext } from 'common/components/Snackbar'
import APIRequest from 'utils/API'

function PhotosInput({ photos, id, posting, setPosting, setArray }) {
  const { openSnackbar } = useContext(SnackbarContext)

  const handleUploadImage = (file) => {
    setPosting(true)

    if (file) {
      const fileFormatName = `${id}-${file.name.split('.')[0]}`.replace(/ /g, '-')
      const formData = new FormData()
      
      formData.append('file', file)
      formData.append('fileName', fileFormatName)
      formData.append('bucketFolder', 'projectPhotos')

      APIRequest('POST', '/api/file-upload', formData)
        .then(res => {
          if (res.errors) {
            openSnackbar('Upload failed!', 'error')
          } else {
            openSnackbar('Upload Success', 'success')
            const newPhotos = photos
            newPhotos.push(res.data.Key)
            setArray(newPhotos, 'photos')
          }
          setPosting(false)
        })
    }
  }

  const deleteFile = (i) => {
    const newPhotos = photos

    if (!typeof photos[i] === 'object') {
      const newDeleted = deletedFiles
      newDeleted.push(photos[i])
      setDeletedFiles(newDeleted)
    }
    newPhotos.splice(i, 1)
    setArray(newPhotos, 'photos')
  }

  const AddPhotoButton = () => (
    <>
      <input
        accept="image/*"
        id="icon-button-photo"
        type="file"
        disabled={posting || photos.length > 9}
        onChange={e => handleUploadImage(e.target.files[0])}
        style={{ display: 'none' }}
      />
      <label htmlFor="icon-button-photo">
        <Box
          border={`1px solid ${(!posting && photos.length < 10) ? '#565656' : '#EFEFEF'}`}
          borderRadius="20px"
          bgcolor="#FFFFFF"
          height="120px"
          width="180px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ cursor: (!posting && photos.length < 10) ? 'pointer' : 'no-drop' }}
          color={(!posting && photos.length < 10) ? '#565656' : '#EFEFEF'}
          mt={3}
        >
          <AddIcon />
        </Box>
      </label>
    </>
  )

  return (
    <Box>
      {photos.length < 1 && (
        <Box
          style={{
            textAlign: 'center',
            marginTop: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography variant="body1">No Images Added</Typography>
          <Typography variant="body1">Add by Clicking on Button Below</Typography>
          <AddPhotoButton />
        </Box>
      )}
      {photos.length > 0 && (
        <Grid container spacing={2}>
          {photos.map((photo, i) => (
            <Grid
              item
              key={photo}
              xs={6}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '10px'
              }}
            >
              <div
                key={photo}
                style={{
                  position: 'relative',
                  height: '300px',
                  width: '100%',
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat', 
                  backgroundImage: (typeof photo !== 'object') ? `url(${mediaBaseURL}${encodeURIComponent(photo)})` : `url(${URL.createObjectURL(photo)})`,
                  cursor: 'pointer'
                }}
              >
                <IconButton
                  onClick={() => deleteFile(i)}
                  aria-label={`Delete`}
                  style={{
                    padding: 0,
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </div>
            </Grid>
          ))}
          <Grid
            item
            xs={6}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                height: '300px',
                width: '100%',
                cursor: 'pointer'
              }}
            >
              <AddPhotoButton />
            </div>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default PhotosInput
