import { ResultatResponse, getResultat } from "@/api/Resultat/getResultat";
import { Headers } from "../Headers"
import { useLayoutEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { DisplayResultat } from "./DisplayResultat";

export function Resultat() {
    const [resultat, setResultat] = useState<ResultatResponse | null>(null);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);

    useLayoutEffect(() => {
        const initResultat = async () => {
            const tmpResultat = await getResultat(page);
            if (tmpResultat == null) {
                setError(true);
            }
            setResultat(tmpResultat);
        }
        initResultat();
    }, [page])

    return <>
        <Headers />
        <h1 className="w-full text-center text-4xl p-2">Résultats</h1>
        {
            resultat != null &&
            <>
                <DisplayResultat resultat={resultat} />
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