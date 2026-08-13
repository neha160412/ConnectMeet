import {
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Mon", meetings: 3 },
  { month: "Tue", meetings: 5 },
  { month: "Wed", meetings: 2 },
  { month: "Thu", meetings: 6 },
  { month: "Fri", meetings: 4 },
];

export default function Analytics() {
  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        📊 Analytics
      </Typography>

      <Card sx={{ p: 3, borderRadius: 4 }}>
        <CardContent>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="month"/>

              <YAxis/>

              <Tooltip/>

              <Bar
                dataKey="meetings"
                fill="#1976d2"
              />

            </BarChart>

          </ResponsiveContainer>

        </CardContent>

      </Card>

    </Box>
  );
}