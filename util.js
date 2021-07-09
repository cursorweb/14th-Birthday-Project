module.exports.serialize = text => {
    return encodeURIComponent(JSON.stringify(text));
};

module.exports.deserialize = text => {
    return decodeURIComponent(JSON.parse(text));
};