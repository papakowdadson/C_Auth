import React,{useEffect,useState} from "react";
import styled from "styled-components";
import CustomTable from "../components/customTable";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";
import { cauth } from "../contract";


const ReviewPage = () =>{

    const { ethereum } = useMetaMask();
    const [data, setData] = useState([]);
    const [review, setReview] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      if (ethereum) {
        // Get Access to Signer
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        // Make Function Call
        const projects = await cauth.connect(signer).getAllProjects();
        if (projects.length>0) {
          console.log("====================My request===========");
  
          console.log("mydata", projects[0].awarded);
          setData(projects);
          setReview(() =>
            projects.filter((myRequest) => myRequest.awarded == true)
          );
          setLoading(!loading);
        }
      }
    };

    const myReviewProject = async (_id) => {
      console.log('============myreviewProject===============');
      console.log('id',_id);
      if (ethereum) {
        // Get Access to Signer
        const provider = new ethers.BrowserProvider(ethereum);
        try {
          const signer = await provider.getSigner();
        // Make Function Call
        const projects = await cauth.connect(signer).reviewProject(_id);
        
        } catch (error) {
          console.log('Approval error',error);
        }  
      }
    };

    return (
      <MyDashboard>
        <DashboardHeading> Welcome to Reviews</DashboardHeading>
        {loading ? (
          <p style={{ textAlign: "center", marginTop: "10px" }}>loading....</p>
        ) : data.length > 0 ? (
          <>
            <DashboardContainer>
              <DashboardTitle>Review Request</DashboardTitle>
              <CustomTable data={review} myFunction={myReviewProject} loading={loading} actionText={'Review'} />
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
    margin-top: 80px;
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

export default ReviewPage;