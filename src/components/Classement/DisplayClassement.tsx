import { ClassementResponse } from "@/api/Classement/getClassement";

type DisplayClassementProps = {
    classement: ClassementResponse;
}

export function DisplayClassement({ classement }: DisplayClassementProps) {
    return <div>
        {
            classement["hydra:member"].map((classementLigne) => {
                return <div key={classementLigne["@id"]}>
                    <p className="w-full text-center">
                        {classementLigne.rang / 2} :  {classementLigne.matricule}
                    </p>
                </div>
            })
        }
    </div>
}