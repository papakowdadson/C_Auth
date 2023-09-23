import React from "react";
import styled from "styled-components";
import { Button } from "rsuite";
import logob from "../assets/logob.png";
import logoblue from "../assets/logoblue.png";

import Features from "../components/Features";
import { useNavigate } from "react-router-dom";
import GearIcon from '@rsuite/icons/Gear';
import {FaCommentDollar,FaCheckDouble,} from 'react-icons/fa';
import CustomModal from "../components/Modal";


const Landingpage = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    
  return (
    <>
      <BackgroundImageContainer></BackgroundImageContainer>

      <div>
        <img src={logob} alt="logo" width={82} />
      </div>
      <HeaderContainer>
        <div style={{marginLeft:'35px'}}>
          <HeaderTitle>Be A Citizen</HeaderTitle>
          <HeaderTitle>Not A Spectator</HeaderTitle>
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <Button onClick={handleOpen} >Create Project</Button>
            <Button onClick={()=>navigate('/approval')}>Approve Project</Button>
            <Button onClick={()=>navigate('/review')} >Review Project</Button>
          </div>
        </div>
        <div>
        <img src={logoblue} alt="logo" width={220} />
      </div>
      </HeaderContainer>

      <FeatureContainer>
        <p style={{fontWeight:'bold'}}>App Features</p>

        <FeatureWrapper>
          <Features title={'Create'} description={'Authorities, operators and individuals can create a project'} ><GearIcon spin style={{ fontSize: '2em' }} /></Features>
          <Features title={'Approve'} description={'The General Public is given the power to approve the awarded company'} ><FaCommentDollar size={32}/></Features>
          <Features title={'Review'} description={'Upon Completion of project citizens Review project to process Payment'} ><FaCheckDouble size={32}/></Features>
        </FeatureWrapper>
      </FeatureContainer>
      {open&&<CustomModal open={open} handleOpen={handleOpen}/>}
    </>
  );
};

const HeaderContainer = styled.div`
  padding: 10px;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
`;
const HeaderTitle = styled.p`
  color: white;
  font-size: 1.5em;
  margin: 2px;
`;

const BackgroundImageContainer = styled.div`
  background-color: #10a7f7;
  border-radius:30px;
  transform: rotate(45deg);
  width: 55rem;
  height: 55rem;
  top: -450px;
  position: absolute;
  z-index: -1;
  @media (max-width: 1100px) {
    transform: rotate(0deg);
  width: 100vw;
  height: 35rem;
  top: -285px;
  position: absolute;
  z-index: -1;
    }
`;

const FeatureWrapper = styled.div`
  display: flex;
  gap:5px;
`;

const FeatureContainer = styled.div`
  float: right;
  text-align:center;
  margin-top:20px;
  margin-right:10px;
`;

export default Landingpage;
