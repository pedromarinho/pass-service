import { Request, Response, Router } from 'express';

let router = Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
  res.send('welcome to api');
});

// Registering a Device to Receive Push Notifications for a Pass
router.post('/:version/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:serialNumber', (req: Request, res: Response) => {
  console.log(req.params)
  res.sendStatus(201);
});


// Getting the Serial Numbers for Passes Associated with a Device
router.get('/:version/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier?passesUpdatedSince=tag', (req: Request, res: Response) => {
  res.send(req.params);
});


// Getting the Latest Version of a Pass
router.get('/:version/passes/:passTypeIdentifier/:serialNumber', (req: Request, res: Response) => {
  res.send(req.params);
});


// Unregistering a Device
router.delete('/:version/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:serialNumber', (req: Request, res: Response) => {
  res.send(req.params);
});


// Logging Errors
router.post('/:version/log', (req: Request, res: Response) => {
  res.send(req.params);
});


export default router;
