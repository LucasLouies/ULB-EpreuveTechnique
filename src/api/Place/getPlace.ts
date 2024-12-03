import { API, HydraView } from "@/Api";

export type Place = {
    "@id": string,
    "@type": string,
    "id": number,
    "hopital": number,
    "service": number,
    "places": number
}

export type PlaceResponse = {
    "@context": string,
    "@id": string,
    "@type": string,
    "hydra:totalItems": number,
    "hydra:member": Place[],
    "hydra:view": HydraView
}

export async function getPlace(page: number) {
    const response = await API.GET("places?page=" + page);
    if (response.ok) {
        const reponsePlace = await response.json() as PlaceResponse;
        return reponsePlace;
    }

    return null;
}