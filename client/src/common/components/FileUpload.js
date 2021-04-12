import React from 'react'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@material-ui/core'
import {
  Clear as ClearIcon,
  Description as DocIcon,
  PhotoCamera as PhotoCameraIcon
} from '@material-ui/icons'

const FileUpload = ({
  title,
  accept,
  handleDeleteFile,
  handleUpload,
  selectedFile,
}) => (
  <>
    <input
      accept={accept}
      id="icon-button-file"
      type="file"
      onChange={e => handleUpload(e.target.files[0])}
      style={{ display: 'none' }}
    />
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="ic-photo-input">{title}</InputLabel>
      <OutlinedInput
        value={selectedFile}
        fullWidth
        disabled
        labelWidth={100}
        startAdornment={(
          !selectedFile
          && (
            <InputAdornment position="end">
              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload Agreement" component="span">
                  {accept === 'application/pdf' && <DocIcon />}
                  {accept === 'image/*' && <PhotoCameraIcon />}
                </IconButton>
              </label>
            </InputAdornment>
          )
        )}
        endAdornment={
          selectedFile
          && (
            <InputAdornment position="end">
              <IconButton onClick={() => handleDeleteFile()}>
                <ClearIcon color="error" />
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </FormControl>
  </>
)

export default FileUpload
