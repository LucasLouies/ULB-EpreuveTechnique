import { Resultat, ResultatResponse } from "@/api/Resultat/getResultat"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useLayoutEffect, useState } from "react"
import { Hopital } from "@/api/Hopitaux/getHopitaux"
import { Service } from "@/api/Service/getService"
import { getHopitalFromId } from "@/api/Hopitaux/getHopitalFromId"
import { getServiceFromId } from "@/api/Service/getServiceFromId"


type DisplayResultatProps = {
    resultat: ResultatResponse
}

export function DisplayResultat({ resultat }: DisplayResultatProps) {

    return <Table className="w-2/3 mx-auto">
        <TableHeader>
            <TableRow>
                <TableHead>Matricule</TableHead>
                <TableHead>Hopital</TableHead>
                <TableHead>Service</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                resultat["hydra:member"].map((resultatLigne) => {
                    return <DisplaySingleResultat resultat={resultatLigne} key={resultatLigne["@id"]} />
                })
            }
        </TableBody>
    </Table>
}

type DisplaySingleResultatProps = {
    resultat: Resultat;
}

function DisplaySingleResultat({ resultat }: DisplaySingleResultatProps) {
    const [hopital, setHopital] = useState<Hopital | null>(null);
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useLayoutEffect(() => {
        const initData = async () => {

            const tmpHopital = await getHopitalFromId(resultat.hopital);
            const tmpService = await getServiceFromId(resultat.service);
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
            service && hopital &&
            <TableRow>
                <TableCell>{resultat.matricule}</TableCell>
                <TableCell>{hopital.nomcourt}</TableCell>
                <TableCell>{service.nom}</TableCell>
            </TableRow>
        }
    </>
}