import {
Box,
Typography,
Card,
CardContent,
Switch,
FormControlLabel,
Button,
} from "@mui/material";

export default function Settings(){

return(

<Box p={4}>

<Typography
variant="h4"
mb={3}
>

⚙ Settings

</Typography>

<Card>

<CardContent>

<FormControlLabel
control={<Switch/>}
label="Email Notifications"
/>

<br/>

<FormControlLabel
control={<Switch defaultChecked/>}
label="Meeting Reminders"
/>

<Button
variant="contained"
color="error"
sx={{mt:3}}
>

Delete Account

</Button>

</CardContent>

</Card>

</Box>

);

}