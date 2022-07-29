// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

contract EcommerceC2C {

    struct Model{
        string modelName;
        string brandName;
        string category;
        bool exists;
    }
    address public owner;
    struct ProdDetail {
        string modelID;
        string CNIC;
        bool exists;
    }
    mapping (string => ProdDetail) soldProducts; // prodID => prodDetails
    mapping (string => Model) models; // modelID => modelDetails
    // modelID and prodID both are recieved from nodeJS and then brand id is prepended
    mapping (address=>bool) buisnesses;
    constructor() {
        owner = msg.sender;
    }

    function addBuiness(address add) public{
        require(msg.sender == owner, "You are not the owner");
        buisnesses[add] = true;
    }

    function getBusiness(address add) public view returns (bool){
       return buisnesses[add];
    }

    function addModel(string memory modelID, string memory modelName, string memory brandName, string memory category) public{
        require(buisnesses[msg.sender],"Buisness enitity not verified");
        Model memory model;
        model.modelName = modelName;
        model.brandName = brandName;
        model.category = category;
        model.exists = true;
        models[modelID] = model;
        
    }

    function addSoldProduct(string memory prodID, string memory  modelID, string memory hashedCustCNIC) public {
        require(buisnesses[msg.sender],"Buisness enitity not verified");
        require(models[modelID].exists, "Model of this product does not exists");
        ProdDetail memory pdetails;
        pdetails.modelID = modelID;
        pdetails.CNIC = hashedCustCNIC;
        pdetails.exists = true;
        soldProducts[prodID] = pdetails;
    }

    function getCustCNIC(string memory prodID) public view returns (string memory) {
        return soldProducts[prodID].CNIC;
    }

    function getModel(string memory modelID) public view returns (Model memory)
    {
        return models[modelID];
    }

    function getSoldProduct(string memory prodID) public view returns (ProdDetail memory)
    {
        return soldProducts[prodID];
    }

    function transferOwnership(string memory prodID, string memory hashedNewCustCNIC ) public {
        require(msg.sender == owner, "You are not the owner");
        require(soldProducts[prodID].exists, "This product does not exists");
        ProdDetail memory pdetails = soldProducts[prodID] ;
        pdetails.CNIC = hashedNewCustCNIC;
        soldProducts[prodID] = pdetails;
    }

    function destroySmartContract(address payable _to) public {
        require(msg.sender == owner, "You are not the owner");
        selfdestruct(_to);
    }
}