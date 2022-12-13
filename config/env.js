const mongoUrls = {
    dev: `mongodb://localhost:27017/WIN_DB`,
};

const setUp = function (env) {
    return mongoUrls[env];
}

module.exports = { setUp }