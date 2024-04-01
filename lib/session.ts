import { SessionOptions, withIronSession, applySession } from 'next-iron-session';
const sessionOption: SessionOptions = {
  cookieName: 'SESSIONNEXT',
  password: process.env.SECRET_PASSWORD_SESSION,
};
export default function withSession(handler) {
  return withIronSession(handler, sessionOption);
}

export function manualApplySession(req, res) {
  return applySession(req, res, sessionOption);
}
