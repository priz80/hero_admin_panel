import { useDispatch, useSelector } from 'react-redux';
import { filterChanged } from '../../actions';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const { filters, activeFilter } = useSelector(state => state);
    const dispatch = useDispatch();

    const changeFilter = (filter) => {
        dispatch(filterChanged(filter));
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.map(filter => {
                        const btnClass = filter === 'all' ? 'btn btn-outline-dark' :
                            filter === 'fire' ? 'btn btn-danger' :
                                filter === 'water' ? 'btn btn-primary' :
                                    filter === 'wind' ? 'btn btn-success' :
                                        filter === 'earth' ? 'btn btn-secondary' : 'btn btn-outline-dark';
                        return (
                            <button
                                key={filter}
                                className={`${btnClass} ${activeFilter === filter ? 'active' : ''}`}
                                onClick={() => changeFilter(filter)}
                            >
                                {filter === 'all' ? 'Все' : filter}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
