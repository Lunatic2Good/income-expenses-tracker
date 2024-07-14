const getTokenFromHeader = (req) => {
    const headerObj = req.headers;
    const token = headerObj['authorization'].split(" ")[1];
    if(token !== undefined)
        return token;
    return {
        status: 'failed',
        message: 'There is no Token attached to the header'
    };
};

module.exports = getTokenFromHeader;