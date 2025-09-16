"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
var crypto_1 = require("crypto");
var algorithm = 'aes-256-cbc';
var secretKey = process.env.ENCRYPTION_KEY || 'your-secret-key-32-characters-32';
var iv = Buffer.from('fixed-iv-16-byte');
function encrypt(text) {
    var cipher = crypto_1.default.createCipheriv(algorithm, secretKey, iv);
    var encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
function decrypt(encryptedText) {
    var decipher = crypto_1.default.createDecipheriv(algorithm, secretKey, iv);
    var decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
