// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CAuth {
    address public owner;
    uint256 public projectIdCounter;

    mapping(uint256=>mapping(address => bool)) approvals;
    mapping(uint256=>mapping(address => bool)) reviews;

    struct Project {
        uint256 id;
        address creator;
        address company;
        uint256 approvalCount;
        uint256 reviewCount;
        bool awarded;
        uint256 paymentAmount;
        bool paid;
        string title;
       
    }

    

    mapping(uint256 => Project) public projects;
    mapping(address => uint256[]) public userProjects;

    event createProjectEvent(address _company, uint256 _paymentAmount);
    event approveProjectEvent(uint256 _projectId);
    event reviewProjectEvent(uint256 _projectId);

    uint[] private lengthTracker;

    constructor() {
        owner = msg.sender;
        projectIdCounter = lengthTracker.length;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function createProject(address _company, uint256 _paymentAmount, string memory _title) external {
        projects[projectIdCounter] = Project(
            projectIdCounter,
            msg.sender,
            _company,
            0,
            0,
            false,
            _paymentAmount,
            false,
            _title
            
        );
        approvals[projectIdCounter][msg.sender]=false;
        reviews[projectIdCounter][msg.sender]=false;

        userProjects[msg.sender].push(projectIdCounter);
        lengthTracker.push(projectIdCounter);
        projectIdCounter++;
        emit createProjectEvent(_company,_paymentAmount);
    
    }

    function approveProject(uint256 _projectId) external {
        Project storage project = projects[_projectId];
        require(project.creator != address(0), "Project does not exist");
        require(!project.awarded, "Project has already been awarded");
        require(msg.sender != project.creator, "The creator cannot approve");
        require(!approvals[_projectId][msg.sender], "You have already approved this project");

        approvals[_projectId][msg.sender] = true;
        project.approvalCount++;

        emit approveProjectEvent(_projectId);

        if (project.approvalCount >= 3) {
            project.awarded = true;
        }

    }

    function reviewProject(uint256 _projectId) external {
        Project storage project = projects[_projectId];
        require(project.creator != address(0), "Project does not exist");
        require(project.awarded, "Project has not been awarded yet");
        require(msg.sender != project.creator, "The creator cannot review");
        require(!reviews[_projectId][msg.sender], "You have already reviewed this project");

        reviews[_projectId][msg.sender] = true;
        project.reviewCount++;

        emit reviewProjectEvent(_projectId);

        if (project.reviewCount >= 3 && project.paid ==false) {
            // Transfer funds from the project creator to the company's wallet
            require(address(this).balance >= project.paymentAmount, "Insufficient contract balance");
            payable(project.company).transfer(project.paymentAmount);
            project.paid = true;
        }


    }

    function getAllProjects() external view returns (Project[] memory) {
        Project[] memory allProjects = new Project[](projectIdCounter);
        for (uint256 i = 0; i < projectIdCounter; i++) {
            allProjects[i] = projects[i];
        }
        return allProjects;
    }

    receive() external payable {}

    function getContractBalance() external view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function getUserProjects(address _user) external view returns (uint256[] memory) {
        return userProjects[_user];
    }
}
