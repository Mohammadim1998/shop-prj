"use client";
import Image from "next/image";
import Link from "next/link";

const getData = async () => {
    const data = await fetch('https://myshop-server.iran.liara.run/api/get-active-mid-bans', { cache: "no-store" });
    return data.json();
}

const MiddleBanner = async () => {
    const data = await getData();

    return (
        <>
            {data.length < 1
                ? <></>
                : (
                    <section className="container mx-auto flex justify-between items-center flex-wrap">
                        {data.map((banner, i) => (
                            <Link href={banner.link} key={i} className="my-4">
                                <Image
                                    className="rounded-xl w-auto"
                                    alt={banner.imageAlt}
                                    title={banner.imageAlt}
                                    priority="true"
                                    width={600}
                                    height={200}
                                    src={banner.image}
                                />
                            </Link>
                        ))}
                    </section>
                )}
        </>
    );
}

export default MiddleBanner;