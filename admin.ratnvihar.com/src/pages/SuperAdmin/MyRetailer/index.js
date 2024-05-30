import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Card, CardContent, Typography } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { retailerList, retailerDelete } from 'actions/superadmin/retailer.actions';
import { countryList } from 'actions/superadmin/country.actions';
import DataTable from 'src/utils/DataTable';
import {SUPERADMIN_RESET_RETAILER} from 'actionTypes/superadmin/retailer.types';
import {isSuperAdmin, displayAmount, getRoleName, getUserDashboardRoute, isSalesExecutive, isDistributor} from 'src/helpers/helper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

class MyRetailerPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50,
        my_retailer: 1,
        all: 0
      },
      deleteSuccess: this.props.deleteSuccess,
      countries: this.props.countries,
      dialogOpen: false
    }

    this.isDistributor = isDistributor();
    this.isSalesExecutive = isSalesExecutive();

    this.columns = [
      {
        name: 'company_name',
        display_name: 'Company Name'
      },
      {
        name: 'mobile',
        display_name: 'Contact Number'
      },
      {
        name: 'city',
        display_name: 'City'
      },
      {
        name: 'total_amount_display',
        display_name: 'Total Amount',
        className: "amount_column",
        isBold: true
      },
      {
        name: 'total_return_display',
        display_name: 'Total Return',
        className: "amount_column",
        isBold: true
      },
      {
        name: 'paid_amount_display',
        display_name: 'Paid Amount',
        className: "amount_column",
        isBold: true
      },
      {
        name: 'due_amount_display',
        display_name: 'Due Amount',
        className: "amount_column",
        isBold: true
      }
    ];

    this.tableActions = [
      {
        label: 'View',
        onClick: this.handleView,
        color: 'primary'
      },
      {
        label: 'Edit',
        onClick: this.handleEdit,
        color: 'primary'
      }
    ];
    if(!this.isDistributor && !this.isSalesExecutive){
      this.tableActions.push({
        label: 'Delete',
        onClick: this.handleDelete,
        isDelete: true,
        color: 'error'
      })
    }
    
  }

  componentDidMount(){
    this.loadListData();
    this.props.actions.countryList({all: 1});
  }

  static getDerivedStateFromProps(props, state){
    let update = {};
    if(props.items !== state.items){
      update.items = props.items;
    }

    if(props.total !== state.total){
      update.total = props.total;
    }

    if(props.deleteSuccess !== state.deleteSuccess){
      update.deleteSuccess = props.deleteSuccess;
    }

    if(props.countries !== state.countries){
      update.countries = props.countries;
    }
    if(props.total_sale !== state.total_sale){
      update.total_sale = props.total_sale;
    }
    if(props.total_sale_due !== state.total_sale_due){
      update.total_sale_due = props.total_sale_due;
    }
    if(props.total_sale_paid !== state.total_sale_paid){
      update.total_sale_paid = props.total_sale_paid;
    }
    if(props.total_sale_return !== state.total_sale_return){
      update.total_sale_return = props.total_sale_return;
    }
    if(props.auth !== state.auth){
      update.auth = props.auth;
    }

    return update;
  }

  loadListData = () => {
    this.props.actions.retailerList(this.state.queryParams);
  }

  handlePagination = (page, all) => {
    this.state.queryParams.page = page;
    this.state.queryParams.all = all ? 1 : 0;
    this.loadListData();
  }

  handleEdit = (row) => {
    this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/retailers/edit/' + row.id)
  }

  handleView = (row) => {
    this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/retailers/view/' + row.id)
  }

  dialogClose = () => {
    this.setState({
      dialogOpen: false
    })
  }

  handleDelete = (row) => {
    this.props.actions.retailerDelete(row.id);
  }

  componentDidUpdate(previousProps, previousState){
    if(this.state.deleteSuccess){
      const { dispatch } = this.props;
      dispatch({
        type: SUPERADMIN_RESET_RETAILER
      });
      this.handlePagination(1);
    }
  }

  render() {    
    
    return (
      <>
        <Card className='dashboard_card supplier-card' style={{marginBottom: '16px'}}>
          <CardContent className={`dashboard_card_content user-bg-1`} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
              <h1>Total Sales</h1>
              <h2>{displayAmount(this.state.total_sale)}</h2>
            </Typography>
            <div className="card-icon">
              {/*<CurrencyRupeeIcon />*/}
            </div>
          </CardContent>
          <CardContent className={`dashboard_card_content user-bg-2`} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
              <h1>Total Return</h1>
              <h2>{displayAmount(this.state.total_sale_return)}</h2>
            </Typography>
            <div className="card-icon">
              {/*<CurrencyRupeeIcon />*/}
            </div>
          </CardContent>
          <CardContent className={`dashboard_card_content user-bg-3`} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
              <h1>Total Paid</h1>
              <h2>{displayAmount(this.state.total_sale_paid)}</h2>
            </Typography>
            <div className="card-icon">
              {/*<CurrencyRupeeIcon />*/}
            </div>
          </CardContent>
          <CardContent className={`dashboard_card_content user-bg-4`} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
              <h1>Total Due</h1>
              <h2>{displayAmount(this.state.total_sale_due)}</h2>
            </Typography>
            <div className="card-icon">
              {/*<CurrencyRupeeIcon />*/}
            </div>
          </CardContent>
        </Card>
        <MainCard title="My Retailers" secondary={<Button variant="contained" onClick={() => this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/retailers/create') }>Add</Button>} >
          <Grid container spacing={gridSpacing} className="abc">
            <DataTable 
              columns={this.columns}
              rows={this.state.items}
              page={this.state.queryParams.page}
              limit={this.state.queryParams.limit}
              total={this.state.total}
              handlePagination={this.handlePagination}
              actions={this.tableActions}
              haveAllOption={true}
            />
          </Grid>
          <Dialog
            className='ratn-dialog-footer delete_modal'
            open={this.state.dialogOpen}
            onClose={this.dialogClose}
            fullWidth
            maxWidth="xs"
          >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Coming Soon!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className='ratn-footer-buttons'>
              <Button onClick={this.dialogClose} className='conf-button'>Close</Button>
            </div>
          </DialogActions>
          </Dialog>
        </MainCard>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.retailer.items,
  total: state.superadmin.retailer.total,
  total_sale: state.superadmin.retailer.total_sale,
  total_sale_due: state.superadmin.retailer.total_sale_due,
  total_sale_paid: state.superadmin.retailer.total_sale_paid,
  total_sale_return: state.superadmin.retailer.total_sale_return,
  countries: state.superadmin.country.items || [],
  deleteSuccess: state.superadmin.retailer.deleteSuccess,
  auth: state.auth
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({retailerList, retailerDelete, countryList}, dispatch)
  }
};  


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyRetailerPage));
