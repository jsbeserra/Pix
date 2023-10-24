import jwt from 'jsonwebtoken'
export function authenticateToken(req, res, next) {
	const token = req.header('Authorization')
	console.log(token)
	if (!token) return res.status(401).json({ message: 'Token de autenticação não fornecido' })
    
	const pu = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuwxPxpLJ5qhHaUhMUPRGt2g+VcptD2KYBVIt5gaULgPni5uIDmy6Kp5PX+KbJ5W7QJSuqosbNi0VxSfvNi1INl5VfcY4OJBbVRyjdt/QA8G2waNgaA+vXxEsRExJ7lVO7aRFL0sCf74PbB4Are2Ckgw7TO2VTBbAGz6+bAoPry+D1bhGb0d5vRfoLeA1MXsswAFwhDiNCpVObJRQqvr378wNKDeoZJmkJisOjg0WSjT7ok8otF1AvJwduUNxg3D5ANTioArzKYzqYo2eTT9rsvXQ2aB4t5TOqoU5py2qroZzoX3xTQ/h5JZ9zBvTALK6kyblAhQmqDJTVoDYi5FJsQIDAQAB'
	jwt.verify(token, `-----BEGIN PUBLIC KEY-----\n${pu}\n-----END PUBLIC KEY-----` , (err, user) => {
		if (err) {
			//console.log(err)
			return res.status(403).json({ message: 'Falha na autenticação do token' })
		}
      
		req.user = user
		next()
	})

}