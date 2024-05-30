import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Stack, FormControl, InputLabel, Select, MenuItem, FormHelperText  } from '@mui/material';
import { ContactPageSharp } from '@mui/icons-material';
import withRouter from 'src/helpers/withRouter';
import noImage from 'src/assets/images/no_image.jpg';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  
  return errors
}

class CategoryForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formData: 'formData' in this.props ? this.props.formData : null
    }
    
  }

  componentDidMount(){
    if(this.state.formData){
      this.props.initialize(this.state.formData)
    }else{
      this.props.initialize(this.getDefaultValues());
    }
    
  }

  getDefaultValues = () => {
    return {
      name: '',
      status: 1,
      front: 1
    }
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    return update;
  }

  renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      label={label}
      fullWidth
      error={touched && error ? true : false}
      helperText={touched && error ? error : ''}
      {...input}
      {...custom}
    />
  )

  renderIsMaterialCertifiedField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {
        label ? 
        <InputLabel>{label}</InputLabel>
        : null
      }
      <Select
        label={label}
        fullWidth
        {...input}
        {...custom}
      >
        <MenuItem value="1">Yes</MenuItem>
        <MenuItem value="0">No</MenuItem>
      </Select>
      {
        touched && error ? 
        <FormHelperText>{error}</FormHelperText>
        : null
      }
      
    </FormControl>
  )

  renderIsMaterialField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {
        label ? 
        <InputLabel>{label}</InputLabel>
        : null
      }
      <Select
        label={label}
        fullWidth
        {...input}
        {...custom}
      >
        <MenuItem value="0">Yes</MenuItem>
        <MenuItem value="1">No</MenuItem>
      </Select>
      {
        touched && error ? 
        <FormHelperText>{error}</FormHelperText>
        : null
      }
      
    </FormControl>
  )

  renderStatusField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {
        label ? 
        <InputLabel>{label}</InputLabel>
        : null
      }
      <Select
        label={label}
        fullWidth
        {...input}
        {...custom}
      >
        <MenuItem value="1">Active</MenuItem>
        <MenuItem value="0">Inactive</MenuItem>
      </Select>
      {
        touched && error ? 
        <FormHelperText>{error}</FormHelperText>
        : null
      }
      
    </FormControl>
  )

  renderFrontField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {
        label ? 
        <InputLabel>{label}</InputLabel>
        : null
      }
      <Select
        label={label}
        fullWidth
        {...input}
        {...custom}
      >
        <MenuItem value="1">Yes</MenuItem>
        <MenuItem value="0">No</MenuItem>
      </Select>
      {
        touched && error ? 
        <FormHelperText>{error}</FormHelperText>
        : null
      }
      
    </FormControl>
  )

  adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

  renderImageField = ({ 
    input: { value: omitValue, onChange, onBlur, ...inputProps }, 
    meta: omitMeta,
    label,
    ...props 
  }) => (
    <Button variant="contained" component="label">
      {label}
      <input 
        hidden 
        accept="image/*" 
        onChange={this.adaptFileEventToValue(onChange)}
        onBlur={this.adaptFileEventToValue(onBlur)}
        type="file"
        {...props.input}
        {...props}
      />
    </Button>
  )

  getImageSrc = (item, fileKey, formKey) => {
    if(item && item[fileKey]){
      return URL.createObjectURL(item[fileKey]);
    }else{
      return (this.state.formData && this.state.formData[formKey]) ? this.state.formData[formKey] : '';
    }
  }

  render() {
    const { handleSubmit, pristine, submitting, formValues } = this.props;
    return (
      <form onSubmit={ handleSubmit } className="category_form">
         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} className='create-input'>
                    <Field
                      name="name"
                      component={this.renderTextField}
                      label="Category Name"
                    />
              </Grid>
              <Grid item xs={12} md={3} className='create-input'>
                  <Field
                    name="is_ceritified"
                    component={this.renderIsMaterialCertifiedField}
                    label="Is Certified?"
                    type="select"
                  />
              </Grid>
              <Grid item xs={12} md={3} className='create-input'>
                  <Field
                    name="is_material"
                    component={this.renderIsMaterialCertifiedField}
                    label="Is Material?"
                    type="select"
                  />
              </Grid>
              {/*<Grid item xs={3} className='create-input'>
                  <Field
                    name="is_material"
                    component={this.renderIsMaterialField}
                    label="Is Certified?"
                    type="select"
                  />
            </Grid>*/}
              
              {
                (this.getImageSrc(formValues, 'bannerFile', 'banner')) ? 
                <Grid item xs={12} md={2} className='create-input'>
                  <img src={this.getImageSrc(formValues, 'bannerFile', 'banner')} id="logo-img" style={{height: '100px', width: '100px'}} />
                </Grid>
                :
                <Grid item xs={12} md={2} className='create-input'>
                  <img src={noImage} id="logo-img" style={{height: '100px', width: '100px'}} />
                </Grid>
              }
              <Grid item xs={12} md={2} className='create-input banner_sec'>
                <Field
                  name="bannerFile"
                  component={this.renderImageField}
                  label="Banner"
                  type="file"
                />
              </Grid>
              {
                (this.getImageSrc(formValues, 'iconFile', 'icon')) ? 
                <Grid item xs={12} md={2} className='create-input'>
                  <img src={this.getImageSrc(formValues, 'iconFile', 'icon')} id="logo-img" style={{height: '100px', width: '100px'}} />
                </Grid>
                :
                <Grid item xs={12} md={2} className='create-input'>
                  <img src={noImage} id="logo-img" style={{height: '100px', width: '100px'}} />
                </Grid>
              }
              <Grid item xs={12} md={2} className='create-input'>
                <Field
                  name="iconFile"
                  component={this.renderImageField}
                  label="Icon"
                  type="file"
                />
              </Grid>
              <Grid item xs={12} md={2} className='create-input'>
                  <Field
                    name="status"
                    component={this.renderStatusField}
                    label="Status"
                    type="select"
                  />
              </Grid>
              <Grid item xs={12} md={2} className='create-input'>
                  <Field
                    name="front"
                    component={this.renderFrontField}
                    label="Front"
                    type="select"
                  />
              </Grid>
              
            </Grid>
            <Stack spacing={1} mt={2} direction="row" className='modal-button-area'>
              <Button variant="contained" type="submit">Submit</Button>
              <Button variant="outlined" onClick={() => this.props.handleCancel() }>Cancel</Button>
            </Stack>
        </Box>
      </form>
    )
  }

}


const mapStateToProps = (state) => ({
  formValues: getFormValues('CategoryForm')(state, 'bannerFile')
});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'CategoryForm'
})(CategoryForm)));


