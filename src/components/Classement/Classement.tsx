import { useLayoutEffect, useState } from "react";
import { Headers } from "../Headers";
import { ClassementResponse, getClassement } from "@/api/Classement/getClassement";
import { DisplayClassement } from "./DisplayClassement";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

export function Classement() {
    const [classement, setClassement] = useState<ClassementResponse | null>(null);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);

    useLayoutEffect(() => {
        const initClassement = async () => {
            const tmpClassement = await getClassement(page);
            if (tmpClassement == null) {
                setError(true);
            }
            setClassement(tmpClassement);
        }
        initClassement();
    }, [page])

    return <>
        <Headers />
        <h1 className="w-full text-center text-4xl p-2">Classement</h1>
        {
            classement != null &&
            <>
                <DisplayClassement classement={classement} />
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