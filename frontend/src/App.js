import { useMetaMask } from "metamask-react";
import { styled } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from "rsuite";
import "./App.css";
import Landingpage from "./pages/LandingPage";
import ApprovalPage from "./pages/ApprovalPage";
import ReviewPage from "./pages/ReviewPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logoblue from "./assets/logoblue.png";

function App() {
  const { status, connect, account, chainId } = useMetaMask();

  if (status === "initializing")
    return (
      <>
        <FlexWrapper>
          <ImageHolderWrapper>
            <p> #Join Hands let's Fight Corruption</p>
          </ImageHolderWrapper>
          <CenterWrapper>
            <img src={logoblue} alt="" width={150} />
            <p> Synchronisation with MetaMask ongoing...</p>
          </CenterWrapper>
        </FlexWrapper>
      </>
    );

  if (status === "unavailable")
    return (
      <>
        <FlexWrapper>
          <ImageHolderWrapper>
            <p> #Join Hands let's Fight Corruption</p>
          </ImageHolderWrapper>
          <CenterWrapper>
            <img src={logoblue} alt="" width={150} />
            <p>MetaMask not available :</p>
          </CenterWrapper>
        </FlexWrapper>
      </>
    );

  if (status === "notConnected")
    return (
      <>
        <FlexWrapper>
          <ImageHolderWrapper>
            <p style={{}}>#Power to the People</p>
          </ImageHolderWrapper>
          <CenterWrapper>
            <img src={logoblue} alt="" width={150} />
            <p style={{ fontWeight: "bold" }}>Connect to MetaMask</p>
            <Button appearance="primary" color="blue" onClick={connect}>
              Connect to MetaMask
            </Button>
          </CenterWrapper>
        </FlexWrapper>
      </>
    );

  if (status === "connecting")
    return (
      <>
        <FlexWrapper>
          <ImageHolderWrapper>
            <p> #Join Hands let's Fight Corruption</p>
          </ImageHolderWrapper>
          <CenterWrapper>
            <img src={logoblue} alt="" width={150} />
            Connecting...
          </CenterWrapper>
        </FlexWrapper>
      </>
    );

  if (status === "connected")
    return (
      <Router>
        <ToastContainer />
        <HeadlineWraper>
          Connected account <strong>{account}</strong> on chain ID{" "}
          <strong>{chainId}</strong>
        </HeadlineWraper>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/approval" element={<ApprovalPage />} />
          <Route path="/review" element={<ReviewPage />} />
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
    );

}

const CenterWrapper = styled.div`
  position: relative;
  margin: auto;
`;
const HeadlineWraper = styled.div`
  z-index: 9999;
  postion: absolute;
  background-color: #bce8ff;
  padding: 5px;
  text-align: center;
`;
const FlexWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  width: 100vw;
  height: 100vh;
`;

const ImageHolderWrapper = styled.div`
  background-image: url("../oc.jpg");
  background-size: cover;
  mix-blend-mode: multiply;
  text-align: center;
  background-color: #1aa7ec;
  background-blend-mode: multiply;
  border-radius: 0px 30px 30px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  place-items: center;
  font-size: 2em;
  font-weight: bold;
  color: white;
`;

export default App;
