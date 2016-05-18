// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"removeOwner","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"m_numOwners","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"resetSpentToday","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"addOwner","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"m_required","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_h","type":"bytes32"}],"name":"confirm","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_newLimit","type":"uint256"}],"name":"setDailyLimit","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"execute","outputs":[{"name":"_r","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"_operation","type":"bytes32"}],"name":"revoke","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_newRequired","type":"uint256"}],"name":"changeRequirement","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_operation","type":"bytes32"},{"name":"_owner","type":"address"}],"name":"hasConfirmed","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"}],"name":"kill","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"}],"name":"changeOwner","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"m_dailyLimit","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[{"name":"_owners","type":"address[]"},{"name":"_required","type":"uint256"},{"name":"_daylimit","type":"uint256"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"operation","type":"bytes32"}],"name":"Confirmation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"operation","type":"bytes32"}],"name":"Revoke","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOwner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOwner","type":"address"}],"name":"OwnerAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOwner","type":"address"}],"name":"OwnerRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newRequirement","type":"uint256"}],"name":"RequirementChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"data","type":"bytes"}],"name":"SingleTransact","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"operation","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"data","type":"bytes"}],"name":"MultiTransact","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"operation","type":"bytes32"},{"indexed":false,"name":"initiator","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"data","type":"bytes"}],"name":"ConfirmationNeeded","type":"event"}],
    binary: "606060405260405161110d38038061110d833981016040908152815160805160a0519190930180516001908101815533600160a060020a0316600381905560009081526101026020529384205592918190849084905b82518110156100db57828181518110156100025790602001906020020151600160a060020a0316600260005082600201610100811015610002570160009190558351600283019161010291869085908110156100025790602001906020020151600160a060020a0316815260200190815260200160002060005081905550600101610055565b8160006000508190555050505080610105600050819055506100ff62015180420490565b6101075550505050610ff8806101156000396000f3606060405236156100b95760e060020a6000350463173825d9811461010b5780632f54bf6e1461015f5780634123cb6b146101875780635c52c2f5146101905780637065cb48146101ba578063746c9171146101e7578063797af627146101f0578063b20d30a914610203578063b61d27f614610230578063b75c7dc614610251578063ba51a6df14610280578063c2cf7326146102ad578063cbf0b0c0146102eb578063f00d4b5d14610318578063f1736d861461034a575b61035460003411156101095760408051600160a060020a033316815234602082015281517fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c929181900390910190a15b565b610354600435600060003660405180838380828437820191505092505050604051809103902061064a815b600160a060020a03331660009081526101026020526040812054818082811415610c6657610dbf565b6103566004355b600160a060020a03811660009081526101026020526040812054115b919050565b61035660015481565b61035460003660405180838380828437820191505092505050604051809103902061078b81610136565b6103546004356000366040518083838082843782019150509250505060405180910390206105c681610136565b61035660005481565b6103566004355b600081610a2781610136565b61035460043560003660405180838380828437820191505092505050604051809103902061077f81610136565b6103566004803590602480359160443591820191013560006107aa33610166565b610354600435600160a060020a03331660009081526101026020526040812054908082811415610368576103e7565b61035460043560003660405180838380828437820191505092505050604051809103902061070881610136565b610356600435602435600082815261010360209081526040808320600160a060020a0385168452610102909252822054828181141561076157610776565b61035460043560003660405180838380828437820191505092505050604051809103902061079981610136565b610354600435602435600060003660405180838380828437820191505092505050604051809103902061047281610136565b6103566101055481565b005b60408051918252519081900360200190f35b50506000828152610103602052604081206001810154600284900a9290831611156103e75780546001828101805492909101835590839003905560408051600160a060020a03331681526020810186905281517fc7fb647e59b18047309aa15aad418e5d7ca96d173ad704f1031a2c3d7591734b929181900390910190a15b50505050565b600160a060020a03831660028361010081101561000257508301819055600160a060020a03851660008181526101026020908152604080832083905584835291829020869055815192835282019290925281517fb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c929181900390910190a1505b505050565b156103e75761048083610166565b1561048b575061046d565b600160a060020a0384166000908152610102602052604081205492508214156104b4575061046d565b6103ed5b6101045460005b81811015610f0b57610104805461010891600091849081101561000257600080516020610fd88339815191520154825250602091909152604081208054600160a060020a0319168155600181810183905560028281018054858255939493909281161561010002600019011604601f819010610f9057505b5050506001016104bf565b60018054810190819055600160a060020a038316906002906101008110156100025790900160005055600154600160a060020a03831660008181526101026020908152604091829020939093558051918252517f994a936646fe87ffe4f1e469d3d6aa417d6b855598397f323de5b449f765f0c3929181900390910190a15b505b50565b156105c1576105d482610166565b156105df57506105c3565b6105e76104b8565b60015460fa90106105fa576105fa61060f565b60015460fa901061054257506105c3565b6106c75b60015b6001548110156105c3575b6001548110801561063d5750600281610100811015610002570154600014155b15610dc75760010161061d565b1561046d57600160a060020a03831660009081526101026020526040812054925082141561067857506105c1565b600160016000505403600060005054111561069357506105c1565b600060028361010081101561000257508301819055600160a060020a0384168152610102602052604081205561060b6104b8565b60408051600160a060020a038516815290517f58619076adf5bb0943d100ef88d52d7c3fd691b19d3a9071b555b651fbf418da9181900360200190a1505050565b156105c15760015482111561071d57506105c3565b600082905561072a6104b8565b6040805183815290517facbdb084c721332ac59f9b8e392196c9eb0e4932862da8eb9beaf0dad4f550da9181900360200190a15050565b506001820154600282900a9081166000141593505b50505092915050565b156105c1575061010555565b156105c35760006101065550565b156105c15781600160a060020a0316ff5b156109eb576107be846000610ea133610166565b1561087d577f92ca3a80853e6663fa31fa10b99225f18d4902939b4c53a9caae9043f6efd00433858786866040518086600160a060020a0316815260200185815260200184600160a060020a031681526020018060200182810382528484828181526020019250808284378201915050965050505050505060405180910390a184600160a060020a03168484846040518083838082843782019150509250505060006040518083038185876185025a03f150600093506109eb92505050565b6000364360405180848480828437820191505082815260200193505050506040518091039020905080506108b0816101f7565b1580156108d3575060008181526101086020526040812054600160a060020a0316145b156109eb5760008181526101086020908152604082208054600160a060020a0319168817815560018181018890556002918201805481865294849020909491821615610100026000190190911691909104601f9081019290920481019185919087908390106109f35760ff198135168380011785555b506109659291505b80821115610a235760008155600101610951565b50507f1733cbb53659d713b79580f79f3f9ff215f78a7c7aa45890f3b89fc5cddfbf328133868887876040518087815260200186600160a060020a0316815260200185815260200184600160a060020a03168152602001806020018281038252848482818152602001925080828437820191505097505050505050505060405180910390a15b949350505050565b82800160010185558215610949579182015b82811115610949578235826000505591602001919060010190610a05565b5090565b15610aaa5760008381526101086020526040812054600160a060020a031614610aaa5760408051600091909120805460018281015460029384018054600160a060020a0394909416959194909391928392859291811615610100026000190116048015610adb5780601f10610ab057610100808354040283529160200191610adb565b50919050565b820191906000526020600020905b815481529060010190602001808311610abe57829003601f168201915b505091505060006040518083038185876185025a03f1505050600084815261010860209081526040918290208054600180830154855133600160a060020a0381811683529682018c9052968101829052929094166060830181905260a06080840181815260029586018054948516156101000260001901909416959095049084018190527fe7c957c06e9a662c1a6c77366179f5b702b97651dc28eee7d5bf1dff6e40bb4a97508a95949193919060c083019084908015610bdd5780601f10610bb257610100808354040283529160200191610bdd565b820191906000526020600020905b815481529060010190602001808311610bc057829003601f168201915b5050965050505050505060405180910390a16000838152610108602052604081208054600160a060020a0319168155600181810183905560028281018054858255939493909281161561010002600019011604601f819010610c4857505b5050506001915050610182565b601f016020900490600052602060002090810190610c3b9190610951565b60008581526101036020526040812080549093501415610cee576000805483556001838101919091556101048054918201808255828015829011610cbd57818360005260206000209182019101610cbd9190610951565b50505060028301819055610104805487929081101561000257600091909152600080516020610fd883398151915201555b506001810154600283900a90811660001415610dbf5760408051600160a060020a03331681526020810187905281517fe1c52dc63b719ade82e8bea94cc41a0d5d28e4aaf536adb5e9cccc9ff8c1aeda929181900390910190a1815460019011610dac576000858152610103602052604090206002015461010480549091908110156100025760406000908120600080516020610fd8833981519152929092018190558082556001828101829055600292909201559450610dbf9050565b8154600019018255600182018054821790555b505050919050565b5b60018054118015610dea57506001546002906101008110156100025701546000145b15610dfe5760018054600019019055610dc8565b60015481108015610e215750600154600290610100811015610002570154600014155b8015610e3b57506002816101008110156100025701546000145b15610e9c57600154600290610100811015610002578101549082610100811015610002579090016000505580610102600060028361010081101561000257810154825260209290925260408120929092556001546101008110156100025701555b610612565b156101825761010754610eb75b62015180420490565b1115610ed057600061010655610ecb610eae565b610107555b6101065480830110801590610eed57506101055461010654830111155b15610f0357506101068054820190556001610182565b506000610182565b6105c16101045460005b81811015610fae5761010480548290811015610002576000918252600080516020610fd8833981519152015414610f8857610104805461010391600091849081101561000257600080516020610fd883398151915201548252506020919091526040812081815560018101829055600201555b600101610f15565b601f0160209004906000526020600020908101906105379190610951565b610104805460008083559190915261046d90600080516020610fd883398151915290810190610951564c0be60200faa20559308cb7b5a1bb3255c16cb1cab91f525b5ae7a03d02fabe",
    unlinked_binary: "606060405260405161110d38038061110d833981016040908152815160805160a0519190930180516001908101815533600160a060020a0316600381905560009081526101026020529384205592918190849084905b82518110156100db57828181518110156100025790602001906020020151600160a060020a0316600260005082600201610100811015610002570160009190558351600283019161010291869085908110156100025790602001906020020151600160a060020a0316815260200190815260200160002060005081905550600101610055565b8160006000508190555050505080610105600050819055506100ff62015180420490565b6101075550505050610ff8806101156000396000f3606060405236156100b95760e060020a6000350463173825d9811461010b5780632f54bf6e1461015f5780634123cb6b146101875780635c52c2f5146101905780637065cb48146101ba578063746c9171146101e7578063797af627146101f0578063b20d30a914610203578063b61d27f614610230578063b75c7dc614610251578063ba51a6df14610280578063c2cf7326146102ad578063cbf0b0c0146102eb578063f00d4b5d14610318578063f1736d861461034a575b61035460003411156101095760408051600160a060020a033316815234602082015281517fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c929181900390910190a15b565b610354600435600060003660405180838380828437820191505092505050604051809103902061064a815b600160a060020a03331660009081526101026020526040812054818082811415610c6657610dbf565b6103566004355b600160a060020a03811660009081526101026020526040812054115b919050565b61035660015481565b61035460003660405180838380828437820191505092505050604051809103902061078b81610136565b6103546004356000366040518083838082843782019150509250505060405180910390206105c681610136565b61035660005481565b6103566004355b600081610a2781610136565b61035460043560003660405180838380828437820191505092505050604051809103902061077f81610136565b6103566004803590602480359160443591820191013560006107aa33610166565b610354600435600160a060020a03331660009081526101026020526040812054908082811415610368576103e7565b61035460043560003660405180838380828437820191505092505050604051809103902061070881610136565b610356600435602435600082815261010360209081526040808320600160a060020a0385168452610102909252822054828181141561076157610776565b61035460043560003660405180838380828437820191505092505050604051809103902061079981610136565b610354600435602435600060003660405180838380828437820191505092505050604051809103902061047281610136565b6103566101055481565b005b60408051918252519081900360200190f35b50506000828152610103602052604081206001810154600284900a9290831611156103e75780546001828101805492909101835590839003905560408051600160a060020a03331681526020810186905281517fc7fb647e59b18047309aa15aad418e5d7ca96d173ad704f1031a2c3d7591734b929181900390910190a15b50505050565b600160a060020a03831660028361010081101561000257508301819055600160a060020a03851660008181526101026020908152604080832083905584835291829020869055815192835282019290925281517fb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c929181900390910190a1505b505050565b156103e75761048083610166565b1561048b575061046d565b600160a060020a0384166000908152610102602052604081205492508214156104b4575061046d565b6103ed5b6101045460005b81811015610f0b57610104805461010891600091849081101561000257600080516020610fd88339815191520154825250602091909152604081208054600160a060020a0319168155600181810183905560028281018054858255939493909281161561010002600019011604601f819010610f9057505b5050506001016104bf565b60018054810190819055600160a060020a038316906002906101008110156100025790900160005055600154600160a060020a03831660008181526101026020908152604091829020939093558051918252517f994a936646fe87ffe4f1e469d3d6aa417d6b855598397f323de5b449f765f0c3929181900390910190a15b505b50565b156105c1576105d482610166565b156105df57506105c3565b6105e76104b8565b60015460fa90106105fa576105fa61060f565b60015460fa901061054257506105c3565b6106c75b60015b6001548110156105c3575b6001548110801561063d5750600281610100811015610002570154600014155b15610dc75760010161061d565b1561046d57600160a060020a03831660009081526101026020526040812054925082141561067857506105c1565b600160016000505403600060005054111561069357506105c1565b600060028361010081101561000257508301819055600160a060020a0384168152610102602052604081205561060b6104b8565b60408051600160a060020a038516815290517f58619076adf5bb0943d100ef88d52d7c3fd691b19d3a9071b555b651fbf418da9181900360200190a1505050565b156105c15760015482111561071d57506105c3565b600082905561072a6104b8565b6040805183815290517facbdb084c721332ac59f9b8e392196c9eb0e4932862da8eb9beaf0dad4f550da9181900360200190a15050565b506001820154600282900a9081166000141593505b50505092915050565b156105c1575061010555565b156105c35760006101065550565b156105c15781600160a060020a0316ff5b156109eb576107be846000610ea133610166565b1561087d577f92ca3a80853e6663fa31fa10b99225f18d4902939b4c53a9caae9043f6efd00433858786866040518086600160a060020a0316815260200185815260200184600160a060020a031681526020018060200182810382528484828181526020019250808284378201915050965050505050505060405180910390a184600160a060020a03168484846040518083838082843782019150509250505060006040518083038185876185025a03f150600093506109eb92505050565b6000364360405180848480828437820191505082815260200193505050506040518091039020905080506108b0816101f7565b1580156108d3575060008181526101086020526040812054600160a060020a0316145b156109eb5760008181526101086020908152604082208054600160a060020a0319168817815560018181018890556002918201805481865294849020909491821615610100026000190190911691909104601f9081019290920481019185919087908390106109f35760ff198135168380011785555b506109659291505b80821115610a235760008155600101610951565b50507f1733cbb53659d713b79580f79f3f9ff215f78a7c7aa45890f3b89fc5cddfbf328133868887876040518087815260200186600160a060020a0316815260200185815260200184600160a060020a03168152602001806020018281038252848482818152602001925080828437820191505097505050505050505060405180910390a15b949350505050565b82800160010185558215610949579182015b82811115610949578235826000505591602001919060010190610a05565b5090565b15610aaa5760008381526101086020526040812054600160a060020a031614610aaa5760408051600091909120805460018281015460029384018054600160a060020a0394909416959194909391928392859291811615610100026000190116048015610adb5780601f10610ab057610100808354040283529160200191610adb565b50919050565b820191906000526020600020905b815481529060010190602001808311610abe57829003601f168201915b505091505060006040518083038185876185025a03f1505050600084815261010860209081526040918290208054600180830154855133600160a060020a0381811683529682018c9052968101829052929094166060830181905260a06080840181815260029586018054948516156101000260001901909416959095049084018190527fe7c957c06e9a662c1a6c77366179f5b702b97651dc28eee7d5bf1dff6e40bb4a97508a95949193919060c083019084908015610bdd5780601f10610bb257610100808354040283529160200191610bdd565b820191906000526020600020905b815481529060010190602001808311610bc057829003601f168201915b5050965050505050505060405180910390a16000838152610108602052604081208054600160a060020a0319168155600181810183905560028281018054858255939493909281161561010002600019011604601f819010610c4857505b5050506001915050610182565b601f016020900490600052602060002090810190610c3b9190610951565b60008581526101036020526040812080549093501415610cee576000805483556001838101919091556101048054918201808255828015829011610cbd57818360005260206000209182019101610cbd9190610951565b50505060028301819055610104805487929081101561000257600091909152600080516020610fd883398151915201555b506001810154600283900a90811660001415610dbf5760408051600160a060020a03331681526020810187905281517fe1c52dc63b719ade82e8bea94cc41a0d5d28e4aaf536adb5e9cccc9ff8c1aeda929181900390910190a1815460019011610dac576000858152610103602052604090206002015461010480549091908110156100025760406000908120600080516020610fd8833981519152929092018190558082556001828101829055600292909201559450610dbf9050565b8154600019018255600182018054821790555b505050919050565b5b60018054118015610dea57506001546002906101008110156100025701546000145b15610dfe5760018054600019019055610dc8565b60015481108015610e215750600154600290610100811015610002570154600014155b8015610e3b57506002816101008110156100025701546000145b15610e9c57600154600290610100811015610002578101549082610100811015610002579090016000505580610102600060028361010081101561000257810154825260209290925260408120929092556001546101008110156100025701555b610612565b156101825761010754610eb75b62015180420490565b1115610ed057600061010655610ecb610eae565b610107555b6101065480830110801590610eed57506101055461010654830111155b15610f0357506101068054820190556001610182565b506000610182565b6105c16101045460005b81811015610fae5761010480548290811015610002576000918252600080516020610fd8833981519152015414610f8857610104805461010391600091849081101561000257600080516020610fd883398151915201548252506020919091526040812081815560018101829055600201555b600101610f15565b601f0160209004906000526020600020908101906105379190610951565b610104805460008083559190915261046d90600080516020610fd883398151915290810190610951564c0be60200faa20559308cb7b5a1bb3255c16cb1cab91f525b5ae7a03d02fabe",
    address: "0xaba72e6a0eba3ebfb9b86d29053eb26df3008210",
    generated_with: "2.0.9",
    contract_name: "Wallet"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Wallet error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("Wallet error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Wallet error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Wallet error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Wallet = Contract;
  }

})();
