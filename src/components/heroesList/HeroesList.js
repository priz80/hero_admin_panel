import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { heroDelete, fetchHeroes, selectAll } from "./heroesSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const filterSelector = (state) => state.filters.activeFilter;

const filteredHeroesSelector = createSelector(
  [selectAll, filterSelector],
  (heroes, activeFilter) => {
    if (activeFilter === "all") {
      return heroes;
    }
    return heroes.filter((hero) => hero.element === activeFilter);
  }
);

const HeroesList = () => {
  const filteredHeroes = useSelector(filteredHeroesSelector);
  const { heroesLoadingStatus } = useSelector((state) => state.heroes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroes());
    // eslint-disable-next-line
  }, []);

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const deleteHero = async (id) => {
    try {
      const response = await fetch("http://localhost:3001/heroes/" + id, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Could not delete hero");
      dispatch(heroDelete(id));
    } catch (error) {
      console.error("Ошибка при удалении героя:", error);
    }
  };

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return (
        <HeroesListItem key={id} {...props} id={id} onDelete={deleteHero} />
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
