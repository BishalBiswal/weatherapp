window.addEventListener("load",()=>{
    let lat;
    let long;
    let tempdeg= document.querySelector(".tempdeg");
    let tempdesc= document.querySelector(".tempdesc");
    let loctime= document.querySelector(".loctime");
if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(position =>{
        long=position.coords.longitude;
        lat=position.coords.latitude;
        
        const proxy="https://cors-anywhere.herokuapp.com/";
        const weatherapi=`${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long} `;

        fetch(weatherapi)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            console.log(data);
            const{temperature,summary,icon} = data.currently;
            tempdeg.textContent=temperature;
            tempdesc.textContent=summary;
            loctime.textContent=data.timezone;
            setIcons(icon, document.querySelector(".icon"));
        });
     });
  }
  const setIcons = (icon, iconID) =>{
      const skycons= new Skycons({color:"wheat"});
      const currentIcon=icon.replace(/-/g,"_").toUpperCase();
      skycons.play();
      return skycons.set(iconID,Skycons[currentIcon]);
  }
});
