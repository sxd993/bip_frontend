export const Contacts = () => {
    return (
        <div className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">Контакты</h1>
                    <p className="text-lg md:text-xl text-gray-600">Свяжитесь с нами для получения профессиональной юридической консультации</p>
                </div>
                
                <div className="bg-white border-2 rounded-3xl p-8 md:p-12 mb-12 border-red-200 transition-colors duration-300">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Свяжитесь с нами</h2>
                        <div className="space-y-4">
                            <p className="text-xl md:text-2xl text-gray-700 font-medium">+7 (951) 789-12-10</p>
                            <p className="text-lg md:text-xl text-gray-600">Email: info@baukenlaw.ru</p>
                            <p className="text-lg md:text-xl text-gray-600">Email: dogovor@baukenlaw.ru</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-12 text-center">Реквизиты</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 border-2 border-gray-100 rounded-2xl hover:border-red-200 transition-colors duration-200">
                            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Полное наименование организации</h3>
                            <div className="text-gray-700 space-y-1">
                                <p>Общество с ограниченной ответственностью</p>
                                <p>Юридическая компания «Баукен и Партнеры»</p>
                            </div>
                        </div>
                        
                        <div className="p-6 border-2 border-gray-100 rounded-2xl">
                            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Сокращенное наименование</h3>
                            <p className="text-gray-700">ООО ЮК «Баукен и Партнеры»</p>
                        </div>
                        
                        <div className="p-6 border-2 border-gray-100 rounded-2xl">
                            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Место нахождения</h3>
                            <p className="text-gray-700">454018, Челябинск, Ул. Колхозная, 36, пом. 11</p>
                        </div>
                        
                        <div className="p-6 border-2 border-gray-100 rounded-2xl">
                            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Почтовый адрес</h3>
                            <p className="text-gray-700">454018, Челябинск, Ул. Колхозная, 36, пом. 11</p>
                        </div>
                        
                        <div className="p-6 border-2 border-gray-100 rounded-2xl">
                            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Телефон/Факс</h3>
                            <p className="text-gray-700">+7 (951) 789-12-10</p>
                        </div>
                        
                        <div className="p-6 border-2 border-gray-100 rounded-2xl">
                            <h3 className="font-semibold text-gray-800 mb-3 text-lg">ИНН</h3>
                            <p className="text-gray-700">745309815517</p>
                        </div>
                        
                        <div className="p-6 border-2 border-gray-100 rounded-2xl">
                            <h3 className="font-semibold text-gray-800 mb-3 text-lg">КПП</h3>
                            <p className="text-gray-700">744701001</p>
                        </div>
                        
                        <div className="p-6 border-2 border-gray-100 rounded-2xl">
                            <h3 className="font-semibold text-gray-800 mb-3 text-lg">ОГРН</h3>
                            <p className="text-gray-700">1217400023345</p>
                        </div>
                        
                        <div className="p-6 border-2 border-gray-100 rounded-2xl md:col-span-2">
                            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Код организации по ОКТМО</h3>
                            <p className="text-gray-700">75701000001</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};