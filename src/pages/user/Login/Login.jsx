import { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  FormControl,
  FilledInput,
  InputLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./login.module.css"
import "./login.css"

function Login() {
  const [values, setValues] = useState({
    name:"",
    password: "",
    showPassword: false,
  });
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values)
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
      navigate('/signUp');
    };

  const handleClickRedux=()=>{
    navigate('/home'); //no encontre la logica para usarlo :c
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const option={
      method: 'POST',
      headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
          name: values.name,
          password: values.password
      }) 
  }

    fetch('http://18.116.50.13:8080/user/login', option)
    .then(response=> response.json())
    .then( data=>data.success ? navigate("/home"):alert("Fallo"))
    .catch(err=>console.log(err))
  };
  return (
    <>
      <img className="wave" src="images/wave-haikei (7).svg" />
      <div className="container">
        <div className="img-login">
          <img src="images/audio (2).svg" />
        </div>
        <div className="login-content">
          <form onSubmit={handleSubmit}>
            <img src="images/logo.png" />
            <Typography
              variant="h2"
              fontSize="3em"
              fontWeight={500}
              align="center"
            >
              Inicia Sesión
            </Typography>
            <FormControl sx={{  my:2 }} variant="filled" fullWidth>
              <InputLabel fullWidth>
                Name
              </InputLabel>
              <FilledInput
                value={values.name}
                onChange={handleChange("name")}
                id="input-with-icon-adornment"
                endAdornment={
                    
                      <InputAdornment edge="end">
                        <AccountCircleIcon />
                      </InputAdornment>
                    }
                ></FilledInput>

            </FormControl>
            
            <FormControl sx={{  my:2 }} variant="filled" fullWidth>
              <InputLabel fullWidth>
                Contraseña
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button color="secondary" 
            style={{ fontSize: '.75em'}} 
            sx={ { marginLeft:22.3, marginRight:0 }} 
            align='left' textSizeSmall
            onClick={handleClick}>¿No tienes una cuenta? Regístrate aquí</Button>
            <Button sx={{  my:2 }}variant="contained" color="primary" fullWidth type="submit">
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
