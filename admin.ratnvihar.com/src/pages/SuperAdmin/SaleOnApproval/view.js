import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CircularProgress, IconButton, Collapse, Box, Typography, TextareaAutosize, Stack, Select, MenuItem, InputLabel, FormControl, TextField, InputAdornment, Chip, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import { salesView, salesStatusChange } from 'actions/superadmin/sales.actions';
import { bindActionCreators } from 'redux';
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { isEmpty } from 'src/helpers/helper';
import { paymentStore, paymentList } from 'actions/superadmin/payment.actions';
import { SUPERADMIN_RESET_PAYMENT } from 'actionTypes/superadmin/payment.types';
import { getRoleName, getUserDashboardRoute, getApprovalColor, displayAmount } from 'src/helpers/helper';
import DialogActions from '@mui/material/DialogActions';
import { cartList } from 'actions/superadmin/cart.actions';

class SaleOnApproveViewPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sale: this.props.sale,
      openDialog: false,
      ...this.defaultFormValues(),
      actionCalled: this.props.actionCalled,
      createSuccess: this.props.createSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      processing: false,
      items: this.props.items,
      total: this.props.total,
      queryParams: {
        page: 1,
        limit: 50,
        date_from: null,
        date_to: null,
        table_type: "sale"
      },
      auth: this.props.auth,
      confirmDialog: false,
      status_changing: 0,
      decline_type: 'advance',
      return_payment_mode: 'cash'
    }

    this.columns = [
      {
        name: 'payment_date',
        display_name: 'Payment Date'
      },
      {
        name: 'amount',
        display_name: 'Amount'
      },
      {
        name: 'payment_mode',
        display_name: 'Payment Mode'
      },
      {
        name: 'cheque_no',
        display_name: 'Cheque #'
      },
      {
        name: 'txn_id',
        display_name: 'Transaction #'
      }
    ];
  }

  componentDidMount() {
    this.loadViewData();
    this.loadListData();
  }

  loadListData = () => {
    let data = { ...this.state.queryParams, table_id: this.props.params.id };
    this.props.actions.paymentList(data);
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

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.sale !== state.sale) {
      update.sale = props.sale;
    }
    if (props.actionCalled !== state.actionCalled) {
      update.actionCalled = props.actionCalled;
    }
    if (props.createSuccess !== state.createSuccess) {
      update.createSuccess = props.createSuccess;
    }
    if (props.successMessage !== state.successMessage) {
      update.successMessage = props.successMessage;
    }

    if (props.errorMessage !== state.errorMessage) {
      update.errorMessage = props.errorMessage;
    }
    if (props.items !== state.items) {
      update.items = props.items;
    }

    if (props.total !== state.total) {
      update.total = props.total;
    }
    if (props.auth !== state.auth) {
      update.auth = props.auth;
    }
    return update;
  }

  handlePayNow = () => {
    this.setState({
      openDialog: true
    })
  }

  handleDialogClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    this.setState({
      openDialog: false
    })
  }

  handleSupplierChange = (event) => {
    this.updateFormValue(event.target.value, 'user_id');
    this.props.actions.paymentTotalDue(event.target.value)
  }

  updateFormValue = (value, key) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [key]: value
      }
    })
  }

  defaultFormValues = () => {
    return {
      formValues: {
        user_id: '',
        payment_mode: '',
        payment_date: moment().format('MM/DD/YYYY'),
        due_date: '',
        amount: '',
        notes: '',
        cheque_no: '',
        txn_id: '',
        table_type: "sale",
        table_id: ''
      },
      formErros: {
        user_id: false,
        payment_mode: false,
        payment_date: false,
        amount: false,
        notes: false,
        cheque_no: false,
        txn_id: false,
        due_date: false
      }
    }
  }

  handleSubmit = () => {
    if (!this.formValidate()) {
      this.setState({
        processing: true
      });
      let data = { ...this.state.formValues, user_id: this.state.sale.user_id, table_id: this.state.sale.id }
      this.props.actions.paymentStore(data);
    }
  }

  formValidate = () => {
    let formValues = this.state.formValues;
    let formErros = this.state.formErros;
    let hasErr = false;
    if (parseFloat(formValues.amount) > parseFloat(this.state.sale.due_amount)) {
      hasErr = true;
      this.props.enqueueSnackbar("Amount must be less than or equal due amount.", { variant: 'error' });
    }
    if (isEmpty(formValues.amount)) {
      formErros.amount = true;
      hasErr = true;
    } else {
      formErros.amount = false;
    }
    if (isEmpty(formValues.payment_mode)) {
      formErros.payment_mode = true;
      hasErr = true;
    } else {
      formErros.payment_mode = false;
    }
    if (isEmpty(formValues.payment_date)) {
      formErros.payment_date = true;
      hasErr = true;
    } else {
      formErros.payment_date = false;
    }
    if (isEmpty(formValues.due_date)) {
      formErros.due_date = true;
      hasErr = true;
    } else {
      formErros.due_date = false;
    }
    this.setState({
      formErros: formErros
    })
    return hasErr;
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.id != prevProps.params.id) {
      this.loadViewData();
    }

    if (this.state.actionCalled) {
      if (this.state.createSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
        this.setState({
          processing: false,
          openDialog: false,
          queryParams: {
            ...this.state.queryParams,
            page: 1
          },
          ...this.defaultFormValues()
        });
        this.loadViewData();
        this.loadListData();
      } else {
        this.props.enqueueSnackbar(this.state.errorMessage, { variant: 'error' });
        this.setState({
          processing: false
        });
      }
      this.props.dispatch({
        type: SUPERADMIN_RESET_PAYMENT
      });
    }

  }

  loadViewData = () => {
    this.props.actions.salesView(this.props.params.id);
  }

  handleStatusChange = async (val) => {
    this.setState({
      status_changing: val,
      confirmDialog: true
    })

  }

  handleConfirmSubmit = async () => {
    let data = { approve_status: this.state.status_changing, decline_type: this.state.decline_type, return_payment_mode: this.state.return_payment_mode };
    let status_response = await salesStatusChange(this.props.params.id, data);
    if (status_response.data.success == true) {
      this.props.enqueueSnackbar(status_response.data.message, { variant: 'success' });
      this.setState({
        confirmDialog: false
      });
      if (this.state.status_changing == 4) {
        this.props.actions.cartList();
        this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/sales/create?sale_on_approval=' + this.props.params.id);
      } else {
        this.loadViewData();
      }
    } else {
      this.props.enqueueSnackbar(status_response.data.message, { variant: 'error' });
    }
  }

  handleConfirmDialogClose = () => {
    this.setState({
      confirmDialog: false
    })
  }

  render() {
    const { sale, formValues, formErros } = this.state;
    return (
      <MainCard secondary={<Button variant="contained" onClick={() => this.props.navigate(-1)}>Back</Button>}>

        {
          !sale ?
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
            :
            <>
              {/* <div className='single-item-wrapper details-header'>
                  <div className='single-item'>
                    <p><span>Admin: </span> <br />{sale.user_name}, {sale.user_mobile}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Invoice Number: </span> <br /> {sale.invoice_number}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Invoice Date: </span> <br /> {sale.invoice_date}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Taxable Amount: </span> <br /> {sale.taxable_amount}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Cgst Tax: </span> <br /> {sale.cgst_tax}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Sgst Tax: </span> <br /> {sale.sgst_tax}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Igst Tax: </span> <br /> {sale.igst_tax}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Total Amount: </span> <br /> {sale.total_amount}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Discount: </span>  <br />{sale.discount}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Total Payable: </span>  <br />{sale.total_payable}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Paid Amount: </span>  <br />{sale.paid_amount}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Due Amount: </span>  <br />{sale.due_amount_display}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Due Date: </span>  <br />{sale.due_date}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Settlement Date: </span>  <br />{sale.settlement_date}</p>
                  </div>
                  <div className='single-item'>
                      <div><span>Status: </span>  <br />
                          {
                            sale.is_approved == 0 ? 
                            <Chip label={sale.approve_status} color="primary" className='approved_status' />
                            :
                            <>
                              {
                                sale.is_approved == 1 ? 
                                <Chip label={sale.approve_status} color="success" className='approved_status' />
                                :
                                <Chip label={sale.approve_status} color="error" className='approved_status' />
                              }
                            </>

                          }
                      </div> 
                  </div>

                </div> */}
              <div className='return-wrapper'>


                <div className='return-header'>
                  <p>Sale On Approval Details</p>
                  <p>Invoice Date: {sale.invoice_date}</p>
                  <p>Dues Date:{sale.due_date}</p>
                  {
                    sale.notes ?
                      <p>Notes: {sale.notes}</p>
                      : null
                  }

                </div>
                <div className=''>
                  <Button className="add-button" variant="contained" onClick={() => this.props.navigate(-1)}>Back</Button>
                </div>
              </div>
              <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view">
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <div className='ratn-table-purchase-wrapper'>
                      <Table aria-label="collapsible table" className='invoice_product_list'>
                        <TableHead className='ratn-table-header'>
                          <TableRow>
                            <TableCell>Company Name</TableCell>
                            <TableCell>Total Amt</TableCell>
                            <TableCell>Cash Disc</TableCell>
                            <TableCell>Bill Amount</TableCell>
                            <TableCell>Return Amt</TableCell>
                            <TableCell>Paid Amt</TableCell>
                            <TableCell>Due Amt</TableCell>
                            <TableCell>Invoice No</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className='pur-details-table-body'>
                          <TableRow>
                            <TableCell component="th" scope="row">{sale.user_details.company_name}</TableCell>
                            <TableCell>{sale.total_amount}</TableCell>
                            <TableCell>{sale.discount}</TableCell>
                            <TableCell>{sale.bill_amount}</TableCell>
                            <TableCell>{sale.return_amount}</TableCell>
                            <TableCell>{sale.paid_amount_display}</TableCell>
                            <TableCell>{sale.due_amount_display}</TableCell>
                            <TableCell>{sale.invoice_number}</TableCell>
                            <TableCell className="sales-status">
                              <Chip label={sale.approve_status} color={getApprovalColor(sale.is_approved)} />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </TableContainer>
                </Grid>
              </Grid>
              {
                sale.is_approved == 3 ?
                  <div className='sale-view-button'>
                    <Button variant="contained" className='primary accept' onClick={() => this.handleStatusChange(4)}>Transfer To Sale</Button>
                    <Button variant="contained" className='danger decline' onClick={() => this.handleStatusChange(2)}>Decline</Button>
                  </div>
                  : null
              }
              <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view">
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <div className='ratn-table-purchase-wrapper'>
                      <Table aria-label="collapsible table" className='invoice_product_list'>
                        <TableHead className='ratn-table-header'>
                          <TableRow>
                            <TableCell />
                            <TableCell>#</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Category Name</TableCell>
                            <TableCell>Certificate Number</TableCell>
                            <TableCell>Total Weight</TableCell>
                            <TableCell>Size</TableCell>
                            <TableCell>Making Charge</TableCell>
                            <TableCell>Sub Total</TableCell>
                            <TableCell>Dist</TableCell>
                            <TableCell>Tax</TableCell>
                            <TableCell>Total</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {sale.products.map((row, i) => (
                            <Row key={i} row={row} index={i} />
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TableContainer>
                </Grid>
              </Grid>
            </>
        }

        <Dialog
          open={this.state.confirmDialog}
          onClose={this.handleConfirmDialogClose}
          fullWidth
          maxWidth="xs"
          className="ratn-dialog-wrapper"
        >
          <DialogTitle>
            {
              this.state.status_changing == 4 ? "Transfer To Sale" : "Decline"
            }
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {
                this.state.status_changing == 4 ?
                  "Are you sure want to transfer?"
                  :
                  "Are you sure want to decline?"
              }
              {
                (this.state.status_changing == 2 && sale && parseFloat(sale.paid_amount) > 0) ?
                  <>
                    <FormControl>
                      <RadioGroup
                        row
                        name="row-radio-buttons-group"
                        value={this.state.decline_type}
                        onChange={(e) => this.setState({ decline_type: e.target.value })}
                      >
                        <FormControlLabel value="advance" control={<Radio />} label={`Payment move to advance ${displayAmount(sale.paid_amount)}`} />
                        <FormControlLabel value="return" control={<Radio />} label={`Payment Return ${displayAmount(sale.paid_amount)}`} />
                      </RadioGroup>
                    </FormControl>

                    {
                      this.state.decline_type == "return" ?
                        <FormControl fullWidth>
                          <InputLabel>Payment Mode</InputLabel>
                          <Select
                            className='input-inner'
                            value={this.state.return_payment_mode}
                            fullWidth
                            label="Payment Mode"
                            onChange={(e) => this.setState({ return_payment_mode: e.target.value })}
                          >
                            <MenuItem value="cash">Cash</MenuItem>
                            <MenuItem value="cheque">Cheque</MenuItem>
                            <MenuItem value="imps_neft">NEFT/IMPS/UPI</MenuItem>
                            <MenuItem value="online">Online</MenuItem>
                          </Select>
                        </FormControl>
                        : null
                    }
                  </>
                  : null
              }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Button variant="outlined" onClick={this.handleConfirmDialogClose}>Cancel</Button>
              <Button variant="contained" type="button" onClick={this.handleConfirmSubmit}>Yes, Confirm</Button>
            </Stack>
          </DialogActions>
        </Dialog>


      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  sale: state.superadmin.sales.sale,
  actionCalled: state.superadmin.payment.actionCalled,
  createSuccess: state.superadmin.payment.createSuccess,
  successMessage: state.superadmin.payment.successMessage,
  errorMessage: state.superadmin.payment.errorMessage,
  items: state.superadmin.payment.items,
  total: state.superadmin.payment.total,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      salesView,
      paymentStore,
      paymentList,
      cartList
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(SaleOnApproveViewPage)));



function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);
  const sl_no = index + 1;
  const odd_even_class = sl_no % 2 == 0 ? 'even' : 'odd';

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className={odd_even_class}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            className="expand_icon"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {(sl_no <= 9) ? '0' + sl_no : sl_no}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.product_name}
        </TableCell>
        <TableCell>{row.category_name}</TableCell>
        <TableCell>{row.certificate_no}</TableCell>
        <TableCell>{row.total_weight}</TableCell>
        <TableCell>{row.size_name}</TableCell>
        <TableCell>{row.making_charge_display}</TableCell>
        <TableCell>{row.sub_price}</TableCell>
        <TableCell>{row.total_discount_display}</TableCell>
        <TableCell>{row.tax}</TableCell>
        <TableCell>{row.total_display}</TableCell>
      </TableRow>
      <TableRow className={'table-inner-row sub_table ' + odd_even_class}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="span">

              </Typography>
              <Table size="medium" aria-label="sales">
                <TableHead>
                  <TableRow className='pur-details-inner-table'>
                    <TableCell>Material Name</TableCell>
                    <TableCell>Purity</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Dist</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className='pur-details-table-body'>
                  {row.materials.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {item.material_name}
                      </TableCell>
                      <TableCell>{item.purity_name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.weight}</TableCell>
                      <TableCell>{item.unit_name}</TableCell>
                      <TableCell>{item.rate}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>{item.discount_amount_display}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}