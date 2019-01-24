const rand = require('csprng')
for (let i = 0; i < 10; i ++) {
  console.log(rand(160, 36))
}