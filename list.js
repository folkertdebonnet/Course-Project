
"use strict";
let data = [];
let htmlstring ="";
let deleteId = [];
let updateData = [];
let newData = 
{
id:"",   
name:"",
day:"",
month:"",
year:"",
price:"",
locationName:" ",
lat:"",
lon:"",
url:"",
description:""};

get();

document.getElementById("submitButton").addEventListener("click",function(e){
e.preventDefault();
document.getElementById("overlay3").style.display = "none";
if(
document.getElementById("newName").value != "" &&
document.getElementById("newDay").value != "" &&
document.getElementById("newMonth").value != "" &&
document.getElementById("newYear").value != "" &&
document.getElementById("newPrice").value != "" &&
document.getElementById("newLocationName").value != "" &&
document.getElementById("newLat").value != "" &&
document.getElementById("newLon").value != "" &&
document.getElementById("newDescription").value != "" &&
document.getElementById("newUrl").value != "" 
){
newData = 
{name:document.getElementById("newName").value,
day:document.getElementById("newDay").value,
month:document.getElementById("newMonth").value,
year: document.getElementById("newYear").value,
price:document.getElementById("newPrice").value,
locationName:document.getElementById("newLocationName").value,
lat: document.getElementById("newLat").value,
lon:document.getElementById("newLon").value,
url: document.getElementById("newUrl").value,
description:document.getElementById("newDescription").value
};
post();

} else{
alert("Vul al de velden in!");
}

});

document.getElementById("editButton").addEventListener("click",function(e){
    e.preventDefault();
    document.getElementById("overlay3").style.display = "none";
    if(document.getElementById("name").value != ""){
        updateData.name = document.getElementById("name").value;
        }
    if(document.getElementById("day").value != ""){
    updateData.day = document.getElementById("day").value;
    }
    if(document.getElementById("month").value != ""){
    updateData.month = document.getElementById("month").value;
    }
    if(document.getElementById("year").value != ""){
    updateData.year = document.getElementById("year").value;
    }
    if(document.getElementById("price").value != ""){
    updateData.price = document.getElementById("price").value;
    }
    if(document.getElementById("locationName").value != ""){
    updateData.locationName = document.getElementById("locationName").value;
    }
    if(document.getElementById("lat").value != ""){
    updateData.lat = document.getElementById("lat").value;
    }
    if(document.getElementById("lon").value != ""){
    updateData.lon = document.getElementById("lon").value;
    }
    if(document.getElementById("description").value != ""){
    updateData.description = document.getElementById("description").value;
    }
    if(document.getElementById("url").value != ""){
        updateData.url = document.getElementById("url").value;
    }
    put();
    
    });

document.getElementById("back2").addEventListener("click",function(e){
e.preventDefault();
console.log("overlay2"); 
document.getElementById("overlay2").style.display = "none";
});

document.getElementById("back3").addEventListener("click",function(e){
e.preventDefault();
console.log("overlay3"); 
document.getElementById("overlay3").style.display = "none";
});

