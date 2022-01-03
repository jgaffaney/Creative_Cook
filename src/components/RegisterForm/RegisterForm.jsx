import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState(null);
  const [bio, setBio] = useState(null);
  const [pic, setPic] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [familySize, setFamilySize] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    if(password === confirmPassword){
      dispatch({
        type: 'REGISTER',
        payload: {
          username: username,
          displayName: displayName,
          bio: bio,
          pic: pic,
          age: age,
          gender: gender,
          familySize: familySize,
          maritalStatus: maritalStatus,
          isAdmin: isAdmin,
          password: password,
        },
      });
      alert("Friendly reminder to REMEMBER YOUR PASSWORD! Warning: Password Recovery is not currently available")
      history.push('/home')
    } else {
      alert("Error: Passwords Don't Match")
    }

   
  }; // registerUser


  // INPUT text styles
  const sxInput = {
    mb: 1,
  }

  // FORM CONTAINER holds all the page content
  const sxFormContainer = {
    // border: '1px solid red',
    display: 'flex',
    flexDirection: 'column',
  }

  // FORM CONTENT holds the "register new user" title and all of the input boxes
  const sxFormContent = {
    // border: '1px solid blue',
    display: 'flex',
    flexDirection: 'column',
    mx: 'auto',
    width: '100%',
  }


  return (

    <form sx={sxFormContainer} onSubmit={registerUser}>
      <Box sx={sxFormContent}>

        <h2 id="register">Register New User</h2>

        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}

        {/* USERNAME */}
        <TextField sx={sxInput}
          id="registerUsername"
          required
          label="Username for Login"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        // placeholder="Username"
        />

        {/* DISPLAY NAME */}
        <TextField sx={sxInput}
          id="displayName"
          label="Your Name"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
        // placeholder="Username"
        />

        {/* BIO */}
        <TextField sx={sxInput}
          id="bio"
          label="Provide a short bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />

        {/* PIC URL */}
        <TextField sx={sxInput}
          id="pic"
          label="Profile image URL"
          value={pic}
          onChange={(event) => setPic(event.target.value)}
        />

        {/* AGE */}
        <TextField sx={sxInput}
          type="number"
          id="age"
          label="Current age?"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />

        {/* GENDER SELECTION */}
        <FormControl>
          <InputLabel id="gender">Gender</InputLabel>
          <Select sx={sxInput} variant="outlined"
            labelId="gender"
            label="gender"
            id="gender"
            name="gender"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          >
            <MenuItem value={'Female'}>Female</MenuItem>
            <MenuItem value={'Male'}>Male</MenuItem>
            <MenuItem value={'Other'}>Other</MenuItem>
            <MenuItem value={'Prefer not to answer'}>Prefer not to answer</MenuItem>
          </Select>
        </FormControl>

        {/* FAMILY SIZE */}
        <TextField sx={sxInput}
          type="number"
          id="familySize"
          label="Family size"
          value={familySize}
          onChange={(event) => setFamilySize(event.target.value)}
        />

        {/* RELATIONSHIP SELECTION */}
        <FormControl>
          <InputLabel id="">Marital Status</InputLabel>
          <Select sx={sxInput} variant="outlined"
            labelId="maritalStatusId"
            label="maritalStatus"
            id="maritalStatus"
            name="Marital status"
            value={maritalStatus}
            onChange={(event) => setMaritalStatus(event.target.value)}
          >
            <MenuItem value={'Single'}>Single</MenuItem>
            <MenuItem value={'Married'}>Married</MenuItem>
            <MenuItem value={'Partnership'}>Partnership</MenuItem>
          </Select>
        </FormControl>

        {/* PASSWORD */}
        <TextField sx={sxInput}
          id="registerPassword"
          type="password"
          required
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {/* CONFIRM PASSWORD */}
        <TextField sx={sxInput}
          id="confirmPassword"
          type="password"
          required
          label="Confirm Password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        {/* LET'S START COOKING */}
        <Button type="submit" size="large" variant="contained" color="primary">Register & Login</Button>

      </Box>

    </form >
  );
}

export default RegisterForm;
