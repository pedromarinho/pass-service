import { Request, Response, Router } from 'express';
import { postRegisterPass } from '../controller/passController';

let router = Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
  res.send('welcome to api');
});

// Registering a Device to Receive Push Notifications for a Pass
router.post('/v1/devices/:deviceId/registrations/:passTypeId/:serialNumber', postRegisterPass);


// Getting the Serial Numbers for Passes Associated with a Device
router.get('/v1/devices/:deviceId/registrations/:passTypeId?passesUpdatedSince=tag', (req: Request, res: Response) => {
  res.send(req.params);
});


// Getting the Latest Version of a Pass
router.get('/v1/passes/:passTypeId/:serialNumber', (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/vnd.apple.pkpass");
  res.sendFile("pass-package/Lollipop.pkpass", { root : "./"})
});


// Unregistering a Device
router.delete('/v1/devices/:deviceId/registrations/:passTypeId/:serialNumber', (req: Request, res: Response) => {
  res.send(req.params);
});


// Logging Errors
router.post('/v1/log', (req: Request, res: Response) => {
  res.send(req.params);
});


export default router;
