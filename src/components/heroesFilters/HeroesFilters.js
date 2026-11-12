import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
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

    const getBtnClass = (filter) => {
        switch (filter) {
            case 'all': return 'btn btn-outline-dark';
            case 'fire': return 'btn btn-outline-danger';
            case 'water': return 'btn btn-outline-primary';
            case 'wind': return 'btn btn-outline-success';
            case 'earth': return 'btn btn-outline-secondary';
            default: return 'btn btn-outline-dark';
        }
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.map(filter => {
                        return (
                            <button
                                key={filter}
                                className={classNames(getBtnClass(filter), { active: activeFilter === filter })}
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
