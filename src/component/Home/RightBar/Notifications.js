import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';


function RightBar() {
  return (
    <Paper sx={{borderRadius:'5%'}}elevation={3}>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Divider textAlign='left' sx={{fontSize:"22px", margin: "10px"}}> Recent Opportunities </Divider>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="" src="" />
      </ListItemAvatar>
      <ListItemText
        primary="Opportunity 1 description!!"
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Prakhar
            </Typography>
            {" — 1 day ago"}
          </React.Fragment>
        }
      />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Travis Howard" src="" />
      </ListItemAvatar>
      <ListItemText
        primary="Opportunity 2 description!!"
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Vikrant
            </Typography>
            {" — 2 days ago"}
          </React.Fragment>
        }
      />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Cindy Baker" src="" />
      </ListItemAvatar>
      <ListItemText
        primary="Opportunity 3 description!!"
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Kunal
            </Typography>
            {' — 3 days ago'}
          </React.Fragment>
        }
      />
    </ListItem>
    <Divider textAlign='left' sx={{fontSize:"22px", margin: "10px"}}>Recent Questions </Divider>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="" src="" />
      </ListItemAvatar>
      <ListItemText
        primary="Question 1 description!!"
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Kunal
            </Typography>
            {" — 1 day ago"}
          </React.Fragment>
        }
      />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Travis Howard" src="" />
      </ListItemAvatar>
      <ListItemText
        primary="Question 2 description!!"
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Prakhar
            </Typography>
            {" — 2 days ago"}
          </React.Fragment>
        }
      />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Cindy Baker" src="" />
      </ListItemAvatar>
      <ListItemText
        primary="Question 3 description!!"
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Himanshu
            </Typography>
            {' — 3 days ago'}
          </React.Fragment>
        }
      />
    </ListItem>
  </List>
  </Paper>
  )
}

export default RightBar