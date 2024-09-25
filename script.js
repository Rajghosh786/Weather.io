const test1 = document.querySelector(".test1");
const test2 = document.querySelector(".test2");
const wind1 = document.querySelector(".wind1");
const wind2 = document.querySelector(".wind2");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const time = document.querySelector(".time");
const geo1 = document.querySelector(".geo1");
const geo2 = document.querySelector(".geo2");
const city = document.querySelector(".city");
const summary = document.querySelector(".summary");
const kilometer = document.querySelector(".kilometer");
const kilometer1 = document.querySelector(".kilometer1");
const image = document.querySelector(".image");
const cloudyicon = document.querySelector(".cloudyicon");
const temp1 = document.querySelector(".temp1");
const button = document.querySelector(".btn");
const change = document.querySelector(".change");
const searchbar = document.querySelector(".searchbar");
const p = document.querySelector(".p");
const searchbtn = document.querySelector(".searchbtn");
const iconImage = document.querySelector(".icon");
const weatherData = {};
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "8cef5ad6bbmshf1b274980b222eap1f9e31jsn4eee448d0215",
    "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
  },
};

window.addEventListener("load", function(){
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude,longitude)
      fetch(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`,
        options
      )
      .then((response) => response.json())
      .then((data) => {
      let current = data.current;
      let location = data.location;
      let condition = data.current.condition;
      const { temp_c, temp_f, wind_kph, wind_mph, humidity } = current;
      const { localtime, name, lat, lon } = location;
      const { text, icon } = condition;
      weatherData.temp_c = temp_c;
      weatherData.temp_f = temp_f;
      weatherData.wind_kph = wind_kph;
      weatherData.wind_mph = wind_mph;
      temp.innerText = temp_c;
      humidity.innerText = humidity;
      time.innerText = localtime;
      geo1.innerText = lat;
      geo2.innerText = lon;
      city.innerText = name;
      summary.innerText = text;
      kilometer.innerText = wind_kph;
      iconImage.src = icon;           
    });
    });
  }
});

searchbar.addEventListener("keyup", fetchingDetails)
temp.addEventListener("click",changingValues)
searchbar.addEventListener('keyup', filtercountry)

  function fetchingDetails(e){
  // console.log(e.target.value);
  const searchValue = e.target.value;
  fetch(
    `https://weatherapi-com.p.rapidapi.com/current.json?q=${searchValue}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.current);
      // console.log(data.location);
      // console.log(data.current.condition.icon);
      let current = data.current;
      let location = data.location;
      let condition = data.current.condition;
      const { temp_c, temp_f, wind_kph, wind_mph, humidity } = current;
      const { localtime, name, lat, lon } = location;
      const { text, icon } = condition;
      weatherData.temp_c = temp_c;
      weatherData.temp_f = temp_f;
      weatherData.wind_kph = wind_kph;
      weatherData.wind_mph = wind_mph;
      temp.innerText = temp_c;
      humidity.innerText = humidity;
      time.innerText = localtime;
      geo1.innerText = lat;
      geo2.innerText = lon;
      city.innerText = name;
      summary.innerText = text;
      kilometer.innerText = wind_kph;
      iconImage.src = icon;           
    });
};

