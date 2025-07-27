import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link, Divider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";

const SignIn = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

    


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const data = {
      userName: name,
      email: email,
      password: password,
    };
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', data);
      setToken(res.data.token);
      navigate('/content/dash');  
      setName('');
      setEmail('');
      setPassword('');
      setSuccess(res.data.message || 'User registered successfully!');
    } catch (err) {
      setError('Failed to register user');
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0d0d0d",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "#0d0d0d",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Sign up
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            label="UserName"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{
              style: {
                color: "#fff",
                borderRadius: 12,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#3b82f6" },
                "&:hover fieldset": { borderColor: "#3b82f6" },
              },
            }}
            required
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{
              style: {
                color: "#fff",
                borderRadius: 12,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#3b82f6" },
                "&:hover fieldset": { borderColor: "#3b82f6" },
              },
            }}
            required
          />

          <TextField
            variant="outlined"
            type="password"
            fullWidth
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{
              style: {
                color: "#fff",
                borderRadius: 12,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#333" },
                "&:hover fieldset": { borderColor: "#3b82f6" },
              },
            }}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#3b82f6",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 12,
              py: 1.5,
              "&:hover": {
                bgcolor: "#2563eb",
              },
              mt: 2,
            }}
          >
            Sign up
          </Button>
        </form>

        {success && <Typography sx={{ color: "green", mt: 1 }}>{success}</Typography>}
        {error && <Typography sx={{ color: "red", mt: 1 }}>{error}</Typography>}

        <Link href="#" underline="hover" sx={{ color: "#60a5fa", fontSize: 14 }}>
          Forgot your password?
        </Link>

        <Divider sx={{ color: "#555" }}>or</Divider>

        <Typography variant="body2" textAlign="center" sx={{ color: "#aaa" }}>
          Already have an account?{" "}
          <Link href="login" underline="hover" sx={{ color: "#60a5fa" }}>
            LogIn account
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignIn;