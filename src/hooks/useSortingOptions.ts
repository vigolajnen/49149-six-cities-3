import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Place } from '../types';
import { useTypedActions } from './useTypedActions';
import { useTypedSelector } from './useTypedSelector';

const useSortingOptions = (data: Place[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const [activeOption, setActiveOption] = useState<string>(sort);

  const { setSortedPlaces } = useTypedActions();
  const currentCity = useTypedSelector((state: { app: { activeCity: string } }) => state.app.activeCity);

  const setSortName = (option: string): string => {
    switch (option) {
      case 'lowHigh':
        return 'Price: low to high';
      case 'highLow':
        return 'Price: high to low';
      case 'topRated':
        return 'Top rated first';
      case '':
        return 'Popular';
      default:
        return 'Popular';
    }
  };

  // Метод сортировки данных по заданному критерию
  const setSortedPlacesByOption = (option: string) => {
    setActiveOption(option);
    searchParams.set('sort', option);
    setSearchParams(searchParams);

    if (option === '') {
      searchParams.delete('sort');
      setSearchParams(searchParams);
    }

    let sortedData = [];
    switch (option) {
      case 'lowHigh':
        sortedData = [...data].sort((a, b) => a.price - b.price);
        break;
      case 'highLow':
        sortedData = [...data].sort((a, b) => b.price - a.price);
        break;
      case 'topRated':
        sortedData = [...data].sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedData = data.slice();
        break;
    }

    return setSortedPlaces(sortedData);
  };

  useEffect(() => {
    if (!!sort && activeOption !== sort) {
      const newOptionName = setSortName(sort);
      setActiveOption(newOptionName);
      setSortedPlacesByOption(sort);
    }
  }, [sort, data, activeOption]);

  useEffect(() => {
    setActiveOption('');
    setSortedPlacesByOption('');
  }, [currentCity, data]);

  useEffect(() => {
    if (data.length > 0) {
      setSortedPlacesByOption(activeOption);
    }
  }, [data, activeOption]);

  return { activeOption, setActiveOption, setSortName, setSortedPlacesByOption };
};

export default useSortingOptions;
