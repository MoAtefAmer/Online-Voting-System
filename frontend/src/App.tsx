import { PollComponent, PollComponentMaster } from './components/Poll';
import { Navbar } from './components/Header/Navbar';


import { Votemodal } from './components/Vote/Votemodal';
import { useQueryClient } from 'react-query';
import { Snackbar } from './components/Snackbar';


function App() {
  const queryClient = useQueryClient();


  return (
    <div>
      <section className='text-gray-400 bg-gray-900 body-font overflow-hidden box-border mx-auto my-auto '>
        <Navbar />
        <Votemodal queryClient={queryClient} />
        <PollComponentMaster queryClient={queryClient} />
        <Snackbar/>
      </section>

   
    </div>
  );
}

export default App;