function changingValues(){
      const {temp_c, temp_f, wind_kph, wind_mph}= weatherData
      console.log(temp_c, temp_f, wind_kph, wind_mph);
      if(temp1.innerText === "°C" && kilometer1.innerText === "kph wind"){
        temp1.innerText = "°F";
        kilometer1.innerText = "mph wind";
        temp.innerText = temp_f;
        kilometer.innerText = wind_mph;
      }else if(temp1.innerText === "°F" && kilometer1.innerText === "mph wind"){
        temp1.innerText = "°C";
        kilometer1.innerText = "kph wind"
        temp.innerText = temp_c;
        kilometer.innerText = wind_kph;
      }
}

  const unorder = document.querySelector(".unorder")
  const mainhide = document.querySelector('.mainhide')

  function showrecommendedlist(rec){
      let searchvalue = searchbar.value;
      if(searchvalue === ""){
          return mainhide.classList.remove("mainunhide");
      }
      mainhide.classList.add("mainunhide");
      mainhide.innerHTML='',
      rec.map(recomendeditem => {
          // const unorder = document.createElement("ul")
          // unorder.appendChild(li)
          const li = document.createElement('li')
          li.classList.add('added')
          li.textContent = recomendeditem.name;
          mainhide.appendChild(li);
          // console.log(mainhide.children)
          li.addEventListener('click',function(){
            searchbar.value = li.textContent;
            mainhide.classList.remove('mainunhide')
          })
            // console.log(mainhide.childNodes)
          // console.log(recomendeditem);
      })
  }

  async function filtercountry() {
      const response = await fetch("./cities.json");
    //   const response = await fetch("http://localhost:1305",{
    //     method:'get',
    //     headers:{'Content-Type':'application/json'},
    // })
      const countrylist = await response.json();
      let searchvalue = searchbar.value;
      let recommendations = [];
      if(searchvalue){
      recommendations = countrylist.filter(data => {
          // console.log(data.name);
          // console.log(data.state_name);
          // console.log(data.country_name);
          return data.name.toLowerCase().includes(searchvalue.toLowerCase());
      });
      // console.log(recommendations)
      showrecommendedlist(recommendations)
      }
  }


  searchbar.addEventListener("keyup",keyboardclick = (keyboard) => {
      if (keyboard.which === 13) {
        mainhide.classList.remove('mainunhide')
        searchbar.value = "";
        return mainhide.classList.remove("mainunhide");
      }
    }
  );









// const test1 = document.querySelector(".test1");
// const test2 = document.querySelector(".test2");
// const wind1 = document.querySelector(".wind1");
// const wind2 = document.querySelector(".wind2");
// const temp = document.querySelector(".temp");
// const humidity = document.querySelector(".humidity");
// const time = document.querySelector(".time");
// const geo1 = document.querySelector(".geo1");
// const geo2 = document.querySelector(".geo2");
// const city = document.querySelector(".city");
// const summary = document.querySelector(".summary");
// const kilometer = document.querySelector(".kilometer");
// const kilometer1 = document.querySelector(".kilometer1");
// const image = document.querySelector(".image");
// const cloudyicon = document.querySelector(".cloudyicon");
// const temp1 = document.querySelector(".temp1");
// const button = document.querySelector(".btn");
// // const farenheit = document.querySelector('.farenheit')
// // let miles = kilometer.textContent*0.62;
// // let farenheit = temp.textContent*2+30;
// const change = document.querySelector(".change");
// const searchbar = document.querySelector(".searchbar");
// const p = document.querySelector(".p");
// const searchbtn = document.querySelector(".searchbtn");

// window.addEventListener("load", function () {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;
//       console.log(latitude,longitude)
//       const options = {
//         method: "GET",
//         headers: {
//           "x-rapidapi-key":
//             "8cef5ad6bbmshf1b274980b222eap1f9e31jsn4eee448d0215",
//           "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
//         },
//       };
//       fetch(
//         `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`,
//         options
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           // console.log(data.current.condition);
//           const { temp_c, wind_kph } = data.current;
//           const { localtime, name } = data.location;
//           temp.innerText = temp_c;
//           humidity.innerText = data.current.humidity;
//           time.innerText = localtime;
//           geo1.innerText = data.location.lat;
//           geo2.innerText = data.location.lon;
//           city.innerText = name;
//           summary.innerText = data.current.condition.text;
//           kilometer.innerText = wind_kph;
//           let miles = kilometer.textContent * 0.62;
//           let farenheit = (temp.textContent * 9) / 5 + 32;
//           let celsius  = (farenheit - 32)*0.5556;
//           change.addEventListener("click", function(){
//               if(!searchbar.value ){
//                 function converter() {
//                   if (
//                     searchbar.value.length === 0 &&
//                     temp1.textContent === "°C" &&
//                     kilometer1.textContent === "kph wind"
//                   ) {
//                     temp1.textContent = "°F";
//                     temp.textContent = farenheit.toFixed(2);
//                     kilometer1.textContent = "mph wind";
//                     kilometer.textContent = miles.toFixed(2);

//                   } else {
//                     temp1.textContent = "°C";
//                     temp.innerText = celsius.toFixed(2);
//                     kilometer1.textContent = "kph wind";
//                     kilometer.textContent = data.current.wind_kph;
//                   }
//                 };
//                 converter()
//               }
//           })
//         });
//     });
//   }
// });

// // searchbtn.addEventListener(
// //   "click",input)
//   function input(){
//     p.textContent = searchbar.value;
//     // searchbar.value = "";
//     // console.log(p.innerHTML)

