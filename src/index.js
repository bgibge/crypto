/*
 * @Author: xiaorujun
 * @Description: crypto tool
 * @Date: 2020-04-03 16:36:09
 * @Last Modified by: xiaorujun
 */
const assert = require('assert')
const crypto = require('crypto')
const isObject = require('lodash/isObject')
const RSA = require('./RSA')





exports.RSA = RSA
exports.rsaKey = new RSA()



/**
 * Remove or replace`=`, `+`, `/` char from string.
 *
 * @param {string} content - string content
 *
 * @returns {string}
 */
exports.embellish = (content) => {
  assert.strictEqual('string', typeof content)

  return content
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}



/**
 * Generate random salt
 *
 * @param {number} [byteLen=8] - optional, The length of salt
 * @param {string} [encoding=base64] - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'base64'.
 *
 * @returns {string}
 */
exports.salt = (byteLen = 8, encoding = 'base64') => {
  const buf = crypto.randomBytes(+byteLen)

  return buf.toString(encoding)
}



/**
 * Hash value
 *
 * @param {string} content - data for hash.
 * @param {Object} options - options.
 * @param {string} [options.algorithm=md5] - optional. Hash algorithm.
 * @param {string} [options.encoding=base64] - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'base64'.
 *
 * @returns {string}
 */
exports.hash = (content, options = {}) => {
  if (isObject(content)) {
    content = JSON.stringify(content)
  }

  const { encoding, algorithm } = Object.assign({
    encoding: 'base64',
    algorithm: 'md5'
  }, options)

  const hashFn = crypto.createHash(algorithm)

  return hashFn.update(content).digest(encoding)
}



/**
 * Hash value with salt
 *
 * @param {string} content - data for hash.
 * @param {string} key - random salt
 * @param {string} [options.algorithm=md5] - optional. Hash algorithm.
 * @param {string} [options.encoding=base64] - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'base64'.
 *
 * @returns {string}
 */
exports.hmac = (content, key, options = {}) => {
  if (isObject(content)) {
    content = JSON.stringify(content)
  }

  const { encoding, algorithm } = Object.assign({
    encoding: 'base64',
    algorithm: 'md5'
  }, options)

  key = key || this.salt(12, 'base64')

  const hmacFn = crypto.createHmac(algorithm, key)

  return hmacFn.update(content).digest(encoding)
}
