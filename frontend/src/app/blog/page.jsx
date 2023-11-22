import BlogPageComp from "../../Components/BlogPage";

const BlogPage = async () => {

  return (
    <div className="container mx-auto">
      <section className="flex flex-col gap-8">
        <h1 className="text-center text-lg text-indigo-600">وبلاگ فروشگاه فایل مرنفا</h1>
        <div>
          <BlogPageComp />
        </div>
      </section>
    </div>
  )
}

export default BlogPage;