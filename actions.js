var currentProduct = {}
var products = {}


function removeStage(button, stageName) {
    let outerDiv = button.parentNode.parentNode;
    let currentProductElement = document.getElementById('current-info');
    currentProductElement.removeChild(outerDiv);

    delete currentProduct[stageName]
}


function addStage() {

    const stageName = document.getElementById("stage-name").value;
    const stageDuration = document.getElementById("stage-duration").value;

    if(stageName === "none"){
        alert("Select a valid stage")
        return false
    }

    if(stageDuration < 0) {
        alert("Stage duration must be positive number")
        return false
    }

    if((stageName in currentProduct)){
        alert("Stage already exists")
        return false
    }

    const currentProductElement = document.getElementById('current-info')

    const outerDiv = document.createElement("div");
    outerDiv.innerHTML = `
        <div style="display:flex;flex-direction: row;justify-content: space-between;align-items: center; margin: 5px">
            <p> ${stageName} </p>
            <button onclick="removeStage(this, '${stageName}' )"> Remove </button>
        </div>
    `

    currentProduct[stageName] = {'element': outerDiv, 'values': {}}
    currentProductElement.appendChild(outerDiv)
}


function removeRequirement(button, stageName, name) {
    let outerDiv = button.parentNode.parentNode;
    const currentStage = currentProduct[stageName]['element']
    currentStage.removeChild(outerDiv);

    delete currentProduct[stageName][name]
}


function addRequirement() {

    const stageName = document.getElementById("stage-name").value;
    const name = document.getElementById('requirement-name').value
    const quantity = document.getElementById('requirement-quantity').value

    if(stageName === "none" || !(stageName in currentProduct) ){
        alert("Select a valid stage")
        return false
    }

    if(name === "" ){
        alert("Provide valid requirement name")
        return false
    }

    if(quantity < 0) {
        alert("Requirement duration must be positive number")
        return false
    }

    if((name in currentProduct[stageName]['values'])){
        alert("Requirement already exists")
        return false
    }

    const currentStage = currentProduct[stageName]['element']

    const outerDiv = document.createElement("div");
    outerDiv.innerHTML = `
        <div style="display:flex;flex-direction: row;justify-content: space-between;align-items: center; margin: 5px; padding-left: 25px">
            <p style="margin: 7px"> - ${name}, Qty: ${quantity} </p>
            <button onclick="removeRequirement(this, '${stageName}', '${name}' )"> Remove </button>
        </div>
    `

    currentProduct[stageName]['values'][name] = quantity
    currentStage.appendChild(outerDiv)
}


function removeProduct(button, partNumber) {
    let outerDiv = button.parentNode.parentNode;
    const productListElement = document.getElementById('product-list')
    productListElement.removeChild(outerDiv);

    delete products[partNumber]
}


function addProduct() {

    const partNumber = document.getElementById("part-number").value;
    const description = document.getElementById("description").value;
    const materialGroup = document.getElementById("material-group").value;
    const company = document.getElementById("company").value;
    const revision = document.getElementById("revision").value;
    const details = document.getElementById("details").value;
    const assembly = document.getElementById("assembly").value;
    const duration = document.getElementById("stage-duration").value;


    if(partNumber === "" || description === "" || materialGroup === "" || company === "" || revision === "" || details === "" || assembly === "none"){
        alert("Provide proper values for product information")
        return
    }

    if((partNumber in products)){
        alert("Product already exists")
        return false
    }

    let formValues = {
        'part_num': partNumber,
        'description': description,
        'material_group': materialGroup,
        'company': company,
        'revision': revision,
        'details': details,
        'assembly': assembly,
        'stages': []
    }

    for(const key in currentProduct) {
        let reqs = []
        for(const requirement in currentProduct[key]['values']){
            reqs.push({'name': requirement, 'quantity': currentProduct[key]['values'][requirement]})
        }
        formValues['stages'].push({'name': key, 'duration': duration, 'requirement': reqs})
    }

    products[partNumber] = formValues;

    
    const productListElement = document.getElementById('product-list')
    const outerDiv = document.createElement("div");
    outerDiv.innerHTML = `
        <div style="display:flex;flex-direction: row;justify-content: space-between;align-items: center; margin: 5px;" >
            <p> ${partNumber} </p>
            <button onclick="removeProduct(this, '${partNumber}')"> Remove </button>
        </div>
    `

    productListElement.appendChild(outerDiv)

    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }

    document.getElementById('assembly').value = "none"
    document.getElementById('stage-name').value = "none"

    currentProduct = {}
    document.getElementById('current-info').innerHTML = "";


    alert('Product has been added.')
}


function exportData() {
    
    let productData = Object.values(products)

    const data = JSON.stringify(productData, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "form_data.json";
    downloadLink.click();

    URL.revokeObjectURL(url);
}

document.getElementById("add-stage").addEventListener("click", addStage);

// Event listener for Add Requirement button
document.getElementById("add-requirement").addEventListener("click", addRequirement);

// Event listener for Add Product button
document.getElementById("add-product").addEventListener("click", addProduct);

// Event listener for Export All button
document.getElementById("export").addEventListener("click", exportData);