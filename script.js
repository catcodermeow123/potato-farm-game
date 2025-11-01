let cash = 50;
let farm = {}
let tax_lvl = 0
reset(false)
let growTimeoutId = null;
function cashc(change){
    cash += change;
    if(cash >= 600 && tax_lvl == 0){
        window.alert("you shall pay taxes (25%)");
        cash = Math.floor(cash * 3/4);
        tax_lvl++;
    }else if(cash >= 1000 && tax_lvl == 1){
        window.alert("you shall pay taxes (25%)");
        cash = Math.floor(cash * 3/4);
        tax_lvl++;
    }else if(cash >= 1500 && tax_lvl == 2){
        window.alert("you shall pay taxes (25%)");
        cash = Math.floor(cash * 3/4);
        tax_lvl++;
    }else if(cash >= 3000 && tax_lvl == 3){
        window.alert("you shall pay taxes (50%)");
        cash = Math.floor(cash * 1/2);
        tax_lvl++;
    }else if(tax_lvl == 4){
        window.alert("From now on, 10% of your income will become tax. Enjoy!");
        tax_lvl++;
    }else if(tax_lvl == 5){
        if(change > 0){
        cash -= Math.floor(change * 1/10);}
    }
    document.querySelector(".cash").textContent = "💰 " + cash;
}
function buy(type, amount, cost){
    if(cost > cash){
        window.alert("you are too broke");
        return;
    }
    if (growTimeoutId !== null) {
        clearTimeout(growTimeoutId);
        growTimeoutId = null;
    }
    if(document.querySelector(".grow-btn").textContent == "Growing..."){
    document.querySelector(".grow-btn").textContent = "Start Growing (takes 10 seconds)";}
    cashc(-cost)
    switch(type){
        case "p":
            farm.p += amount;
            udfarm();
            break;
        case "bp":
            farm.bp += amount;
            udfarm();
            break;
        case "f":
            farm.f = true
            document.querySelector(".grow-btn").textContent = "Start Growing (takes 0.1 second because of fertilizer)"
            break;
        case "cp":
            farm.cp += amount;
            udfarm();
            break;
        case "bmbp":
            farm.bmbp += amount;
            udfarm();
            break;
    }
}
function udfarm(){
    let res = ""
    res = "<img src='./potato.png' style='width:30px; height:30px;'>".repeat(farm.p);
    if (farm.bp > 0){
        console.log("has big one");
        res += "<br>"+"<img src='./potato.png' style='width:50px; height:50px;'>".repeat(farm.bp);
    }
    if (farm.cp > 0){
        console.log("has cat one");
        res += "<br>"+"<img src='./catpotato.png' style='width:30px; height:30px;'>".repeat(farm.cp);
    }
    if (farm.bmbp > 0){
        console.log("has risky one");
        res += "<br>"+"<img src='./bombpotato.png' style='width:30px; height:30px;'>".repeat(farm.bmbp);
    }
    document.querySelector(".farm").innerHTML = res;
}
function grow(){
    for(let i = 0; i < farm.bmbp; i++){
    if(Math.floor(Math.random()*100)+1 <= 10){
        new Audio('./boom.wav').play()
        reset(false)
        document.querySelector(".farm").textContent = "No potatoes... yet.";
        document.querySelector(".grow-btn").textContent = "Start Growing (takes 10 seconds)";
        return
    }}
    cashc(30*farm.p);
    cashc(245*farm.bp);
    cashc(375*farm.cp);
    cashc(600*farm.bmbp);
    reset(true)
    if(!farm.p && !farm.bp && !farm.cp && !farm.bmbp){
    document.querySelector(".farm").textContent = "No potatoes... yet.";}
    document.querySelector(".grow-btn").textContent = "Start Growing (takes 10 seconds)";
    growTimeoutId = null;
}
function growing(){
    if (growTimeoutId !== null) {
        clearTimeout(growTimeoutId);
    }
    if (!farm.f){
    growTimeoutId = setTimeout(grow, 10000);}
    else{
        growTimeoutId = setTimeout(grow, 100);
        farm.f = false;
    }
    document.querySelector(".grow-btn").textContent = "Growing...";
}
function reset(cat){
    let cats = 0
    if(cat){
        cats = farm.cp
    }
    farm = {
        p:cats,
        bp:0,
        f:false,
        cp:0,
        bmbp:0
    };
    udfarm()
}
function info(){
    window.alert("[Potato] Income:5$\n"+
        "[Big Potato] Income:45$\n"+
        "[Fertilizer] Lets you grow potatoes faster, but lasts one generation\n"+
        "[Cat Potato] Income:75$\nLeaves a free potato behind when you grow it\n"+
        "[Bomb Potato] It can blow up with a 10% chance, but you earn 300$ when it does not\n"+
        ""
    )
}
function dev(taxl = 5){
    tax_lvl = taxl;
}
function ins(){
    if(document.querySelector(".farm").textContent == "No potatoes... yet." && cash < 25){
        window.alert("You earned 25$!")
        cash += 25;
        cashc(0)
    }else{
        window.alert("You have a potato or can buy one. You do not need this.")
    }
}
