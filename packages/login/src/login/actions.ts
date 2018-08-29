import { AxiosError } from 'axios'
import { RouterAction } from 'react-router-redux'
import { convertToMSISDN } from '../utils/dataCleanse'
import { config } from '../config'
import {
  IAuthenticateResponse,
  IAuthenticationData,
  ITokenResponse
} from '../utils/authApi'

export const AUTHENTICATE = 'login/AUTHENTICATE'
export const AUTHENTICATION_COMPLETED = 'login/AUTHENTICATION_COMPLETED'
export const AUTHENTICATION_FAILED = 'login/AUTHENTICATION_FAILED'

export const VERIFY_CODE = 'login/VERIFY_CODE'
export const VERIFY_CODE_COMPLETED = 'login/VERIFY_CODE_COMPLETED'
export const VERIFY_CODE_FAILED = 'login/VERIFY_CODE_FAILED'

export const RESEND_SMS = 'login/RESEND_SMS'
export const RESEND_SMS_COMPLETED = 'login/RESEND_SMS_COMPLETED'
export const RESEND_SMS_FAILED = 'login/RESEND_SMS_FAILED'

type AuthenticationDataAction = {
  type: typeof AUTHENTICATE
  payload: IAuthenticationData
}

type AuthenticateResponseAction = {
  type: typeof AUTHENTICATION_COMPLETED
  payload: IAuthenticateResponse
}

type AuthenticationFailedAction = {
  type: typeof AUTHENTICATION_FAILED
  payload: Error
}

type ResendSMSAction = {
  type: typeof RESEND_SMS
}

type ResendSMSCompleteAction = {
  type: typeof RESEND_SMS_COMPLETED
  payload: IAuthenticateResponse
}

type ResendSMSFailedAction = {
  type: typeof RESEND_SMS_FAILED
  payload: Error
}

type VerifyCodeAction = {
  type: typeof VERIFY_CODE
  payload: { code: string }
}

type VerifyCodeCompleteAction = {
  type: typeof VERIFY_CODE_COMPLETED
  payload: ITokenResponse
}

type VerifyCodeFailedAction = {
  type: typeof VERIFY_CODE_FAILED
  payload: Error
}

export type Action =
  | RouterAction
  | AuthenticationDataAction
  | AuthenticateResponseAction
  | AuthenticationFailedAction
  | ResendSMSAction
  | ResendSMSCompleteAction
  | ResendSMSFailedAction
  | VerifyCodeAction
  | VerifyCodeCompleteAction
  | VerifyCodeFailedAction

export const authenticate = (
  values: IAuthenticationData
): AuthenticationDataAction => {
  const cleanedData = {
    mobile: convertToMSISDN(values.mobile, config.LOCALE),
    password: values.password
  }

  return {
    type: AUTHENTICATE,
    payload: cleanedData
  }
}

export const completeAuthentication = (
  response: IAuthenticateResponse
): AuthenticateResponseAction => ({
  type: AUTHENTICATION_COMPLETED,
  payload: response
})

export const failAuthentication = (
  error: AxiosError
): AuthenticationFailedAction => ({
  type: AUTHENTICATION_FAILED,
  payload: error
})

export const resendSMS = (): ResendSMSAction => ({
  type: RESEND_SMS
})

export interface IVerifyCodeNumbers {
  code1: string
  code2: string
  code3: string
  code4: string
  code5: string
  code6: string
}

export const completeSMSResend = (
  response: IAuthenticateResponse
): ResendSMSCompleteAction => ({
  type: RESEND_SMS_COMPLETED,
  payload: response
})

export const failSMSResend = (error: AxiosError): ResendSMSFailedAction => ({
  type: RESEND_SMS_FAILED,
  payload: error
})

export const verifyCode = (values: IVerifyCodeNumbers): VerifyCodeAction => {
  const code = Object.values(values).join('')

  return {
    type: VERIFY_CODE,
    payload: { code }
  }
}

export const completeVerifyCode = (
  response: ITokenResponse
): VerifyCodeCompleteAction => ({
  type: VERIFY_CODE_COMPLETED,
  payload: response
})

export const failVerifyCode = (error: AxiosError): VerifyCodeFailedAction => ({
  type: VERIFY_CODE_FAILED,
  payload: error
})
