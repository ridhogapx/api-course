import Orm from '../ConfigDB';

const { DataTypes }: any = require('sequelize');

export const Course: any = Orm.define('sus_course', {
	title: {
		type: DataTypes.STRING(20),
		allowNull: false
	},
	yt_url: {
		type: DataTypes.STRING(100),
		allowNull: false
	}
});

