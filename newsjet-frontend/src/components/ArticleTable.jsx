import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TablePagination from "@mui/material/TablePagination";

function Row(props) {
  const { row, logged, favorite, favoriteFunc } = props;
  const [open, setOpen] = React.useState(false);

  const RowButton = () => {
    if (logged) {
      if (favorite) {
        return (
          <CardActions>
            <Button
              onClick={() => {favoriteFunc(sessionStorage.getItem("userid"), row.id)}}
              size="small"
            >
              REMOVE FROM FAVORITES
            </Button>
          </CardActions>
        );
      } else {
        return (
          <CardActions>
            <Button
              onClick={() => {favoriteFunc(sessionStorage.getItem("userid"), row.id)}}
              size="small"
            >
              ADD TO FAVORITES
            </Button>
          </CardActions>
        );
      }
    } else {
      return (<></>);
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.headline}</TableCell>
        <TableCell align="center">{row.category}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {row.date}&nbsp;{row.category}
                  </Typography>
                  <Typography variant="h5" component="div">
                    <Link rel="noopener" target="_blank" href={row.link}>
                      {row.headline}
                    </Link>
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {row.authors}
                  </Typography>
                  <Typography variant="body2">
                    {row.short_description}
                  </Typography>
                </CardContent>
                <RowButton />
              </Card>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const ArticleTable = ({ logged, favorite, content, favoriteFunc }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - content.length) : 0;

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" width="10%"></TableCell>
                <TableCell align="center" width="70%">
                  Articles
                </TableCell>
                <TableCell align="center" width="20%">
                  Category
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? content.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : content
              ).map((row) => (
                <Row
                  favoriteFunc={favoriteFunc}
                  favorite={favorite}
                  key={row.id}
                  row={row}
                  logged={logged}
                />
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={content.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
export default ArticleTable;
