import { useContext, useEffect, useState } from 'react'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core'
import {
  Add as AddIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import { SnackbarContext } from 'common/components/Snackbar'
import APIRequest from 'utils/API'

function PhotoInputs({ images, primaryImage, code, posting, setPosting, setText, setArray }) {
  const { openSnackbar } = useContext(SnackbarContext)
  const [selected, setSelected] = useState(primaryImage ? primaryImage : '')

  useEffect(() => {
    if(!primaryImage || (!(images.includes(primaryImage)) && images.length > 0)) {
      setText({
        target: {
          name: 'primaryImage',
          value: images[0]
        }
      })
    } else if (images.length < 1 && primaryImage) {
      setText({
        target: {
          name: 'primaryImage',
          value: ''
        }
      })
    }
  }, [JSON.stringify(images)])

  useEffect(() => {
    if(!selected) {
      setSelected(primaryImage)
    }
  }, [primaryImage])

  const handleUploadImage = (file) => {
    setPosting(true)

    if (file) {
      const fileFormatName = `${code}-${file.name.split('.')[0]}`.replace(/ /g, '-')
      const formData = new FormData()
      
      formData.append('file', file)
      formData.append('fileName', fileFormatName)
      formData.append('bucketFolder', 'productImg')

      APIRequest('POST', '/api/file-upload', formData)
        .then(res => {
          if (res.errors) {
            openSnackbar('Upload failed!', 'error')
          } else {
            if (images < 1) {
              setSelected(res.data.Key)
            }
            openSnackbar('Upload Success', 'success')
            const newImages = images
            newImages.push(res.data.Key)
            setArray(newImages, 'images')
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
          const newImages = images
          newImages.splice(i, 1)
          if(selected === key && images.length > 1) setSelected(newImages[0])
          setArray(newImages, 'images')
          document.getElementById('icon-button-file').value = ''
        }
        setPosting(false)
      })
  }


  const AddPhotoButton = () => (
    <>
      <input
        accept="image/*"
        id="icon-button-photos"
        type="file"
        disabled={posting || !code && images.length > 9}
        onChange={e => handleUploadImage(e.target.files[0])}
        style={{ display: 'none' }}
      />
      <label htmlFor="icon-button-photos">
        <Box
          border={`1px solid ${(code && !posting && images.length < 10) ? '#565656' : '#EFEFEF'}`}
          borderRadius="20px"
          bgcolor="#FFFFFF"
          height="120px"
          width="180px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ cursor: (code && !posting && images.length < 10) ? 'pointer' : 'no-drop' }}
          color={(code && !posting && images.length < 10) ? '#565656' : '#EFEFEF'}
          mt={3}
        >
          <AddIcon />
        </Box>
      </label>
    </>
  )

  return (
    <Box>
      <Typography variant="h6">
        Photos
        <Typography variant="caption"> (Maximum 10 photos)</Typography>
      </Typography>
      {images.length < 1 && (
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
      {images.length > 0 && (
        <Grid container spacing={2}>
          <Grid
            item
            xs={8}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box mt={2} width="100%" display="flex" flexWrap="wrap">
              {images.map((image, i) => (
                <div
                  key={image}
                  onClick={() => setSelected(image)}
                  style={{
                    border: selected === image ? '1px solid #000' : 0,
                    position: 'relative',
                    height: '200px',
                    width: '180px',
                    margin: '7.5px',
                    backgroundPosition: 'center',
                    backgroundImage: `url(https://gallaria-dev-storage.s3-ap-southeast-2.amazonaws.com/${encodeURIComponent(image)})`,
                    cursor: 'pointer'
                  }}
                >
                  <IconButton
                    onClick={() => deleteFile(image, i)}
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
              ))}
            </Box>
            <AddPhotoButton />
          </Grid>
          {selected && (
            <Grid item xs={4}>
              <img width="100%" src={`https://gallaria-dev-storage.s3-ap-southeast-2.amazonaws.com/${encodeURIComponent(selected)}`} />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={primaryImage === selected}
                    onChange={() => {
                      setText({
                        target: {
                          name: 'primaryImage',
                          value: selected
                        }
                      })
                    }}
                  />
                }
                label="Make Cover Photo"
              />
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  )
}

export default PhotoInputs
