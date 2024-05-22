import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom"; // Importing necessary dependencies from React and other libraries
import Logo from "../assets/logo.svg"; // Importing the logo image file
import { ToastContainer, toast } from "react-toastify"; // Importing toast notification components
import "react-toastify/dist/ReactToastify.css"; // Importing styles for toast notifications
import { loginRoute } from "../utils/APIRoutes"; // Importing API route for login

// Defining the Login component
export default function Login() {
  const navigate = useNavigate(); // Hook for navigation in React Router
  const [values, setValues] = useState({ username: "", password: "" }); // State for storing form input values
  const toastOptions = { // Configuration options for toast notifications
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  
  // Effect hook for checking if user is already logged in
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  // Function to handle input change in the form fields
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // Function to validate form inputs
  const validateForm = () => {
    const { username, password } = values;
    if (username === "" || password === "") { // Check if username or password is empty
      toast.error("Email and Password is required.", toastOptions); // Display error toast if either field is empty
      return false;
    }
    return true; // Return true if both fields are filled
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) { // Validate form before submitting
      const { username, password } = values;
      try {
        const { data } = await axios.post(loginRoute, { // Send login request to server
          username,
          password,
        });
        if (data.status === false) { // If login fails, display error message
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) { // If login succeeds, store user data in local storage and navigate to home page
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(data.user)
          );
          navigate("/");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // JSX code for rendering the login form
  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>chitzy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer /> {/* Component to display toast notifications */}
    </>
  );
}

// Styled components for styling the login form
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
