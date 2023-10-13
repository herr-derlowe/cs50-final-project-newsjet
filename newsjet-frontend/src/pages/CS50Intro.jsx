import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "@mui/material";

export default function CS50Intro() {
  return (
    <main>
      <Box
        sx={{
          pt: 5,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            fontWeight="bold"
            gutterBottom
          >
            Welcome to my CS50x 2023 final project!
          </Typography>
          <Card sx={{ maxWidth: "md" }}>
            <CardMedia
              sx={{ height: 200 }}
              image="/src/assets/CS50x_pll.png"
              title="cs50x logo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                I am Skyler de Le&oacute;n Mer&aacute;n, a software engineer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This project, along with me, can be found on <Link href="https://github.com/herr-derlowe/cs50-final-project-newsjet">cs50-final-project-newsjet</Link>.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </main>
  );
}
