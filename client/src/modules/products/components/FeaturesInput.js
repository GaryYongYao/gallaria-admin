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

function FeaturesInput({ features, code, invalidCode, posting, setPosting, setArray }) {
  const { openSnackbar } = useContext(SnackbarContext)

  const handleUploadImage = (file) => {
    /* const newImages = features
    newImages.push(file)
    setArray(newImages, 'features') */


    setPosting(true)

    if (file) {
      const fileFormatName = `${code}-${file.name.split('.')[0]}`.replace(/ /g, '-')
      const formData = new FormData()
      
      formData.append('file', file)
      formData.append('fileName', fileFormatName)
      formData.append('bucketFolder', 'productFeature')

      APIRequest('POST', '/api/file-upload', formData)
        .then(res => {
          if (res.errors) {
            openSnackbar('Upload failed!', 'error')
          } else {
            openSnackbar('Upload Success', 'success')
            const newFeatures = features
            newFeatures.push(res.data.Key)
            setArray(newFeatures, 'features')
          }
          setPosting(false)
        })
    }
  }

  const deleteFile = (key, i) => {
    setPosting(true)
    const formData = new FormData()
    formData.append('key', key)

    APIRequest('POST', '/api/file-delete', formData)
      .then(res => {
        if (res.errors) {
          openSnackbar('Deletion failed!', 'error')
        } else {
          openSnackbar('Deletion Success', 'success')
          const newFeatures = features
          newFeatures.splice(i, 1)
          setArray(newFeatures, 'features')
          document.getElementById('icon-button-file').value = ''
        }
        setPosting(false)
      })
  }


  const AddPhotoButton = () => (
    <>
      <input
        accept="image/*"
        id="icon-button-feature"
        type="file"
        disabled={posting || !code || features.length > 9 || invalidCode}
        onChange={e => handleUploadImage(e.target.files[0])}
        style={{ display: 'none' }}
      />
      <label htmlFor="icon-button-feature">
        <Box
          border={`1px solid ${(code && !posting && features.length < 8 && !invalidCode) ? '#565656' : '#EFEFEF'}`}
          borderRadius="20px"
          bgcolor="#FFFFFF"
          height="120px"
          width="180px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ cursor: (code && !posting && features.length < 8 && !invalidCode) ? 'pointer' : 'no-drop' }}
          color={(code && !posting && features.length < 8 && !invalidCode) ? '#565656' : '#EFEFEF'}
          mt={3}
        >
          <AddIcon />
        </Box>
      </label>
    </>
  )

  return (
    <Box>
      <Typography variant="h6" style={{ marginBottom: '10px' }}>
        Features
        <Typography variant="caption"> (Maximum 8 photos)</Typography>
      </Typography>
      {features.length < 1 && (
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
      {features.length > 0 && (
        <Grid container spacing={2}>
          {features.map((feature, i) => (
            <Grid
              item
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
                key={feature}
                style={{
                  position: 'relative',
                  height: '300px',
                  width: '100%',
                  backgroundPosition: 'center',
                  backgroundImage: (typeof feature !== 'object') ? `url(${mediaBaseURL}${encodeURIComponent(feature)})` : `url(${URL.createObjectURL(feature)})`,
                  cursor: 'pointer'
                }}
              >
                <IconButton
                  onClick={() => deleteFile(feature, i)}
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

export default FeaturesInput
