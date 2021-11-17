const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", () => {

  before( async () => {
    this.tasksContract = await TasksContract.deployed();
  });

  it("migrate deployed successfully", async () => {
    const address = this.tasksContract.address;
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

})