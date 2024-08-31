import express from 'express';
import { connectDb } from './db/db.js';
import connectionManager from './db/connectionManager.js';
import authRoutes from './routes/auth.js';
import { extractClientIp } from './middleware/extractClientIp.js';
import { logRequest } from './middleware/logRequest.js';
import cors from 'cors';
import dotenv from 'dotenv';
import getLogger from './utilities/log.js';
import session from 'express-session';

dotenv.config();
const log = getLogger();
const app = express();

// MUST specify frontend domain and port.
app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));

// Parse req.body
app.use(express.json());
app.use(extractClientIp);
app.use(session({
    secret: '.', 
    resave: false, 
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
    }
}));
app.use(logRequest);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

try {
    await connectionManager.init();

    const server = app.listen(PORT);

    server.on("listening", () => {
        log.info(`Server running on port ${PORT}`);
    });

    server.on("error", (err) => {
        log.error(`Unable to start server on port ${PORT}: ${err.message}`);
        process.exit(1);
    });
} catch (err) {
    log.error(`Unable to connect to database server. Exiting. ${err.message}`);
};

