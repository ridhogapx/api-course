import Orm from '../ConfigDB'

const { DataTypes } = require('sequelize')

export const GoogleSchema = Orm.define('sus_google', {
	email: {
		type: DataTypes.STRING(70),
		allowNull: false
	}, 
	name: {
		type: DataTypes.STRING(100),
		allowNull: false
	}
})

export const checkGoogleModel = async(): Promise<void> => {
	try {
		await Orm.authenticate()
	} catch(err) {
		console.log(err)
	}
}

export const syncGoogleModel = async(): Promise<void> => {
	try {
		await Orm.sync()
	} catch(err) {
		console.log(err)
	}
}