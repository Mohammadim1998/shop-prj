"use client";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const CategoryDetails = ({ midBanId }) => {
   // FORM SHOULD BE NOT SEND WITH ENTER KEY
   const formKeyNotSuber = (event) => {
      if (event.key == "Enter") {
         event.preventDefault();
      }
   };

   const titleRef = useRef();
   const slugRef = useRef();
   const imageUrlRef = useRef();
   const imageAltRef = useRef();
   const shortDescRef = useRef();
   const situationRef = useRef();
   const typeOfProductRef = useRef();


   const updater = (e) => {
      e.preventDefault();
      const formData = {
         goalId: midBanId,
         title: titleRef.current.value,
         slug: slugRef.current.value,
         image: imageUrlRef.current.value,
         imageAlt: imageAltRef.current.value,
         shortDesc: shortDescRef.current.value,
         situation: situationRef.current.value,
         typeOfProduct: typeOfProductRef.current.value,

         date: new Date().toLocaleDateString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
         }),
      };
      const url = `https://myshop-server.iran.liara.run/api/update-category/${midBanId}`;
      axios
         .post(url, formData)
         .then((d) => {
            formData.situation == "true"
               ? toast.success("دسته محصول با موفقیت منتشر شد", {
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
               })
               : toast.success("دسته محصول به صورت پیشفرض ذخیره شد", {
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
               });
         })
         .catch((e) => {
            let message = "متاسفانه ناموفق بود.";
            if (e.response.data.msg) {
               message = e.response.data.msg;
            }
            toast.error(message, {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         });
   };
   const [fullData, setfullData] = useState([-1]);

   useEffect(() => {
      axios
         .get(
            `https://myshop-server.iran.liara.run/api/get-category/${midBanId}`
         )
         .then((d) => {
            setfullData(d.data);
         })
         .catch((e) =>
            toast.error("خطا در لود اطلاعات", {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            })
         );
   }, [midBanId]);

   const remover = () => {
      const url = `https://myshop-server.iran.liara.run/api/delete-category/${midBanId}`;
      axios
         .post(url)
         .then((d) => {
            toast.success("دسته محصول با موفقیت حذف شد.", {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
         .catch((e) => {
            let message = "متاسفانه ناموفق بود.";
            if (e.response.data.msg) {
               message = e.response.data.msg;
            }
            toast.error(message, {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         });
   };

   return (
      <div className=" flex flex-col gap-8">
         {fullData[0] == -1 ? (
            <div className=" flex justify-center items-center p-12">
               <Image
                  alt="loading"
                  width={120}
                  height={120}
                  src={"/loading.svg"}
               />
            </div>
         ) : (
            <div className=" flex flex-col gap-8">
               <div className=" flex justify-between items-center">
                  <h2 className=" text-orange-500">جزئیات بنر</h2>
                  <button
                     onClick={() => remover()}
                     className=" bg-rose-600 text-white px-4 py-1 rounded-md text-xs transition-all duration-500 hover:bg-rose-700"
                  >
                     حذف
                  </button>
               </div>
               <div className=" flex justify-between items-center">
                  <div className=" bg-zinc-100 rounded px-3 py-1 text-sm">
                     {fullData._id ? fullData._id : ""}
                  </div>
                  <div className=" bg-zinc-100 rounded px-3 py-1 text-sm">
                     {fullData.date ? fullData.date : ""}
                  </div>
               </div>
               <form
                  onKeyDown={formKeyNotSuber}
                  onSubmit={updater}
                  className=" flex flex-col gap-6"
               >
                  <div className=" flex flex-col gap-2">
                     <div>عنوان جدید دسته</div>
                     <input
                        required={true}
                        defaultValue={fullData.title}
                        ref={titleRef}
                        type="text"
                        className=" p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                     />
                  </div>
                  <div className=" flex flex-col gap-2">
                     <div>اسلاگ جدید دسته</div>
                     <input
                        required={true}
                        defaultValue={fullData.slug}
                        ref={slugRef}
                        type="text"
                        className=" p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                     />
                  </div>
                  <div className=" flex flex-col gap-2">
                     <div>آدرس جدید عکس</div>
                     <input
                        required={true}
                        defaultValue={fullData.image}
                        ref={imageUrlRef}
                        type="text"
                        className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                     />
                  </div>
                  <div className=" flex flex-col gap-2">
                     <div>آلت جدید عکس</div>
                     <input
                        required={true}
                        defaultValue={fullData.imageAlt}
                        ref={imageAltRef}
                        type="text"
                        className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                     />
                  </div>
                  <div className=" flex flex-col gap-2">
                     <div>توضیحات کوتاه جدید عکس</div>
                     <input
                        required={true}
                        defaultValue={fullData.shortDesc}
                        ref={shortDescRef}
                        type="text"
                        className=" p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                     />
                  </div>

                  <div className=" flex flex-col gap-2">
                     <div>نوع دسته بندی محصول</div>
                     <select
                        ref={typeOfProductRef}
                        className=" p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                     >
                        {fullData.typeOfProduct == "book" ? (
                           <>
                              <option value={"book"}>کتاب</option>
                              <option value={"app"}>اپلیکیشن</option>
                              <option value={"gr"}>فایل گرافیکی</option>
                           </>
                        ) : fullData.typeOfProduct == "app" ?(
                           <>
                              <option value={"app"}>اپلیکیشن</option>
                              <option value={"book"}>کتاب</option>
                              <option value={"gr"}>فایل گرافیکی</option>
                           </>
                        ) :(
                        <>
                           <option value={"gr"}>فایل گرافیکی</option>
                           <option value={"book"}>کتاب</option>
                           <option value={"app"}>اپلیکیشن</option>
                        </>
                        )}
                     </select>
                  </div>
                  <div className=" flex flex-col gap-2">
                     <div>انتشار و پیشنویس</div>
                     <select
                        ref={situationRef}
                        className=" p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                     >
                        {fullData.situation == true ? (
                           <>
                              <option value={true}>انتشار</option>
                              <option value={false}>پیشنویس</option>
                           </>
                        ) : (
                           <>
                              <option value={false}>پیشنویس</option>
                              <option value={true}>انتشار</option>
                           </>
                        )}
                     </select>
                  </div>
                  <button
                     type="submit"
                     className=" p-2 bg-indigo-600 text-white w-full rounded-md transition-all duration-500 hover:bg-orange-500"
                  >
                     به روز رسانی
                  </button>
               </form>
            </div>
         )}

         <ToastContainer
            bodyClassName={() => "font-[shabnam] text-sm flex items-center"}
            position="top-right"
            autoClose={3000}
            theme="colored"
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
      </div>
   );
};

export default CategoryDetails;
