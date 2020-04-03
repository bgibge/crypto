/*
 * @Author: xiaorujun
 * @Description: Index test
 * @Date: 2020-04-03 16:48:01
 * @Last Modified by: xiaorujun
 */
const crypto = require('../src/index')




describe('crypto helper', () => {
  describe('Method embellish', () => {
    test('embellish()', () => {
      expect(crypto.embellish).toThrowError()
    })

    test('embellish({})', () => {
      expect(crypto.embellish.bind(null, {})).toThrowError()
    })

    test('embellish("s=m+al/l")', () => {
      expect(crypto.embellish('s=m+al/l')).toBe('sm-al_l')
    })
  })


  describe('Method salt', () => {
    test('salt()', () => {
      expect(crypto.salt().length).toBe(12)
    })

    test('salt(12)', () => {
      expect(crypto.salt(12).length).toBe(16)
    })
  })


  describe('Method hash', () => {
    test('hash()', () => {
      expect(crypto.hash).toThrowError()
    })

    test('hash(\'test\')', () => {
      expect(crypto.hash('test')).toBe('CY9rzUYh03PK3k6DJie09g==')
    })

    test('hash(\'test\', { encoding: \'hex\' })', () => {
      expect(crypto.hash('test', {
        encoding: 'hex'
      })).toBe('098f6bcd4621d373cade4e832627b4f6')
    })

    test('hash(\'test\', { algorithm: \'sha256\' })', () => {
      expect(crypto.hash('test', {
        algorithm: 'sha256'
      })).toBe('n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=')
    })
  })


  describe('Method hmac', () => {
    test('hmac()', () => {
      expect(crypto.hash).toThrowError()
    })

    test('hmac(\'test\', \'key\', { encoding: \'hex\' })', () => {
      expect(crypto.hmac('test', 'key', {
        encoding: 'hex'
      })).toBe('1d4a2743c056e467ff3f09c9af31de7e')
    })

    test('hmac(\'test\', \'key\', { algorithm: \'sha256\' })', () => {
      expect(crypto.hmac('test', 'key', {
        algorithm: 'sha256'
      })).toBe('Aq+1YwSQLGVvy3N83QPeYgW7bUAdooEu/ZstNqCK8Vk=')
    })
  })
})

