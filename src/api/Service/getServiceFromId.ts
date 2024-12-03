
import { API } from "@/Api";
import { Service } from "./getService";

export async function getServiceFromId(idService: number) {
    const response = await API.GET("services/" + idService);
    if (response.ok) {
        const reponseHopital = await response.json() as Service;
        return reponseHopital;
    }

    return null;
}