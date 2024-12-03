import { API, HydraView } from "@/Api";

export type Hopital = {
    "@id": string,
    "@type": string,
    "id": number,
    "nomcourt": string
}

export type HopitalResponse = {
    "@context": string,
    "@id": string,
    "@type": string,
    "hydra:totalItems": number,
    "hydra:member": Hopital[],
    "hydra:view": HydraView
}

export async function getHopitaux(page: number) {
    const response = await API.GET("hopitals?page=" + page);
    if (response.ok) {
        const reponseHopital = await response.json() as HopitalResponse;
        return reponseHopital;
    }

    return null;
}