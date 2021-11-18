App = {
  contracts: {},

  init: () => {
    console.log("Loaded");
    App.loadEtherium();
    App.loadAccount();
    App.loadContracts();
  },

  loadEtherium: async () => {
    if(window.ethereum) {
      App.web3Provider = window.ethereum;
      await window.ethereum.request({method: "eth_requestAccounts" });
    } else {
      console.log("not install etherium in browser");
    }
  },
  loadAccount: async () => {
    const accounts = await window.ethereum.request({method: "eth_requestAccounts" });
    App.account = accounts[0];
  },

  loadContracts: async () => {
    const res = await fetch("TasksContract.json");
    const tasksContractJSON = await res.json();

    App.contracts.tasksContract = TruffleContract(tasksContractJSON);
    App.contracts.tasksContract.setProvider(App.web3Provider);

    App.tasksContract = await App.contracts.tasksContract.deployed();
  },

  createTask: async (title, description) => {
    const result = await App.tasksContract.createTask(title, description, {
      from: App.account
    });
    console.log(result.logs[0].args)
  }
};
App.init();