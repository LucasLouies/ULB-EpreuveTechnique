import { API, HydraView } from "@/Api";

export type Resultat = {
    "@id": string,
    "@type": string,
    "id": number,
    "matricule": string,
    "hopital": number,
    "service": number
}

export type ResultatResponse = {
    "@context": string,
    "@id": string,
    "@type": string,
    "hydra:totalItems": number,
    "hydra:member": Resultat[],
    "hydra:view": HydraView
}

export async function getResultat(page: number) {
    const response = await API.GET("resultats?page=" + page);
    if (response.ok) {
        const reponseResultat = await response.json() as ResultatResponse;
        return reponseResultat;
    }

    return null;
}