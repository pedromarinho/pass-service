import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Pass} from "../entity/Pass";
import {Registration} from "../entity/Registration";
import {extractToken} from "../util/auth"

let passRepository = () => getManager().getRepository(Pass);
let registrationRepository = () => getManager().getRepository(Registration);

/**
 * Register a pass.
 */
export async function postRegisterPass(request: Request, response: Response) {
    const pass = await passRepository().findOne({ serialNumber: request.params.serialNumber, authenticationToken: extractToken(request) });

    if (pass) {
        const reg = await registrationRepository().findOne({ deviceId: request.params.deviceId, serialNumber: request.params.serialNumber });
        if (reg) {
            console.log("#### PASS REGISTRATION: The device has already registered ####")
            response.sendStatus(200);
        } else {
            const registration = new Registration();
            registration.deviceId = request.params.deviceId;
            registration.passTypeId = request.params.passTypeId;
            registration.pushToken = request.body.pushToken;
            registration.serialNumber = request.params.serialNumber;
            await registrationRepository().manager.save(registration);
            console.log("#### PASS REGISTRATION: The device register ok ####")
            response.sendStatus(201);
        }
    } else {
        console.log("#### PASS REGISTRATION: The device did not statisfy the authentication requirements ####")
        response.sendStatus(401);
    }
}
