
import { PollComponent, PollComponentMaster } from './components/Poll'
import { Navbar } from './components/Header/Navbar'

import { Searchbar } from './components/Header'

function App() {


  return (

    <div>
      <section className="text-gray-400 bg-gray-900 body-font overflow-hidden box-border mx-auto my-auto ">
        <Navbar />
        <Searchbar />
        {/* <Votemodal/> */}

  
          <PollComponentMaster/>
          
       
 
      </section>
      
    </div>

  )
}

export default App
