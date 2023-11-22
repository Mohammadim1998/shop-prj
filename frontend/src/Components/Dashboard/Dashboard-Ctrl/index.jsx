"use client";
import { useState } from "react";
import DCBtn from "./btn";


const DashboardCtrl = ({ setcontentChanger }) => {
    const [colorChanger, setcolorChanger] = useState("admin-pannel");

    return (
        <div className="w-60 bg-zinc-200 p-4 rounded-lg flex justify-center items-center">
            <div className="flex flex-col gap-6">
                <DCBtn title={"پیشخوان"} content={"admin-pannel"} setcontentChanger={setcontentChanger} colorChanger={colorChanger} setcolorChanger={setcolorChanger} />
                <DCBtn title={"بنر های تبلیغاتی"} content={"midBan"} setcontentChanger={setcontentChanger} colorChanger={colorChanger} setcolorChanger={setcolorChanger} />
                <DCBtn title={"اسلایدر ها"} content={"sliders"} setcontentChanger={setcontentChanger} colorChanger={colorChanger} setcolorChanger={setcolorChanger} />
                <DCBtn title={"پست ها"} content={"posts"} setcontentChanger={setcontentChanger} colorChanger={colorChanger} setcolorChanger={setcolorChanger} />
                <DCBtn title={"دسته محصول"} content={"categories"} setcontentChanger={setcontentChanger} colorChanger={colorChanger} setcolorChanger={setcolorChanger} />
                <DCBtn title={"محصولات"} content={"products"} setcontentChanger={setcontentChanger} colorChanger={colorChanger} setcolorChanger={setcolorChanger} />
            </div>
        </div>
    );
}

export default DashboardCtrl;