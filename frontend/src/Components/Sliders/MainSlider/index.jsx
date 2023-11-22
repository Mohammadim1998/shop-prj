"use client";
import "animate.css";
import SliderDetails from "./SliderDetails";

const getData = async () => {
    const data = await fetch("https://myshop-server.iran.liara.run/api/get-active-sliders", { cache: "no-store" })
    return data.json();
}

const MainSlider = async () => {
    const data = await getData();
    return (
        <SliderDetails data={data} />
    );
};

export default MainSlider;
