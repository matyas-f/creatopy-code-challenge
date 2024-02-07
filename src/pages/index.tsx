import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { classNames } from '@/utils/class-names'
import CreatopyLogoImage from '@/../public/creatopy-logo.png'

const HomePage = () => {
  const [searchInputValue, setSearchInputValue] = useState('')

  return (
    <main className="flex flex-col items-center h-full px-6 py-20 font-sans bg-gradient-to-b from-indigo-50 to-indigo-200">
      <Image
        src={CreatopyLogoImage}
        alt="Creatopy Logo"
        width={180}
        placeholder="empty"
        // Added a whole number height explicitly because without this the implicit height is a decimal number and it causes a minor CLS issue
        className="h-[75px]"
      />
      <div className="h-4" />
      <h1 className="text-5xl font-semibold text-center text-gray-800">
        Code Challenge
      </h1>
      <div className="h-6" />
      <h4 className="max-w-md text-lg text-center text-gray-600">
        Enter a banner hash from the{' '}
        <a href="https://app.creatopy.com" className="link">
          Creatopy
        </a>{' '}
        app to see a more naive server-side rendered version of it that can only
        render <b className="font-semibold">texts, buttons</b> and{' '}
        <b className="font-semibold">images</b> with many missing features
      </h4>
      <div className="h-8" />
      <div className="flex">
        {/* Could add 'Enter' as a hotkey to trigger the navigation to the banner while the input is focused */}
        <input
          className="mr-3 input"
          type="text"
          value={searchInputValue}
          onChange={(event) => setSearchInputValue(event.target.value)}
          placeholder="Enter hash here"
        />
        <Link
          href={{
            pathname: '/banner/[hash]',
            query: { hash: searchInputValue },
          }}
          className={classNames('button', {
            disabled: !searchInputValue,
          })}
        >
          Go
        </Link>
      </div>
      <div className="h-8" />
      <Link
        href={{
          pathname: '/banner/[hash]',
          query: { hash: 'j2308jq' },
        }}
        className="text-lg link"
      >
        See example
      </Link>
    </main>
  )
}

export default HomePage
