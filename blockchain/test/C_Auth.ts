// Import necessary dependencies
// const { expect } = require("chai");
// const { ethers } = require("hardhat");
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("cauth", function () {
 
  describe('Create Project',function(){
    async function deployVotingFixture() {
        // Contracts are deployed using the first voter/account by default
        const [creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company ] = await ethers.getSigners();

        const cauthContract = await ethers.getContractFactory("CAuth");
        const cauth = await cauthContract.deploy();


        return { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company };
    }

        it('should create project',async function(){
            const { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company } = await loadFixture(deployVotingFixture);

            const _title = '1';
            const _company = company.address;
            const _amount = BigInt(1);
            await cauth.connect(creator).createProject(_company,_amount,_title);

            const projects = await cauth.getAllProjects();
            expect(projects.length).to.equal(1);
            expect(projects[0].title).to.equal(_title);
            expect(projects[0].paymentAmount).to.equal(_amount);
            await expect( cauth.connect(creator).createProject(_company,_amount,_title)).to.emit(cauth,'createProjectEvent').withArgs(_company, _title);
        });

  });

  describe('Approve project',function(){
    async function deployVotingFixture() {
        // Contracts are deployed using the first voter/account by default
        const [creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company ] = await ethers.getSigners();

        const cauthContract = await ethers.getContractFactory("CAuth");
        const cauth = await cauthContract.deploy();


        return { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company };
    }
   
    it('should revert already been awarded',async function(){
            const _title = '1';
            const { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company } = await loadFixture(deployVotingFixture);

            const _company = company.address;
            const _amount = 1;
            await cauth.connect(creator).createProject(_company,_amount,_title);
            const projects = await cauth.getAllProjects();
            const _Id = projects[0].id;

        // Ensure the operator is not approved
        await cauth.connect(citizen).approveProject(_Id);
        await cauth.connect(citizen1).approveProject(_Id);
        await cauth.connect(citizen2).approveProject(_Id);
        // await cauth.connect(comp).approveProject(_Id);

        expect(cauth.connect(citizen3).approveProject(_Id)).to.be.revertedWith('Project has already been awarded');
    });

    it('should revert creator cannot approve',async function(){
        const { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company } = await loadFixture(deployVotingFixture);

            const _title = '1';
            const _company = company.address;
            const _amount = 1;
            await cauth.connect(creator).createProject(_company,_amount,_title);
            const projects = await cauth.getAllProjects();
            const _Id = projects[0].id;
        // Ensure the operator is not approved
        expect(cauth.connect(creator).approveProject(_Id)).to.be.revertedWith("The creator cannot approve");
    }),

    it('should revert already approved this project',async function(){
        const { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company } = await loadFixture(deployVotingFixture);

            const _title = '1';
            const _company = company.address;
            const _amount = 1;
            await cauth.connect(creator).createProject(_company,_amount,_title);
            const projects = await cauth.getAllProjects();
            const _Id = projects[0].id;
        // Ensure the operator is not approved
        await cauth.connect(citizen).approveProject(_Id);
        expect(cauth.connect(citizen).approveProject(_Id)).to.be.revertedWith("You have already approved this project");
    }),

    it('should approve',async function(){
        const { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company } = await loadFixture(deployVotingFixture);

        
            const _title = '1';
            const _company = company.address;
            const _amount = 1;
            await cauth.connect(creator).createProject(_company,_amount,_title);
            const projects = await cauth.getAllProjects();
            const _Id = projects[0].id;
        //     await cauth.connect(citizen).approveProject(_Id);
        //     const projects1 = await cauth.getAllProjects();
        //     console.log('count',projects1[0].approvalCount);
        // // Ensure the operator is not approved
        // // const approvedProject = await cauth.projects1(_Id);
        // expect(projects1[0].approvalCount).to.equal(1);
        await expect( await cauth.connect(citizen).approveProject(_Id)).to.emit(cauth,"approveProjectEvent").withArgs(_Id);
    });

  });

  describe('Review Project',function(){
    async function deployVotingFixture() {
        // Contracts are deployed using the first voter/account by default
        const [creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company ] = await ethers.getSigners();

        const cauthContract = await ethers.getContractFactory("CAuth");
        const cauth = await cauthContract.deploy();


        return { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company };
    }
    
    it('should revert not awarded yet',async function(){
    const { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company } = await loadFixture(deployVotingFixture);

        const _title = '1';
        const _company = company.address;
        const _amount = 1;
        await cauth.connect(creator).createProject(_company,_amount,_title);
        const projects = await cauth.getAllProjects();
        const _Id = projects[0].id;
        expect(cauth.connect(citizen).reviewProject(_Id)).to.be.revertedWith("Project has not been awarded yet")
    }),
    it('should revert creator cannot review',async function(){
        const { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company } = await loadFixture(deployVotingFixture);

            const _title = '1';
            const _company = company.address;
            const _amount = 1;
            await cauth.connect(creator).createProject(_company,_amount,_title);
            const projects = await cauth.getAllProjects();
            const _Id = projects[0].id;
        // Ensure the operator is not approved
        await cauth.connect(citizen).approveProject(_Id);
        await cauth.connect(citizen1).approveProject(_Id);
        await cauth.connect(citizen2).approveProject(_Id);
        expect(cauth.connect(creator).reviewProject(_Id)).to.be.revertedWith("The creator cannot review");
    }),
    it('should revert reviewed this project',async function(){
        const { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company } = await loadFixture(deployVotingFixture);

            const _title = '1';
            const _company = company.address;
            const _amount = 1;
            await cauth.connect(creator).createProject(_company,_amount,_title);
            const projects = await cauth.getAllProjects();
            const _Id = projects[0].id;
        // Ensure the operator is not approved
        await cauth.connect(citizen).approveProject(_Id);
        await cauth.connect(citizen1).approveProject(_Id);
        await cauth.connect(citizen2).approveProject(_Id);
        await cauth.connect(citizen3).reviewProject(_Id)
        expect(cauth.connect(citizen3).reviewProject(_Id)).to.be.revertedWith("You have already reviewed this project");
    });
    it('should review this project',async function(){
        const { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company } = await loadFixture(deployVotingFixture);

            const _title = '1';
            const _company = company.address;
            const _amount = 1;
            await cauth.connect(creator).createProject(_company,_amount,_title);
            const projects = await cauth.getAllProjects();
            const _Id = projects[0].id;
        // Ensure the operator is not approved
        await cauth.connect(citizen).approveProject(_Id);
        await cauth.connect(citizen1).approveProject(_Id);
        await cauth.connect(citizen2).approveProject(_Id);
        await expect( await cauth.connect(citizen3).reviewProject(_Id)).to.emit(cauth,"reviewProjectEvent").withArgs(_Id);
    });

     it("Should review a project and Insufficient contract balance", async function () {
    const { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company } = await loadFixture(deployVotingFixture);

        const paymentAmount = 1;
    
        await cauth.connect(creator).createProject(company.address, paymentAmount, "Test Project");
        const projects = await cauth.getAllProjects();
        const projectId = projects[0].id;
            // Simulate project completion by approving the project three times

        await cauth.connect(citizen).approveProject(projectId);
    
        await cauth.connect(citizen1).approveProject(projectId);
        await cauth.connect(citizen2).approveProject(projectId);
    
        await cauth.connect(citizen).reviewProject(projectId);
    
        const reviewedProject = await cauth.projects(projectId);
        expect(reviewedProject.reviewCount).to.equal(1);
    
        const user2BalanceBefore = await ethers.provider.getBalance(creator.address);
    
        // Simulate two more reviews to trigger payment
        await cauth.connect(citizen1).reviewProject(projectId);
        expect(cauth.connect(citizen2).reviewProject(projectId)).to.be.revertedWith("Insufficient contract balance");
    
        const user2BalanceAfter = await ethers.provider.getBalance(creator.address);
    
        // const projectPaid = await cauth.projects(projectId);
        // expect(projectPaid.paid).to.equal(true);
        // expect(user2BalanceAfter.sub(user2BalanceBefore)).to.equal(paymentAmount);
      });

      it('should get balance',async function(){
        const { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company } = await loadFixture(deployVotingFixture);

        const balance2 = await cauth.connect(creator).getContractBalance()

        expect( balance2).to.equal(0);
    });
    it('should get balance only owner',async function(){
        const { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company } = await loadFixture(deployVotingFixture);

            const _title = '1';
            const _company = company.address;
            const _amount = 1;
            const balance1 = await cauth.connect(creator).getContractBalance()
            await cauth.connect(creator).createProject(_company,_amount,_title);
            await cauth.connect(creator).createProject(_company,_amount,_title);
            await cauth.connect(creator).createProject(_company,_amount,_title);

            const projects = await cauth.getAllProjects();
            const _Id = projects[0].id;
        // Ensure the operator is not approved
        await cauth.connect(citizen).approveProject(_Id);
        await cauth.connect(citizen1).approveProject(_Id);
        await cauth.connect(citizen2).approveProject(_Id);
        await cauth.connect(citizen1).reviewProject(_Id);

        expect(cauth.connect(citizen1).getContractBalance()
        ).to.be.rejectedWith('Only the owner can call this function');
    });

    it("Should review a project and transfer", async function () {
        const { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company } = await loadFixture(deployVotingFixture);
    
            const paymentAmount = 1;
        
            await cauth.connect(creator).createProject(company.address, paymentAmount, "Test Project");
            const projects = await cauth.getAllProjects();
            const projectId = projects[0].id;
                // Simulate project completion by approving the project three times
    
            await cauth.connect(citizen).approveProject(projectId);
        
            await cauth.connect(citizen1).approveProject(projectId);
            await cauth.connect(citizen2).approveProject(projectId);
        
            await cauth.connect(citizen).reviewProject(projectId);
        
            const reviewedProject = await cauth.projects(projectId);
            expect(reviewedProject.reviewCount).to.equal(1);
        
            const user2BalanceBefore = await ethers.provider.getBalance(creator.address);
        
            // Simulate two more reviews to trigger payment
            await cauth.connect(citizen1).reviewProject(projectId);
            await cauth.connect(citizen2).reviewProject(projectId);
        
            const user2BalanceAfter = await ethers.provider.getBalance(creator.address);
        
            const projectPaid = await cauth.projects(projectId);
            expect(projectPaid.paid).to.equal(true);
            expect(user2BalanceAfter).to.lessThan(user2BalanceBefore);
          });


  });

  describe('All project',function(){
    async function deployVotingFixture() {
        // Contracts are deployed using the first voter/account by default
        const [creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company ] = await ethers.getSigners();

        const cauthContract = await ethers.getContractFactory("CAuth");
        const cauth = await cauthContract.deploy();


        return { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company };
    }
    it('all project ever created',async function(){
        const { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company } = await loadFixture(deployVotingFixture);

        const _title = '1';
        const _company = company.address;
        const _amount = 1;
        await cauth.connect(creator).createProject(_company,_amount,_title);
        const _projects=await cauth.connect(citizen).getAllProjects();
        expect(_projects.length).to.be.not.equal(0);
    })

  });

  describe('Users project',function(){
    async function deployVotingFixture() {
        // Contracts are deployed using the first voter/account by default
        const [creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company ] = await ethers.getSigners();

        const cauthContract = await ethers.getContractFactory("CAuth");
        const cauth = await cauthContract.deploy();


        return { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company };
    }
    it('all project ever created by user',async function(){
        const { cauth, creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company } = await loadFixture(deployVotingFixture);

        const _title = '1';
        const _company = company.address;
        const _amount = 1;
        await cauth.connect(creator).createProject(_company,_amount,_title);
        await cauth.connect(creator).createProject(_company,_amount,_title);
        await cauth.connect(creator).createProject(_company,_amount,_title);
        const _projects = await cauth.connect(creator).getUserProjects(creator.address);
        expect(_projects.length).to.be.not.equal(0)
    });
  })



  // Add more test cases for other functions and edge cases as needed
})

