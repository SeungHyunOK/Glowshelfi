import Head from 'next/head'
import Link from 'next/link'
import Button from '@/components/button'
import { brands } from '@/store/brands'
import Feeds from '@/components/feed/feeds'
import { Brand, BrandCardProps } from '@/type/brands'

const BrandCard: React.FC<BrandCardProps> = ({ name, url }) => (
  <div
    key={`${name}-${url}`}
    className="flex flex-col items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-md transition-transform duration-300 ease-in-out hover:rotate-1 hover:scale-105 hover:bg-pink-100 hover:shadow-xl"
  >
    <h3 className="mb-4 break-words text-xl ph:text-sm tab:text-base">
      {name}
    </h3>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full bg-pink-500 px-4 text-xl font-bold text-white shadow-md transition-all duration-300 hover:bg-pink-600 ph:px-2 ph:text-base tab:text-lg"
      aria-label={`Visit ${name}`}
    >
      Visit✨
    </a>
  </div>
)

function Home() {
  const Brands: Brand[] = brands.slice(0, 4)

  return (
    <>
      <Head>
        <title>Glowshelfie - Find your glow with Glowshelfie</title>
        <meta
          name="description"
          content="Create your perfect skincare routine with Glowshelfie. Take our personalized quiz to discover the best products for your unique skin type and concerns."
        />
        <link rel="canonical" href="https://glowshelfie.vercel.app/" />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content="https://glowshelfie.vercel.app/" />
        <meta
          property="og:image"
          content="https://glowshelfie.vercel.app/images/Glowshelfie_logo.png"
        />
      </Head>

      <div className="min-w-screen mx-10 my-5 flex flex-wrap justify-around gap-10 overflow-hidden py-4 ph:my-1 ph:flex-col ph:items-center ph:justify-center ph:gap-5 tab:my-3 tab:flex-col tab:items-center tab:justify-center">
        <section className="flex w-5/12 flex-col items-center gap-2 rounded-2xl bg-[#D9D9D9] p-10 text-center font-bold shadow-lg shadow-gray-500 ph:w-full ph:p-4 tab:w-11/12 tab:p-6 pc:justify-around">
          <h1 className="text-3xl leading-tight text-gray-800 ph:text-base tab:text-xl">
            🐰 Let&apos;s build your personalized Korean{' '}
            <span className="text-pink-600">Skincare Routine</span> 💓✨
          </h1>
          <p className="text-xl ph:text-sm tab:text-base">
            ✨ Take this quiz to find out which routine is perfect for your skin
            👸✨
          </p>
          <Link href="/quiz">
            <Button
              className="rounded-lg bg-[#F7DFDE] p-3 text-3xl font-bold shadow-md transition-transform duration-200 hover:scale-105 hover:bg-amber-200 ph:w-full ph:text-base tab:text-xl"
              aria-label="Start your personalized quiz"
              style={{
                animation: 'pulseGrow 2s infinite',
              }}
            >
              Let&apos;s Start! 🐰💓✨
            </Button>
          </Link>
        </section>

        <section className="w-5/12 rounded-2xl bg-[#D9D9D9] p-10 text-center font-bold shadow-lg shadow-gray-400 ph:w-full ph:p-4 tab:w-11/12 tab:p-6">
          <div className="flex flex-col gap-8 ph:gap-2 tab:gap-5">
            <h1 className="animate-fadeIn text-3xl leading-tight text-gray-800 ph:text-base tab:text-xl">
              💖 Already know your{' '}
              <span className="text-pink-600">favorites</span>? 🛍️✨
            </h1>
            <h2 className="animate-fadeIn text-xl ph:text-sm tab:text-base">
              Browse and shop from the brands you love below!
            </h2>

            <div className="m-6 grid grid-cols-2 gap-8 ph:m-2 ph:gap-4 tab:m-4 tab:gap-6">
              {Brands.map((brand) => (
                <BrandCard
                  key={`${brand.name}-${brand.url}`}
                  name={brand.name}
                  url={brand.url}
                  className="transform transition-transform duration-500 ease-in-out hover:rotate-2 hover:scale-105"
                />
              ))}
            </div>

            <Link
              href="/shop"
              className="rounded-full bg-pink-500 px-8 py-3 text-lg font-bold text-white shadow-md hover:bg-pink-600 ph:w-full"
              aria-label="Show more brands"
            >
              Show More 💕
            </Link>
          </div>
        </section>
      </div>

      <div className="min-w-screen mx-10 my-5 ph:my-1 tab:my-3">
        <section className="flex w-full justify-center">
          {' '}
          <Feeds />
        </section>
      </div>
    </>
  )
}

export default Home
