import { useMutation } from "@apollo/client";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_MUTATION } from "../../client/mutations"; // Adjust the import based on your file structure

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await login({ variables: { email, password } });
      const token = response.data.login.token;

      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" align="center">
          Login
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          name="email"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          margin="normal"
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Box my={2}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
