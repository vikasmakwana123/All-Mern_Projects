import React from 'react'
import Music_player from '../components/Music_player'
import MusicList from '../components/MusicList'

const HomePage = () => {
  return (
   <div className='flex flex-wrap-reverse lg:flex-nowrap gap-4 justify-center items-start p-4 md:p-8 bg-black min-h-screen'>
<MusicList/>
<Music_player/>
</div>
  )
}

export default HomePage