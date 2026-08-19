export const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`)
    next() // Continue to the next middleware or route handler.
}