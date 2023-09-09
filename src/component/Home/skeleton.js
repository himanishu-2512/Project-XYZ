import { Box, CardHeader, Skeleton } from '@mui/material'

function FeedSkeleton() {
  let arr = [1, 2, 3]
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {arr.map((item) => {
          return (
            <Box
              key={item}
              sx={{
                width: '100%',
                maxHeight: '100%',
                backgroundColor: '#1E293B',
                borderRadius: '10px',
                marginTop: '20px',
                boxShadow: '0px -2px #242f41',
                padding: 1,
              }}
            >
              <CardHeader
                avatar={
                  <Skeleton
                    animation="wave"
                    sx={{
                      backgroundColor: '#5d7987',
                    }}
                    variant="circular"
                    width={40}
                    height={40}
                  />
                }
                title={
                  <Skeleton
                    animation="wave"
                    sx={{
                      backgroundColor: '#5d7987',
                    }}
                    height={20}
                    width="80%"
                    style={{ marginBottom: 6 }}
                  />
                }
                subheader={
                  <Skeleton
                    animation="wave"
                    sx={{
                      backgroundColor: '#5d7987',
                    }}
                    height={20}
                    width="40%"
                  />
                }
              />
              <Skeleton
                sx={{ height: 20, width: '85%', backgroundColor: '#5d7987' }}
                animation="wave"
              />
              <Skeleton
                sx={{
                  height: 20,
                  backgroundColor: '#5d7987',
                  marginBottom: '1em',
                }}
                animation="wave"
              />
              <Skeleton
                sx={{
                  height: 350,
                  width: '100%',
                  backgroundColor: '#5d7987',
                }}
                animation="wave"
                variant="rectangular"
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
                }}
              >
                <Skeleton
                  sx={{
                    height: 15,
                    width: 100,
                    backgroundColor: '#5d7987',
                  }}
                  animation="wave"
                />
                <Skeleton
                  sx={{
                    height: 15,
                    width: 100,
                    backgroundColor: '#5d7987',
                  }}
                  animation="wave"
                />
              </Box>
            </Box>
          )
        })}
      </Box>
    </>
  )
}

export default FeedSkeleton
