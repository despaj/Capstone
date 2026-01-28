import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users.routes.js';
import authRoutes from "./routes/auth.routes.js";
import salesRoutes from "./routes/sales.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sales', salesRoutes);

export default app;
