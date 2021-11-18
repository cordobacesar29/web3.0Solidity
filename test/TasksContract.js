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

  it("task created successfully",async () => {
    const result = await this.tasksContract.createTask("segunda tarea", "segunda descripcion");
    const taskEvent = result.logs[0].args;
    const counter = await this.tasksContract.taskCounter();

    assert.equal(counter.toNumber(), 2);
    assert.equal(taskEvent.id.toNumber(), 2);
    assert.equal(taskEvent.title, "segunda tarea");
    assert.equal(taskEvent.description, "segunda descripcion");
    assert.equal(taskEvent.done, false);
  });
})