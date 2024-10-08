import { useForm } from "react-hook-form";
import { useState } from "react";
import addSpot from "../../firebase/addSpot";
import ImageUpload from "./ImageUpload";
import { storage } from "../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function AddForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState("");
  const [downloadURLs, setDownloadURLs] = useState([]);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalPreviews, setAdditionalPreviews] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: "",
      subtitle: "",
      main_img: "",
      img: [],
      area: "",
      country: "",
      city: "",
      brief: "",
      description: "",
      transportation: "",
      price: 0,
      spot_category: "自然風景",
      click_count: 0,
      hidden: false,
      isSelectedForCarousel: false,
    },
  });

  // 上傳圖片並返回 Promise
  const handleUpload = () => {
    return new Promise((resolve, reject) => {
      if (!mainImage && additionalImages.length < 2) {
        reject("主圖片或至少兩張其他圖片必須上傳");
        return;
      }

      const newDownloadURLs = [];

      // 上傳主圖片
      if (mainImage) {
        const mainStorageRef = ref(storage, `spotImages/${mainImage.name}`);
        const mainUploadTask = uploadBytesResumable(mainStorageRef, mainImage);

        mainUploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.error("Upload error:", error);
            reject(error);
          },
          async () => {
            try {
              const url = await getDownloadURL(mainUploadTask.snapshot.ref);
              newDownloadURLs[0] = url;
              setDownloadURLs([...newDownloadURLs]);
              checkCompletion(newDownloadURLs, resolve);
            } catch (error) {
              reject(error);
            }
          },
        );
      }

      // 上傳其他圖片
      additionalImages.forEach((image, index) => {
        const storageRef = ref(storage, `spotImages/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.error("Upload error:", error);
            reject(error);
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              newDownloadURLs[index + 1] = url; // 索引 + 1 因為主圖片使用了索引 0
              setDownloadURLs([...newDownloadURLs]);
              checkCompletion(newDownloadURLs, resolve);
            } catch (error) {
              reject(error);
            }
          },
        );
      });
    });
  };

  // 檢查所有圖片是否已上傳完成
  const checkCompletion = (urls, resolve) => {
    if (
      urls.length === additionalImages.length + 1 &&
      !urls.includes(undefined)
    ) {
      resolve(urls); // 確保所有圖片上傳完成且沒有 undefined
    }
  };

  // 修改後的表單提交函數
  const onSubmit = async (data) => {
    try {
      const urls = await handleUpload(); // 等待圖片上傳完成
      data.main_img = urls[0]; // 將主圖片 URL 添加到表單數據
      data.img = urls.slice(1); // 將其他圖片 URL 添加到表單數據

      // 確保 URL 不為 undefined
      if (!data.main_img || data.img.includes(undefined)) {
        throw new Error("圖片上傳失敗，請重新嘗試");
      }

      console.log(data);
      await addSpot(data);
      alert("已上架景點！");
      reset();
      setMainPreview("");
      setAdditionalPreviews([]);
    } catch (error) {
      console.error("Error adding spot:", error);
      alert("上傳失敗，請檢查輸入資料和網絡連接");
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

        {/* Main Image */}

        <ImageUpload
          setMainImage={setMainImage}
          mainPreview={mainPreview}
          setMainPreview={setMainPreview}
          setAdditionalImages={setAdditionalImages}
          additionalPreviews={additionalPreviews}
          setAdditionalPreviews={setAdditionalPreviews}
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
          disabled={
            !isChecked ||
            isSubmitting ||
            !isValid ||
            !mainImage ||
            additionalImages.length < 2
          }
          className={`mt-4 h-10 w-1/4 self-center rounded-lg bg-gradient-to-r from-blue-500 to-green-500 text-lg text-white transition-opacity duration-200 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {isSubmitting ? "提交中..." : "上架景點"}
        </button>
      </form>
    </div>
  );
}
