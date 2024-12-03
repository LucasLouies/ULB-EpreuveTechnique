import { API, HydraView } from "@/Api";

export type Preference = {
    "@id": string,
    "@type": string,
    "id": number,
    "anacad": string,
    "matricule": string,
    "hopital": number,
    "service": number,
    "ordre": number,
    "typepref": 1 | 2
}

export type PreferenceResponse = {
    "@context": string,
    "@id": string,
    "@type": string,
    "hydra:totalItems": number,
    "hydra:member": Preference[],
    "hydra:view": HydraView
}

export async function getPreference(page: number) {
    const response = await API.GET("preferences?page=" + page);
    if (response.ok) {
        const reponsePreference = await response.json() as PreferenceResponse;
        return reponsePreference;
    }

    return null;
}