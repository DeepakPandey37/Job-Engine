const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Corrected: cookies not cookie

        if (!token) {
            return res.status(400).json({
                message: "User not authenticated",
                success: false
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decode.userId;

        next(); // Go to next middleware or route
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};

module.exports = isAuthenticated;
