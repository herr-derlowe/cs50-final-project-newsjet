import { useState } from 'react'
import AppRouter from './components/AppRouter'
import Navbar from './components/Navbar'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

function App() {
  const [login, setLogin] = useState(sessionStorage.getItem("userid") ? true : false);
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#ffa726',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: '#FFF9C4',
      },
    },
  });
  const changeLogin = (loginState) => {
    setLogin(loginState);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Navbar logged={login} changeLogin={changeLogin}/>
      <AppRouter changeLogin={changeLogin}/>
    </ThemeProvider>
  )
}

export default App
