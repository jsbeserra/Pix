import { environment } from '@main/config/config'
import jwt from 'jsonwebtoken'

export function AuthenticateMiddleware(req, res, next) {
	const token = req.header('Authorization')
	if (!token) return res.status(401).json({ message: 'Authentication token not provided' })
	jwt.verify(token, `-----BEGIN PUBLIC KEY-----\n${environment.AUTORIZATION_PUBLIC_KEY}\n-----END PUBLIC KEY-----` , (err, user) => {
		if (err) return res.status(401).json({ message: 'Invalid authorization token.' })
		req.user = user
		next()
	})
}