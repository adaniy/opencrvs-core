import User from 'src/model/user'
import verifyPassHandler from './handler'

test("verifyPassHandler should return 400 when mobile or password isn't supplied", async () => {
  let actualCode = null
  await verifyPassHandler(
    // @ts-ignore
    { payload: {} },
    { response: () => ({ code: (code: number) => (actualCode = code) }) }
  )
  expect(actualCode).toBe(400)
})

test("verifyPassHandler should return 400 when user doesn't exist", async () => {
  const spy = jest.spyOn(User, 'findOne').mockResolvedValueOnce(null)

  let actualCode = null
  await verifyPassHandler(
    // @ts-ignore
    { payload: { mobile: '27555555555', password: 'test' } },
    { response: () => ({ code: (code: number) => (actualCode = code) }) }
  )
  expect(actualCode).toBe(400)
  expect(spy).toBeCalled()
})

test("verifyPassHandler should return 400 when password hash doesn't match", async () => {
  const spy = jest.spyOn(User, 'findOne').mockResolvedValueOnce({
    mobile: '27555555555',
    passwordHash: 'xyz',
    salt: '12345',
    role: 'test'
  })

  let actualCode = null
  await verifyPassHandler(
    // @ts-ignore
    { payload: { mobile: '27555555555', password: 'test' } },
    { response: () => ({ code: (code: number) => (actualCode = code) }) }
  )
  expect(actualCode).toBe(400)
  expect(spy).toBeCalled()
})

test('verifyPassHandler should return 200 and the user role when the user exists and the password hash matches', async () => {
  const spy = jest.spyOn(User, 'findOne').mockResolvedValueOnce({
    mobile: '27555555555',
    passwordHash:
      'b8be6cae5215c93784b1b9e2c06384910f754b1d66c077f1f8fdc98fbd92e6c17a0fdc790b30225986cadb9553e87a47b1d2eb7bd986f96f0da7873e1b2ddf9c',
    salt: '12345',
    role: 'test'
  })

  const res = await verifyPassHandler(
    // @ts-ignore
    { payload: { mobile: '27555555555', password: 'test' } },
    {}
  )
  expect(res).toMatchObject({ role: 'test' })
  expect(spy).toBeCalled()
})

test('verifyPassHandler should throw when User.findOne throws', async () => {
  const spy = jest.spyOn(User, 'findOne').mockImplementationOnce(() => {
    throw new Error('boom')
  })
  await expect(
    verifyPassHandler(
      // @ts-ignore
      { payload: { mobile: '27555555555', password: 'test' } },
      {}
    )
  ).rejects.toThrow('boom')
  expect(spy).toBeCalled()
})
