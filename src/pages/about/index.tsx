import Head from 'next/head'
import Image from 'next/image'

export default function About() {
  return (
    <>
      <Head>
        <title>About Glowshelfie</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Discover the story of Glowshelfie, a K-beauty journey designed to help sensitive skin find the perfect glow."
        />
      </Head>
      <div className="m-4 flex items-center gap-6 ph:flex-col ph:gap-2 tab:flex-col">
        <div className="intrinsic flex w-2/3 animate-fadeInTranslate justify-center pc:w-1/3">
          <Image
            src="/images/About_img.webp"
            alt="About image"
            width={800}
            height={600}
            priority
          />
        </div>
        <div className="m-6 flex gap-6 ph:flex-col pc:w-2/3 pc:flex-col">
          <section className="flex animate-fadeInScale flex-col gap-6 tab:w-1/2">
            <h1 className="text-4xl font-bold ph:text-xl tab:text-2xl">
              Introduction
            </h1>
            <h2 className="text-2xl text-gray-700 ph:text-lg tab:text-lg">
              Hi Beautiful Souls~
            </h2>
            <p className="text-xl leading-relaxed ph:text-base tab:text-lg">
              It is your girl directly in Seoul to unlock and find the best of
              K-Beauty for your skin to glow! Join the beautiful souls community
              to find the best way to learn more about K-Beauty but also to
              embrace your beauty.
            </p>
          </section>

          <section className="flex animate-fadeInScale flex-col gap-6 tab:w-1/2">
            <h1 className="text-4xl font-bold ph:text-xl tab:text-2xl">
              Glowshelfie&apos;s Story
            </h1>
            <p className="text-xl leading-relaxed ph:text-base tab:text-lg">
              By having a sensitive skin and being allergic to a lot of daily
              elements, including some skincare and makeup, it was really
              difficult for me to find the right products. Growing up in Europe,
              I had been trying safe skincare but I had never found the proper
              routine for my skin. Glowshelfie is our K-beauty garden where we
              are here to accompany you in every step of your skincare journey.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
