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

  it("get Task List", async () => {
    const counter = await this.tasksContract.taskCounter();
    const task = await this.tasksContract.tasks(counter);

    assert.equal(task.id.toNumber(), counter);
    assert.equal(task.title, "mi primer tarea de ejemplo");
    assert.equal(task.description, "descripcion de ejemplo");
    assert.equal(task.done, false);
    assert.equal(counter, 1);

  });

})