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
import { mediaBaseURL } from 'utils'
import { SnackbarContext } from 'common/components/Snackbar'
import APIRequest from 'utils/API'

function PhotoInputs({ images, primaryImage, featureImage, code, invalidCode, posting, setPosting, setText, setArray, deletedFiles, setDeletedFiles }) {
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

    if(!featureImage || (!(images.includes(featureImage)) && images.length > 0)) {
      setText({
        target: {
          name: 'featureImage',
          value: images[0]
        }
      })
    } else if (images.length < 1 && featureImage) {
      setText({
        target: {
          name: 'featureImage',
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
    /* const newImages = images
    newImages.push(file)
    setArray(newImages, 'images') */

    setPosting(true)

    if (file) {
      const fileFormatName = `${code}-${file.name.split('.')[0]}`.replace(/ /g, '-').replace(/[\(\)']/g, '')
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
    const newImages = images

    if (!typeof images[i] === 'object') {
      const newDeleted = deletedFiles
      newDeleted.push(images[i])
      setDeletedFiles(newDeleted)
    }
    newImages.splice(i, 1)
    if(selected === key && images.length > 1) setSelected(newImages[0])
    setArray(newImages, 'images')
  }

  const determineLocal = (image) => typeof image === 'object' ? URL.createObjectURL(image) : `${mediaBaseURL}${encodeURIComponent(image).replace('(', '%28').replace(')', '%29')}`

  const AddPhotoButton = () => (
    <>
      <input
        accept="image/*,video/mp4"
        id="icon-button-photos"
        type="file"
        disabled={posting || !code || images.length > 9 || invalidCode}
        onChange={e => handleUploadImage(e.target.files[0])}
        style={{ display: 'none' }}
      />
      <label htmlFor="icon-button-photos">
        <Box
          border={`1px solid ${(code && !posting && images.length < 10 && !invalidCode) ? '#565656' : '#EFEFEF'}`}
          borderRadius="20px"
          bgcolor="#FFFFFF"
          height="120px"
          width="180px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ cursor: (code && !posting && images.length < 10 && !invalidCode) ? 'pointer' : 'no-drop' }}
          color={(code && !posting && images.length < 10 && !invalidCode) ? '#565656' : '#EFEFEF'}
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
        Media
        <Typography variant="caption"> (Maximum 10 media, photos or MP4)</Typography>
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
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat', 
                    backgroundImage: !determineLocal(image).includes('mp4') ? `url(${determineLocal(image)})` : 'url(/video.png)',
                    cursor: 'pointer'
                  }}
                >
                  <IconButton
                    onClick={e => {
                      e.stopPropagation()
                      deleteFile(image, i)
                    }}
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
              {selected.includes('mp4') && (
                <video autoPlay loop muted showControl preload="metadata" style={{ width: '100%' }}>
                  <source src={determineLocal(selected)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {!selected.includes('mp4') && (
                <img width="100%" src={determineLocal(selected)} />
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={primaryImage === selected}
                    disabled={selected.includes('mp4')}
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
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={featureImage === selected}
                    onChange={() => {
                      setText({
                        target: {
                          name: 'featureImage',
                          value: selected
                        }
                      })
                    }}
                  />
                }
                label="Make Feature Photo"
              />
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  )
}

export default PhotoInputs
