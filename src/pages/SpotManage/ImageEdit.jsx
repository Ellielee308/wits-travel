import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";

const ImageEdit = ({
  setMainImage,
  setAdditionalImages,
  deletedImages,
  setDeletedImages,
  previews,
  setPreviews,
}) => {
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPreview = URL.createObjectURL(file);

      setMainImage(file);
      setPreviews({ ...previews, newMainPreview: newPreview });
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalImages(files);

    const newAdditionalPreviews = files.map((file) =>
      URL.createObjectURL(file),
    );

    setPreviews({
      ...previews,
      newAdditionalPreviews: newAdditionalPreviews,
    });
  };

  const deleteMainImageFromStorage = () => {
    if (confirm("確定刪除這張圖片嗎？")) {
      setDeletedImages((prev) => [...prev, previews.existingMainPreview]);

      setMainImage(null);
      setPreviews({ ...previews, existingMainPreview: "" });
      alert("已刪除！");
    }
  };

  const handleDeleteAdditionalImage = (index) => {
    if (confirm("確定刪除這張圖片嗎？")) {
      const updatedPreviews = { ...previews };
      const deletedImageUrl = updatedPreviews.existingAdditionalPreviews.splice(
        index,
        1,
      )[0];

      // 添加刪除的圖片 URL
      setDeletedImages((prev) => [...prev, deletedImageUrl]);

      // 更新圖片預覽
      setPreviews({
        ...previews,
        existingAdditionalPreviews: updatedPreviews.existingAdditionalPreviews,
      });
      alert("已刪除！");
    }
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
      {/* 已上傳的圖片預覽 */}
      {previews.existingMainPreview && (
        <div className="flex flex-col">
          <h3>已上傳的圖片預覽：</h3>
          <div className="relative h-fit w-[220px]">
            <img
              src={previews.existingMainPreview}
              alt="預覽主圖片"
              style={{ width: "200px", height: "auto", margin: "10px" }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              className="absolute right-0 top-0 size-6 hover:cursor-pointer"
              onClick={deleteMainImageFromStorage}
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
      {previews.newMainPreview && (
        <div>
          <h3>新上傳的圖片：</h3>
          <div className="flex flex-row">
            <img
              src={previews.newMainPreview}
              alt="新主圖片"
              style={{ width: "200px", height: "auto", margin: "10px" }}
            />
          </div>
        </div>
      )}
      {!previews.existingMainPreview && !previews.newMainPreview && (
        <span className="text-red-500">請上傳主圖片</span>
      )}

      <label htmlFor="main_img" className="mb-1 text-lg font-medium">
        其他圖片（至少2張）
        <span className="text-red-500">*</span>
      </label>
      {/* 新上傳的圖片預覽 */}
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleAdditionalImagesChange}
        className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
      />
      {/* 已上傳的圖片預覽 */}
      {previews.existingAdditionalPreviews.length > 0 && (
        <div>
          <h3>已上傳的圖片：</h3>
          <div className="flex flex-row">
            {previews.existingAdditionalPreviews.map(
              (existingPreview, index) => (
                <div key={index} className="relative">
                  <img
                    src={existingPreview}
                    alt={`預覽圖片 ${index + 1}`}
                    style={{ width: "200px", height: "auto", margin: "10px" }}
                    className={
                      deletedImages.includes(existingPreview) ? "hidden" : ""
                    }
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="black"
                    className="absolute right-0 top-0 size-6 hover:cursor-pointer"
                    onClick={() => handleDeleteAdditionalImage(index)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ),
            )}
          </div>
        </div>
      )}
      {previews.newAdditionalPreviews.length > 0 && (
        <div>
          <h3>新上傳的圖片：</h3>
          <div className="flex flex-row">
            {previews.newAdditionalPreviews.map((newPreview, index) => (
              <div key={index} className="relative">
                <img
                  src={newPreview}
                  alt={`新圖片 ${index + 1}`}
                  style={{ width: "200px", height: "auto", margin: "10px" }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {previews.existingAdditionalPreviews.length +
        previews.newAdditionalPreviews.length <
        2 && <span className="text-red-500">其他圖片至少需要兩張</span>}
    </>
  );
};

export default ImageEdit;

ImageEdit.propTypes = {
  setMainImage: PropTypes,
  setAdditionalImages: PropTypes.func,
  deletedImages: PropTypes.array,
  setDeletedImages: PropTypes.func,
  previews: PropTypes.object,
  setPreviews: PropTypes.func,
};
