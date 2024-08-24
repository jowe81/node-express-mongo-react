/**
 * Figure out the client IP and put it on req.__clientIp.
 * Source: ChatGPT
 */
function extractClientIp(req, res, next) {
    let clientIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || null;

    // If behind a proxy, 'x-forwarded-for' can contain a comma-separated list of IPs
    if (clientIp && clientIp.includes(",")) {
        clientIp = clientIp.split(",")[0].trim();
    }

    req.__clientIp = clientIp;

    next();
};

export { extractClientIp };
