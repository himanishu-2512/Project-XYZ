import React from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Paper, Collapse, CardContent } from '@mui/material';
import Notifications from './Notifications';
import CancelIcon from '@mui/icons-material/Cancel';

function LeftBar() {

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box>
    <Box
    sx={{
      display:'flex',
      justifyContent:'Right',
      alignContent:'center'
    }}
    >
      <Avatar style={{top: 10, right: 10, color: "white", backgroundColor: '#2196f3' }} component={Paper} elevation={5} checked={checked} onClick={handleChange}>
        {!checked && <NotificationsIcon/>}
        {checked && <CancelIcon/>}
      </Avatar>
      
      <Collapse in={checked} timeout="auto" unmountOnExit>
        <CardContent>
          <Notifications/>
        </CardContent>
      </Collapse>
    </Box>
    </Box>
  )
}

export default LeftBar