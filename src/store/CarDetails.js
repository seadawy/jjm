import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'primeicons/primeicons.css';
import ShareButton from './component/ShareButton';
import PayPalButton from './component/PaypalButton';

const CarDetails = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { id } = useParams();
    const [car, setCar] = useState();
    const [images, setImages] = useState([]);
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
    useEffect(() => {
        fetch(`https://jjmtemp.wuaze.com/api/Cars/${id}`)
            .then((res) => { return res.json() })
            .then((data) => {
                setCar(data[0]);
                setImages(JSON.parse(data[0].imgArray));
            }).catch((error) => console.log('fetching car error', error));
    }, []);
    return (
        <>
            <div className="h-full w-screen overflow-hidden flex flex-col sm:flex-row justify-center gap-x-20 items-center dark:bg-slate-800">
                <div className="h-full w-auto p-5">
                    <div className="flex flex-col sm:flex-row">
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <div className="relative flex-1">
                                <img
                                    src={images[currentIndex]}
                                    alt="Selected"
                                    className="w-full h-auto object-contain rounded-md"
                                />
                                <button
                                    onClick={handlePrev}
                                    className="absolute top-1/2 left-1 transform flex items-center py-4 -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white px-2 rounded-full hover:bg-gray-800"
                                >
                                    <i className='pi pi-angle-left'></i>
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute top-1/2 right-1  py-4 transform flex items-center -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white px-2 rounded-full hover:bg-gray-800"
                                >
                                    <i className='pi pi-angle-right'></i>
                                </button>
                            </div>
                            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto space-x-2 sm:space-x-0 sm:space-y-2 mb-2 sm:mb-0">
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={`rounded-lg cursor-pointer w-24 h-24 object-cover border-4 ${currentIndex === index ? 'border-purple-400' : 'border-transparent'}`}
                                        onClick={() => setCurrentIndex(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-full w-full sm:w-1/3 p-5 flex flex-col justify-center'>
                    <h4 className='font-light text-md dark:text-white'>JJm Cars FiveM</h4>
                    <h1 className='text-[50px] font-bold  dark:text-white'>{car && car.model}</h1>
                    <h3 className='dark:text-white'>{car && car.price}$</h3>
                    <br />
                    <PayPalButton></PayPalButton>
                    <ShareButton url={window.location.href} title={car && car.model}></ShareButton>
                </div>
            </div>
        </>
    );
}

export default CarDetails;