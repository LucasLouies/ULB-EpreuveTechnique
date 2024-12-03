import { API, HydraView } from "@/Api";

export type Classement = {
    "@id": string,
    "@type": string,
    "id": number,
    "matricule": string,
    "anacad": string,
    "rang": number
}

export type ClassementResponse = {
    "@context": string,
    "@id": string,
    "@type": string,
    "hydra:totalItems": number,
    "hydra:member": Classement[],
    "hydra:view": HydraView
}

export async function getClassement(page: number) {
    const response = await API.GET("classements?page=" + page);
    if (response.ok) {
        const reponseClassement = await response.json() as ClassementResponse;
        return reponseClassement;
    }

    return null;
}