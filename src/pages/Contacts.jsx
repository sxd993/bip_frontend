import { useState } from 'react';

export const Contacts = () => {
    const [copyMessage, setCopyMessage] = useState('');

    // Функция для копирования текста в буфер обмена
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopyMessage('Скопировано!');
            setTimeout(() => setCopyMessage(''), 2000);
        } catch (err) {
            console.error('Ошибка при копировании: ', err);
            setCopyMessage('Ошибка копирования');
            setTimeout(() => setCopyMessage(''), 2000);
        }
    };

    return (
        <div className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Контакты</h1>
                    <div className="w-24 h-1 bg-red-200 mx-auto mb-6"></div>
                    <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">Свяжитесь с нами для получения профессиональной юридической консультации</p>
                </div>
                
                <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12 mb-12">
                    <div className="text-center mb-12">
                        <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Реквизиты</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative p-6 border-2 border-gray-100 rounded-2xl hover:border-red-200 transition-colors duration-200 group">
                            <button 
                                onClick={() => copyToClipboard('Общество с ограниченной ответственностью\nЮридическая компания «Баукен и Партнеры»')}
                                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 text-red-300 hover:text-red-400 text-lg bg-red-100 hover:bg-red-200 rounded-full w-8 h-8 flex items-center justify-center"
                                title="Копировать"
                            >
                                📋
                            </button>
                            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Полное наименование организации</h3>
                            <div className="text-gray-700 space-y-1">
                                <p>Общество с ограниченной ответственностью</p>
                                <p>Юридическая компания «Баукен и Партнеры»</p>
                            </div>
                        </div>
                        
                        <div className="relative p-6 border-2 border-gray-100 rounded-2xl hover:border-red-200 transition-colors duration-200 group">
                            <button 
                                onClick={() => copyToClipboard('ООО ЮК «Баукен и Партнеры»')}
                                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 text-red-300 hover:text-red-400 text-lg bg-red-100 hover:bg-red-200 rounded-full w-8 h-8 flex items-center justify-center"
                                title="Копировать"
                            >
                                📋
                            </button>
                            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Сокращенное наименование</h3>
                            <p className="text-gray-700">ООО ЮК «Баукен и Партнеры»</p>
                        </div>
                        
                        <div className="relative p-6 border-2 border-gray-100 rounded-2xl hover:border-red-200 transition-colors duration-200 group">
                            <button 
                                onClick={() => copyToClipboard('454018, Челябинск, Ул. Колхозная, 36, пом. 11')}
                                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 text-red-300 hover:text-red-400 text-lg bg-red-100 hover:bg-red-200 rounded-full w-8 h-8 flex items-center justify-center"
                                title="Копировать"
                            >
                                📋
                            </button>
                            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Место нахождения</h3>
                            <p className="text-gray-700">454018, Челябинск, Ул. Колхозная, 36, пом. 11</p>
                        </div>
                        
                        <div className="relative p-6 border-2 border-gray-100 rounded-2xl hover:border-red-200 transition-colors duration-200 group">
                            <button 
                                onClick={() => copyToClipboard('454018, Челябинск, Ул. Колхозная, 36, пом. 11')}
                                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 text-red-300 hover:text-red-400 text-lg bg-red-100 hover:bg-red-200 rounded-full w-8 h-8 flex items-center justify-center"
                                title="Копировать"
                            >
                                📋
                            </button>
                            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Почтовый адрес</h3>
                            <p className="text-gray-700">454018, Челябинск, Ул. Колхозная, 36, пом. 11</p>
                        </div>
                        
                        <div className="relative p-6 border-2 border-gray-100 rounded-2xl hover:border-red-200 transition-colors duration-200 group">
                            <button 
                                onClick={() => copyToClipboard('745309815517')}
                                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 text-red-300 hover:text-red-400 text-lg bg-red-100 hover:bg-red-200 rounded-full w-8 h-8 flex items-center justify-center"
                                title="Копировать"
                            >
                                📋
                            </button>
                            <h3 className="font-semibold text-gray-800 mb-3 text-lg">ИНН</h3>
                            <p className="text-gray-700">745309815517</p>
                        </div>
                        
                        <div className="relative p-6 border-2 border-gray-100 rounded-2xl hover:border-red-200 transition-colors duration-200 group">
                            <button 
                                onClick={() => copyToClipboard('744701001')}
                                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 text-red-300 hover:text-red-400 text-lg bg-red-100 hover:bg-red-200 rounded-full w-8 h-8 flex items-center justify-center"
                                title="Копировать"
                            >
                                📋
                            </button>
                            <h3 className="font-semibold text-gray-800 mb-3 text-lg">КПП</h3>
                            <p className="text-gray-700">744701001</p>
                        </div>
                        
                        <div className="relative p-6 border-2 border-gray-100 rounded-2xl hover:border-red-200 transition-colors duration-200 group">
                            <button 
                                onClick={() => copyToClipboard('1217400023345')}
                                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 text-red-300 hover:text-red-400 text-lg bg-red-100 hover:bg-red-200 rounded-full w-8 h-8 flex items-center justify-center"
                                title="Копировать"
                            >
                                📋
                            </button>
                            <h3 className="font-semibold text-gray-800 mb-3 text-lg">ОГРН</h3>
                            <p className="text-gray-700">1217400023345</p>
                        </div>
                        
                        <div className="relative p-6 border-2 border-gray-100 rounded-2xl hover:border-red-200 transition-colors duration-200 group">
                            <button 
                                onClick={() => copyToClipboard('75701000001')}
                                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 text-red-300 hover:text-red-400 text-lg bg-red-100 hover:bg-red-200 rounded-full w-8 h-8 flex items-center justify-center"
                                title="Копировать"
                            >
                                📋
                            </button>
                            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Код организации по ОКТМО</h3>
                            <p className="text-gray-700">75701000001</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white border-2 rounded-3xl p-8 md:p-12 border-red-200 transition-colors duration-300">
                    <div className="text-center mb-8">
                        <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50 mb-6">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Свяжитесь с нами</h2>
                        </div>
                        <div className="space-y-4">
                            <p className="text-xl md:text-2xl text-gray-700 font-medium">+7 (951) 789-12-10</p>
                            <p className="text-lg md:text-xl text-gray-600">Email: info@baukenlaw.ru</p>
                            <p className="text-lg md:text-xl text-gray-600">Email: dogovor@baukenlaw.ru</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Уведомление о копировании */}
            {copyMessage && (
                <div className="fixed bottom-6 right-6 bg-red-100 border-2 border-red-200 text-red-700 px-4 py-2 rounded-2xl z-50 transition-all duration-300 shadow-sm">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{copyMessage}</span>
                        <span className="text-red-400">✓</span>
                    </div>
                </div>
            )}
        </div>
    );
};