import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Link from "@mui/material/Link";
import SnackAlert from "../components/SnackAlert";
import ArticleTable from "../components/ArticleTable";

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const isMountingRef = React.useRef(false);
  const [articles, setArticles] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [selectCategory, setSelectCategory] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackType, setSnackType] = React.useState("");
  const [snackMessage, setSnackMessage] = React.useState("");
  const [searchEndpoint, setSearchEndpoint] = React.useState("");

  React.useEffect(() => {
    isMountingRef.current = true;
    getArticlesAndCategories();
  }, []);

  React.useEffect(() => {
    if (!isMountingRef.current) {
      const getNewArticles = async () => {
        //console.log("first");
        await axios
          .get(API_URL + searchEndpoint)
          .then(function (response) {
            setArticles(response.data.articles);
            //console.log(response.data);
            setSnackMessage("Articles found");
            setSnackType("success");
            setOpenSnack(true);
          })
          .catch(function (error) {
            console.log(error);
            setSnackMessage("Couldn't find articles");
            setSnackType("error");
            setOpenSnack(true);
          });
      };
      getNewArticles();
    } else {
      isMountingRef.current = false;
    }
  }, [searchEndpoint]);

  const getArticlesAndCategories = async () => {
    await axios
      .get(API_URL + "/articles")
      .then((response) => {
        //console.log(response.data);
        setArticles(response.data.articles);
      })
      .catch((error) => {
        console.log(error);
        setSnackMessage("Couldn't get articles!");
        setSnackType("error");
        setOpenSnack(true);
      });

    await axios
      .get(API_URL + "/articles/categories")
      .then((response) => {
        //console.log(response.data.categories);
        let resCategories = [];
        response.data.categories.map((catgry) => {
          //console.log(catgry.category);
          resCategories.push(catgry.category);
        });
        //console.log(resCategories);
        setCategories(resCategories);
        //console.log(categories);
      })
      .catch((error) => {
        console.log(error);
        setSnackMessage("Couldn't get categories!");
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
  const handleSelect = (e) => {
    setSelectCategory(e.target.value);
    //console.log(selectCategory);
  };
  const handleTextField = (e) => {
    //setSearchQuery(document.getElementById("search").value);
    setSearchQuery(e.target.value);
    //console.log(searchQuery);
  };

  const saveFavorite = async (userid, articleid) => {
    await axios
      .post(API_URL + "/favorites/add", {
        userid: userid,
        articleid: articleid,
      })
      .then(function (response) {
        console.log(response.data);
        setSnackMessage("Favorite saved!");
        setSnackType("success");
        setOpenSnack(true);
      })
      .catch(function (error) {
        console.log(error);
        setSnackMessage("Favorite already saved.");
        setSnackType("info");
        setOpenSnack(true);
      });
  };

  const setEndpointsAndSearch = () => {
    if (searchQuery === "" && selectCategory !== "") {
      setSearchEndpoint("/articles/categories/searchby/" + selectCategory);
    } else if (selectCategory === "" && searchQuery !== "") {
      setSearchEndpoint("/articles/search/" + searchQuery);
    } else if (searchQuery !== "") {
      setSearchEndpoint(
        "/articles/" + searchQuery + "/category/" + selectCategory
      );
    } else {
      setSearchEndpoint("/articles");
    }
  };

  // const updateArticlesBySearch = async () => {
  //   await axios.get(API_URL + searchEndpoint)
  //   .then(function (response) {
  //     setArticles(response.data.articles);
  //     //console.log(response.data);
  //     setSnackMessage("Articles found");
  //     setSnackType("success");
  //     setOpenSnack(true);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     setSnackMessage("Couldn't find articles");
  //     setSnackType("error");
  //     setOpenSnack(true);
  //   });
  // }

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
            Welcome to NewsJet!
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Here you&apos;ll be able to search and query for news articles from{" "}
            <Link
              rel="noopener"
              target="_blank"
              href="https://www.huffpost.com/"
            >
              {" "}
              Huffpost
            </Link>{" "}
            either by category or by mere words. If you log in, you can also
            saved them as your favorites.
          </Typography>
          <Stack
            sx={{ pt: 3 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <TextField
              fullWidth
              id="search"
              label="Search query"
              variant="outlined"
              onChange={handleTextField}
            />
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectCategory}
                label="Category"
                onChange={handleSelect}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              sx={{ minWidth: 80, fontWeight: "bold" }}
              onClick={setEndpointsAndSearch}
              variant="contained"
            >
              SEARCH
            </Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ pb: 5, pt: 1 }} maxWidth="md">
        <ArticleTable favoriteFunc={saveFavorite} favorite={false} content={articles} logged={sessionStorage.getItem("username") ? true : false}/>
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
