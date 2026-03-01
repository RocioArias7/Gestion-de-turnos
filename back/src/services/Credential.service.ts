import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { CredentialModel } from "../config/data-source"
import { Credential } from "../entities/Credential.entity"



const crypPass = async (text: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hash = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map( b => b.toString(16).padStart(2, '0')).join("");
    return hashHex
}

const checkUserExist = async(username: string): Promise<void> => {
    const credentialFound = await CredentialModel.findOne({
        where: {
            username
        }
    })
    if(credentialFound) throw Error(`el username ${username} ya existe, intente con uno nuevo`);
}


export const createCredentialService = async (entityManager: EntityManager, username: string, password: string): Promise<Credential> => {
    await checkUserExist(username)
    const newCredential: Credential = entityManager.create( Credential, {
        username,
        password: await crypPass(password)
    })
   return await entityManager.save(newCredential)
}

export const checkCredentials = async (username: string, password: string): Promise<number> => {
    const credentialFound = await CredentialModel.findOne({
        where:{
            username,
            password: await crypPass(password)
        }
    })
    if(credentialFound) return credentialFound.id 
    throw Error("Credenciales incorrectas")

}
