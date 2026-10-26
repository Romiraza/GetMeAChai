import Paymentpage from '@/component/Paymentpage'
import React from 'react'
import { notFound } from 'next/navigation'
import { fetchuser } from '@/actions/useraction'



const Username = async ({ params, searchParams }) => {
  const { username } = await params
  const { payment } = await searchParams

  // Agar username database mein nahi hai to 404 page dikhao
  const user = await fetchuser(username)
  if (!user) {
    return notFound()
  }

  return (
    <>
      <Paymentpage username={username} payment={payment} />
    </>
  )
}


export default Username

export async function generateMetadata({ params }) {
  return {
    title: `Welcome - Get Me A Chai`,
  }
}
