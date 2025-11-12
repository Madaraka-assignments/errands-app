import 'server-only'
import { SignJWT, decodeJwt, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { SessionPayload } from '@/types/session'
import { User } from '@/types/auth'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.error('Failed to verify session',error)
  }
}



 
export async function createSession(access_token: string, refresh_token:string, user:User) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ access_token, refresh_token, expiresAt })
  const cookieStore = await cookies()
 
  cookieStore.set('errand-session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
  cookieStore.set('user-info', JSON.stringify(user), {
    httpOnly: false,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
  console.log('Session created')
}

 
export async function storeRegisterUser(user:string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const cookieStore = await cookies()
  cookieStore.set('user-info-reg', JSON.stringify(user), {
    httpOnly: false,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
  console.log('Session created')
}

export async function getUserFromSession() {
  try {
    const cookie = (await cookies()).get('user-info-reg')?.value

    if (!cookie) return null

    const user = JSON.parse(cookie) as string
    return user
  } catch (error) {
    console.error('Failed to get user from session:', error)
    return null
  }
}

export async function updateSession() {
    const session = (await cookies()).get('errand-session')?.value
    const payload = await decrypt(session)
   
    if (!session || !payload) {
      return null
    }
   
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
   
    const cookieStore = await cookies()
    cookieStore.set('errand-session', session, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: 'lax',
      path: '/',
    })
  }

export async function getSession() {
    const session = (await cookies()).get('errand-session')?.value
    const payload = await decrypt(session)
   
    if (!session || !payload) {
      return null
    }
    return payload as SessionPayload
  }

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete('errand-session')
  cookieStore.delete('user_info')
}