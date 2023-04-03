import { Avatar, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography, Paper, Divider } from '@mui/material'
import {  blueGrey } from '@mui/material/colors'
import React, { useState } from 'react'
import { Favorite, MoreVert} from "@mui/icons-material";
import { Box } from '@mui/system';
import CommentIcon from '@mui/icons-material/Comment';
import Button from '@mui/material/Button';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Comments from '../Comments/AddComments';


function Feed() {

  //Like
  const [color, setColor] = useState(false);
  const handleLike=()=>{
    setColor(!color)
  }

//Comment
 const[open,setOpen] = useState(false)
 const handleChange=()=>{
   setOpen(!open)
 }

 //Save
 const [save, setSave] = useState(false);
  const handleSave=()=>{
    setSave(!save)
  }



  return (
    <Box 
    sx={{ maxWidth: "100%", display: "flex", justifyContent: "center"}}
    >  

      
      <Paper sx={{ maxWidth: "100%",variant:"outlined",maxHeight:"100%",borderRadius:'2%' }} elevation={3}>

      
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blueGrey[500] }} aria-label="recipe">
            V.P

          </Avatar>
        
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
          
        }
        title="Vishnu Priye"
        subheader="September 14, 2016"
        
        
      />
      <CardContent sx={{}}>
        <Typography variant="body2" sx={{ marginTop:"0px" , textDecoration:"none" , textAlign:'left'}}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like. 

        </Typography>
      </CardContent>
      <Box sx={{display: "flex", justifyContent: "center"}}>
      <CardMedia 
      sx={{display: 'block',
    maxWidth:'450px',
    maxHeight:'450px',
    width: 'auto',
    height: 'auto'}}
        component="img" 
        image="images/iiitr.png"
        alt="IIIT Ka Thappa"
      />
      </Box>
      <CardContent>
        <Typography variant="body2" sx={{color:"text.secondary", marginTop:"0px" , textDecoration:"underline"}}>
          {/* This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like. */}
        </Typography>
      </CardContent>
      <Divider/>
      <Box
      sx={{
        display:'flex',
        justifyContent: 'space-evenly'
        
      }}
      >
        <Button startIcon= {<Favorite/>}
            onClick={()=>handleLike()}
            style={{ color: color ? "red" : "black" }}>
            Like
          </Button>
        <Button startIcon={<CommentIcon  />} sx={{color:'black'}} 
          expand={open}
          onClick={()=>handleChange()}
          aria-expanded={true}
          aria-label="show more">
          Comment
        </Button>
        <Button startIcon= {<BookmarkIcon/>}
            onClick={()=>handleSave()}
            style={{ color: save ? "blue" : "black" }}>
            Save
          </Button>
          
        </Box>
        
        <Divider maxWidth="90%"/>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CardContent>
          <Comments/>
        </CardContent>
      </Collapse>
    </Paper>
     </Box>
    
  )
}

export default Feed