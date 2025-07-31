import './styles/AddEmployee.css';
import { useState } from "react";
import { Modal } from "../../../../components/Modal";
import { AddEmployeeForm } from "./AddEmloyerForm";

export const AddEmployee = ({ role }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Добавить сотрудника</button>
            <Modal 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)} 
                title="Добавление сотрудника"
            >
                <AddEmployeeForm role={role} onClose={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
};