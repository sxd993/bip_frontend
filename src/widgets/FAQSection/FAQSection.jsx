import { useState } from 'react';
import { FAQ_ITEMS } from '../../const/faq';

export const FAQSection = () => {
    return (
        <div className='my-10'>
            <div className="max-w-6xl px-[2%] lg:px-0 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Заголовок секции слева */}
                    <div>
                        <p className="text-primary text-5xl">
                            Частые вопросы
                        </p>
                    </div>
                    {/* Список вопросов справа */}
                    <div className="flex flex-col gap-6">
                        {FAQ_ITEMS.map((item) => (
                            <FAQItem
                                key={item.id}
                                question={item.question}
                                answer={item.answer}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-left gap-4"
            >
                <span className="text-primary text-lg font-medium">
                    {question}
                </span>
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-200 flex-shrink-0 text-primary ${isOpen ? 'rotate-180' : ''}`}
                >
                    <path
                        d="M3 4.5L6 7.5L9 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="mt-4 text-gray-700 text-base">
                    {answer}
                </div>
            )}
        </div>
    );
};

