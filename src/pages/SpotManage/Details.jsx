import PropTypes from "prop-types";

export default function Details({ spot }) {
  return (
    <div className="col-span-7 mt-2">
      <div className="grid grid-cols-7 rounded-lg bg-white py-4 shadow-md">
        {/* ID */}
        <div className="col-span-1 mb-2 ml-4 justify-self-start font-semibold text-gray-700">
          景點 ID
        </div>
        <div className="col-span-6 mb-4 justify-self-start text-gray-600">
          {spot.id}
        </div>

        {/* 小標題 */}
        <div className="col-span-1 mb-2 ml-4 font-semibold text-gray-700">
          小標題
        </div>
        <div className="col-span-6 mb-4 text-gray-600">{spot.subtitle}</div>

        {/* 圖片集 */}
        <div className="col-span-1 mb-2 ml-4 font-semibold text-gray-700">
          圖片集
        </div>
        <div className="col-span-6 mb-4 mr-4 flex flex-wrap gap-2">
          <img
            className="w-1/5 rounded border border-gray-300 object-cover"
            src={spot.main_img}
            alt={`圖片 1`}
          />
          {spot.img.map((image, index) => (
            <img
              key={index}
              className="w-1/5 rounded border border-gray-300 object-cover"
              src={image}
              alt={`圖片 ${index + 2}`}
            />
          ))}
        </div>

        {/* 地區 */}
        <div className="col-span-1 mb-2 ml-4 font-semibold text-gray-700">
          地區
        </div>
        <div className="col-span-6 mb-4 text-gray-600">{spot.area}</div>

        {/* 國家 */}
        <div className="col-span-1 mb-2 ml-4 font-semibold text-gray-700">
          國家
        </div>
        <div className="col-span-6 mb-4 text-gray-600">{spot.country}</div>

        {/* 城市 */}
        <div className="col-span-1 mb-2 ml-4 font-semibold text-gray-700">
          城市
        </div>
        <div className="col-span-6 mb-4 text-gray-600">{spot.city}</div>

        {/* 簡介 */}
        <div className="col-span-1 mb-2 ml-4 font-semibold text-gray-700">
          簡介
        </div>
        <div className="col-span-6 mb-4 text-gray-600">{spot.brief}</div>

        {/* 詳細描述 */}
        <div className="col-span-1 mb-2 ml-4 font-semibold text-gray-700">
          詳細介紹
        </div>
        <div className="col-span-6 mb-4 mr-4 whitespace-pre-wrap text-justify text-gray-600">
          {spot.description}
        </div>

        {/* 交通資訊 */}
        <div className="col-span-1 mb-2 ml-4 whitespace-pre-wrap text-justify font-semibold text-gray-700">
          交通資訊
        </div>
        <div className="col-span-6 mb-4 text-gray-600">
          {spot.transportation}
        </div>
      </div>
    </div>
  );
}

Details.propTypes = {
  spot: PropTypes.object,
};
