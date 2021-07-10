module.exports.serialize = text => {
    return JSON.stringify(text);
};

module.exports.deserialize = text => {
    return JSON.parse(text);
};

module.exports.readCookie = (str, key) => {
    if (!str) return;

    const split = str.split("; ");
    const kv = {};
    split.forEach(k => {
        let sp = k.split("=");
        kv[sp[0]] = sp[1];
    });
    return kv[key];
};