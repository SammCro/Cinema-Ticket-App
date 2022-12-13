let selectedSeats = {selected:  []};
let countAndPrice = {count : 0,price :0};

//Set the id of seats.
let seats = document.querySelectorAll(".container .seat");
let seatId = 1;
seats.forEach(gorev => ider(gorev));
function ider(gorev){
    gorev.setAttribute("id",seatId);
    seatId++;
}
//Which movie selected.
let movie = document.getElementById("movie");
movie.addEventListener("change",function () {
    calculatePrice();
})
let countSeats = document.getElementById("count");
let price = document.getElementById("amount");

//Local storage process
if(localStorage.getItem("countAndPrice")!=null){
    
    let localCountandPrice= JSON.parse(localStorage.getItem("countAndPrice"));
    
    countSeats.innerText = localCountandPrice.count;
    price.innerText = localCountandPrice.price;   
}
if(localStorage.getItem("selectedSeats") != null){
    let selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    console.log(selectedSeats);
    
    for (const seat of seats) {
        if(selectedSeats.selected.includes(seat.id)){
            seat.classList.add("selected");
        }
    }
}
if(localStorage.getItem("selectedMovie")!=null){
    movie.selectedIndex = localStorage.getItem("selectedMovie");
}

//Seat select process
seats.forEach(seat => seat.addEventListener("click",function clicked() {
    if(this.classList.contains("selected")){
        this.classList.remove("selected");
        calculatePrice();
    }
    else{
        if(!this.classList.contains("reserved")){
            this.classList.add("selected");
            calculatePrice();
        }
    }
}));

// Calculate and print price.
function calculatePrice(){
    let selectedCount = 0 ;
    let moviePrice = movie.value;
    
    seats.forEach(seat => seat.classList.contains("selected") ? ++selectedCount : "");
    
    countSeats.innerText = selectedCount;
    price.innerText = selectedCount*moviePrice;

    countAndPrice.count = selectedCount;
    countAndPrice.price = selectedCount*moviePrice;

    
    for (const seat of seats) {
        if(!selectedSeats.selected.includes(seat.id) && seat.classList.contains("selected")){
            selectedSeats.selected.push(seat.id);
        }
    }
    localStorage.setItem("selectedSeats",JSON.stringify(selectedSeats));
    localStorage.setItem("countAndPrice",JSON.stringify(countAndPrice));
    localStorage.setItem("selectedMovie",movie.selectedIndex);
}