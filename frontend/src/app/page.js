import './globals.css';
import MainSlider from '@/Components/Sliders/MainSlider';
import ProductsSlider from '@/Components/Sliders/ProductsSlider';
import MiddleBanner from '@/Components/MiddleBanner';
import Categories from '@/Components/Categories';
import GraphicSlider from '@/Components/Sliders/GraphicSlider';
import NewBlogs from '@/Components/NewBlog';

const getData = async () => {
  const data = await fetch("https://myshop-server.iran.liara.run/api/get-new-products", { cache: "no-store" });
  return data.json();
}

const Home = async () => {
  const data = await getData();
  console.log("goalData:", data.newApps);

  return (
    <main>
      <MainSlider />
      <ProductsSlider goalData={data} title="اپلیکیشن ها" linkComp="apps" />
      <MiddleBanner />
      <ProductsSlider goalData={data} title="کتاب ها" linkComp="books" />
      <Categories />
      <GraphicSlider goalData={data} />
      <NewBlogs />
    </main>
  )
}


export default Home;