// Import necessary dependencies
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("cauth", function () {
  let creator: { address: any; };
  let citizen: { address: any; };
  let citizen1: { address: any; };
  let citizen2: { address: any; };
  let citizen3: { address: any; };
  let citizen4: { address: any; };
  let citizen5: { address: any; };
  let citizen6: { address: any; };
  let company:{address:any;};
  let cauth: { connect: (arg0: { address: any; }) => {
      [x: string]: any; (): any; new(): any; createProject: { (arg0: any, arg1: any, arg2: string): any; new(): any; }; 
    }; };


  before(async function () {
    [creator, citizen,citizen1,citizen2,citizen3,citizen4,citizen5,citizen6, company ] = await ethers.getSigners();
    const CauthContract = await ethers.getContractFactory("CAuth");
    cauth = await CauthContract.deploy();
  });

  describe('Create Project',function(){
        it('should create project',async function(){
            const _title = '1';
            const _company = company.address;
            const _amount = BigInt(1);
            await expect( cauth.connect(creator).createProject(_company,_amount,_title)).to.emit(cauth,'createProjectEvent').withArgs(_company, _title);
        });

  });

  describe('Approve project',function(){
    it('should revert approve to default address',async function(){
            const _Id = 0;
            const _title = '1';
            const _company = company.address;
            const _amount = 1;
            const defaultAddress = {address:"0x0000000000000000000000000000000000000000"};
            await cauth.connect(defaultAddress).createProject(_company,_amount,_title);
            await expect( await cauth.connect(citizen).approveProject(_Id)).to.be.revertedWith("Project does not exist")
        }),

    it('should revert already been awarded',async function(){
        const _Id = 0;
            const _title = '1';
            const _company = company.address;
            const _amount = 1;
            await cauth.connect(creator).createProject(_company,_amount,_title);
            await cauth.connect(creator).createProject(_company,_amount,_title);

        // Ensure the operator is not approved
        await cauth.connect(citizen).approveProject(_Id);
        await cauth.connect(citizen1).approveProject(_Id);
        await cauth.connect(citizen2).approveProject(_Id);
        await expect(await cauth.connect(citizen3).approveProject(_Id)).to.be.revertedWith('Project has already been awarded');
    }),

    it('should revert creator cannot approve',async function(){
        const _Id = 0;
            const _title = '1';
            const _company = company.address;
            const _amount = 1;
            await cauth.connect(creator).createProject(_company,_amount,_title);
        // Ensure the operator is not approved
        await expect( await cauth.connect(creator).approveProject(_Id)).to.be.revertedWith("The creator cannot approve");
    }),

    it('should revert already approved this project',async function(){
        const _Id = 0;
            const _title = '1';
            const _company = company.address;
            const _amount = 1;
            await cauth.connect(creator).createProject(_company,_amount,_title);
        // Ensure the operator is not approved
        await cauth.connect(citizen).approveProject(_Id);
        await expect( await cauth.connect(citizen).approveProject(_Id)).to.be.revertedWith("You have already approved this project");
    }),

    it('should approve',async function(){
        const _Id = 0;
            const _title = '1';
            const _company = company.address;
            const _amount = 1;
            await cauth.connect(creator).createProject(_company,_amount,_title);
        // Ensure the operator is not approved
        await expect( await cauth.connect(citizen).approveProject(_Id)).to.emit(cauth,"approveProjectEvent").withArgs(_Id);
    });

  });

  describe('Review Project',function(){
    it('should revert approve to default address',async function(){
        const _Id = 0;
        const _title = '1';
        const _company = company.address;
        const _amount = 1;
        const defaultAddress = {address:"0x0000000000000000000000000000000000000000"};
        await cauth.connect(defaultAddress).createProject(_company,_amount,_title);
        await expect( await cauth.connect(citizen).reviewProject(_Id)).to.be.revertedWith("Project does not exist")
    }),
    it('should revert not awarded yet',async function(){
        const _Id = 0;
        const _title = '1';
        const _company = company.address;
        const _amount = 1;
        const defaultAddress = {address:"0x0000000000000000000000000000000000000000"};
        await cauth.connect(creator).createProject(_company,_amount,_title);
        await expect( await cauth.connect(citizen).reviewProject(_Id)).to.be.revertedWith("Project has not been awarded yet")
    }),
    it('should revert creator cannot review',async function(){
        const _Id = 0;
            const _title = '1';
            const _company = company.address;
            const _amount = 1;
            await cauth.connect(creator).createProject(_company,_amount,_title);
        // Ensure the operator is not approved
        await cauth.connect(citizen).approveProject(_Id);
        await cauth.connect(citizen1).approveProject(_Id);
        await cauth.connect(citizen2).approveProject(_Id);
        await expect( await cauth.connect(creator).reviewProject(_Id)).to.be.revertedWith("The creator cannot review");
    }),
    it('should revert reviewed this project',async function(){
        const _Id = 0;
            const _title = '1';
            const _company = company.address;
            const _amount = 1;
            await cauth.connect(creator).createProject(_company,_amount,_title);
        // Ensure the operator is not approved
        await cauth.connect(citizen).approveProject(_Id);
        await cauth.connect(citizen1).approveProject(_Id);
        await cauth.connect(citizen2).approveProject(_Id);
        await cauth.connect(citizen3).reviewProject(_Id)
        await expect( await cauth.connect(citizen3).reviewProject(_Id)).to.be.revertedWith("You have already reviewed this project");
    });
    it('should review this project',async function(){
        const _Id = 0;
            const _title = '1';
            const _company = company.address;
            const _amount = 1;
            await cauth.connect(creator).createProject(_company,_amount,_title);
        // Ensure the operator is not approved
        await cauth.connect(citizen).approveProject(_Id);
        await cauth.connect(citizen1).approveProject(_Id);
        await cauth.connect(citizen2).approveProject(_Id);
        await expect( await cauth.connect(citizen3).reviewProject(_Id)).to.emit(cauth,"reviewProjectEvent").withArgs(_Id);
    });

  });

  describe('All project',function(){
    it('all project ever created',async function(){
        const _title = '1';
        const _company = company.address;
        const _amount = 1;
        await cauth.connect(creator).createProject(_company,_amount,_title);
        const _projects=await cauth.connect(citizen).getAllProjects();
        expect(_projects.length).to.be.not.equal(0);
    })

  });

  describe('Users project',function(){
    it('all project ever created by user',async function(){
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
