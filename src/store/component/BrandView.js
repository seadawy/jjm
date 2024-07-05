const BrandView = ({ logo, name }) => {
    return (
        <div
            className="flex items-center p-2 bg-indigo-500 text-white 
            brandLink cursor-pointer shadow-md rounded transition-all duration-700"
        >
            <img src={logo} alt={`${name} Logo`} className="filter grayscale h-16 w-16 mr-4 contrast-200" />
            <h1 className="text-2xl font-bold line-clamp-1">{name}</h1>
        </div>
    );
}

export default BrandView;