import { useMetaMask } from "metamask-react";
import {styled} from 'styled-components';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Button} from 'rsuite'
import './App.css';
import AddEC from "./pages/AddEC";
import AddVoter from "./pages/AddVoter";
import AddCandidate from "./pages/AddCandidate";
import Vote from "./pages/Vote";
import Landingpage from "./pages/LandingPage";
import ApprovalPage from "./pages/ApprovalPage";
import ReviewPage from "./pages/ReviewPage";

function App() {
  const { status, connect, account, chainId } = useMetaMask();

  if (status === "initializing") return <CenterWrapper>Synchronisation with MetaMask ongoing...</CenterWrapper>

  if (status === "unavailable") return <CenterWrapper>MetaMask not available :</CenterWrapper>

  if (status === "notConnected") return <CenterWrapper><Button appearance="primary" color="blue" onClick={connect}>Connect to MetaMask</Button></CenterWrapper>

  if (status === "connecting") return <CenterWrapper>Connecting...</CenterWrapper>

  if (status === "connected") return (
    
      <Router>
                  <HeadlineWraper>Connected account <strong>{account}</strong> on chain ID <strong>{chainId}</strong></HeadlineWraper>
          <Routes>
            <Route path="/" element={<Landingpage/>}/>
            <Route path="/approval" element={<ApprovalPage/>}/>
            <Route path="/review" element={<ReviewPage/>}/>

          </Routes>
            {/* Import Add EC Page
            <hr />
            <h3>Add EC</h3> */}
            {/* <AddEC /> */}
            {/* <hr />
            <h3>Add Voter</h3>
            <AddVoter />
            <hr />
            <h3>Add Candidate</h3>
            <AddCandidate />
            <hr />
            <h3>Vote</h3>
            <Vote />
            <br /><br /><br /> */}
      </Router>
  )

  return null;
}

const CenterWrapper =  styled.div`
border:2px solid yellow;
position:absolute;
left:50%;
top:50%;
`
const HeadlineWraper = styled.div`
z-index:9999;
postion:absolute;
background-color:#BCE8FF;
padding:5px;
text-align:center;

`

export default App;
