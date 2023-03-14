
import { Modal, Button, DarkThemeToggle, } from "flowbite-react"
import { useState } from "react"
import { Emailsubmission } from "./Emailsubmission";
import { Otpsubmission } from "./Otpsubmission";



export function Votemodal() {

    const [open, setOpen] = useState(false)

    const onClick = () => {
  
        setOpen(!open)
    }


    return (
        <>
            <Button onClick={onClick}>
                Toggle modal
            </Button>
            <Modal
                show={open}
                onClose={onClick}

            >
                <Modal.Header className="bg-gray-900 ">
                    <span className="text-gray-400"> Vote Submission</span>

                </Modal.Header>
                <Modal.Body className="bg-gray-900">
                 <Emailsubmission/>
                </Modal.Body>
                <Modal.Footer className="bg-gray-900">
                <Otpsubmission/>
                </Modal.Footer>
            </Modal>
        </>
    )
}
