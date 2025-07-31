import { CreateDepartament } from "./CreateDepartament";
import { getDepartamentApi } from "../../../../api/personal_account/Departament";
import { ListOfDepartaments } from "./ListOfDepartaments";
import { useQuery } from "@tanstack/react-query";
import "./Departament.css";

export const Departament = () => {
    const { data: departments, isLoading, error } = useQuery({
        queryKey: ['departments'],
        queryFn: getDepartamentApi,
    });

    return (
            <div className="departament-content">
                <CreateDepartament />
                <ListOfDepartaments
                    departments={departments?.departments || []}
                    isLoading={isLoading}
                    error={error}
                />
            </div>
    )
}