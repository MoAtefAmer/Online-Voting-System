
import { PollComponent, PollComponentMaster } from './components/Poll'
import { Navbar } from './components/Header/Navbar'

import { useGlobalSearchStore } from './store/useGlobalSearchStore'

function App() {



  return (

    <div>
      <section className="text-gray-400 bg-gray-900 body-font overflow-hidden box-border mx-auto my-auto ">
        <Navbar />

          <PollComponentMaster/>
          
       
         {/* <Votemodal/> */}
      </section>
      
    </div>

  )
}

export default App
