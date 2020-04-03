/*
 * @Author: xiaorujun
 * @Description: random string
 * @Date: 2020-04-03 16:18:40
 * @Last Modified by: xiaorujun
 */



const CHARS = '1234567890abcdefghijklmnopqrstuvwxyz'
const CHARS_LEN = CHARS.length




/**
 * random string
 *
 * @param {number} length - lenght
 *
 * @returns {string}
 */
module.exports = function randomStr (length) {
  var result = ''

  for (let i = 0; i < length; i++) {
    const pos = Math.floor(Math.random() * CHARS_LEN)

    result += CHARS.charAt(pos)
  }

  return result
}