document.querySelector(".list").addEventListener("click", function (e) {
    if (e.target && e.target.matches("img.plus")) {
        e.preventDefault();
        console.log("plus");

        const eventContainer = e.target.closest(".event");

        if (eventContainer) {
            const dateLink = eventContainer.querySelector(".event-date a");
            const textParagraph = eventContainer.querySelector(".event-text p");
            const minusImage = eventContainer.querySelector("img.minus");
            const modifyImage = eventContainer.querySelector("img.modify");
            const plusImage = eventContainer.querySelector("img.plus");
            const deleteimage = eventContainer.querySelector("img.delete");

            dateLink.style.display = "flex";
            textParagraph.style.display = "flex";
            minusImage.style.bottom = "118px";
            minusImage.style.display = "flex";
            modifyImage.style.display = "flex";
            plusImage.style.display = "none";
            deleteimage.style.display="flex";
        }
    } else if (e.target && e.target.matches("img.minus")) {
        e.preventDefault();
        console.log("minus");
        const eventContainer = e.target.closest(".event");
        if (eventContainer) {
            const dateLink = eventContainer.querySelector(".event-date a");
            const textParagraph = eventContainer.querySelector(".event-text p");
            const minusImage = eventContainer.querySelector("img.minus");
            const modifyImage = eventContainer.querySelector("img.modify");
            const plusImage = eventContainer.querySelector("img.plus");
            const deleteimage = eventContainer.querySelector("img.delete");

            dateLink.style.display = "none";
            textParagraph.style.display = "none";
            minusImage.style.display = "none";
            modifyImage.style.display = "none";
            plusImage.style.display = "flex";
            deleteimage.style.display="none";

        }
    }


    else if (e.target && e.target.matches("img.modify")) {
        e.preventDefault();
        console.log("modify");
        
        const eventContainer = e.target.closest(".event");
        if (eventContainer) {
            const eventId = Array.from(eventContainer.parentNode.children).indexOf(eventContainer);
            const existingData = data[eventId];
    
             updateData = {
                "id": existingData._id,
                "name": existingData.name,
                "day": existingData.day,
                "month": existingData.month,
                "year": existingData.year,
                "price": existingData.price,
                "locationName": existingData.locationName,
                "lat": existingData.lat,
                "lon": existingData.lon,
                "description": existingData.description,
                "url": existingData.url
            };
            document.getElementById("overlay3").style.display = "flex";
            console.log(updateData);
    
        }
    }
    else if (e.target && e.target.matches("img.delete")) {
        e.preventDefault();
        const eventContainer = e.target.closest(".event");
        const eventId = Array.from(eventContainer.parentNode.children).indexOf(eventContainer) ;

        if (eventContainer) {
            if (data[eventId]) {
                const existingData = data[eventId]._id;
                existingData.toString();
                deleteId = { "id": existingData };
                console.log(deleteId);
            } else {
                console.error('Invalid eventId:', eventId);
                return;
            }
     }

 
    Delete();
    }

});

document.getElementById("addEvent").addEventListener("click",function(e){
e.preventDefault();
console.log("overlay2"); 
document.getElementById("overlay2").style.display = "block";
document.getElementById("overlay3").style.display = "none";
});

async function render() {
    console.log("render");
    try {
        for(let i = 0; i < ObjectLength(data); i++){if (data[i]) {


        htmlstring += 
        `<div class="event">
        <div class="event-text">
        <h1>${data[i].name}</h1>
        <div class="event-subtext"> 
        <h2>${data[i].locationName}</h2>
        <h2>${data[i].price}</h2></div>
      
        <p>${data[i].description}</p></div>
        <div class="event-date">
            <h1>${data[i].day}</h1>
            <h2>${data[i].month}</h2>
            <h3>${data[i].year}</h3>
            <a href="${data[i].url}">Go to site</a>
            <div id="plus"><img class="plus" src="./Images/plus icon purple.png" alt=""></div>
            <div id="minus"><img class="minus" src="./Images/minus icon purple.png" alt=""></div>
            <div id="modify"><img class="modify" src="./Images/modify icon.png" alt=""></div>
            <div id="delete"><img class="delete" src="./Images/delete icon.png" alt=""></div>

        </div>    
    </div>
        `;
        
        }}
        document.querySelector(".list").innerHTML = htmlstring;
    } catch (error) {
        console.error("Error:", error);
    }
  }

function ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
};


async function get() {
    console.log("fetch");
    try {
      const response = await fetch("http://localhost:3000/data");
      const fetchedData = await response.json();
      data = fetchedData;
      console.log(data);
      render();
    } catch (error) {
      console.error("Error:", error);
    }
  }

function Delete(){
    console.log( deleteId);
    fetch("http://localhost:3000/deleteData", {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(deleteId)}
    )
    .then(response => response.text())
    .then(deleteData => console.log("Delete successful:", deleteData));
}

function put(){
    console.log(updateData);
    fetch("http://localhost:3000/updateData",{
        method:"PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
    })
    .then(response =>response.json())
    .then(data => console.log(data));

}
function post(){
    console.log(newData);
    fetch("http://localhost:3000/PostData",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newData)
    })
    .then(response =>response.text())
    .then(data => console.log(data))
    .catch(error =>console.error("Error:", error));
}

document.getElementById("submitButton").addEventListener("click",function(e){
    e.preventDefault();
    document.getElementById("overlay2").style.display = "none";

    });

