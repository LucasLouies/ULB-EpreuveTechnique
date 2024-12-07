import { API } from "@/Api";


export async function sendResultat(matricule: string, hopitalId: number, serviceId: number) {
    const response = await API.POST("resultats",
        {
            matricule: matricule,
            hopital: hopitalId,
            service: serviceId
        }
    )

    console.log("status :", response.status);


    switch (response.status) {
        case 201:
            return true;
        case 400:
            return false;
        case 422:
            return false;
        default:
            return false;
    }

}