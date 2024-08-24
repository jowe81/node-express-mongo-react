import dotenv from 'dotenv';
import getLogger from '../utilities/log.js';

dotenv.config();
const log = getLogger("request");

const protect = async (req, res, next) => {
    next();
};

export { protect };
