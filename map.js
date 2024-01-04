let data = [];

generateMap();
get();

async function generateMap() {
    try {
          await get();       
          var map = L.map('map').setView([50.8999964, 4.5333312], 9);
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);
      
        for (let i = ObjectLength(data) - 1; i >= 0; i--) {
         if (data[i]) {
            const marker = L.marker([data[i].lat, data[i].lon]).addTo(map);
            
            let text = `<b>${data[i].name} ${i + 1}</b><br>${data[i].locationName} ${data[i].price}.<br>${data[i].day} ${data[i].month} ${data[i].year}`;
            for (let j = i + 1; j < ObjectLength(data) ; j++) {
                if (data[i].lon === data[j].lon && data[i].lat === data[j].lat) {
                text +=`</b><br><b>${data[j].name} ${i + 1}</b><br>${data[j].locationName} ${data[j].price}.<br>${data[j].day} ${data[j].month} ${data[j].year}` 
                console.log(text);
                  }
            
            }
            marker.bindPopup(text);
  
            marker.on('mouseover', function (ev) {
            ev.target.openPopup();
            });
  
            marker.on('mouseout', function (ev) {
            ev.target.closePopup();
            });
            } 
        }
        } catch (error) {
          console.error("Error:", error);
        }
      }
      
      
      async function get() {
        console.log("fetch");
        try {
          const response = await fetch("https://back-end-hosting.onrender.com/data");
          const fetchedData = await response.json();
          data = fetchedData;
          console.log(data);
          render();
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

