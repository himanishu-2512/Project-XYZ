import { Box, Skeleton } from '@mui/material'
import Header from '../Home/Header'

function ProfileSkeleton() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#05081D',
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            width: '50%',
            alignItems: 'center',
            paddingY: 4,
          }}
        >
          <Skeleton
            animation="wave"
            sx={{
              backgroundColor: '#5d7987',
              height: '300px',
              width: '300px',
              backgroundSize: 'cover',
              borderRadius: '70px',
            }}
            variant="rectangle"
          />

          <Box
            sx={{
              backgroundColor: 'rgba(4, 23, 46, 1)',
              color: 'white',
              borderRadius: '30px',
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              position: 'relative',
              width: '70%',
              flexGrow: 1,
            }}
          >
            <Skeleton
              animation="wave"
              sx={{
                backgroundColor: '#5d7987',
                width: '25%',
                height: '12%',
              }}
            />
            <Skeleton
              animation="wave"
              sx={{
                backgroundColor: '#5d7987',
                width: '100%',
                height: '10%',
              }}
            />
            <Skeleton
              animation="wave"
              sx={{
                backgroundColor: '#5d7987',
                width: '100%',
                height: '10%',
              }}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '15%',
              }}
            >
              <Skeleton
                animation="wave"
                variant="rectangle"
                sx={{
                  backgroundColor: '#5d7987',
                  borderRadius: '5px',
                  width: '30%',
                  height: '100%',
                }}
              />
              <Skeleton
                animation="wave"
                variant="rectangle"
                sx={{
                  backgroundColor: '#5d7987',
                  borderRadius: '5px',
                  width: '30%',
                  height: '100%',
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
          }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(4, 23, 46, 1)',
              color: 'white',
              borderRadius: '30px',
              display: 'flex',
              width: '100%',
              height: '100%',
              flexDirection: 'column',
              position: 'relative',
              padding: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                marginBottom: '4em',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ width: '50%' }}>
                <Skeleton
                  animation="wave"
                  sx={{
                    backgroundColor: '#5d7987',
                    marginBottom: 2,
                  }}
                  height={15}
                  width="80%"
                />
                <Skeleton
                  animation="wave"
                  sx={{
                    backgroundColor: '#5d7987',
                  }}
                  height={15}
                  width="60%"
                />
              </Box>
              <Skeleton
                animation="wave"
                variant="rectangle"
                width={140}
                height={40}
                sx={{
                  backgroundColor: '#5d7987',
                  borderRadius: '30px',
                }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '8%',
                marginBottom: '6em',
              }}
            >
              <Skeleton
                animation="wave"
                variant="rectangle"
                sx={{
                  backgroundColor: '#5d7987',
                  borderRadius: '5px',
                  width: '25%',
                  height: '100%',
                }}
              />
              <Skeleton
                animation="wave"
                variant="rectangle"
                sx={{
                  backgroundColor: '#5d7987',
                  borderRadius: '5px',
                  width: '25%',
                  height: '100%',
                }}
              />
              <Skeleton
                animation="wave"
                variant="rectangle"
                sx={{
                  backgroundColor: '#5d7987',
                  borderRadius: '5px',
                  width: '25%',
                  height: '100%',
                }}
              />
            </Box>
            <Box sx={{ marginBottom: '3em' }}>
              <Skeleton
                animation="wave"
                sx={{
                  backgroundColor: '#5d7987',
                  marginBottom: '1em',
                }}
                height={20}
                width="30%"
              />
              <Skeleton
                animation="wave"
                sx={{
                  backgroundColor: '#5d7987',
                }}
                height={20}
                width="100%"
              />
            </Box>
            <Box sx={{ marginBottom: '3em' }}>
              <Skeleton
                animation="wave"
                sx={{
                  backgroundColor: '#5d7987',
                  marginBottom: '1em',
                }}
                height={20}
                width="30%"
              />
              <Skeleton
                animation="wave"
                sx={{
                  backgroundColor: '#5d7987',
                }}
                height={20}
                width="100%"
              />
            </Box>
            <Box>
              <Skeleton
                animation="wave"
                sx={{
                  backgroundColor: '#5d7987',
                  marginBottom: '1em',
                }}
                height={20}
                width="30%"
              />
              <Skeleton
                animation="wave"
                sx={{
                  backgroundColor: '#5d7987',
                }}
                height={20}
                width="100%"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileSkeleton
