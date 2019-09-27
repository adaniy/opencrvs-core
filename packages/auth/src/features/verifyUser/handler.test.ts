import * as fetchAny from 'jest-fetch-mock'
import { createServerWithEnvironment } from '@auth/tests/util'
import { createServer } from '../..'
import * as codeService from '@auth/features/verifyCode/service'

const fetch = fetchAny as fetchAny.FetchMock

describe('verifyUser handler receives a request', () => {
  let server: any

  beforeEach(async () => {
    server = await createServer()
  })

  describe('user management service says user is not valid', () => {
    it('returns a 401 response to client', async () => {
      fetch.mockReject(new Error())
      const res = await server.server.inject({
        method: 'POST',
        url: '/verifyUser',
        payload: { mobile: '+8801711111111' }
      })

      expect(res.statusCode).toBe(401)
    })
  })
  describe('user management service says user is valid', () => {
    it('returns a nonce to the client', async () => {
      jest.spyOn(codeService, 'generateNonce').mockReturnValue('12345')
      fetch.mockResponse(
        JSON.stringify({
          userId: '1',
          status: 'active',
          scope: ['demo'],
          mobile: '+8801711111111'
        })
      )
      const res = await server.server.inject({
        method: 'POST',
        url: '/verifyUser',
        payload: { mobile: '+8801711111111' }
      })

      expect(JSON.parse(res.payload).nonce).toBe('12345')
    })
    it('generates a mobile verification code and sends it to sms gateway', async () => {
      server = await createServerWithEnvironment({ NODE_ENV: 'production' })

      const reloadedCodeService = require('../verifyCode/service')

      jest.spyOn(reloadedCodeService, 'generateNonce').mockReturnValue('12345')

      fetch.mockResponse(
        JSON.stringify({
          userId: '1',
          status: 'active',
          scope: ['admin'],
          mobile: '+8801711111111'
        })
      )
      const spy = jest.spyOn(reloadedCodeService, 'sendVerificationCode')

      await server.server.inject({
        method: 'POST',
        url: '/verifyUser',
        payload: { mobile: '+8801711111111' }
      })

      expect(spy).toHaveBeenCalled()
      expect(spy.mock.calls[0]).toHaveLength(2)
      expect(spy.mock.calls[0][0]).toBe('+8801711111111')
    })
  })
})