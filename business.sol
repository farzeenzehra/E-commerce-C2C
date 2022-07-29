// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

contract EcommerceC2C {
    struct Model{
        string modelName;
        string brandName;
        string category;
    }
    
    address public owner;
    struct ProdDetail {
        string modelID;
        string CNIC;
    }
    mapping (string => ProdDetail) soldProducts; // prodID => prodDetails
    mapping (string => Model) models; // modelID => modelDetails
    // modelID and prodID both are recieved from nodeJS and then brand id is prepended
    constructor() {
        owner = msg.sender;
    }
    function addModel(string memory modelID, string memory modelName, string memory brandName, string memory category) public{
        Model memory model;
        model.modelName = modelName;
        model.brandName = brandName;
        model.category = category;
        models[modelID] = model;
    }
    function addSoldProduct(string memory prodID, string memory  modelID, string memory hashedCustCNIC) public {
        ProdDetail memory pdetails;
        pdetails.modelID = modelID;
        pdetails.CNIC = hashedCustCNIC;
        soldProducts[prodID] = pdetails;
    }

    function getCustCNIC(string memory prodID) public view returns (string memory) {
        return soldProducts[prodID].CNIC;
    }
    function transferOwnership(string memory prodID, string memory hashedNewCustCNIC ) public {
        require(msg.sender == owner);
        ProdDetail memory pdetails = soldProducts[prodID] ;
        pdetails.CNIC = hashedNewCustCNIC;
        soldProducts[prodID] = pdetails;
    }
    function destroySmartContract(address payable _to) public {
        require(msg.sender == owner, "You are not the owner");
        selfdestruct(_to);
    }
}