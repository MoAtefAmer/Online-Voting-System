import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { PollComponent } from './components'
import { Navbar } from './components/Header/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <Navbar/> */}
      <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
        <Navbar/>
        <div className="container px-5 py-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-800">
          <PollComponent/>
          <PollComponent/>
          <PollComponent/>



          </div>
        </div>
      </section>
    </div>
  )
}

export default App
