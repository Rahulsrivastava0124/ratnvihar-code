import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Box, Grid, Button, FormControl, InputLabel, Select, TextField, MenuItem } from '@mui/material';
import LoginForm from 'forms/SuperAdmin/LoginForm';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { purchaseList, purchaseDelete } from 'actions/superadmin/purchase.actions';
import { subCategoryList } from 'actions/superadmin/subCategory.actions';
import DataTable from 'src/utils/DataTable';
import {RESET_PURCHASE} from 'actionTypes/superadmin/purchase.types';
import { withSnackbar } from 'notistack';
import { supplierList } from 'actions/superadmin/supplier.actions';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import {isDistributor, hasPermission, isEmpty} from 'src/helpers/helper';

class PurchasePage extends Component {

  constructor(props) { 
    super(props);

    this.state = {
      items: this.props.items,
      total: this.props.total,
      actionCalled: this.props.actionCalled,
      deleteSuccess: this.props.deleteSuccess,
      successMessage: this.props.successMessage,
      permissions: this.props.permissions,
      queryParams: {
        page: 1,
        limit: 50,
        supplier_id: '',
        search: '',
        date_from: null,
        date_to: null,
        status: "",
        all_purchase: this.props.query.get('all_purchase')
      },
      supplierList: this.props.supplierList
    }

    this.columns = [
      {
        name: 'invoice_number',
        display_name: 'Invoice Number'
      },
      {
        name: 'invoice_date',
        display_name: 'Invoice Date'
      },
      {
        name: 'supplier_name',
        display_name: 'Supplier Name'
      },
      {
        name: 'bill_amount',
        display_name: 'Total Amount'
      },
      {
        name: 'return_amount',
        display_name: 'Return Amount'
      },
      {
        name: 'paid_amount',
        display_name: 'Paid Amount'
      },
      {
        name: 'due_amount',
        display_name: 'Due Amount'
      },
      {
        name: 'due_date',
        display_name: 'Due Date'
      },
      {
        name: 'approve_status',
        display_name: 'Status',
        show_tag: true,
        color_conditions: [
          {
            key: "approve_status",
            value: "Pending",
            color: "primary"
          },
          {
            key: "approve_status",
            value: "Accepted",
            color: "success"
          },
          {
            key: "approve_status",
            value: "Declined",
            color: "error"
          }
        ]
      }
    ];
    
  }

  componentDidMount(){
    this.loadListData();
    this.props.actions.supplierList({all: 1, all_purchase: this.props.query.get('all_purchase')})
  }

  static getDerivedStateFromProps(props, state){
    let update = {};
    if(props.items !== state.items){
      update.items = props.items;
    }

    if(props.total !== state.total){
      update.total = props.total;
    }

    if(props.actionCalled !== state.actionCalled){
      update.actionCalled = props.actionCalled;
    }

    if(props.deleteSuccess !== state.deleteSuccess){
      update.deleteSuccess = props.deleteSuccess;
    }
    if(props.successMessage !== state.successMessage){
      update.successMessage = props.successMessage;
    }
    if(props.supplierList !== state.supplierList){
      update.supplierList = props.supplierList;
    }
    if(props.permissions !== state.permissions){
      update.permissions = props.permissions;
    }

    return update;
  }

  loadListData = () => {
    let data = {...this.state.queryParams};
    if(data.date_from){
        data.date_from = moment(data.date_from.toString()).format('YYYY-MM-DD')
    }
    if(data.date_to){
        data.date_to = moment(data.date_to.toString()).format('YYYY-MM-DD')
    }
    this.props.actions.purchaseList(data);
  }

