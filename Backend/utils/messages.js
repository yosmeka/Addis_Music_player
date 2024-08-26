export const createError = (status, message) => {
    return {
        success: "error",
        status,
        message
    };
};

export const createSuccess = (message, data) => {
    return {
        success: "success",
        message,
        data
    };
}
