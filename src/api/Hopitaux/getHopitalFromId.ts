import { API } from "@/Api";
import { Hopital } from "./getHopitaux";

export async function getHopitalFromId(idHopital: number) {
    const response = await API.GET("hopitals/" + idHopital);
    if (response.ok) {
        const reponseHopital = await response.json() as Hopital;
        return reponseHopital;
    }

    return null;
}