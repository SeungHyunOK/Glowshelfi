import { useEffect, useState } from 'react'
import Button from '@/components/button'
import { AnswerOption } from '@/type/answerOption'
import Result from '@/components/result'
import Head from 'next/head'

export default function Quizz() {
  const [isStarted, setIsStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<AnswerOption[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const questions = [
    {
      question: (
        <div className="flex flex-col gap-12 font-bold ph:gap-4 tab:gap-8">
          <h1 className="text-6xl ph:text-2xl tab:text-4xl">
            What&apos;s your skin type?
          </h1>
          <h2 className="text-4xl ph:text-lg tab:text-2xl">Choose one</h2>
        </div>
      ),
      options: [
        'Normal',
        'Dry',
        'Oily',
        'Combination',
        'Sensitive',
      ] as AnswerOption[],
    },
    {
      question: (
        <div className="flex flex-col gap-12 font-bold ph:gap-4 tab:gap-8">
          <h1 className="text-6xl ph:text-2xl tab:text-4xl">
            What&apos;s your skin concerns?
          </h1>
          <h2 className="text-4xl ph:text-lg tab:text-2xl">Choose one</h2>
        </div>
      ),
      options: [
        'Dark spot & Pigmentation',
        'Acne & Breakouts',
        'Blemishes & Sensitive',
        'Hydrating',
        'Anti-aging & Wrinkles',
        'Pores',
        'Dark spot & Acne & Blemish & Pores',
      ] as AnswerOption[],
    },
  ]

  const handleStart = () => {
    setIsStarted(true)
    localStorage.setItem('isStarted', 'true')
  }

  const handleBack = () => {
    const prevStep = Math.max(0, step - 1) // 최소 값이 0이 되도록 제한
    setStep(prevStep)
    localStorage.setItem('step', String(prevStep))
  }

  const handleRestart = () => {
    setIsStarted(false)
    setShowResults(false)
    setAnswers([])
    setStep(0)
    localStorage.clear()
  }

  useEffect(() => {
    const savedAnswers = localStorage.getItem('answers')
    const savedStep = localStorage.getItem('step')
    const savedIsStarted = localStorage.getItem('isStarted') === 'true'
    const savedShowResults = localStorage.getItem('showResults') === 'true'

    if (savedAnswers) setAnswers(JSON.parse(savedAnswers))
    if (savedStep && !isNaN(Number(savedStep))) {
      const stepValue = Number(savedStep)
      if (stepValue >= 0 && stepValue < questions.length) {
        setStep(stepValue)
      }
    }
    setIsStarted(savedIsStarted)
    setShowResults(savedShowResults)
  }, [questions.length])

  const handleAnswer = (answer: AnswerOption) => {
    const updatedAnswers = [...answers, answer]
    setAnswers(updatedAnswers)
    localStorage.setItem('answers', JSON.stringify(updatedAnswers))

    if (step < questions.length - 1) {
      const nextStep = step + 1
      setStep(nextStep)
      localStorage.setItem('step', String(nextStep))
    } else {
      setIsLoading(true)
      setTimeout(() => {
        setShowResults(true)
        setIsLoading(false)
        localStorage.setItem('showResults', 'true')
      }, 2000)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Glowshelfie-Quizz</title>
        <meta
          name="description"
          content="Discover the best skincare routine tailored for your skin type and concerns. Take our quiz to find the perfect products for you!"
        />
        <meta
          name="keywords"
          content="glowshelfie, korean skincare, k beauty, glass skin, skincare routine, glowy skin, skincare steps"
        />
        <meta
          property="og:title"
          content="Personalized Skincare Routine Quiz"
        />
        <meta
          property="og:description"
          content="Discover the best skincare routine tailored for your skin type and concerns. Take our quiz to find the perfect products for you!"
        />
        <meta
          property="og:image"
          content="https://glowshelfie.vercel.app/images/og_image.png"
        />
        <link rel="canonical" href="https://glowshelfie.vercel.app/quizz" />
        <meta
          property="og:url"
          content="https://glowshelfie.vercel.app/quizz"
        />
      </Head>

      <div className="relative m-5 flex flex-col items-center justify-center rounded-lg bg-[#D9D9D9] p-14 shadow-md shadow-gray-300 ph:p-6 tab:p-10">
        {!isStarted ? (
          <>
            <span className="mb-14 flex flex-col gap-12 text-center font-bold ph:mb-6 ph:gap-4 tab:mb-10 tab:gap-8">
              <h1 className="text-6xl text-gray-800 ph:text-2xl tab:text-4xl">
                🐰 Build Your Perfect{' '}
                <span className="text-pink-600">Skincare Routine</span> 💓✨
              </h1>
              <h2 className="text-4xl ph:text-lg tab:text-2xl">
                ✨ Take this quiz to find out which routine is perfect for your
                skin 👸✨
              </h2>
            </span>
            <Button
              className="rounded-lg bg-[#F7DFDE] p-4 text-4xl font-bold shadow-md transition-transform duration-200 hover:scale-105 hover:bg-amber-200 ph:text-lg tab:text-2xl"
              onClick={handleStart}
            >
              Let&apos;s start! 💓✨
            </Button>
          </>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="mb-6 text-4xl font-bold ph:text-lg tab:text-2xl">
              ✨ Loading your results... ✨
            </h2>
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-600 border-t-transparent"></div>
          </div>
        ) : showResults ? (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="mb-8 flex flex-col gap-8 font-bold ph:mb-4 ph:gap-4 tab:mb-6 tab:gap-6">
              <h1 className="text-4xl ph:text-lg tab:text-2xl">
                🐰 Here is your personalized Korean skincare routine💓✨
              </h1>
              <h2 className="text-2xl ph:text-sm tab:text-lg">
                ✨ USE DISCOUNT & REWARD CODE TO SAVE MONEY ✨
              </h2>
            </span>
            <ul className="mb-8 flex flex-wrap justify-center gap-6 text-2xl font-bold ph:mb-4 ph:gap-2 ph:text-sm tab:mb-6 tab:gap-4 tab:text-lg">
              <li className="inline-block rounded-lg bg-[#F7DFDE] px-4 py-2 shadow-md transition-transform duration-200 hover:scale-105 hover:bg-amber-200">
                <a
                  href="https://www.yesstyle.com/en/home.html?rco=GLOWSHELFIE0&utm_term=GLOWSHELFIE0&utm_medium=Influencer&utm_source=dynamic&mcg=influencer"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YESSTYLE coupon code GLOWSHELFIE0"
                >
                  🛍️ YESSTYLE CODE :{' '}
                </a>
                <h1 className="underline">GLOWSHELFIE0</h1>
              </li>
              <li className="inline-block rounded-lg bg-[#F7DFDE] px-4 py-2 shadow-md transition-transform duration-200 hover:scale-105 hover:bg-amber-200">
                <a
                  href="https://www.yesstyle.com/en/home.html?rco=GLOWSHELFIE0&utm_term=GLOWSHELFIE0&utm_medium=Influencer&utm_source=dynamic&mcg=influencer"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="OLIVE YOUNG coupon code GLOWSHELFIE1"
                >
                  🫒 OLIVE YOUNG CODE :{' '}
                </a>
                <h1 className="underline">GLOWSHELFIE1</h1>
              </li>
              <li className="inline-block rounded-lg bg-[#F7DFDE] px-4 py-2 shadow-md transition-transform duration-200 hover:scale-105 hover:bg-amber-200">
                <a
                  href="https://www.stylevana.com/en_US/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="STYLEVANA coupon code INF10GSHELFIE"
                >
                  💸 STYLEVANA CODE :{' '}
                </a>
                <h1 className="underline">INF10GSHELFIE</h1>
              </li>
              <li className="inline-block rounded-lg bg-[#F7DFDE] px-4 py-2 shadow-md transition-transform duration-200 hover:scale-105 hover:bg-amber-200">
                <a
                  href="https://beautyofjoseon.com/?dt_id=1529790"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="BEAUTY OF JOSEON coupon code GLOWSHELFIE"
                >
                  👸 BEAUTY OF JOSEON CODE :{' '}
                </a>
                <h1 className="underline">GLOWSHELFIE</h1>
              </li>
              <li className="inline-block rounded-lg bg-[#F7DFDE] px-4 py-2 shadow-md transition-transform duration-200 hover:scale-105 hover:bg-amber-200">
                <a
                  href="https://mixsoon.us/?srsltid=AfmBOooqvCdF_ShGTyE2bVQPu_NSeGm1VYANo6DBmlxfFwC39G7qnNY_"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MIXSOON coupon code GLOW10"
                >
                  ✨ MIXSOON CODE :
                </a>{' '}
                <h1 className="underline">GLOW10</h1>
              </li>
            </ul>
            <Result answers={answers} />
            <Button
              className="mt-8 rounded-lg bg-[#F7DFDE] p-3 text-2xl shadow-md transition-transform duration-200 hover:scale-105 hover:bg-amber-200 ph:mt-4 ph:text-sm tab:mt-6 tab:text-lg"
              onClick={handleRestart}
            >
              Restart Quiz
            </Button>
          </div>
        ) : (
          questions[step] && (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="h-4 w-full rounded-full bg-gray-300">
                <div
                  className="transition-width h-4 rounded-full bg-[#F7DFDE] duration-300"
                  style={{ width: `${((step + 1) / questions.length) * 70}%` }}
                />
              </div>
              <div className="my-14 ph:my-6 tab:my-10">
                {questions[step].question}
              </div>
              <div className="my-14 flex flex-wrap justify-center gap-6 ph:my-6 ph:gap-2 tab:my-10 tab:gap-4">
                {questions[step].options.map((option, index) => (
                  <Button
                    key={index}
                    className="rounded-lg bg-[#F7DFDE] px-4 py-2 text-2xl shadow-md transition-transform duration-200 hover:scale-105 hover:bg-amber-200 ph:text-sm tab:text-lg"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {step !== 0 && (
                <Button
                  className="rounded-lg bg-[#F7F0DE] px-3 py-2 text-4xl font-bold transition-transform duration-200 hover:scale-105 hover:bg-amber-200 ph:text-lg tab:text-2xl"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
}
