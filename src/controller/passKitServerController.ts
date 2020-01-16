import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Pass } from "../entity/Pass";
import { Registration } from "../entity/Registration";
import { extractToken } from "../util/auth"

const passRepository = () => getManager().getRepository(Pass);
const registrationRepository = () => getManager().getRepository(Registration);

/**
 *  Registering a device to receive push notifications for a pass
    Authorization tokens are specified by each pass
 */
export async function postRegisterDevice(request: Request, response: Response) {
    console.log("####### REGISTERING DEVICE #######")
    const pass = await passRepository().findOne({
        passTypeId: request.params.passTypeId,
        serialNumber: request.params.serialNumber,
        authenticationToken: extractToken(request)
    });
    if (pass) {
        let registration = await registrationRepository().findOne(
            { deviceId: request.params.deviceId, pass: pass }
        );
        if (registration) {
            response.sendStatus(200);
        } else {
            registration = new Registration();
            registration.deviceId = request.params.deviceId;
            registration.pushToken = request.body.pushToken;
            registration.pass = pass;
            await registrationRepository().save(registration);
            response.sendStatus(201);
        }
    } else {
        response.sendStatus(401);
    }
}

/**
 *  Handling updates request
 */
export async function getUpdatablePasses(request: Request, response: Response) {
    console.log("####### GET UPDATABLE PASSES #######")
    const passes = await passRepository().find({ where: { passTypeId: request.params.passTypeId }, relations: ["registrations"] });
    if (passes) {
        response.status(200).send({ lastUpdated: passes[0].updatedAt, serialNumbers: passes.map(pass => pass.serialNumber) });
    } else {
        response.sendStatus(401);
    }
}

/**
 *  Unregistering a device to receive push notifications for a pass
 */
export async function unregisterDevice(request: Request, response: Response) {
    console.log("####### UNREGISTERING DEVICE #######")
    const pass = await passRepository().findOne({
        passTypeId: request.params.passTypeId,
        serialNumber: request.params.serialNumber,
        authenticationToken: extractToken(request)
    });
    if (pass) {
        let registration = await registrationRepository().findOne(
            { deviceId: request.params.deviceId, pass: pass }
        );
        if (registration) {
            await registrationRepository().delete(registration);
            response.sendStatus(200);
        } else {
            response.sendStatus(401);
        }
    } else {
        response.sendStatus(401);
    }
}

