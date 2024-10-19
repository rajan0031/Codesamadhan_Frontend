
import { host } from "../host/host";// host ko import kar lia to handle the deployment easily .... 


// frontend api for the uploadling the file 
export const uploadFileApi = `${host}/uploadFileApi`;


// fetching the all stored file from the backend api for the frontend 

export const getAllFilesFromTheBackend = `${host}/getAllFilesFromTheBackend`

// this is the api for the viewing the file 
export const viewAParticularFile = `${host}/viewAParticularFile`;