//     const options = {
//       method: "GET",
//       headers: {
//         "x-rapidapi-key": "8cef5ad6bbmshf1b274980b222eap1f9e31jsn4eee448d0215",
//         "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
//       },
//     };
//     fetch(
//       `https://weatherapi-com.p.rapidapi.com/current.json?q=${p.textContent}`,
//       options
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         const { temp_c, wind_kph } = data.current;
//         const { localtime, name } = data.location;
//         temp.innerText = temp_c;
//         humidity.innerText = data.current.humidity;
//         time.innerText = localtime;
//         geo1.innerText = data.location.lat;
//         geo2.innerText = data.location.lon;
//         city.innerText = name;
//         summary.innerText = data.current.condition.text;
//         kilometer.innerText = wind_kph;

//         let miles = kilometer.textContent * 0.62;
//         let farenheit = (temp.textContent * 9) / 5 + 32;
//         let celsius  = (farenheit - 32)*0.5556;
//         change.addEventListener("click", function(){
//           if(searchbar.value){
//             function converter2() {
//               if (
//                 temp1.textContent === "°C" &&
//                 kilometer1.textContent === "kph wind"
//               ) {
//                 temp1.textContent = "°F";
//                 temp.textContent = farenheit.toFixed(2);
//                 kilometer1.textContent = "mph wind";
//                 kilometer.textContent = miles.toFixed(2);

//               } else {
//                 temp1.textContent = "°C";
//                 temp.innerText = celsius.toFixed(2);
//                 kilometer1.textContent = "kph wind";
//                 kilometer.textContent = data.current.wind_kph;
//               }
//             };
//             converter2()
//           }
//       })
//         function imageChange() {
//           if (summary.innerText === "Cloudy") {
//             cloudyicon.src = "cloud.png";
//           } else if (
//             summary.innerText === "Sunny" ||
//             summary.innerText === "Clear"
//           ) {
//             cloudyicon.src = "sunny.png";
//           } else if (summary.innerText === "Rain") {
//             cloudyicon.src = "rainy.png";
//           } else if (summary.innerText === "Snow") {
//             cloudyicon.src = "snow.png";
//           }
//         }
//         imageChange();
//       })
//       .catch((err) => console.error(err));
//   };

//   // const searchbar = document.querySelector(".searchbar")
//   // const searchbtn = document.querySelector(".searchbtn")
//   const unorder = document.querySelector(".unorder")
//   const mainhide = document.querySelector('.mainhide')

//   function showrecommendedlist(rec){
//       let searchvalue = searchbar.value;
//       if(searchvalue === ""){
//           return mainhide.classList.remove("mainunhide");
//       }
//       mainhide.classList.add("mainunhide");
//       mainhide.innerHTML='',
//       rec.map(recomendeditem => {
//           // const unorder = document.createElement("ul")
//           // unorder.appendChild(li)
//           const li = document.createElement('li')
//           li.classList.add('added')
//           li.textContent = recomendeditem.name;
//           mainhide.appendChild(li);
//           // console.log(mainhide.children)
//           li.addEventListener('click',function(){
//             searchbar.value = li.textContent;
//             mainhide.classList.remove('mainunhide')
//             input();
//           })
//             // console.log(mainhide.childNodes)
//           // console.log(recomendeditem);
//       })
//   }

//   async function filtercountry() {
//       const response = await fetch("./cities.json");
//     //   const response = await fetch("http://localhost:1305",{
//     //     method:'get',
//     //     headers:{'Content-Type':'application/json'},
//     // })
//       const countrylist = await response.json();
//       let searchvalue = searchbar.value;
//       let recommendations = [];
//       if(searchvalue){
//       recommendations = countrylist.filter(data => {
//           // console.log(data.name);
//           // console.log(data.state_name);
//           // console.log(data.country_name);
//           return data.name.toLowerCase().includes(searchvalue.toLowerCase());
//       });
//       // console.log(recommendations)
//       showrecommendedlist(recommendations)
//       }
//   }

//   searchbar.addEventListener('keyup', filtercountry)
//   searchbar.addEventListener("keyup",keyboardclick = (keyboard) => {
//       if (keyboard.which === 13) {
//         input();
//         return mainhide.classList.remove('mainunhide')
//         searchbar.value = "";
//       }
//     }
//   );
