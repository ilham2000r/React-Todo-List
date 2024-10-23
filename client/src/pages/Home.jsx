import React from 'react'
import Title from '../components/Title'
import InputBox from '../components/InputBox'
import TodoList from '../components/TodoList'


const Home = () => {
  return (
      <div className='bg-white place-self-center  w-11/12 max-w-md flex flex-col p-7 min-h-[550px] max-h-[300px] min-w-[500px] rounded-xl'>
        <Title />
        <InputBox />
        <TodoList />
      </div>
  )
}

export default Home