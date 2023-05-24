# API For E-Course
Sebuah API untuk keperluan E-Course yang menggunakan arsitektur REST. 

# Auth dan User

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