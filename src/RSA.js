/*
 * @Author: xiaorujun
 * @Description: 再次封装了非对称加密
 * @Date: 2020-04-03 15:59:55
 * @Last Modified by: xiaorujun
 */
const assert = require('assert')
const NodeRSA = require('node-rsa')
const randomStr = require('./randomStr')





const RSA = module.exports = class RSA {
  /**
   * 构造函数
   *
   * @param {string|buffer|object} - parameters for generating key or the key in one of supported formats.
   */
  constructor (keyData = { bits: 1024 }) {
    if (!(this instanceof RSA)) {
      return new NodeRSA(keyData)
    }

    this.keyRef = Symbol(randomStr(12))
    this.keyData = keyData
    this[this.keyRef] = new NodeRSA(keyData)
  }


  /**
   * Get `rsaKey`，if not new one and return.
   */
  get rsaKey () {
    if (!this[this.keyRef]) {
      this[this.keyRef] = new NodeRSA(this.keyData)
    }

    return this[this.keyRef]
  }


  /**
   * Get public key
   */
  get publicKey () {
    return this.rsaKey.exportKey('public')
  }


  /**
   * Change `keyData`, and update `rsaKey`
   *
   * @param {string|buffer|object} keyData - parameters for generating key or the key in one of supported formats.
   */
  configure (keyData) {
    assert.ok(keyData, 'keyData error')

    this.keyData = keyData
    this[this.keyRef] = new NodeRSA(keyData)
  }


  /**
   * Take `rsaKey` without paying
   */
  whtake () {
    return this.rsaKey
  }


  /**
   * Encrypting data method
   *
   * @param {string|number|object|array|Buffer} buffer - data for encrypting. Object and array will convert to JSON string.
   * @param {string} [encoding=base64] - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'base64'.
   *
   * @returns {string|Buffer}
   */
  encrypt (clearText, encoding = 'base64') {
    return this.rsaKey.encrypt(clearText, encoding)
  }


  /**
   * Decrypting data method
   *
   * @param {Buffer} buffer - buffer for decrypting.
   * @param {string} [encoding=utf8] - encoding for result string, can also take 'json' or 'buffer' for the automatic conversion of this type.
   *
   * @returns {Buffer|object|string}
   */
  decrypt (cipherText, encoding = 'utf8') {
    return this.rsaKey.decrypt(cipherText, encoding)
  }
}



RSA.new = function (keyData) {
  return new RSA(keyData)
}
