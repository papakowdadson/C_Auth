import { useState } from 'react';
import { useMetaMask } from "metamask-react";
import { Modal, Input, Button, Loader, Placeholder } from 'rsuite';
import styled from 'styled-components';
import { ethers } from "ethers";
import { cauth } from "../contract";
import { toast, ToastContainer } from 'react-toastify';

const CustomModal = ({open,handleOpen}) => {
    const [title,setTitle] = useState('');
    const [company,setCompany] = useState('');
    const [amount, setAmount] = useState('');
    const { ethereum } = useMetaMask();

    const reset = () => {
        setTitle('');
        setCompany('');
        setAmount('')
    }

    const handleCreateProject = async() =>{
        if(title.length>0&&company.length>0&&amount.length>0){
            console.log('==============creaating===========');
            console.log('title',title);
            console.log('company',company);
            console.log('amount',amount);
            const _amount =convertString();
            console.log('_amount',_amount);
            if (ethereum) {    
                const provider = new ethers.BrowserProvider(ethereum);
                try {
                    // Get Access to Signer
                    const signer = await provider.getSigner();
                    // Make Function Call
                    await cauth.connect(signer).createProject(company, _amount,title);
                    handleOpen();
                    reset();
                    toast.success("Project Created !", {
                        position: toast.POSITION.TOP_CENTER
                      });
                } catch (error) {
                    toast.error(`${error.reason}`, {
                        position: toast.POSITION.TOP_LEFT
                      });                
                    console.log('My Error',error.reason);
                }     
            }    
        }
        else{
            alert('complete the form');
        }
    }

    const convertString= ()=>{
           return amount;
    }

  return (
    <>
      <ModalWrapper/>
        <Modal
            open={open}
            onClose={handleOpen}  
        >
            <Modal.Header>
            <Modal.Title>Create project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form action="">
                <label htmlFor="title">Title</label>
                <Input value={title} type='text' name='title' onChange={(e)=>setTitle(e)} />
                <label htmlFor="company">Company</label>
                <Input value={company} type='text'  name='company' onChange={(e)=>setCompany(e)} />
                <label htmlFor="amount">Amount</label>
                <Input value={amount} type='number'  name='amount' onChange={(e)=>setAmount(e)} />
            </form>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={handleCreateProject} appearance="primary">
                Create
            </Button>
            </Modal.Footer>
        </Modal>
      <ModalWrapper/>
    </>
  );
};

const ModalWrapper= styled.div`
display:flex;
place-items:center;
margin-top:300px;
justify-content:center;
`

export default CustomModal;

