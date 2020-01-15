import { Request, Response } from "express";
import { Template } from "@walletpass/pass-js";
import fs from "fs-extra";

const KEY_FILE = 'keys/key.pem'
const KEY_PASS = '123456';
const PASSES_FOLDER = 'passes';
const PASS_EXT = '.pkpass';
const PASS_TEMPLATE = 'passTemplate/Event.pass'

export async function createPass(request: Request, response: Response) {
    const template = await Template.load(PASS_TEMPLATE);

    await template.loadCertificate(
        KEY_FILE,
        KEY_PASS
    );

    template.passTypeIdentifier = "pass.com.pedro.example";
    template.teamIdentifier = "1214134214132";

    const pass = template.createPass();

    const buf = await pass.asBuffer();
    await fs.writeFile(`${PASSES_FOLDER}/${template.passTypeIdentifier}_${template.serialNumber}${PASS_EXT}`, buf);

    response.sendStatus(201);
}