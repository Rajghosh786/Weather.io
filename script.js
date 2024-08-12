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
const kilometer1 = document.querySelector('.kilometer1')
const image = document.querySelector('.image')
const cloudyicon = document.querySelector(".cloudyicon")
const temp1 = document.querySelector('.temp1')
const button = document.querySelector('.btn')
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
                const {temp_c,wind_kph} = data.current
                const {localtime,name} = data.location
                temp.innerText = temp_c;
                humidity.innerText = data.current.humidity;
                time.innerText = localtime;        
                geo1.innerText = data.location.lat;
                geo2.innerText = data.location.lon;
                city.innerText = name;
                summary.innerText = data.current.condition.text;
                kilometer.innerText = wind_kph;
                let miles = kilometer.textContent*0.62;
                let farenheit = temp.textContent*2+30;
                change.addEventListener("click",function(){ 
                    if(temp1.textContent === "°C" && kilometer1.textContent === "kph wind"){
                        temp1.textContent = "°F"
                        temp.textContent = farenheit
                        kilometer1.textContent = "mph wind"
                        kilometer.textContent = miles
                    }else{
                        temp1.textContent = "°C"
                        temp.innerText = data.current.temp_c;
                        kilometer1.textContent = "kph wind"
                        kilometer.textContent = data.current.wind_kph
                    }
                })
            })
        })    
    }
})


searchbar.addEventListener("keyup",keyboardclick=(keyboard)=>{
    if(keyboard.which === 13){
        input();
    }
})
searchbtn.addEventListener("click",input=()=>{
    p.textContent = searchbar.value;

    const options = {
        	method: 'GET',
        	headers: {
        		'x-rapidapi-key': '8cef5ad6bbmshf1b274980b222eap1f9e31jsn4eee448d0215',
        		'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        	}  
        }
            fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${p.textContent}`, options)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                const {temp_c,wind_kph} = data.current
                const {localtime,name} = data.location
                temp.innerText = temp_c;
                humidity.innerText = data.current.humidity;
                time.innerText = localtime;        
                geo1.innerText = data.location.lat;
                geo2.innerText = data.location.lon;
                city.innerText = name;
                summary.innerText = data.current.condition.text;
                kilometer.innerText = wind_kph;

                let miles = kilometer.textContent*0.62;
                let farenheit = temp.textContent*2+30;
                change.addEventListener("click",function(){ 
                    if(temp1.textContent === "°C" && kilometer1.textContent === "kph wind"){
                        temp1.textContent = "°F"
                        temp.textContent = farenheit
                        kilometer1.textContent = "mph wind"
                        kilometer.textContent = miles
                    }else{
                        temp1.textContent = "°C"
                        temp.innerText = data.current.temp_c;
                        kilometer1.textContent = "kph wind"
                        kilometer.textContent = data.current.wind_kph
                    }
                })
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
