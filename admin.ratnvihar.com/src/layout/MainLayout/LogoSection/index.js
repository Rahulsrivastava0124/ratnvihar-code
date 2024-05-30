import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'assets/images/logo.png';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        {/*--- <Logo /> ----*/}
        <img src={Logo} className='nav_logo' alt='' />
      
    </ButtonBase>
);

export default LogoSection;
