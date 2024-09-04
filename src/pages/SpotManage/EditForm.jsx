import { useForm } from "react-hook-form";
import { useState } from "react";
import PropTypes from "prop-types";
import editSpot from "@/firebase/editSpot";
import ImageEdit from "./ImageEdit";
import { storage } from "../../firebase/firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default function EditForm({ showEditForm }) {
  const [isChecked, setIsChecked] = useState(false);
  const [mainImage, setMainImage] = useState(null); // 新增狀態來儲存主圖片檔案
  const [downloadURLs, setDownloadURLs] = useState(showEditForm.img || []); // 用於儲存下載 URL
  const [additionalImages, setAdditionalImages] = useState([]); // 儲存其他圖片的檔案陣列
  const [deletedImages, setDeletedImages] = useState([]); // 新增狀態來儲存被標記為刪除的圖片
  const [previews, setPreviews] = useState({
    existingMainPreview: showEditForm.main_img,
    newMainPreview: null,
    existingAdditionalPreviews: showEditForm.img,
    newAdditionalPreviews: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      id: showEditForm.id,
      title: showEditForm.title,
      subtitle: showEditForm.subtitle,
      main_img: "",
      img: [],
      area: showEditForm.area,
      country: showEditForm.country,
      city: showEditForm.city,
      brief: showEditForm.brief,
      description: showEditForm.description,
      transportation: showEditForm.transportation,
      price: showEditForm.price,
      spot_category: showEditForm.spot_category,
      click_count: showEditForm.click_count,
      isSelectedForCarousel: showEditForm.isSelectedForCarousel,
    },
  });

  // 刪除圖片的函數
  const deleteImagesFromStorage = async (urls) => {
    for (const url of urls) {
      const imageRef = ref(storage, url);
      try {
        await deleteObject(imageRef);
        console.log(`刪除圖片成功: ${url}`);
      } catch (error) {
        console.error(`刪除圖片失敗: ${url}`, error);
      }
    }
  };

  const handleUpload = () => {
    return new Promise((resolve, reject) => {
      const newDownloadURLs = [...downloadURLs];
      let uploadTasks = [];

      // 上傳主圖片
      if (mainImage) {
        const mainStorageRef = ref(storage, `spotImages/${mainImage.name}`);
        const mainUploadTask = uploadBytesResumable(mainStorageRef, mainImage);

        uploadTasks.push(
          new Promise((taskResolve, taskReject) => {
            mainUploadTask.on(
              "state_changed",
              null,
              (error) => {
                console.error("Upload error:", error);
                taskReject(error);
              },
              async () => {
                try {
                  const url = await getDownloadURL(mainUploadTask.snapshot.ref);
                  newDownloadURLs[0] = url; // 更新主圖片 URL
                  taskResolve();
                } catch (error) {
                  taskReject(error);
                }
              },
            );
          }),
        );
      }

      // 上傳其他圖片
      if (additionalImages.length > 0) {
        additionalImages.forEach((image) => {
          const storageRef = ref(storage, `spotImages/${image.name}`);
          const uploadTask = uploadBytesResumable(storageRef, image);

          uploadTasks.push(
            new Promise((taskResolve, taskReject) => {
              uploadTask.on(
                "state_changed",
                null,
                (error) => {
                  console.error("Upload error:", error);
                  taskReject(error);
                },
                async () => {
                  try {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    newDownloadURLs.push(url); // 將新圖片的 URL 添加到陣列中
                    taskResolve();
                  } catch (error) {
                    taskReject(error);
                  }
                },
              );
            }),
          );
        });
      }

      // 等待所有上傳任務完成
      Promise.all(uploadTasks)
        .then(() => {
          setDownloadURLs([...newDownloadURLs]); // 更新整個 URL 列表
          resolve(newDownloadURLs);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const onSubmit = async (data) => {
    try {
      const urls = await handleUpload(); // 等待圖片上傳完成

      // 如果上傳了新的主圖片，使用新圖片 URL，否則保留原來的 URL
      data.main_img = mainImage ? urls[0] : showEditForm.main_img;

      // 合併新圖片和舊圖片 URL，並排除被刪除的圖片
      const allImages = [
        ...previews.existingAdditionalPreviews,
        ...urls.slice(mainImage ? 1 : 0),
      ];

      // 使用 Set 移除重複的 URL，並排除被刪除的圖片
      data.img = [...new Set(allImages)].filter(
        (url) => !deletedImages.includes(url),
      );

      // 確保 URL 不為 undefined
      if (!data.main_img || data.img.includes(undefined)) {
        throw new Error("圖片上傳失敗，請重新嘗試");
      }

      // 執行圖片刪除操作
      await deleteImagesFromStorage(deletedImages);

      console.log(data);
      await editSpot(showEditForm.id, data); // 使用 editSpot 函數更新資料
      alert("已修改景點資料！");
      window.location.reload();
    } catch (error) {
      console.error("更新資料失敗: ", error);
      alert("更新資料失敗，請重試。");
    }
  };

  return (
    <div
      id="formContainer"
      className="w-full rounded-lg bg-white px-8 py-5 shadow-lg"
    >
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title */}
        <label htmlFor="title" className="mb-1 text-lg font-medium">
          完整標題
          <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          placeholder="範例：英國｜海德公園門票｜Hyde Park"
          className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="text-red-500">完整標題是必填項目</span>
        )}

        {/* Subtitle */}
        <label htmlFor="subtitle" className="mb-1 text-lg font-medium">
          小標題（6字以內）
          <span className="-ml-2 text-red-500">*</span>
        </label>
        <input
          id="subtitle"
          placeholder="請勿超過6個字"
          className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          {...register("subtitle", { required: true, maxLength: 6 })}
        />
        {errors.subtitle && errors.subtitle.type === "required" && (
          <span className="text-red-500">小標題是必填項目</span>
        )}
        {errors.subtitle && errors.subtitle.type === "maxLength" && (
          <span className="text-red-500">小標題不得超過6個字</span>
        )}

        {/* Area */}
        <label htmlFor="area" className="mb-1 text-lg font-medium">
          地區
          <span className="text-red-500">*</span>
        </label>
        <input
          id="area"
          placeholder="範例：歐洲"
          className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          {...register("area", { required: true })}
        />
        {errors.area && <span className="text-red-500">地區是必填項目</span>}

        {/* Country */}
        <label htmlFor="country" className="mb-1 text-lg font-medium">
          國家
          <span className="text-red-500">*</span>
        </label>
        <input
          id="country"
          placeholder="範例：英國"
          className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          {...register("country", { required: true })}
        />
        {errors.country && <span className="text-red-500">國家是必填項目</span>}

        {/* City */}
        <label htmlFor="city" className="mb-1 text-lg font-medium">
          城市
          <span className="text-red-500">*</span>
        </label>
        <input
          id="city"
          placeholder="範例：倫敦"
          className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          {...register("city", { required: true })}
        />
        {errors.city && <span className="text-red-500">城市是必填項目</span>}

        {/* 圖片上傳元件 */}
        <ImageEdit
          setMainImage={setMainImage}
          setAdditionalImages={setAdditionalImages}
          deletedImages={deletedImages} // 傳遞刪除的圖片列表
          setDeletedImages={setDeletedImages} // 更新刪除的圖片列表
          previews={previews}
          setPreviews={setPreviews}
        />

        {/* Brief */}
        <label htmlFor="brief" className="mb-1 text-lg font-medium">
          簡介（20字以內）
          <span className="-ml-2 text-red-500">*</span>
        </label>
        <input
          id="brief"
          placeholder="請勿超過20個字"
          className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          {...register("brief", { required: true, maxLength: 20 })}
        />
        {errors.brief && errors.brief.type === "required" && (
          <span className="text-red-500">簡介是必填項目</span>
        )}
        {errors.brief && errors.brief.type === "maxLength" && (
          <span className="text-red-500">簡介不得超過20個字</span>
        )}

        {/* Description */}
        <label htmlFor="description" className="mb-1 text-lg font-medium">
          詳細介紹
          <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          className="h-72 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="text-red-500">詳細介紹是必填項目</span>
        )}

        {/* Transportation */}
        <label htmlFor="transportation" className="mb-1 text-lg font-medium">
          交通資訊
          <span className="text-red-500">*</span>
        </label>
        <textarea
          id="transportation"
          className="h-36 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          {...register("transportation", { required: true })}
        />
        {errors.transportation && (
          <span className="text-red-500">交通資訊是必填項目</span>
        )}

        {/* Price */}
        <label htmlFor="price" className="mb-1 text-lg font-medium">
          價格
          <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="price"
          min="0"
          className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          {...register("price", { required: true, valueAsNumber: true })}
        />
        {errors.price && <span className="text-red-500">價格是必填項目</span>}

        {/* Category */}
        <label htmlFor="spot_category" className="mb-1 text-lg font-medium">
          類別
          <span className="text-red-500">*</span>
        </label>
        <select
          id="spot_category"
          className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          {...register("spot_category", { required: true })}
        >
          <option value="自然風景">自然風景</option>
          <option value="博物館 & 美術館">博物館 & 美術館</option>
          <option value="樂園">樂園</option>
          <option value="歷史景點">歷史景點</option>
          <option value="特色建築">特色建築</option>
        </select>
        {errors.spot_category && (
          <span className="text-red-500">類別是必填項目</span>
        )}
        {/* Checkbox */}
        <div className="mt-4 flex items-center self-center">
          <input
            type="checkbox"
            id="confirmation"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="confirmation" className="text-base text-gray-700">
            已確實檢查以上內容
          </label>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isChecked || isSubmitting || !isValid}
          className={`mt-4 h-10 w-1/4 self-center rounded-lg bg-gradient-to-r from-blue-500 to-green-500 text-lg text-white transition-opacity duration-200 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {isSubmitting ? "提交中..." : "儲存景點"}
        </button>
      </form>
    </div>
  );
}

EditForm.propTypes = {
  showEditForm: PropTypes.object,
};
