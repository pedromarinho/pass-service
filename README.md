# Passkit Web Service in NodeJs + Typescript

## Getting Started

```bash
$ git clone https://github.com/pedromarinho/pass-service.git
$ cd pass-service
```

### Using docker
```
$ docker build -t pass-service .
$ docker run -p 3000:3000 -v $PWD:/src/ pass-service
```

### or (requires NodeJS 10+)
```
$ npm install
$ npm run start
```



## Creating a pass
```
POST http://localhost:3000/pass/
```
- On the device, access the url: http://localhost:3000/v1/passes/:passTypeId/:serialNumber passing the pass type id and serial number.
- Install the pass in the Apple Wallet.

## Updating a pass
- Make changes to the template.
```
PUT http://localhost:3000/pass/<passTypeId>/<serialNumber>
```
- A push notification will be sent to the registered device and the pass will be updated automatically.



---

## Passkit Web Service
The complete specification can
be found in the [Passbook Web Service Reference](https://developer.apple.com/library/prerelease/ios/#documentation/PassKit/Reference/PassKit_WebService/WebService.html).

### Registering a Device to Receive Push Notifications for a Pass
```
POST http://localhost:3000/v1/devices/<deviceId>/registrations/<passTypeId>/<serialNumber>
```

### Getting the Serial Numbers for Passes Associated with a Device
```
GET http://localhost:3000/v1/devices/<deviceId>/registrations/<passTypeId>?passesUpdatedSince
```

### Getting the Latest Version of a Pass
```
GET http://localhost:3000/v1/passes/<passTypeId>/<serialNumber>
```

### Unregistering a Device
```
DELETE http://localhost:3000/v1/devices/<deviceId>/registrations/<passTypeId>/<serialNumber>
```
