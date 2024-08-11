let isShow = true;
const test1=document.querySelector('.test1')
const test2=document.querySelector('.test2')
const wind1=document.querySelector('.wind1')
const wind2=document.querySelector('.wind2')
const temp = document.querySelector('.temp')
const humidity = document.querySelector('.humidity')
const time = document.querySelector('.time')
const geo1 = document.querySelector('.geo1')
const geo2 = document.querySelector('.geo2')
const city = document.querySelector('.city')
const summary = document.querySelector('.summary')
const kilometer = document.querySelector('.kilometer')
const image = document.querySelector('.image')
const cloudyicon = document.querySelector(".cloudyicon")
const temp1 = document.querySelector('.temp1')
const button = document.querySelector('.btn')
const farenheit = document.querySelector('.farenheit')
const miles = document.querySelector('.miles')
const change = document.querySelector('.change')

const searchbar = document.querySelector('.searchbar')
const p = document.querySelector('.p')
const searchbtn = document.querySelector('.searchbtn')



 window.addEventListener('load',function(){ 
     if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(position=>{
            const latitude=position.coords.latitude
            const longitude=position.coords.longitude
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '8cef5ad6bbmshf1b274980b222eap1f9e31jsn4eee448d0215',
                    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
                        }  
                }
            fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`, options)
            .then(response => response.json())
            .then(data => {               
                const {temp_c,temp_f,wind_kph,wind_mph} = data.current
                const {localtime,name} = data.location
                farenheit.innerText = temp_f;
                temp.innerText = temp_c;
                humidity.innerText = data.current.humidity;
                time.innerText = localtime;        
                geo1.innerText = data.location.lat;
                geo2.innerText = data.location.lon;
                city.innerText = name;
                summary.innerText = data.current.condition.text;
                kilometer.innerText = wind_kph;
                miles.innerText = wind_mph;
            })
        })    
    }
})

searchbtn.addEventListener("click",input=()=>{
    p.innerHTML = searchbar.value;

    const options = {
        	method: 'GET',
        	headers: {
        		'x-rapidapi-key': '8cef5ad6bbmshf1b274980b222eap1f9e31jsn4eee448d0215',
        		'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        	}  
        }
            fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${p.innerHTML}`, options)
            .then(response => response.json())
            .then((data) => {
                // console.log(data.current.condition);
                const {temp_c,temp_f,wind_kph,wind_mph} = data.current
                const {localtime,name} = data.location
                farenheit.innerText = temp_f;
                temp.innerText = temp_c;
                humidity.innerText = data.current.humidity;
                time.innerText = localtime;        
                geo1.innerText = data.location.lat;
                geo2.innerText = data.location.lon;
                city.innerText = name;
                summary.innerText = data.current.condition.text;
                kilometer.innerText = wind_kph;
                miles.innerText = wind_mph;
                function imageChange(){
                    if(summary.innerText === "Cloudy"){
                        cloudyicon.src="cloud.png"
                    }else if(summary.innerText === "Sunny" || summary.innerText === "Clear"){
                        cloudyicon.src="sunny.png"
                    }else if(summary.innerText === "Rain"){
                        cloudyicon.src="rainy.png"
                    }else if(summary.innerText === "Snow"){
                        cloudyicon.src="snow.png"
                    }
                }
                imageChange();
                })

            .catch(err => console.error(err));
        });
        change.addEventListener("click",function(){ 
            if(isShow){                 
                test1.style.display = "block";
                test2.style.display = "none";
                wind1.style.display = "block";
                wind2.style.display = "none";
                isShow = false
            }else{
                test1.style.display = "none"
                test2.style.display = "block";
                wind1.style.display = "none";
                wind2.style.display = "block";
                isShow = true
                }
            })
//enter button not working was not working for me
//function multiplication toggle was not working for me

