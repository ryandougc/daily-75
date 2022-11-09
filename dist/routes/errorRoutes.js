"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error404Handler = exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    if (error) {
        return res.status(error.status).json({
            success: error.success || false,
            message: error.message,
        });
    }
    return next();
};
exports.errorHandler = errorHandler;
const error404Handler = (req, res) => {
    return res.status(404).json({
        success: false,
        message: "Not Found",
    });
};
exports.error404Handler = error404Handler;
//# sourceMappingURL=errorRoutes.js.map