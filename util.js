module.exports.serialize = text => {
    return encodeURIComponent(JSON.stringify(text));
};

module.exports.deserialize = text => {
    return decodeURIComponent(JSON.parse(text));
};

module.exports.readCookie = (str, key) => {
    const split = str.split("; ");
    const kv = {};
    split.forEach(k => {
        let sp = k.split("=");
        kv[sp[0]] = sp[1];
    });
    return kv[key];
};