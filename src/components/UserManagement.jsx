import { useState } from "react";
import { User } from "../models/User";
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";

const UserManagement = () => {
  const [createAccountClicked, setCreateAccountClicked] =
    useState(false);
  const [user, setUser] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const handleMouseDownPassword = (
    event
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event
  ) => {
    event.preventDefault();
  };
  const handleCreateAccount = () => {
    setCreateAccountClicked(true);
    const newUser = new User(
      "test",
      "Dummy",
      "Testing",
      "test@test.com",
      "12-12-12",
      "12345 Test Street, TestField, MI - 11111",
      "myusername",
      "mypassword",
      false
    );
    newUser.createAccount();
    setUser(newUser);
  };
  const handleLogin = async () => {
    console.log('kasdm', email, password);
    let user = new User(
      "test",
      "Dummy",
      "Testing",
      "test@test.com",
      "12-12-12",
      "12345 Test Street, TestField, MI - 11111",
      "myusername",
      "mypassword",
      false
    );
    const loggedIn = await user.login(email, password);
    console.log(loggedIn);
    if (loggedIn) {
      navigate('/');
    }
  };
  const handleLogout = () => {
    if (isLoggedIn) {
      user?.logout();
      setLoggedIn(false);
      alert("Logout successful");
    } else {
      alert("No logged in user");
    }
  };
  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>User Management</h2>
      {!user && !isUser && (
        <div>
          <Button variant="contained" onClick={handleCreateAccount}>
            Create Account
          </Button>
          {createAccountClicked && <></>}
          <div style={{ color: "Black" }}>
            Already a user ? Click &nbsp;
            <Link
              component="button"
              variant="body1"
              onClick={() => {
                setIsUser(!isUser);
              }}
            >
              here
            </Link>
            &nbsp; to login
          </div>
        </div>
      )}

      {(user || isUser) && (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              color: "yellow",
              backgroundColor: "yellow",
            }}
          >
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined" onChange={(event) => setEmail(event.target.value)}>
              <InputLabel htmlFor="outlined-adornment-password">
                Username/Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined" onChange={(event) => setPassword(event.target.value)}>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {!isLoggedIn ? (
              <Button
                variant="contained"
                onClick={handleLogin}
                style={{ marginRight: "10px" }}
              >
                Log In
              </Button>
            ) : (
              <Button onClick={handleLogout} style={{ marginRight: "10px" }}>
                Log Out
              </Button>
            )}
          </Box>
          <div style={{ color: "Black" }}>
            Not a registered user ? Click &nbsp;
            <Link
              component="button"
              variant="body1"
              onClick={() => {
                setIsUser(!isUser);
              }}
            >
              here
            </Link>
            &nbsp; to register
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;
