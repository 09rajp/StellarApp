$(document).ready(function(){

    var topics =["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];

addTopics()

$(".btn-default").on("click", function(){
    var userInput = $(".form-control").val()
    ***FACTS-API***.push(userInput)
    console.log(user_input)
    // addTopics()
    $(".form-control").val("")
})

function addTopics() {
    
}


 
})