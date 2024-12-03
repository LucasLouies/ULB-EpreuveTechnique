import { useLayoutEffect, useState } from "react";
import { Headers } from "../Headers"
import { HopitalResponse, getHopitaux } from "@/api/Hopitaux/getHopitaux";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

export function Hopitaux() {
    const [hopitaux, setHopitaux] = useState<HopitalResponse | null>(null);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);

    useLayoutEffect(() => {
        const initHopitaux = async () => {
            const tmpHopitaux = await getHopitaux(page);
            if (tmpHopitaux == null) {
                setError(true);
            }
            setHopitaux(tmpHopitaux);
        }
        initHopitaux();
    }, [page])

    return <>
        <Headers />
        <h1 className="w-full text-center text-4xl p-2">Hôpitaux</h1>
        {
            hopitaux != null &&
            <>
                {
                    hopitaux["hydra:member"].map((hopitalLigne) => {
                        return <>
                            <p className="w-full text-center">{hopitalLigne.nomcourt}</p>
                        </>
                    })
                }
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