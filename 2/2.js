const button1 = document.getElementById("send1")
const button2 = document.getElementById("send2")
const button3 = document.getElementById("send3")

button1.addEventListener("click", () =>{
    const screenWidth = window.screen.width
    const screenHeight = window.screen.height

    alert(`Ширина экрана ${screenWidth}, высота экрана ${screenHeight}`)
})

button2.addEventListener("click", () =>{
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight

    alert(`Ширина экрана ${screenWidth}, высота экрана ${screenHeight}`)
})

button3.addEventListener("click", () =>{
    const screenWidth = document.documentElement.clientWidth
    const screenHeight = document.documentElement.clientHeight

    alert(`Ширина экрана ${screenWidth}, высота экрана ${screenHeight}`)
})