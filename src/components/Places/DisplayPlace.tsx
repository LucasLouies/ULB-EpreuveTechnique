import { getHopitalFromId } from "@/api/Hopitaux/getHopitalFromId"
import { Hopital } from "@/api/Hopitaux/getHopitaux"
import { Place, PlaceResponse } from "@/api/Place/getPlace"
import { Service } from "@/api/Service/getService"
import { getServiceFromId } from "@/api/Service/getServiceFromId"
import { useLayoutEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

type DisplayPlaceProps = {
    place: PlaceResponse
}

export function DisplayPlace({ place }: DisplayPlaceProps) {
    return <Table className="w-1/2 mx-auto">
        <TableHeader>
            <TableRow>
                <TableHead>Hopital</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Place Restantes</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                place["hydra:member"].map((placeLigne) => {
                    return <SinglePlace key={place["@id"]} place={placeLigne} />
                })
            }
        </TableBody>
    </Table>
}

type SinglePlaceProps = {
    place: Place;
}

function SinglePlace({ place }: SinglePlaceProps) {
    const [hopital, setHopital] = useState<Hopital | null>(null);
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useLayoutEffect(() => {
        const initData = async () => {

            const tmpHopital = await getHopitalFromId(place.hopital);
            const tmpService = await getServiceFromId(place.service);
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
                <TableCell>{hopital.nomcourt}</TableCell>
                <TableCell>{service.nom}</TableCell>
                <TableCell>{place.places}</TableCell>
            </TableRow>
        }
        {
            error &&
            <p>erreur lors du chargement des données</p>
        }
    </>
}