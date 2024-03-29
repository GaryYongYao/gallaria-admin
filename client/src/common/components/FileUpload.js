import {
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@material-ui/core'
import {
  Clear as ClearIcon,
  Description as DocIcon,
  PhotoCamera as PhotoCameraIcon,
  Visibility as PreviewIcon
} from '@material-ui/icons'

const FileUpload = ({
  title,
  disabled,
  posting,
  accept,
  handleDeleteFile,
  handleUpload,
  selectedFile,
  helperText,
  preview
}) => (
  <>
    <input
      accept={accept}
      id="icon-button-file"
      type="file"
      disabled={disabled}
      onChange={e => {
        handleUpload(e.target.files[0])
      }}
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
            <InputAdornment position="end" style={{ marginLeft: 0 }}>
              <label htmlFor="icon-button-file">
                <IconButton disabled={disabled} color="primary" aria-label="upload Agreement" component="span" style={{ padding: 0 }}>
                  {!posting && (
                    <>
                      {accept === 'application/pdf' && <DocIcon />}
                      {accept === 'image/*' && <PhotoCameraIcon />}
                    </>
                  )}
                  {posting && (
                    <CircularProgress size={14} />
                  )}
                </IconButton>
              </label>
            </InputAdornment>
          )
        )}
        endAdornment={
          selectedFile
          && (
            <>
              {preview && (
                <InputAdornment position="end">
                  <IconButton onClick={() => window.open(preview, '_blank')}>
                    <PreviewIcon color="primary" />
                  </IconButton>
                </InputAdornment>
              )}
              <InputAdornment position="end">
                <IconButton onClick={handleDeleteFile}>
                  {posting ? <CircularProgress size={14} />
                    : <ClearIcon color="error" />
                  }
                  
                </IconButton>
              </InputAdornment>
            </>
          )
        }
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  </>
)

export default FileUpload
