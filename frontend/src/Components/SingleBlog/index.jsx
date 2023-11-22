"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const SingleBlogPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("https://myshop-server.iran.liara.run/api/posts")
            .then(d => {
                setPosts(d.data);
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <div className="flex flex-col gap-4 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
            <h3 className="text-blue-500">پر بازدیدترین مقالات </h3>
            <ul className="flex flex-col gap-3">
                {
                    posts[0] == -1
                        ? <div className="flex justify-center items-center p-12">
                            <Image
                                alt="loading"
                                width={40}
                                height={40}
                                src={"/loading.svg"}
                            />
                        </div>
                        : posts.length < 1
                            ? <div>مقاله موجود نیست</div>
                            : <div>
                                {
                                    posts.map((po, i) => (
                                        <li key={i}>
                                            <Link
                                                href={`/blog/${po.slug}`}
                                                className="p-2 mb-2 flex justify-center items-center text-base sm:text-sm border-r-2 border-zinc-600"
                                            >
                                                {po.title}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </div>
                }
            </ul>
        </div>
    );
}

export default SingleBlogPage;