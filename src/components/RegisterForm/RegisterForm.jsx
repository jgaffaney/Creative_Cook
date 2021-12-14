import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [pic, setPic] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [familySize, setFamilySize] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();
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
    history.push('/home')
  }; // registerUser


  const sxInput = {
    mb: 1,
  }

  const sxFormControl = {
    // border: '1px solid red',
    display: 'flex',
    flexDirection: 'column',
  }

  const sxFormContent = {
    // border: '1px solid blue',
    display: 'flex',
    flexDirection: 'column',
    mx: 'auto',
    width: '100%',
  }


  return (

    // <form className="formPanel" onSubmit={registerUser}>

    <form sx={sxFormControl} required onSubmit={registerUser}>
      <Box sx={sxFormContent}>

        <h2>Register New User</h2>

        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}

        <TextField sx={sxInput}
          id="registerUsername"
          required
          label="Username for Login"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        // placeholder="Username"
        />

        <TextField sx={sxInput}
          id="displayName"
          label="Your Name"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
        // placeholder="Username"
        />

        <TextField sx={sxInput}
          id="bio"
          label="Provide a short bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />

        <TextField sx={sxInput}
          id="pic"
          label="Profile image URL"
          value={pic}
          onChange={(event) => setPic(event.target.value)}
        />

        <TextField sx={sxInput}
          type="number"
          id="age"
          label="Current age?"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />

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

        <TextField sx={sxInput}
          type="number"
          id="familySize"
          label="Family size"
          value={familySize}
          onChange={(event) => setFamilySize(event.target.value)}
        />

        {/* <TextField sx={sxInput}
          id="maritalStatus"
          label="Marital Status?"
          value={maritalStatus}
          onChange={(event) => setMaritalStatus(event.target.value)}
        /> */}
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

        <TextField sx={sxInput}
          id="registerPassword"
          type="password"
          required
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        // placeholder="Passw0rd"
        />

        <Button type="submit" size="large" variant="contained" color="primary">Register & Login</Button>

      </Box>

    </form >
  );
}

export default RegisterForm;
