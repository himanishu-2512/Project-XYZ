import React from 'react'
import { Box, Typography } from '@mui/material'
import NavBar from '../component/Home/Header'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import UserInfo from '../component/Profile/UserInfo'
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Profile() {

    const [userInfoOpen, setUserInfoOpen] = useState(false);

  return (
    <div>
        <Box>
            <NavBar/>
            <Container component="main" maxWidth="md">
                <CssBaseline/>
                <Box
                sx={{
                    marginLeft: '10%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    
                }}
                >
                   <Box>
                   <Avatar
                    alt=""
                    src=""
                    sx={{ width: 100, height: 100, margin: 2 }}
                    />
                   </Box>
                   <Box 
                   sx={{
                    marginLeft: '10%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'right',
                    
                }}>
                    <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        
                    }}
                    >
                        <Box sx={{
                            margin: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'right',
                            
                        }}>
                            <Typography component="h1" variant="h5" >
                                Kunal Chaurasia
                            </Typography>
                            <Typography component="h1" variant="body2" >
                                Kunalc
                            </Typography>
                        </Box>
                        <Box>
                        <Button variant="outlined">Follow</Button>
                        </Box>
                    </Box>
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        
                    }}
                    >
                        <Box
                        sx={{
                            margin: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            
                        }}
                        >
                            <Typography component="h1" variant="body2" >
                                17 
                            </Typography>
                            <Typography component="h1" variant="body2" >
                                Post
                            </Typography>
                        </Box>
                        <Box
                        sx={{
                            margin: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            
                        }}>
                            <Typography component="h1" variant="body2" >
                                67 
                            </Typography>
                            <Typography component="h1" variant="body2" >
                                Following
                            </Typography>
                        </Box>
                        <Box
                        sx={{
                            margin: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            
                        }}>
                            <Typography component="h1" variant="body2" >
                                200 
                            </Typography>
                            <Typography component="h1" variant="body2" >
                                Followers
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{
                    margin: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    
                }}>
                        <Box>
                            fxfy ytfytfyt yf ifif  t ttci vuuiviiy  tyucgyy yvc tgvgyv gg viyt
                        </Box>
                    </Box>
                   </Box>
                   
                </Box>
                <Box
                
                display="flex"
                justifyContent="center"
                alignItems="center"
                >
                    {
                        !userInfoOpen && <KeyboardArrowDownIcon
                        onClick={() => setUserInfoOpen(!userInfoOpen)}
                        />
                    }
                    {
                        userInfoOpen && <KeyboardArrowUpIcon
                        onClick={() => setUserInfoOpen(!userInfoOpen)}
                        />
                    }
                </Box>
                {userInfoOpen && <UserInfo />}
                <Divider/>
            </Container>
        </Box>
    </div>
  )
}

export default Profile