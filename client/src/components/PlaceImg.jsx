const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) return;

  if (!className) className = 'object-cover w-full h-full';

  return (
    <img
      className={className}
      src={`http://localhost:3000/uploads/${place.photos[index]}`}
      alt={place.title}
    />
  );
};

export default PlaceImg;
