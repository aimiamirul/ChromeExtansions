const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
let ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const saveBtn = document.getElementById("save-btn")

let myLeads = []

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLead(myLeads)
}

document.getElementById("input-el")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("input-btn").click();
    }
});

saveBtn.addEventListener("click", function () {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        console.log(tabs[0].url);
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads) )
        renderLead(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    renderLead(myLeads)
    location.reload()
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLead(myLeads)
})

function renderLead(leads) {
    let listItems = ""
    for (let i = 0; i<leads.length; i++) {
        listItems += `
        <li>
        <a target='_blank' href='${myLeads[i]}'>
        ${myLeads[i]}
        <a/>
        </li>`
        ulEl.innerHTML = listItems
    }
} 