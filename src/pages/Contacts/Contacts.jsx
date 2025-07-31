import './Contacts.css'

export const Contacts = () => {
    return (
        <div className='container'>
            <div className='contact-container'>
                <div className='contacts-label'>
                    <h1>Контакты</h1>
                </div>
                <div className='contacts-info'>
                    <p>+7 (951) 789-12-10 </p>
                    <p>Email: info@baukenlaw.ru dogovor@baukenlaw.ru</p>
                </div>
                <div className='contacts-details'>
                    <h1>Реквизиты</h1>
                    <ul className='contacts-details-list'>
                        <li>
                            <h3>Полное наименование организации</h3>
                            <div>
                                <p>Общество с ограниченной ответственностью</p>
                                <p>Юридическая компания «Баукен и Партнеры»  </p>
                            </div>
                        </li>
                        <li>
                            <h3>Полное наименование организации</h3>
                            <p>ООО ЮК «Баукен и Партнеры»  </p>
                        </li>
                        <li>
                            <h3>Место нахождения </h3>
                            <p>454018, Челябинск, Ул. Колхозная, 36, пом. 11</p>
                        </li>
                        <li>
                            <h3>Почтовый адрес </h3>
                            <p>454018, Челябинск, Ул. Колхозная, 36, пом. 11</p>
                        </li>
                        <li>
                            <h3>Телефон/Факс</h3>
                            <p>+7 (951) 789-12-10</p>
                        </li>
                        <li>
                            <h3>ИНН</h3>
                            <p>745309815517</p>
                        </li>
                        <li>
                            <h3>КПП</h3>
                            <p>744701001</p>
                        </li>
                        <li>
                            <h3>ОГРН</h3>
                            <p>1217400023345</p>
                        </li>
                        <li>
                            <h3>Код организации по ОКТМО</h3>
                            <p>75701000001</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}