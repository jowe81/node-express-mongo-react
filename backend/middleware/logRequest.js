import getLogger from "../utilities/log.js";
const log = getLogger("request");

/**
 * Figure out the client IP and put it on req.__clientIp.
 * Source: ChatGPT
 */
function logRequest(req, res, next) {
    log.info(`${req.__clientIp} [${req.headers.cookie ? req.session.id : `new session`}] ${req.url}`);
    next();
}

export { logRequest };
