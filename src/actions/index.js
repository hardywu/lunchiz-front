export * from './auth';
export * from './restaurants';
export * from './reviews';
export * from './users';

export const SHOW_ERROR_MSG = 'SHOW_ERROR_MSG'
export const DISMISS_ERROR_MSG = 'DISMISS_ERROR_MSG'

export const showErrMsg = (msg) => {
  return { type: SHOW_ERROR_MSG, msg }
}

export const dismissErrMsg = () => {
  return { type: DISMISS_ERROR_MSG }
}
