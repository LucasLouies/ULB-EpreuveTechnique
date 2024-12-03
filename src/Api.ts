const url = "https://codeval.polesante.ulb.be/";
const auth = 'mFqbJ(6DR4pK^>Cu<Zg;kYtEd/Lh{x.fUGj@3z"H)2,AX$v`=r';

export type HydraView = {
    "@id": string,
    "@type": string,
    "hydra:first": string,
    "hydra:last": string,
    "hydra:previous": string,
    "hydra:next": string
}

export class API {
    public static async GET(chaine: string) {
        return await fetch(url + chaine, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/ld+json',
                'Authorization': auth,
                Accept: 'application/ld+json',
            },

        });
    }

    public static async POST(chaine: string, body?: unknown) {
        let request: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth,
                Accept: 'application/json',
            }
        }

        if (body) request.body = JSON.stringify(body)

        return await fetch(url + chaine, request);
    }

    public static async DELETE(chaine: string, body?: unknown) {
        let request: RequestInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth,
                Accept: 'application/json',
            }
        }

        if (body) request.body = JSON.stringify(body)

        return await fetch(url + chaine, request);
    }

    public static async PATCH(chaine: string, body?: unknown) {
        let request: RequestInit = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth,
                Accept: 'application/json',
            }
        }

        if (body) request.body = JSON.stringify(body)

        return await fetch(url + chaine, request);
    }
}