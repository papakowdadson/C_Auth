import React,{useEffect,useState} from "react";
import styled from "styled-components";
import CustomTable from "../components/customTable";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";
import { cauth } from "../contract";
import { toast} from 'react-toastify';

const ApprovalPage = () => {
    const { ethereum } = useMetaMask();
  const [data, setData] = useState([]);
  const [localApprovalTracker, setLocalApprovalTracker] = useState([]);
  const [approved, setApproved] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (ethereum) {
      // Get Access to Signer
      const provider = new ethers.BrowserProvider(ethereum);
      try {
        const signer = await provider.getSigner();
      // Make Function Call
      const projects = await cauth.connect(signer).getAllProjects();
      
      
      if (projects.length>0) {
        console.log("====================My request===========");

        console.log("mydata", projects[0].approvalCount);
        setData(projects);
        setApproved(() =>
          projects.filter((myRequest) => myRequest.awarded == false)
        );
        setLoading(!loading);
      }
      } catch (error) {
        console.log('Approval error',error);
      }

      
    }
  };

  const approveProject = async (_id) => {
    console.log('============myapproveProject===============');
    console.log('id',_id);
    if (ethereum) {
      // Get Access to Signer
      const provider = new ethers.BrowserProvider(ethereum);
      try {
        const signer = await provider.getSigner();
      // Make Function Call
      const projects = await cauth.connect(signer).approveProject(_id);
      toast.success("Approved", {
        position: toast.POSITION.TOP_CENTER
      });
      setLocalApprovalTracker(()=>[...localApprovalTracker,_id])
      
      } catch (error) {
        toast.error(`${error.reason}`, {
          position: toast.POSITION.TOP_LEFT
        });
        console.log('Approval error',error.reason);
      }  
    }
  };

  return (
    <MyDashboard>
      <DashboardHeading> Welcome to Citizen's Approval</DashboardHeading>
      <p>Approve project to be awarded to assigned comapny</p>

      {loading ? (
        <p style={{ textAlign: "center", marginTop: "10px" }}>loading....</p>
      ) : data.length > 0 ? (
        <>
          <DashboardContainer>
            <DashboardTitle>My approvals</DashboardTitle>
            <CustomTable data={approved} myFunction={approveProject} loading={loading} actionText={'Approve'} localTracker={localApprovalTracker} />
          </DashboardContainer>
        </>
      ) : (
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          No data Recorded
        </p>
      )}
    </MyDashboard>
  );
};

const MyDashboard = styled.div`
  text-align: center;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;
const DashboardContainer = styled.div`
  border: 1px solid black;
  display: block;
  margin: auto;
  margin-top: 10px;
  border-radius: 15px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const DashboardHeading = styled.p`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  margin-top: 5px;
`;

const DashboardTitle = styled.p`
  font-weight: bold;
  font-size: 14px;
  text-align: left;
  margin-top: 5px;
`;

export default ApprovalPage;
