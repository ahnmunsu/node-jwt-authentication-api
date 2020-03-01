# node-jwt-authentication-api

NodeJS JWT Authentication API

For documentation and instructions check out http://jasonwatmore.com/post/2018/08/06/nodejs-jwt-authentication-tutorial-with-example-api

```
$ npm install
$ npm run start
```

Send a HTTP request to get an access token as below using Postman  
```
POST http://192.168.0.38:4000/users/authenticate HTTP/1.1
Content-Type: application/json
User-Agent: PostmanRuntime/7.20.1
Accept: */*
Cache-Control: no-cache
Postman-Token: 5da98e59-dc63-4e4c-8a09-a75b2913c543
Host: 192.168.0.38:4000
Accept-Encoding: gzip, deflate
Content-Length: 44
Connection: keep-alive

{
	"username": "test",
	"password": "test"
}
```

After get an access token from server, send a HTTP request with the access token to get data as below using Postman  
```
GET http://192.168.0.38:4000/users/ HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tL2Fobm11bnN1IiwiYXVkIjoxLCJpYXQiOjE1ODMwNTk1MDIsImV4cCI6MTU4MzA2MzEwMn0.0u4pe4nRFgxTddhMqbexylj9uOJuLNHAErr9PrBDsDM
User-Agent: PostmanRuntime/7.20.1
Accept: */*
Cache-Control: no-cache
Postman-Token: 451e8f4e-05c0-40bd-81a0-c4e6ab62d030
Host: 192.168.0.38:4000
Accept-Encoding: gzip, deflate
Connection: keep-alive
```
