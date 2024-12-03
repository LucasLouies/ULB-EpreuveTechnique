import { PreferenceResponse, getPreference } from "@/api/Preference/getPreference";
import { Headers } from "../Headers"
import { useLayoutEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { DisplayPreference } from "./DisplayPreference";

export function Preference() {
    const [preference, setPreference] = useState<PreferenceResponse | null>(null);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);

    useLayoutEffect(() => {
        const initPreference = async () => {
            const tmpPreference = await getPreference(page);
            if (tmpPreference == null) {
                setError(true);
            }
            setPreference(tmpPreference);
        }
        initPreference();
    }, [page])

    return <>
        <Headers />
        <h1 className="w-full text-center text-4xl p-2">Preferences</h1>
        {
            preference != null &&
            <>
                <DisplayPreference preference={preference} />
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