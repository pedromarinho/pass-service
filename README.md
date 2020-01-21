# Passkit Web Service in NodeJs + Typescript

## Requirements

- NodeJs 10+

## Getting Started

```bash
$ git clone https://github.com/pedromarinho/pass-service.git
$ cd pass-service
$ npm install
$ npm run start
```

## Creating a pass
- Send a post request to http://localhost:3000/pass/
- On the device, access the url: http://localhost:3000/v1/passes/:passTypeId/:serialNumber passing the pass type id and serial number.
- Install the pass in the Apple Wallet.

## Updating a pass
- Make changes to the template.
- Send a put request to http://localhost:3000/pass/:passTypeId/:serialNumber passing the pass type id and serial number. A push notification will be sent to the registered device and the pass will be updated automatically.
