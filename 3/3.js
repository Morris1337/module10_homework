const message = document.getElementById("message")
const sendButton = document.getElementById("send")
const conteiner = document.getElementById("conteiner")
const btnGeolocation = document.getElementById("geolocation")



const webSocket = new WebSocket("wss://echo-ws-service.herokuapp.com")

webSocket.onopen = (event) =>{
  console.log(`${event} соединение открыто`)
}

webSocket.onclose = (event) =>{
    console.log(`${event} соединение закрыто`)
}

webSocket.onmessage = (event) => {
    chatMessage(event.data)
}


function chatMessage(message, alignLeft = true){
    const divConteiner = document.createElement("div")
    divConteiner.classList.add("textMessageCont")

    const textMessage = document.createElement("p")
    textMessage.classList.add("textMessage")
    textMessage.textContent = message;

    divConteiner.appendChild(textMessage)
    conteiner.appendChild(divConteiner)
    conteiner.scrollTop = conteiner.scrollHeight;

    if(alignLeft){
        divConteiner.classList.add("align-left")
        textMessage.style.color = "blue"
    }else{
        divConteiner.classList.add("align-right")
        textMessage.style.color = "green"
    }
}

sendButton.addEventListener("click", () =>{
   const getMessage =  message.value
   if(getMessage !== ""){
        webSocket.send(getMessage)
        chatMessage(getMessage, false)
        message.value = "";
   }
})

message.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        event.preventDefault();
        if(message !== ""){
            sendButton.click();
        }
    }
})

// const geolocationStatus = document.getElementById("status")
// const mapLink = document.getElementById("map-link")
const locationIcon = document.getElementById("locationIcon")

function geolocation(){

    const geolocationStatus = document.createElement("p")
    

    const error = () => {
        geolocationStatus.textContent = "Невозможно получить ваше местоположение"
    }

    const success = (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
    
        geolocationStatus.textContent = `Широта ${latitude}, Долгота ${longitude}`
        geolocationStatus.style.color = "green"
        geolocationStatus.classList.add("geolocation")
        const mapLink = document.createElement("a")
        mapLink.target = "_blank"
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
        mapLink.textContent = "Сылка на карту"
        mapLink.classList.add("geolocation")
        mapLink.style.color = "green"
        conteiner.appendChild(mapLink)
    }
    
    btnGeolocation.addEventListener("click", () => {
        // mapLink.href = "";
        // mapLink.textContent = "";
    
        if(!navigator.geolocation){
            geolocationStatus.textContent = "geolocation не поддерживается вашим браузером"
            geolocationStatus.classList.add("geolocation")
        }else{
            geolocationStatus.textContent = "Определение местоположение"
            geolocationStatus.style.color = "green"
            geolocationStatus.classList.add("geolocation")
            navigator.geolocation.getCurrentPosition(success, error)
        }
        conteiner.appendChild(geolocationStatus)
    })

}

geolocation();

btnGeolocation.addEventListener("mousedown", () => {
        locationIcon.setAttribute("href", "icon/geo-alt.svg");
    })

btnGeolocation.addEventListener("mouseup", () => {
    locationIcon.setAttribute("href", "icon/geo-alt-fill.svg");
})


// let locationIconIsClicked = false

// btnGeolocation.addEventListener("click", () => {
//         const newIconPath = locationIconIsClicked ? "icon/geo-alt-fill.svg" : "icon/geo-alt.svg"
//         locationIcon.setAttribute("href", newIconPath)

//         locationIconIsClicked = !locationIconIsClicked;
// })