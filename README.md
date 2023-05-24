# API For E-Course
Sebuah API untuk keperluan E-Course yang menggunakan arsitektur REST. 

# Auth dan User
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