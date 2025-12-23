export const errorHandler = (err, req, res, next) => {
    // Log the error for the developer
    console.error(err.stack);

    // Send a professional JSON response to the client
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};
