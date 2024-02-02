import {Appwrite} from "appwrite";

const sdk = new Appwrite();

sdk
    .setEndpoint('https://localhost/v1') // Your API Endpoint
    .setProject('65bcc6ec62054d208033') // Your project ID
;

export const storage=sdk.storage;
export const account=sdk.account;