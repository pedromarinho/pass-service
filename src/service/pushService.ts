import * as apn from "apn";
import { Constants } from '../constants';

const options = {
    cert: Constants.CERT_FILE,
    key: Constants.KEY_FILE,
    passphrase: Constants.KEY_PASS,
    production: true
}

const apnProvider = new apn.Provider(options);

export async function sendPush(deviceTokens: string[], topic: string) {

    let note = new apn.Notification();
    note.payload = {};
    note.contentAvailable = true;
    note.topic = topic;

    apnProvider.send(note, deviceTokens).then((response) => {
        console.log(response)
    });

}