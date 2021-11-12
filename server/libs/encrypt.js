const crypto = require('crypto')


const encryptSha256 = value => {
    return crypto.createHash('sha256').update(value.replace(/ /gi, '')).digest('hex');
};

module.exports = encryptSha256