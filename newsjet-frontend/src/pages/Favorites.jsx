import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import SnackAlert from "../components/SnackAlert";
import ArticleTable from "../components/ArticleTable";

const API_URL = import.meta.env.VITE_API_URL;

export default function Favorites() {
  const [favorites, setFavorites] = React.useState([]);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackType, setSnackType] = React.useState("");
  const [snackMessage, setSnackMessage] = React.useState("");

  React.useEffect(() => {
    getFavoriteArticles();
  }, []);

  const getFavoriteArticles = async () => {
    await axios
      .get(API_URL + "/favorites/" + sessionStorage.getItem("userid"))
      .then((response) => {
        //console.log(response.data);
        setFavorites(response.data.favorites);
      })
      .catch((error) => {
        console.log(error);
        setSnackMessage("You don't have any favorites!");
        setSnackType("error");
        setOpenSnack(true);
      });
  };

  const closeSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const removeFavorite = async (userid, articleid) => {
    await axios
      .delete(API_URL + "/favorites/delete/" + userid + "/" + articleid)
      .then(function (response) {
        console.log(response.data);
        getFavoriteArticles();
        setSnackMessage("Favorite removed!");
        setSnackType("success");
        setOpenSnack(true);
      })
      .catch(function (error) {
        console.log(error);
        setSnackMessage("That one is not among your favorites.");
        setSnackType("info");
        setOpenSnack(true);
      });
  };

  return (
    <main>
      <Box
        sx={{
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Here are your favorite articles!
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            From here you can also remove the articles you no longer want to be among your favorites.
          </Typography>
        </Container>
      </Box>
      <Container sx={{ pb: 5, pt: 1 }} maxWidth="md">
        <ArticleTable favoriteFunc={removeFavorite} favorite={true} content={favorites} logged={sessionStorage.getItem("username") ? true : false}/>
      </Container>
      <SnackAlert
        open={openSnack}
        handleClose={closeSnack}
        type={snackType}
        message={snackMessage}
      />
    </main>
  );
}
