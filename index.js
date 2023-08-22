let myLeads = []   //here we are taking an empty array to store our data
const inputEL = document.getElementById("input-el")  
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") ) // here we are working with local storage and parsing the array to string and getting its items
const tabBtn = document.getElementById("tab-btn")

//first we are checking if the leadsfromlocalstorage have something in it to render than we are calling the render function
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
//this function renders the leads we get form the user also add an html element <li></li> with the help of .innerHTML
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++ ){
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    //here we are takking the input in a variable so that we only have to manuplate dom just once
    ulEl.innerHTML= listItems
}

//this is an evenntlisterner that activate on clicking the button and adds the input to our array
inputBtn.addEventListener("click", function () {
    myLeads.push(inputEL.value)
    inputEL.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) ) // here we are storing the value of array in local storage it dwals with string so we have to use JSON.stringify function to stringify the array
    render(myLeads)
})
//this is an evenntlisterner that activate on clicking the button and adds the current chrome tab to our array
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})
//this is an evenntlisterner that activate on double clicking the button and removes all the current entries in our array and local storage and than render empty array
deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


