import "./ListOfDepartaments.css";

export const ListOfDepartaments = ({ departments, isLoading, error }) => {
    if (isLoading) {
        return (
            <div className="departments-list">
                <h1>Список отделов</h1>
                <div className="loading-state">Загрузка отделов...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="departments-list">
                <h1>Список отделов</h1>
                <div className="error-state">
                    Ошибка загрузки: {error.message}
                </div>
            </div>
        );
    }

    if (!departments || departments.length === 0) {
        return (
            <div className="departments-list">
                <h1>Список отделов</h1>
                <div className="empty-state">
                    Отделы не найдены. Создайте первый отдел!
                </div>
            </div>
        );
    }

    return (
        <div className="departments-list">
            <h1>Список отделов ({departments.length})</h1>
            <div className="departments-grid">
                {departments.map((department) => (
                    <div key={department.id} className="department-card">
                        <div className="department-header">
                            <h2 className="department-name">{department.name}</h2>
                            <div className="department-balance">
                                {department.balance} ₽
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};