// import Thread from 'components/Thread'
import React from 'react'
import Thread from '../components/Thread'

function Home() {
  return (
    <>
    {
        [1,2,3,4].map(index=><Thread key={index} />)
    }
    </>
  )
}
export default Home
