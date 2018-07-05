import * as Hapi from 'hapi'
import * as Joi from 'joi'
import { unauthorized } from 'boom'
import { checkVerificationCode, deleteUsedVerificationCode } from './service'
import {
  getStoredUserInformation,
  createToken
} from 'src/features/authenticate/service'

interface IVerifyPayload {
  nonce: string
  code: string
}

interface IVerifyResponse {
  token: string
}

export default async function authenticateHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const { code, nonce } = request.payload as IVerifyPayload
  console.log('code in payload:', code)
  const valid = await checkVerificationCode(nonce, code)
  console.log(valid)
  if (valid) {
    const { userId, role } = await getStoredUserInformation(nonce)
    const token = await createToken(userId, role)
    if (await deleteUsedVerificationCode(nonce)) {
      const response: IVerifyResponse = { token }
      return response
    }
  }
  return unauthorized()
}

export const requestSchema = Joi.object({
  nonce: Joi.string(),
  code: Joi.string()
})
export const responseSchma = Joi.object({
  token: Joi.string()
})
