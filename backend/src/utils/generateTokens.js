
const jwt = require('jsonwebtoken')

let generateToken = async (id, res) => {
	try {
		const payload = {id};
		const accessToken = jwt.sign(
			payload,
			process.env.ACCESS_JWT_SECRET,
			{ expiresIn: "30m" }
		);

		const newRefreshToken = jwt.sign(
			payload,
			process.env.REFRESH_JWT_SECRET,
			{ expiresIn: "1d" }
		);

		res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 , sameSite: 'none'});
    	res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none'});
		return {
			access: accessToken,
			refresh: newRefreshToken
		};
		
	} catch (err) {
		console.log(err)
	}
};

module.exports = {generateToken}