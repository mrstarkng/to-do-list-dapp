const {expect} = require("chai");
const { ethers } = require("hardhat");  // ethers is the Ethereum JavaScript API');


describe("TaskContract", function () {
    let TaskContract;
    let taskContract;
    let owner;

    const TOTAL_TASKS = 5;
    let totalTasks;

    beforeEach(async function () {
        TaskContract = await ethers.getContractFactory("TaskContract");
        [owner] = await ethers.getSigners();
        taskContract = await TaskContract.deploy();

        totalTasks = [];

        for (let i = 0; i < TOTAL_TASKS; i++) {
            let task = {
                'taskText': "Task number : " + i,
                'isDeleted': false
            };
            await taskContract.addTask(task.taskText, task.isDeleted);
        }
        
    });

    describe("Add Task()", function () {
        it("Should add a new task", async function () {
            let task = {
                'taskText': "This is a new task",
                'isDeleted': false,
            };
            await expect(await taskContract.addTask(task.taskText, task.isDeleted)).to.emit(taskContract, 'AddTask').withArgs(owner.address, TOTAL_TASKS);
        });
    });

    describe("Get All tasks", function () {
        it("Should return all the correct number of total tasks", async function () {
            const allMyTasks = await taskContract.getTasks();
            expect(allMyTasks.length).to.equal(TOTAL_TASKS);
        });
    });

    describe("Delete Task", function () {
        it("Should emit DeleteTask event ", async function () {
            const TASK_ID = 0;
            const TASK_DELETED = true;
            await expect(await taskContract.deleteTask(TASK_ID, TASK_DELETED)).to.emit(taskContract, 'DeleteTask').withArgs(TASK_ID, TASK_DELETED);
        });
    });

});