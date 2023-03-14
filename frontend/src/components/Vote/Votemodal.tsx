import { Modal, Button, DarkThemeToggle } from 'flowbite-react';
import { useState } from 'react';
import { Emailsubmission } from './Emailsubmission';
import { Otpsubmission } from './Otpsubmission';
import { useStore } from '../../store/useStore';

interface VotemodalProps {
  queryClient: any;
}

export function Votemodal({ queryClient }: VotemodalProps) {

  const{showModal, openModal} = useStore()


  const onClick = async () => {
    // setOpen(showModal);
    // setOffset(0);
    // setSearchQuery('');
    openModal(false);

    await queryClient.invalidateQueries({

      queryKey: ['polls'],

    
    });
  };

  return (
    <>
      <Modal show={showModal}  onClose={onClick}>
        <Modal.Header className='bg-gray-900 '>
          <span className='text-gray-400'> Vote Submission</span>
        </Modal.Header>
        <Modal.Body className='bg-gray-900 '>
          <Emailsubmission />
        </Modal.Body>
        <Modal.Footer className='bg-gray-900'>
          <Otpsubmission queryClient={queryClient} />
        </Modal.Footer>
      </Modal>
    </>
  );
}
