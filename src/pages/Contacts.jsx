export const Contacts = () => {
    return (
        <div className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Контакты</h1>
                    <p className="text-lg text-gray-600">Свяжитесь с нами для получения профессиональной юридической консультации</p>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Свяжитесь с нами</h2>
                        <div className="space-y-2">
                            <p className="text-xl text-gray-700">+7 (951) 789-12-10</p>
                            <p className="text-lg text-gray-600">Email: info@baukenlaw.ru</p>
                            <p className="text-lg text-gray-600">Email: dogovor@baukenlaw.ru</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Реквизиты</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Полное наименование организации</h3>
                            <div className="text-gray-700">
                                <p>Общество с ограниченной ответственностью</p>
                                <p>Юридическая компания «Баукен и Партнеры»</p>
                            </div>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Сокращенное наименование</h3>
                            <p className="text-gray-700">ООО ЮК «Баукен и Партнеры»</p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Место нахождения</h3>
                            <p className="text-gray-700">454018, Челябинск, Ул. Колхозная, 36, пом. 11</p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Почтовый адрес</h3>
                            <p className="text-gray-700">454018, Челябинск, Ул. Колхозная, 36, пом. 11</p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Телефон/Факс</h3>
                            <p className="text-gray-700">+7 (951) 789-12-10</p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">ИНН</h3>
                            <p className="text-gray-700">745309815517</p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">КПП</h3>
                            <p className="text-gray-700">744701001</p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">ОГРН</h3>
                            <p className="text-gray-700">1217400023345</p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg md:col-span-2">
                            <h3 className="font-semibold text-gray-900 mb-2">Код организации по ОКТМО</h3>
                            <p className="text-gray-700">75701000001</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};