import { useState, useEffect } from 'react';

const useFetchCarsHook = (initialPage) => {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(initialPage);
    const [numberOfItems, setNumberOfItems] = useState(0);
    const [paginateLinks, setPaginateLinks] = useState([]);
    const [brandsFilter, setBrandFilter] = useState([]);

    const fetchCars = (page) => {
        setIsLoading(true);
        fetch(page)
            .then(res => res.json())
            .then((data) => {
                const carsWithImages = data.data.map(car => ({
                    ...car,
                    images: JSON.parse(car.imgArray)
                }));
                setNumberOfItems(data.total);
                setCars(carsWithImages);
                setPaginateLinks(data.links);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching cars:', error);
                setIsLoading(false);
            });
    };

    const fetchSearch = (query) => {
        if (query === '') {
            fetchCars(page);
        } else {
            fetchCars(`/api/cars/Search/${query}`);
        }
    };

    const fetchPaginate = (page) => {
        fetchCars(page);
        setPage(page);
    };

    const fetchFilter = (brandId) => {
        setBrandFilter((prevFilters) => {
            const newFilters = prevFilters.includes(brandId)
                ? prevFilters.filter((id) => id !== brandId)
                : [...prevFilters, brandId];
            return newFilters;
        });
    };

    useEffect(() => {
        fetchCars(page);
    }, [page]);

    useEffect(() => {
        const filter = `/api/cars?brand=${brandsFilter.join(',')}`;
        fetchCars(filter);
    }, [brandsFilter]);

    return {
        cars,
        isLoading,
        numberOfItems,
        paginateLinks,
        fetchSearch,
        fetchPaginate,
        fetchFilter,
        setPage,
        setBrandFilter,
    };
};

export default useFetchCarsHook;
