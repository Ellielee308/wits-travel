import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";

const ImageUpload = ({
  setMainImage,
  mainPreview,
  setMainPreview,
  setAdditionalImages,
  additionalPreviews,
  setAdditionalPreviews,
}) => {
  const handleMainImageChange = (e) => {
    const file = e.target.files[0]; // 取得選中的主圖片檔案
    if (file) {
      setMainImage(file);
      const newPreview = URL.createObjectURL(file);
      setMainPreview(newPreview);
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files); // 將 FileList 轉換為陣列
    setAdditionalImages(files);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setAdditionalPreviews(newPreviews);
  };

  return (
    <>
      <label htmlFor="main_img" className="mb-1 text-lg font-medium">
        主圖片
        <span className="text-red-500">*</span>
      </label>
      <Input
        type="file"
        accept="image/*"
        onChange={handleMainImageChange}
        className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
      />
      {mainPreview && (
        <div>
          <h3>預覽：</h3>
          <img
            src={mainPreview}
            alt="預覽主圖片"
            style={{ width: "200px", height: "auto", margin: "10px" }}
          />
        </div>
      )}
      {!mainPreview && <span className="text-red-500">請上傳主圖片</span>}
      <label htmlFor="img" className="mb-2 text-lg">
        其他圖片（至少2張）
        <span className="-ml-2 text-red-500">*</span>
      </label>
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleAdditionalImagesChange}
        className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
      />
      {additionalPreviews.length > 0 && (
        <div>
          <h3>預覽：</h3>
          <div className="flex flex-row">
            {additionalPreviews.map((additionalPreview, index) => (
              <img
                key={index}
                src={additionalPreview}
                alt={`預覽圖片 ${index + 1}`}
                style={{ width: "200px", height: "auto", margin: "10px" }}
              />
            ))}
          </div>
        </div>
      )}
      {additionalPreviews.length < 2 && (
        <span className="text-red-500">其他圖片至少需要兩張</span>
      )}
    </>
  );
};

export default ImageUpload;

ImageUpload.propTypes = {
  setMainImage: PropTypes.func,
  mainPreview: PropTypes.string,
  setMainPreview: PropTypes.func,
  setAdditionalImages: PropTypes.func,
  additionalPreviews: PropTypes.array,
  setAdditionalPreviews: PropTypes.func,
};
