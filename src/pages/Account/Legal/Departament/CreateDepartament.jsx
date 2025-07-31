import { useState } from "react";
import { addDeparamentApi } from "../../../../api/personal_account/Departament";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./CreateDepartament.css";

export const CreateDepartament = () => {
    const [name, setName] = useState("");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addDeparamentApi,
        onSuccess: () => {
            console.log("Departament created");
            setName(""); // Очищаем поле после успешного создания
            queryClient.invalidateQueries(['departments']); // Обновляем список
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            mutation.mutate(name);
        }
    }

    return (
        <div className="create-departament">
            <h1>Создать новый отдел</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Введите название отдела"
                    disabled={mutation.isPending}
                />
                <button type="submit" disabled={mutation.isPending || !name.trim()}>
                    {mutation.isPending ? 'Создание...' : 'Создать отдел'}
                </button>
            </form>
        </div>
    )
}