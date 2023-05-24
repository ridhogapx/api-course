# API For E-Course
Sebuah API untuk keperluan E-Course yang menggunakan arsitektur REST. 

# Stack
<a href='https://www.typescriptlang.org/'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYsxxlP9vnPockAeIRH_AbcNovXTSOIgcO9m6vfdGebA&s' width="100"></a>
<a href='https://nodejs.org'><img src='https://cdn.freebiesupply.com/logos/thumbs/2x/nodejs-1-logo.png' width="100"></a>
<a href='https://www.mysql.com'><img src='https://www.vectorlogo.zone/logos/mysql/mysql-ar21.png' width="100"></a>
<a href='https://expressjs.com'><img src='https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png' width="100"></a>
<a href='https://sequelize.org'><img src='https://google.github.io/sqlcommenter/images/sequelize-logo.png' width="100"></a>
<a href='https://nodemon.io/'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMds6bPjl6K_7GczdFMVR6HCB-fJP0otyLaLjsXKQHHQ&s' width="100"></a>

# Auth dan User
Pada bagian ini berisi Authentikasi seperti generate token JWT, validasi token, dll. Selain itu, bagian ini juga berisi endpoint untuk mendaftar dan login user. 

## Register
Berikut endpoint untuk mendaftar User.
``` http
	post /api/register
```
Dengan ketentuan payload body: 
| column | Type     | Description                       |
| :------------- 	| :----------------- | :-------------------------------- 	|
| `email`   		| `email: string`		|	Email user  					|
| `name`			| `text: string`		|	Nama user 						|
| `password`		| `text: string / hash`	|	Password 						|
| `confirmPw`		| `text: string`		|	Konfirmasi password harus sama  |


Jika berhasil register, maka kamu akan mendapatkan token JWT yang bisa kamu gunakan pada client-side atau lebih tepatnya dengan Cookie HTTP-Only. Token ini nantinya akan digunakan untuk transaksi data dengan teknik Decode Token. Berikut response yang didapat apabila berhasil mendaftar:
``` bash
{
	message: 'Pendaftaran berhasil!',
	success: true,
	status: 201,
	data: [
			{
				token: token
			}
		]
}
```
Jika email sudah terdaftar, maka akan mendapatkan response di bawah ini: 
``` bash
{
	message: 'Maaf, akun anda sudah terdaftar!',
	success: false,
	status: 403,
	data: []
}
```