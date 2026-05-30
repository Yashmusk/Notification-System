import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Paper
} from "@mui/material";

const features = [
  {
    title: "Track Applications",
    desc: "Manage every company and role you're applying for in one place."
  },
  {
    title: "Interview Timeline",
    desc: "Track OA, Technical, HR and Final rounds visually."
  },
  {
    title: "Email Reminders",
    desc: "Get reminder emails before interviews so you never miss one."
  }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid #eee",
          color: "#111"
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Typography
              variant="h6"
              fontWeight="700"
            >
              JobTracker
            </Typography>

            <Box>
              <Button
                onClick={() =>
                  navigate("/login")
                }
                color="inherit"
              >
                Login
              </Button>

              <Button
                variant="contained"
                onClick={() =>
                  navigate("/signup")
                }
                sx={{
                  ml: 2,
                  bgcolor: "#111",
                  borderRadius: "10px",
                  px: 3
                }}
              >
                Create Account
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* HERO */}
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            pt: 12,
            pb: 10
          }}
        >
          <Typography
            variant="h2"
            fontWeight="800"
            sx={{
              fontSize: {
                xs: "42px",
                md: "64px"
              },
              lineHeight: 1.15,
              mb: 3
            }}
          >
            Track Every Job.
            <br />
            Never Miss An Interview.
          </Typography>

          <Typography
            sx={{
              maxWidth: "760px",
              mx: "auto",
              fontSize: "20px",
              color: "#64748b",
              mb: 5
            }}
          >
            Organize job applications,
            interview rounds,
            reminders,
            feedback and offers —
            all in one place.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center"
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() =>
                navigate("/signup")
              }
              sx={{
                bgcolor: "#111",
                px: 4,
                py: 1.5,
                borderRadius: "12px"
              }}
            >
              Get Started
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() =>
                navigate("/login")
              }
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "12px",
                borderColor: "#111",
                color: "#111"
              }}
            >
              Login
            </Button>
          </Box>
        </Box>

        {/* FEATURES */}
        <Grid
          container
          spacing={4}
          sx={{ pb: 10 }}
        >
          {features.map((item) => (
            <Grid
              item
              xs={12}
              md={4}
              key={item.title}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  borderRadius: "20px",
                  height: "220px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="700"
                  mb={2}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#64748b",
                    fontSize: "17px"
                  }}
                >
                  {item.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FOOTER */}
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          borderTop: "1px solid #eee",
          bgcolor: "#fff"
        }}
      >
        <Typography color="text.secondary">
          Built to help you manage your interview journey
        </Typography>
      </Box>
    </Box>
  );
}