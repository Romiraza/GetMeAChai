import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900  text-white w-full min-h-13 px-3 sm:px-4 py-3 flex justify-center items-center">

      <p className="text-center text-xs sm:text-sm md:text-base leading-relaxed">
        Copyright &copy; {currentYear} Get Me A Chai - All rights reserved.
      </p>

    </footer>
  )
}

export default Footer