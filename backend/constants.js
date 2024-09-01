const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const YEAR = 365 * DAY;

export default {
    session: {
        // Max length of the session if browser is kept open.
        maxLengthMs: 14 * DAY,
        
        // Max idle time - session will be logged out if frontend doesn't call checkSession for longer than that.
        maxIdleMs: 2 * MINUTE,
    }
}