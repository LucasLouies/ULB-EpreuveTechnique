import { API, HydraView } from "@/Api";

export type Service = {
    "@id": string,
    "@type": string,
    "id": number,
    "nom": string
}

export type ServiceResponse = {
    "@context": string,
    "@id": string,
    "@type": string,
    "hydra:totalItems": number,
    "hydra:member": Service[],
    "hydra:view": HydraView
}

export async function getService(page: number) {
    const response = await API.GET("services?page=" + page);
    if (response.ok) {
        const reponseService = await response.json() as ServiceResponse;
        return reponseService;
    }

    return null;
}