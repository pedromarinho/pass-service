import { Request, Response } from "express";
import { Template } from "@walletpass/pass-js";
import fs from "fs-extra";
import { getManager } from "typeorm";
import { Pass } from "../entity/Pass";
import { sendPush } from "../service/pushService"
import { Registration } from '../entity/Registration';
import { Constants } from '../constants';

const passRepository = () => getManager().getRepository(Pass);
const registrationRepository = () => getManager().getRepository(Registration);

export async function createPass(request: Request, response: Response) {
    try {
        const template = await Template.load(Constants.PASS_TEMPLATE);

        await template.loadCertificate(
            Constants.KEY_FILE,
            Constants.KEY_PASS
        );

        template.passTypeIdentifier = "pass.com.pedro.example";
        template.teamIdentifier = "1214134214132";

        const pass = template.createPass();

        const buf = await pass.asBuffer();
        await fs.writeFile(`${Constants.PASSES_FOLDER}/${template.passTypeIdentifier}_${template.serialNumber}${Constants.PASS_EXT}`, buf);

        let passEntity = await passRepository().findOne({
            passTypeId: request.params.passTypeId,
            serialNumber: request.params.serialNumber
        });

        if (passEntity) {
            passEntity.updatedAt = new Date();

            const pushTokens = await getDevicePushTokens(passEntity);
            sendPush(pushTokens, passEntity.passTypeId);
        } else {
            passEntity = new Pass();
            passEntity.passTypeId = pass.passTypeIdentifier || '';
            passEntity.serialNumber = pass.serialNumber || '';
            passEntity.authenticationToken = pass.authenticationToken || '';
        }

        await passRepository().manager.save(passEntity);

        response.sendStatus(201);
    } catch (error) {
        response.status(403).send({ err: error });
    }

}

async function getDevicePushTokens(pass: Pass) {
    let registrations = await registrationRepository().find({ where: { pass: pass }, select: ['pushToken'] });
    return registrations.map(registration => registration.pushToken);
}