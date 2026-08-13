import {
Box,
Typography,
Avatar,
Card,
CardContent,
Stack,
} from "@mui/material";

const users=[
{
name:"Neha Kumari",
role:"Host",
},
{
name:"Rahul",
role:"Participant",
},
{
name:"Priya",
role:"Participant",
},
];

export default function Teams(){

return(

<Box p={4}>

<Typography
variant="h4"
mb={3}
>

👥 Team Members

</Typography>

<Stack spacing={2}>

{users.map((user)=>(
<Card key={user.name}>

<CardContent>

<Stack
direction="row"
spacing={2}
alignItems="center"
>

<Avatar>
{user.name[0]}
</Avatar>

<Box>

<Typography
fontWeight="bold"
>

{user.name}

</Typography>

<Typography>

{user.role}

</Typography>

</Box>

</Stack>

</CardContent>

</Card>

))}

</Stack>

</Box>

);

}