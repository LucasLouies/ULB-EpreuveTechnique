import { Classement, getClassement } from "@/api/Classement/getClassement";
import { Place, getPlace } from "@/api/Place/getPlace";
import { Preference, getPreference } from "@/api/Preference/getPreference";
import { sendResultat } from "@/api/Resultat/sendResultat";

export async function attributionStage() {
    //pour faciliter les tests je ne vérifie pas que les étudiants ont déjà un stage qui leur est attribué
    const preClassement = await getClassement(1);
    const maxPageClassement = parseInt(preClassement!["hydra:view"]["hydra:last"].replace("/classements?page=", ""));

    const classement: Classement[] = []
    for (let index = 1; index <= maxPageClassement; index++) {
        const tmpClassement = await getClassement(index);
        classement.push(...tmpClassement!["hydra:member"]);
    }

    const prePlaces = await getPlace(1);
    const maxPagePlace = parseInt(prePlaces!["hydra:view"]["hydra:last"].replace("/places?page=", ""));

    const places = new Map<string, Place>();
    for (let index = 1; index <= maxPagePlace; index++) {
        const tmpPlace = await getPlace(index);
        for (let j = 0; j < tmpPlace!["hydra:member"].length; j++) {
            const tmpHopital = tmpPlace!["hydra:member"][j].hopital.toString();
            const tmpService = tmpPlace!["hydra:member"][j].service.toString();
            const cle = tmpHopital + tmpService;

            if (places.has(cle)) {
                const placePreExistante = places.get(cle);
                places.set(cle, { ...placePreExistante!, places: placePreExistante!.places + tmpPlace!["hydra:member"][j].places });
            } else {
                places.set(cle, tmpPlace!["hydra:member"][j]);
            }
        }
    }

    const prePreference = await getPreference(1);
    const maxPagePreference = parseInt(prePreference!["hydra:view"]["hydra:last"].replace("/preferences?page=", ""));

    const preference = new Map<string, Preference[]>();
    for (let index = 1; index <= maxPagePreference; index++) {
        const tmpPref = await getPreference(index);
        for (let j = 0; j < tmpPref!["hydra:member"].length; j++) {
            if (preference.has(tmpPref!["hydra:member"][j].matricule)) {
                let currentPref = preference.get(tmpPref!["hydra:member"][j].matricule)!;
                let k = 0;
                let trouvePlace = false;
                while (!trouvePlace) {
                    if (currentPref[k].ordre > tmpPref!["hydra:member"][j].ordre) {
                        currentPref.splice(k, 0, tmpPref!["hydra:member"][j]);
                        trouvePlace = true;
                    }
                    if (currentPref.length - 1 == k) {
                        currentPref.push(tmpPref!["hydra:member"][j]);
                        trouvePlace = true;
                    }
                    k++;
                }
            } else {
                preference.set(tmpPref!["hydra:member"][j].matricule, [tmpPref!["hydra:member"][j]]);
            }
        }
    }

    let etudiantsSansStage: string[] = []

    for (let index = 0; index < classement.length; index++) {
        const prefStudent = preference.get(classement[index].matricule);

        if (prefStudent == undefined) {
            etudiantsSansStage.push(classement[index].matricule);
            continue;
        }

        let j = 0;
        let stageAttribue = false;
        while (!stageAttribue) {

            const tmpHopital = prefStudent[j].hopital.toString();
            const tmpService = prefStudent[j].service.toString();
            const tmpCle = tmpHopital + tmpService;
            const placeRestante = places.get(tmpCle);

            if (prefStudent[j].typepref == 1 && placeRestante && placeRestante.places > 0) {
                await sendResultat(classement[index].matricule, prefStudent[j].hopital, prefStudent[j].service);
                places.set(tmpCle, { ...placeRestante, places: placeRestante.places - 1 });
                stageAttribue = true;
                continue;
            }

            if (j == prefStudent.length - 1) {
                etudiantsSansStage.push(classement[index].matricule);
                stageAttribue = true;
            }
            j++;
        }

    }

    etudiantsSansStage.forEach(async matricule => {
        const exclusionEtudiantSansStage = preference.get(matricule)?.filter((pref) => pref.typepref == 2).map(pref => pref.hopital.toString() + pref.service.toString());
        const placesRestantes = Array.from(places).filter((place) => place[1].places > 0).map((place) => place[1]);

        if (exclusionEtudiantSansStage == undefined || exclusionEtudiantSansStage.length == 0) {
            const tmpHopital = Array.from(placesRestantes)[0].hopital;
            const tmpService = Array.from(placesRestantes)[0].service;
            await sendResultat(matricule, tmpHopital, tmpService);
            places.set(tmpHopital.toString() + tmpService.toString(), { ...Array.from(placesRestantes)[0], places: Array.from(placesRestantes)[0].places - 1 });
        } else {
            let stageAttribue = false;
            placesRestantes.forEach(async place => {
                if (exclusionEtudiantSansStage.includes(place.hopital.toString() + place.service.toString)) {
                    const placeRestante = places.get(place.hopital.toString() + place.service.toString())!;
                    await sendResultat(matricule, place.hopital, place.service);
                    places.set(place.hopital.toString() + place.service.toString(), { ...placeRestante, places: placeRestante.places - 1 });
                    stageAttribue = true;
                }
            })

            if (!stageAttribue) {
                const premierePlace = placesRestantes[0]
                await sendResultat(matricule, premierePlace.hopital, premierePlace.service);
                places.set(premierePlace.hopital.toString() + premierePlace.service.toString(), { ...premierePlace, places: premierePlace.places - 1 });
                stageAttribue = true;
            }

        }
    });

    console.log("fini");
    return true;

}