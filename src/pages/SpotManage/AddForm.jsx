import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import addSpot from "../../firebase/addSpot";

export default function AddForm() {
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    mode: "onBlur", // 驗證模式 (onChange, onBlur, onSubmit, all)
    defaultValues: {
      id: uuidv4(),
      title: "",
      subtitle: "", // 6字以內
      main_img: "",
      img: ["", ""],
      area: "",
      country: "",
      city: "",
      brief: "", // 20字為限
      description: "",
      transportation: "",
      price: 0,
      spot_category: "自然風景",
      click_count: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "img",
  });

  const onSubmit = (data) => {
    console.log(data);
    addSpot(data);
    reset();
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
        </label>
        <input
          id="city"
          placeholder="範例：倫敦"
          className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          {...register("city", { required: true })}
        />
        {errors.city && <span className="text-red-500">城市是必填項目</span>}

        {/* Main Image */}
        <label htmlFor="main_img" className="mb-1 text-lg font-medium">
          主圖片網址
        </label>
        <input
          id="main_img"
          className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="需為有效 URL"
          {...register("main_img", {
            required: "主圖片網址是必填項目",
            pattern: {
              value: /^(ftp|http|https):\/\/[^ "]+$/,
              message: "無效的 URL",
            },
          })}
        />
        {errors.main_img && (
          <span className="text-red-500">{errors.main_img.message}</span>
        )}

        {/* 其他圖片網址欄位 */}
        <label htmlFor="img" className="mb-2 text-lg">
          其他圖片網址（至少2張）
        </label>
        {fields.map((field, index) => (
          <div key={field.id} className="mb-2 flex items-center">
            <input
              type="text"
              placeholder={`圖片網址 ${index + 1}`}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              {...register(`img.${index}`, {
                required: "圖片網址是必填項目",
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: "無效的 URL",
                },
              })}
            />
            {errors.img && errors.img[index] && (
              <span className="ml-2 text-red-500">
                {errors.img[index]?.message}
              </span>
            )}
            <button
              type="button"
              onClick={() => remove(index)}
              className="ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        ))}

        {/* 添加圖片網址按鈕 */}
        <button
          type="button"
          className="self-start rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          onClick={() => append("")}
        >
          添加圖片網址
        </button>

        {/* Brief */}
        <label htmlFor="brief" className="mb-1 text-lg font-medium">
          簡介（20字以內）
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
        </label>
        <textarea
          id="description"
          className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="text-red-500">詳細介紹是必填項目</span>
        )}

        {/* Transportation */}
        <label htmlFor="transportation" className="mb-1 text-lg font-medium">
          交通資訊
        </label>
        <input
          id="transportation"
          className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          {...register("transportation", { required: true })}
        />
        {errors.transportation && (
          <span className="text-red-500">交通資訊是必填項目</span>
        )}

        {/* Price */}
        <label htmlFor="price" className="mb-1 text-lg font-medium">
          定價
        </label>
        <input
          type="number"
          id="price"
          min="0"
          className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          {...register("price", { required: true, valueAsNumber: true })}
        />
        {errors.price && <span className="text-red-500">定價是必填項目</span>}

        {/* Category */}
        <label htmlFor="spot_category" className="mb-1 text-lg font-medium">
          分類
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
          <span className="text-red-500">分類是必填項目</span>
        )}
        {/* 檢核框 */}
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
          className={`mt-4 h-10 w-1/4 self-center rounded-lg bg-gradient-to-r from-blue-500 to-green-500 text-white transition-opacity duration-200 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {isSubmitting ? "提交中..." : "上架景點"}
        </button>
      </form>
    </div>
  );
}
