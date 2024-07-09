const bcrypt = require('bcryptjs');

const hash = bcrypt.hashSync("543211", 10);
console.log(hash)