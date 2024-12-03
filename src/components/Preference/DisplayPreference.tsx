import { Preference, PreferenceResponse } from "@/api/Preference/getPreference"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useLayoutEffect, useState } from "react"
import { Hopital } from "@/api/Hopitaux/getHopitaux"
import { Service } from "@/api/Service/getService"
import { getHopitalFromId } from "@/api/Hopitaux/getHopitalFromId"
import { getServiceFromId } from "@/api/Service/getServiceFromId"

type DisplayPreferenceProps = {
    preference: PreferenceResponse
}

export function DisplayPreference({ preference }: DisplayPreferenceProps) {

    return <Table className="w-2/3 mx-auto">
        <TableHeader>
            <TableRow>
                <TableHead>Matricule</TableHead>
                <TableHead>Année académique</TableHead>
                <TableHead>Hopital</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Ordre</TableHead>
                <TableHead>Type</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                preference["hydra:member"].map((preferenceLigne) => {
                    return <DisplaySinglePreference preference={preferenceLigne} />
                })
            }
        </TableBody>
    </Table>
}

type DisplaySinglePreferenceProps = {
    preference: Preference;
}

function DisplaySinglePreference({ preference }: DisplaySinglePreferenceProps) {
    const [hopital, setHopital] = useState<Hopital | null>(null);
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useLayoutEffect(() => {
        const initData = async () => {

            const tmpHopital = await getHopitalFromId(preference.hopital);
            const tmpService = await getServiceFromId(preference.service);
            if (tmpHopital == null || tmpService == null) {
                setError(true)
            } else {
                setHopital(tmpHopital);
                setService(tmpService);
            }
            setLoading(false);
        }
        initData()
    }, [])
    return <>
        {
            loading &&
            <p>Chargement en cours</p>
        }
        {
            service && hopital &&
            <TableRow>
                <TableCell>{preference.matricule}</TableCell>
                <TableCell>{preference.anacad}</TableCell>
                <TableCell>{hopital.nomcourt}</TableCell>
                <TableCell>{service.nom}</TableCell>
                <TableCell>{preference.ordre}</TableCell>
                <TableCell>{preference.typepref == 1 ? "Préférence" : "Exclusion"}</TableCell>
            </TableRow>
        }
        {
            error &&
            <p>erreur lors du chargement des données</p>
        }
    </>
}