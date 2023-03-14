import { PollComponent, PollComponentMaster } from './components/Poll';
import { Navbar } from './components/Header/Navbar';

import { useStore } from './store/useStore';
import { Votemodal } from './components/Vote/Votemodal';
import { useQueryClient } from 'react-query';

function App() {
  const queryClient = useQueryClient();

  return (
    <div>
      <section className='text-gray-400 bg-gray-900 body-font overflow-hidden box-border mx-auto my-auto '>
        <Navbar />
        <Votemodal queryClient={queryClient} />
        <PollComponentMaster queryClient={queryClient} />
      </section>
    </div>
  );
}

export default App;
