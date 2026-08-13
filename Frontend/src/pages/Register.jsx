import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

import { registerUser } from "../services/authService";

export default function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName:"",
        email:"",
        password:""
    });

    const handleChange=(e)=>{

        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });

    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try{

            const data=await registerUser(formData);

            toast.success(data.message);

            setTimeout(()=>{
                navigate("/");
            },1000);

        }
        catch(error){

            toast.error(error.response?.data?.message);

        }

    };

    return(

        <>
        <ToastContainer/>

        <Box
        sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"100vh",
            background:"#f4f4f4"
        }}
        >

        <Paper sx={{padding:4,width:400}}>

        <Typography variant="h4" align="center">
        Register
        </Typography>

        <form onSubmit={handleSubmit}>

        <TextField
        fullWidth
        margin="normal"
        label="Full Name"
        name="fullName"
        onChange={handleChange}
        />

        <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        onChange={handleChange}
        />

        <TextField
        fullWidth
        margin="normal"
        label="Password"
        name="password"
        type="password"
        onChange={handleChange}
        />

        <Button
        fullWidth
        variant="contained"
        sx={{mt:2}}
        type="submit"
        >
        Register
        </Button>

        </form>

        <Typography align="center" sx={{mt:2}}>
        Already have an account?
        <Link to="/"> Login </Link>
        </Typography>

        </Paper>

        </Box>

        </>

    );

}