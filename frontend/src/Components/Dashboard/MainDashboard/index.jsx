"use client";
import { useEffect, useState } from "react";
import DashboardCtrl from "../Dashboard-Ctrl";
import MiddleBannerAll from "../Forms/MiddleBannerForms";
import SlidersAll from "../Forms/SliderForms";
import PostForms from "../Forms/PostForms";
import CategoryForms from "../Forms/categoryForms";
import ProductForms from "../Forms/ProductForms";
import AdminPannel from "../Forms/admin-pannel";

const MainDashboard = () => {
    const [contentChanger, setcontentChanger] = useState("admin-pannel");
    const [details, setDetails] = useState(<MiddleBannerAll />);

    useEffect(() => {
        if (contentChanger == "midBan") {
            setDetails(<MiddleBannerAll />)
        } else if (contentChanger == "sliders") {
            setDetails(<SlidersAll />)
        } else if (contentChanger == "posts") {
            setDetails(<PostForms />)
        } else if (contentChanger == "categories") {
            setDetails(<CategoryForms />)
        } else if (contentChanger == "products") {
            setDetails(<ProductForms />)
        } else if (contentChanger == "admin-pannel") {
            setDetails(<AdminPannel />)
        }
    }, [contentChanger]);

    return (
        <div className="flex justify-between items-start gap-4 container mx-auto">
            <div className="sticky top-8 right-0 bottom-8"><DashboardCtrl setcontentChanger={setcontentChanger} /></div>
            <div className="w-full">{details}</div>
        </div>
    );
}

export default MainDashboard;