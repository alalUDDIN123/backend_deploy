const jwt = require('jsonwebtoken');
const secretKey =  process.env.SECRET_KEY;

function generateToken(user) {
    // console.log(user._id)
  const payload = { userId: user._id};
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secretKey, options);
}

module.exports=generateToken  