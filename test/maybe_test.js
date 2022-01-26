import { assert } from '@open-wc/testing'
import { Maybe, Some, Nothing } from '../lib/maybe.js'

suite('Maybe()', () => {

  test('should return Some on non-nil value', () => {
    assert.deepEqual(Maybe(1), Some(1))
  })

  test('should return Nothing on null', () => {
    assert.deepEqual(Maybe(null), Nothing)
  })

  test('should return Nothing on undefined', () => {
    assert.deepEqual(Maybe(undefined), Nothing)
  })

})

suite('Nothing', () => {

  test('should map to itself', () => {
    assert.deepEqual(Nothing.map(x => x * x), Nothing)
  })

  test('should flat map to itself', () => {
    assert.deepEqual(Nothing.flatMap(x => Some(x * x)), Nothing)
  })

  test('should return other value on call to orElse()', () => {
    assert.equal(Nothing.orElse(2), 2)
  })

  test('should return undefined on call to orUndefined()', () => {
    assert.equal(Nothing.orUndefined(), undefined)
  })

  test('should return toString()', () => {
    assert.equal(Nothing.toString(), 'Nothing')
  })

  test('should do nothing forEach()', () => {
    var count = 0
    const f = (a) => count++

    Nothing.forEach(f)

    assert.equal(count, 0)
  })

})

suite('Some()', () => {

  test('should map', () => {
    assert.deepEqual(Some(2).map(x => x * x), Some(4))
  })

  test('should flat map', () => {
    assert.deepEqual(Some(2).flatMap(x => Some(x * x)), Some(4))
  })

  test('should return boxed value on call to orElse()', () => {
    assert.equal(Some(2).orElse(undefined), 2)
  })

  test('should return boxed value on call to orUndefined()', () => {
    assert.equal(Some(2).orUndefined(), 2)
  })

  test('should return toString()', () => {
    assert.equal(Some(2).toString(), 'Some(2)')
  })

  test('should execute forEach()', () => {
    var count = 0
    const f = (a) => { count = count + a }

    Some(1).forEach(f)

    assert.equal(count, 1)
  })
})
