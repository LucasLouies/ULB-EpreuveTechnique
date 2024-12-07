import { attributionStage } from "@/script/attributionStage";
import { Headers } from "../Headers";
import { Button } from "../ui/button";
import { useState } from "react";

export function HomePage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState("");

    async function attribuerStage() {
        if (!isLoading) {
            setIsLoading(true);
            setMessage("Attribution des stage en cours ... Veuillez patienter !");
            await attributionStage()
            setIsLoading(false);
            setMessage("Attribution des stage finie");
        }
    }

    return <div>
        <Headers />
        <h1 className="w-full text-center text-4xl p-2">Attribution automatique de stages</h1>
        <div className="flex flex-col justify-center items-center h-screen">
            <div>
                <Button onClick={() => attribuerStage()}>Attribuer les stage</Button>
            </div>
            <div>
                {message}
            </div>
        </div>
    </div>
}