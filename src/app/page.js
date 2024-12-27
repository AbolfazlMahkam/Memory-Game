'use client'

import React from 'react'
import Card from './component/card'

export default function Home () {
  return (
    <div className='relative text-center p-10'>
      <h1 className='font-bold text-3xl text-slate-900'>Memory game</h1>
      <Card />
    </div>
  )
}
