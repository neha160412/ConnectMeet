import { Card, CardContent, Typography, Box } from "@mui/material";

export default function StatsCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <Card
      sx={{
        borderRadius: "24px",
        background: "rgba(255,255,255,.65)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 12px 30px rgba(0,0,0,.08)",
        transition: ".3s",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 40px rgba(25,118,210,.18)",
        },
      }}
    >
      <CardContent>

        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "18px",
            background: color,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: 30,
            mb: 2,
          }}
        >
          {icon}
        </Box>

        <Typography
          color="text.secondary"
          fontWeight={600}
        >
          {title}
        </Typography>

        <Typography
          variant="h3"
          fontWeight="bold"
          mt={1}
        >
          {value}
        </Typography>

      </CardContent>
    </Card>
  );
}