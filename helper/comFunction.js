const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");


/***********************************************************************************************************
 *                                     Common Function [ JwtToken-pagination ]
 ***********************************************************************************************************/

const jwtToken = async function (body) {
  const token = jwt.sign(body, "Hello_win_JWT", { expiresIn: "1w" });
  return token;
};

const encryptFun = async password => {
  return await CryptoJS.AES.encrypt(password, 'Hello_win_organization').toString();

};

const decryptFun = async (inputPass, dbPassword) => {
  try {
    const bytes = await CryptoJS.AES.decrypt(dbPassword, 'Hello_win_organization');
    const originalText = await bytes.toString(CryptoJS.enc.Utf8);
    if (originalText === inputPass) {
      return originalText;
    }
  } catch (error) {
    throw new Error("Invalid Credential.");
  }

};

const pagination = function (start, end, sortBy) {
  let first = Number(start) ? Number(start) : 0;
  let last = Number(end) ? (Number(end) >= 100 ? 100 : Number(end)) : 100;
  let sort = sortBy ? sortBy : "createdAt";
  return { first, last, sort };
};
module.exports = {
  jwtToken,
  encryptFun,
  decryptFun,
  pagination,
};
