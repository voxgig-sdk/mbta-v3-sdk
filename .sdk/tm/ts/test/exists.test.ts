
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MbtaV3SDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MbtaV3SDK.test()
    equal(testsdk instanceof MbtaV3SDK, true,
      'MbtaV3SDK.test() must return a client synchronously')
  })

})
