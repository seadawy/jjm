import { Link } from 'react-router-dom';
import { Skeleton } from 'primereact/skeleton';
import { useState } from 'react';

const CarImage = ({ src, alt }) => {
    const [isLoading, setIsLoading] = useState(true);
    const handleImageLoad = () => {
        setIsLoading(false);
    };
    return (
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            {isLoading && <Skeleton height="100%"></Skeleton>}
            <img
                src={`/API/public/storage/${src}`}
                alt={alt}
                className={`h-full w-full object-cover object-center lg:h-full lg:w-full ${isLoading ? 'hidden' : 'block'}`}
                onLoad={handleImageLoad}
            />
        </div>
    )
}

const CarsGrid = ({ path, cars }) => {
    return (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-6 animate-fadeIn">
            {cars.map((car) => (
                <div key={car.id} className="group relative hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-[1.05] hover:shadow-lg pb-4 rounded-md">
                    <CarImage src={car.images[0]} alt={car.model}></CarImage>
                    <div className="mt-4 flex justify-between px-3">
                        <div>
                            <h3 className="text-2xl text-start text-gray-700 dark:text-white">
                                <Link to={`${path}${car.id}`}>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {car.model}
                                    <h2 className="text-sm text-gray-700 dark:text-white">
                                        {car.brand.brand}
                                    </h2>
                                </Link>
                            </h3>
                        </div>
                        <p className="text-sm font-medium text-gray-900  dark:text-white">{car.price}$</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CarsGrid;
