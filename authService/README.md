## VIA authentication service(mock)
Mock of the authentication service, which serves hardcoded data from ./dummyData.json file

### GET /authenticate
Request query - ?username=username&password=password  
Response - {"authenticated": true/false}

### GET /user/:username
Get's user's information(except password)  

### start
```
npm start
```
### test
```
npm run test
```