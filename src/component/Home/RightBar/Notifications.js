import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Paper } from '@mui/material'

function RightBar() {
  return (
    <Paper sx={{ bgcolor: "transparent", color: '#e4eefa', marginTop: 1 }} elevation={3}>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: '#1E293B',
          boxShadow: '0px -2px #242f41',
          borderRadius: "10px",
          padding: 1,
        }}
      >
        <Divider textAlign="left" sx={{ fontSize: '22px', margin: '10px' }}>
          {' '}
          Recent Opportunities{' '}
        </Divider>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="" src="" />
          </ListItemAvatar>
          <ListItemText
            primary="Opportunity 1 description!!"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline', color: "#8aa6aa" }}
                  component="span"
                  variant="body2"
                >
                  Prakhar {' — 1 day ago'}
                </Typography>
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
                  sx={{ display: 'inline', color: "#8aa6aa" }}
                  component="span"
                  variant="body2"
                >
                  Vikrant{' — 2 days ago'}
                </Typography>
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
                  sx={{ display: 'inline', color: "#8aa6aa" }}
                  component="span"
                  variant="body2"
                >
                  Kunal{' — 3 days ago'}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider textAlign="left" sx={{ fontSize: '22px', margin: '10px' }}>
          Recent Questions{' '}
        </Divider>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="" src="" />
          </ListItemAvatar>
          <ListItemText
            primary="Question 1 description!!"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline', color: "#8aa6aa" }}
                  component="span"
                  variant="body2"
                >
                  Kunal{' — 1 day ago'}
                </Typography>
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
                  sx={{ display: 'inline', color: "#8aa6aa" }}
                  component="span"
                  variant="body2"
                >
                  Prakhar{' — 2 days ago'}
                </Typography>
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
                  sx={{ display: 'inline', color: "#8aa6aa" }}
                  component="span"
                  variant="body2"
                >
                  Himanshu{' — 3 days ago'}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Paper>
  )
}

export default RightBar
