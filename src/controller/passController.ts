import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Pass} from "../entity/Pass";
import {Registration} from "../entity/Registration";
import {extractToken} from "../util/auth"

let passRepository = () => getManager().getRepository(Pass);
let registrationRepository = () => getManager().getRepository(Registration);

/**
 * Register a device.
 */
export async function postRegisterDevice(request: Request, response: Response) {
    const pass = await passRepository().findOne({ serialNumber: request.params.serialNumber, authenticationToken: extractToken(request) });
    if (pass) {
        const reg = await registrationRepository().findOne({ deviceId: request.params.deviceId, serialNumber: request.params.serialNumber });
        if (reg) {
            response.sendStatus(200);
        } else {
            const registration = new Registration();
            registration.deviceId = request.params.deviceId;
            registration.passTypeId = request.params.passTypeId;
            registration.pushToken = request.body.pushToken;
            registration.serialNumber = request.params.serialNumber;
            await registrationRepository().manager.save(registration);
            response.sendStatus(201);
        }
    } else {
        response.sendStatus(401);
    }
}

export function getUpdatablePasses(request: Request, response: Response) {
    // not implemented
}

/**
 * Unregister a device.
 */
export async function unregisterDevice(request: Request, response: Response) {
    const pass = await passRepository().findOne({ serialNumber: request.params.serialNumber, authenticationToken: extractToken(request) });
    if (pass) {
        const reg = await registrationRepository().findOne({ deviceId: request.params.deviceId, serialNumber: request.params.serialNumber });
        if (reg) {
            await registrationRepository().delete(reg);
            response.sendStatus(200);
        } else {
            response.sendStatus(201);
        }
    } else {
        response.sendStatus(401);
    }
}
