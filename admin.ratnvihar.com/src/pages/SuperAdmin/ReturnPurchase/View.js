import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CircularProgress, IconButton, Collapse, Box, Typography, TextareaAutosize, Stack,  Select, MenuItem, InputLabel, FormControl, TextField, InputAdornment, Chip } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import { returnPurchaseView } from 'actions/superadmin/returnPurchase.actions';
import { bindActionCreators } from 'redux';
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

class ReturnPurchaseViewPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      returnPurchase: this.props.returnPurchase
    }

  }

  componentDidMount() {
    this.loadViewData();
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.returnPurchase !== state.returnPurchase) {
      update.returnPurchase = props.returnPurchase;
    }
    
    return update;
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.id != prevProps.params.id) {
      this.loadViewData();
    }
  }

  loadViewData = () => {
    this.props.actions.returnPurchaseView(this.props.params.id);
  }

  render() {
    const { returnPurchase } = this.state;
    return (
      <MainCard title="Return Purchase Details" secondary={<Button variant="contained" onClick={() => this.props.navigate(-1)}>Back</Button>}>
        
          {
            !returnPurchase ?
              <Grid container justifyContent="center">
                <CircularProgress />
              </Grid>
              :
              <>
              <div className='single-item-wrapper details-header'>
                <div className='single-item'>
                  <p><span>Supplier: </span> <br />{returnPurchase.supplier_name}, {returnPurchase.supplier_mobile}</p>
                </div>
                <div className='single-item'>
                  <p><span>Invoice Number: </span> <br /> {returnPurchase.invoice_number}</p>
                </div>
                <div className='single-item'>
                  <p><span>Invoice Date: </span> <br /> {returnPurchase.invoice_date}</p>
                </div>
                <div className='single-item'>
                  <p><span>Return Date: </span> <br /> {returnPurchase.return_date}</p>
                </div>
                <div className='single-item'>
                  <p><span>Bill Amount: </span>  <br />{returnPurchase.bill_amount}</p>
                </div>
                <div className='single-item'>
                  <p><span>Total Return: </span>  <br />{returnPurchase.return_amount}</p>
                </div>
                <div className='single-item'>
                  <div><span>Status: </span>  <br />
                  {
                    returnPurchase.status == 'pending' ? 
                    <Chip label={returnPurchase.status_display} color="primary" className='approved_status' />
                    :
                    <>
                      {
                        returnPurchase.status == 'accepted' ? 
                        <Chip label={returnPurchase.status_display} color="success" className='approved_status' />
                        :
                        <Chip label={returnPurchase.status_display} color="error" className='approved_status' />
                      }
                    </>

                  }
                </div>
              </div>
              </div>
              <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view">
                <Grid item xs={12} className="p-add-product create-input">
                  <h3 className='p_heading_list'>Return Products</h3>
                  <TableContainer component={Paper}>
                    <div className='ratn-table-purchase-wrapper'>
                      <Table aria-label="collapsible table">
                        <TableHead className='ratn-table-header'>
                          <TableRow>
                            <TableCell />
                            <TableCell>#</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Category Name</TableCell>
                            <TableCell>Certificate Number</TableCell>
                            <TableCell>Size</TableCell>
                            <TableCell>Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {returnPurchase.products.map((row, i) => (
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
        
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  returnPurchase: state.superadmin.returnPurchase.returnPurchase
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      returnPurchaseView
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReturnPurchaseViewPage)));



function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);
  const sl_no = index + 1;
  const odd_even_class = sl_no%2 == 0 ? 'even' : 'odd';

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className={odd_even_class}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
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
        <TableCell>{row.size_name}</TableCell>
        <TableCell>{row.sub_total}</TableCell>
      </TableRow>
      <TableRow className={'table-inner-row sub_table ' + odd_even_class}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
              </Typography>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow className='pur-details-inner-table'>
                    <TableCell>Material Name</TableCell>
                    <TableCell>Purity</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Unit</TableCell>
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
