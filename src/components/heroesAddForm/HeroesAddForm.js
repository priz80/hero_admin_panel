import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { heroAdd } from '../../actions';
import { useHttp } from '../../hooks/http.hook';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uuid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');
    
    const { filters } = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hero = {
            id: uuidv4(),
            name,
            description,
            element
        };

        try {
            const data = await request("http://localhost:3001/heroes", "POST", JSON.stringify(hero));
            dispatch(heroAdd(data));
            setName('');
            setDescription('');
            setElement('');
        } catch (error) {
            console.error("Ошибка при создании героя:", error);
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    className="form-control" 
                    id="description" 
                    placeholder="Что я умею?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element"
                    value={element}
                    onChange={(e) => setElement(e.target.value)}>
                    <option value="">Я владею элементом...</option>
                    {filters.map(filter => (
                        <option key={filter} value={filter}>{filter}</option>
                    ))}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;
