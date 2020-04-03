/*
 * @Author: xiaorujun
 * @Description: RSA test
 * @Date: 2020-04-03 16:29:41
 * @Last Modified by: xiaorujun
 */
const fs = require('fs')
const path = require('path')
const RSA = require('../src/RSA')
const NodeRSA = require('node-rsa')




describe('RSA helper', () => {
  const crypto = new RSA()

  test('正确返回`crypto`实例', () => {
    expect(crypto).toBeInstanceOf(crypto.constructor)
  })


  test('rsaKey', () => {
    expect(crypto.rsaKey).toBeInstanceOf(NodeRSA)
  })


  test('publicKey', () => {
    expect(crypto.publicKey).toMatch(/PUBLIC KEY/)
  })


  test('whtake()', () => {
    expect(crypto.whtake()).toBeInstanceOf(NodeRSA)
  })


  test('encrypt() and decrypt()', () => {
    const clearText = 'content'
    const cipherText = crypto.encrypt(clearText)

    expect(crypto.decrypt(cipherText)).toBe(clearText)
  })


  describe('configure()', () => {
    const pemPath = path.join(__dirname, './rsa_private.pem')

    const keyData = fs.readFileSync(pemPath, { encoding: 'utf8' })

    test('without keyData', () => {
      expect(crypto.configure).toThrowError()
    })

    crypto.configure(keyData)

    test('.publicKey', () => {
      expect(crypto.publicKey).toMatch(/MIGeMA0GC/)
    })


    test('encrypt() and decrypt()', () => {
      const clearText = 'content'
      const cipherText = crypto.encrypt(clearText)

      expect(crypto.decrypt(cipherText)).toBe(clearText)
    })
  })


  describe('RSA.new()', () => {
    const ncrypto = RSA.new()


    test('没有影响旧的 crypto', () => {
      expect(crypto.publicKey).not.toBe(ncrypto.publicKey)
    })


    test('encrypt() and decrypt()', () => {
      const clearText = 'content'
      const cipherText = ncrypto.encrypt(clearText)

      expect(ncrypto.decrypt(cipherText)).toBe(clearText)
    })
  })
})