  handlePagination = (page) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: page
      }
    }, () => {
      this.loadListData();
    })
    
  }

  handleEdit = (row) => {
    this.props.navigate('edit/' + row.id);
  }

  handleReturn = (row) => {
    this.props.navigate('return/' + row.id);
  }

  handleDelete = (row) => {
    this.props.actions.purchaseDelete(row.id);
  }

  handleView = (row) => {
    if(this.props.query.get('all_purchase') != 1){
      this.props.navigate('view/' + row.id);
    }else{
      this.props.navigate('all-view/' + row.id);
    }
  }

  componentDidUpdate(previousProps, previousState){
    if(this.state.deleteSuccess){
      const { dispatch } = this.props;
      this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
      dispatch({
        type: RESET_PURCHASE
      });
      this.handlePagination(1);
    }
  }

  handleSearchChange = (value, key) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        [key]: value
      }
    })
  }

  handleSearch = () => {
    this.loadListData();
  }

  render() {
    
    return (
      <MainCard title={this.props.query.get('all_purchase') == 1 ? "All Purchase List" : "Purchase List"} secondary={(!isDistributor() && hasPermission(this.state.permissions, 'purchase', 'add') && this.props.query.get('all_purchase') != 1) ? <Button variant="contained" onClick={() => this.props.navigate('create') }>Add</Button> : null} >
        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
          <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className='tax-input loans_view p_view'>
            <Grid item xs={6} md={2} className='create-input'>
              <FormControl fullWidth>
                <InputLabel>Supplier</InputLabel>
                <Select
                  value={this.state.queryParams.supplier_id}
                  label="Supplier"
                  onChange={(e) => this.handleSearchChange(e.target.value, 'supplier_id')}
                  className='input-inner'
                  defaultValue=""
                >
                  <MenuItem value="">All</MenuItem>
                  {
                    this.state.supplierList.map((item, index) => (
                      <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                      label="Date From"
                      inputFormat="DD/MM/YYYY"
                      value={this.state.queryParams.date_from}
                      onChange={(newValue) => this.handleSearchChange(newValue, 'date_from')}
                      renderInput={(params) => <TextField fullWidth {...params} />}
                  />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} md={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date To"
                        inputFormat="DD/MM/YYYY"
                        value={this.state.queryParams.date_to}
                        onChange={(newValue) => this.handleSearchChange(newValue, 'date_to')}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={6} md={2} className='create-input'>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={this.state.queryParams.status}
                  label="Status"
                  onChange={(e) => this.handleSearchChange(e.target.value, 'status')}
                  className='input-inner'
                  defaultValue=""
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="0">Pending</MenuItem>
                  <MenuItem value="1">Accepted</MenuItem>
                  <MenuItem value="2">Declined</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2} className='create-input'>
              <FormControl fullWidth>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={this.state.queryParams.search}
                  onChange={(e) => this.handleSearchChange(e.target.value, 'search')}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2} className='create-input order-input button-right'>
              <Button variant="contained" className='search-btn' onClick={this.handleSearch}>Search</Button>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={gridSpacing}>
          <DataTable 
            columns={this.columns}
            rows={this.state.items}
            page={this.state.queryParams.page}
            limit={this.state.queryParams.limit}
            total={this.state.total}
            handlePagination={this.handlePagination}
            actions={[
              {
                label: 'Return',
                onClick: this.handleReturn,
                color: 'primary',
                conditions: [
                  {
                    key: "approve_status",
                    value: "Accepted"
                  }
                ],
                show: (hasPermission(this.state.permissions, 'purchase', 'edit') && this.props.query.get('all_purchase') != 1)
              },
              {
                label: 'Edit',
                onClick: this.handleEdit,
                color: 'primary',
                show: (hasPermission(this.state.permissions, 'purchase', 'edit') && this.props.query.get('all_purchase') != 1),
                conditions: [
                  {
                    key: "created_myself",
                    value: true
                  },
                  {
                    key: "approve_status",
                    value: "Pending"
                  }
                ]
              },
              {
                label: 'View',
                onClick: this.handleView,
                color: 'primary',
                show: hasPermission(this.state.permissions, 'purchase', 'view')
              },
              /*{
                label: 'Delete',
                onClick: this.handleDelete,
                isDelete: true,
                color: 'error'
              }*/
            ]}
          />
        </Grid>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.purchase.items,
  total: state.superadmin.purchase.total,
  actionCalled: state.superadmin.purchase.actionCalled,
  deleteSuccess: state.superadmin.purchase.deleteSuccess,
  successMessage: state.superadmin.purchase.successMessage,
  supplierList: state.superadmin.supplier.items,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      purchaseList,
      purchaseDelete,
      supplierList
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(PurchasePage)));