import { Request, Response, Router } from 'express';
import { postRegisterDevice, getUpdatablePasses, unregisterDevice } from '../controller/passKitServerController';
import { createPass } from '../controller/passController';

let router = Router();

/* create a new pass */
router.post('/pass', createPass);

/* update a pass */
router.put('/pass/:passTypeId/:serialNumber', createPass);

// Registering a Device to Receive Push Notifications for a Pass
router.post('/v1/devices/:deviceId/registrations/:passTypeId/:serialNumber', postRegisterDevice);


// Getting the Serial Numbers for Passes Associated with a Device
router.get('/v1/devices/:deviceId/registrations/:passTypeId', getUpdatablePasses);


// Getting the Latest Version of a Pass
router.get('/v1/passes/:passTypeId/:serialNumber', (req: Request, res: Response) => {
  console.log("#### GETTING PASS FILE ####")
  res.setHeader("Content-Type", "application/vnd.apple.pkpass");
  res.sendFile("pass-package/pathToPass.pkpass", { root : "./"})
});


// Unregistering a Device
router.delete('/v1/devices/:deviceId/registrations/:passTypeId/:serialNumber', unregisterDevice);


// Logging Errors
router.post('/v1/log', (req: Request, res: Response) => {
  res.send(req.params);
});


export default router;
