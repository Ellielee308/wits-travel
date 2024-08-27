import PropTypes from "prop-types";

export default function PhotoPreview({
  photos,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-75">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 font-bold text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-8"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        onClick={onPrev}
        className={`absolute left-4 ${currentIndex === 0 ? "text-gray-800 hover:cursor-not-allowed" : "text-white"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-9"
        >
          <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <img src={photos[currentIndex]} className="max-h-full max-w-full" />
      <button
        onClick={onNext}
        className={`absolute right-4 ${currentIndex === photos.length - 1 ? "text-gray-800 hover:cursor-not-allowed" : "text-white"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-9"
        >
          <path
            fillRule="evenodd"
            d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

PhotoPreview.propTypes = {
  photos: PropTypes.array,
  currentIndex: PropTypes.number,
  onClose: PropTypes.func,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
};
