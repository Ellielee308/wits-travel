import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { submitContactForm } from "../../firebase/uploadForm";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import travelImg from "./travel.jpg";

export default function ContactForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await submitContactForm(data);
      console.log("Form Data:", data);
      setIsDialogOpen(true);
      reset();
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mt-[60px] w-full px-6 lg:px-8">
      <div className="flex w-full flex-col lg:mx-auto lg:h-fit lg:w-fit lg:flex-row">
        <div className="w-full lg:w-[500px]">
          <h1 className="mb-6 text-3xl font-bold lg:text-4xl">CONTACT US</h1>
          <h2 className="border-b-2 border-gray-300 pb-5 text-xl font-semibold tracking-wide lg:text-2xl">
            旅遊行程安排/諮詢
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="mb-1 mt-5 block flex items-center text-lg font-medium lg:text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                姓名
              </label>

              <Input
                type="text"
                className="mb-3 lg:text-lg"
                placeholder="王小明"
                {...register("name", { required: "姓名是必填項" })}
              />

              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <p className="mt-1 text-xs text-red-600 lg:text-lg">
                    {message}
                  </p>
                )}
              />
            </div>

            <div>
              <label className="mb-1 mt-5 block flex items-center text-lg font-medium lg:text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                電子郵件
              </label>
              <Input
                className="mb-3 lg:text-lg"
                type="text"
                placeholder="mail@mail.com"
                {...register("email", {
                  required: "電子郵件是必填項",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|tw|org)$/,
                    message: "請輸入有效的電子郵件地址",
                  },
                })}
                onBlur={() => trigger("email")}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p className="mt-1 text-xs text-red-600 lg:text-lg">
                    {message}
                  </p>
                )}
              />
            </div>

            <div>
              <label className="mb-1 mt-5 block flex items-center text-lg font-medium lg:text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                電話號碼
              </label>
              <Input
                className="mb-3 lg:text-lg"
                type="text"
                placeholder="09XXXXXXXX"
                {...register("phone", {
                  required: "電話號碼是必填項",
                  pattern: {
                    value: /^09\d{8}$/,
                    message: "請輸入有效的電話號碼 (09 開頭, 共 10 碼)",
                  },
                })}
                onBlur={() => trigger("phone")}
              />
              <ErrorMessage
                errors={errors}
                name="phone"
                render={({ message }) => (
                  <p className="mt-1 text-xs text-red-600 lg:text-lg">
                    {message}
                  </p>
                )}
              />
            </div>

            <div>
              <label className="mb-1 mt-5 block flex items-center text-lg font-medium lg:text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
                主旨
              </label>
              <Controller
                name="subject"
                control={control}
                rules={{ required: "請選擇主旨" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    className="lg:w-72 lg:text-xl"
                  >
                    <SelectTrigger className="w-[180px] lg:w-72 lg:text-xl">
                      <SelectValue placeholder="請選擇主旨" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="問題詢問" className="lg:text-lg">
                        問題詢問
                      </SelectItem>
                      <SelectItem value="合作提案" className="lg:text-lg">
                        合作提案
                      </SelectItem>
                      <SelectItem value="給予建議" className="lg:text-lg">
                        給予建議
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <ErrorMessage
                errors={errors}
                name="subject"
                render={({ message }) => (
                  <p className="mt-1 text-xs text-red-600 lg:text-lg">
                    {message}
                  </p>
                )}
              />
            </div>

            <div>
              <label className="mb-1 mt-5 block flex items-center text-lg font-medium lg:text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                訊息內容
              </label>
              <Textarea
                placeholder="我想詢問關於旅遊行程的資訊..."
                className="h-40 lg:text-lg"
                as="textarea"
                {...register("message", { required: "訊息內容是必填項" })}
              />
              <ErrorMessage
                errors={errors}
                name="message"
                render={({ message }) => (
                  <p className="mt-1 text-xs text-red-600 lg:text-lg">
                    {message}
                  </p>
                )}
              />
            </div>
          </form>
        </div>
        <div className="ml-20 mt-6 hidden h-full w-auto flex-shrink-0 items-center justify-center lg:mt-0 lg:flex lg:flex-1">
          <img
            src={travelImg}
            alt="Travel"
            className="h-[717px] w-[500px] object-cover"
          />
        </div>
      </div>
      <div className="mb-5 mt-3 flex w-full justify-center lg:mb-10 lg:mt-8">
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="flex w-40 items-center justify-center bg-[#006c98] text-white hover:bg-[#1679a0] lg:w-52 lg:text-xl lg:tracking-wider"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-2 h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
            />
          </svg>
          提交
        </Button>
      </div>

      <AlertDialog open={isDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl">
              已收到您的諮詢表單
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xl">
              我們會儘速與您聯繫！
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setIsDialogOpen(false)}
              className="text-xl"
            >
              確定
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
