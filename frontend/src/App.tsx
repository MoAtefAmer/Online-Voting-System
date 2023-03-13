import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { PollComponent } from './components/Poll'
import { Navbar } from './components/Header/Navbar'
import { Paginator } from './components/Pagination/Paginator'
import { Searchbar } from './components/Header'
import {  Votemodal } from './components/Vote'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <section className="text-gray-400 bg-gray-900 body-font overflow-hidden box-border mx-auto my-auto ">
        <Navbar/>
       <Searchbar/>
       {/* <Votemodal/> */}
        <div className="container px-5 py-24 mx-auto">
          
          <div className="-my-8 divide-y-2 divide-gray-800">
          <PollComponent/>
          <PollComponent/>
          <PollComponent/>
         
          <Paginator/>


          </div>
        </div>
      </section>
    </div>
  )
}

export default App
