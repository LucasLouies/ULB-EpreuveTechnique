import { useLayoutEffect, useState } from "react";
import { Headers } from "../Headers"
import { PlaceResponse, getPlace } from "@/api/Place/getPlace";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { DisplayPlace } from "./DisplayPlace";

export function Places() {
    const [places, setPlaces] = useState<PlaceResponse | null>(null);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);

    useLayoutEffect(() => {
        const initPlaces = async () => {
            const tmpPlaces = await getPlace(page);
            if (tmpPlaces == null) {
                setError(true);
            }
            setPlaces(tmpPlaces);
        }
        initPlaces();
    }, [page])

    return <>
        <Headers />
        <h1 className="w-full text-center text-4xl p-2">Places</h1>
        {
            places != null &&
            <>
                <DisplayPlace place={places} />
                <>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" onClick={() => { if (page >= 2) setPage(page - 1) }} />
                            </PaginationItem>
                            {
                                page >= 2 &&
                                <PaginationItem onClick={() => setPage(page - 1)}>
                                    <PaginationLink href="#">{page - 1}</PaginationLink>
                                </PaginationItem>
                            }
                            <PaginationItem className="bg-slate-300 rounded">
                                <PaginationLink href="#">{page}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem onClick={() => setPage(page + 1)}>
                                <PaginationLink href="#">{page + 1}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" onClick={() => setPage(page + 1)} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </>


            </>
        }
        {
            error &&
            <p className="text-center mt-10">
                Erreur lors du chargement des données du classement. Veuillez essayer plus tard !
            </p>
        }
    </>
}