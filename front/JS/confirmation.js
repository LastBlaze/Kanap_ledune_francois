let params = new URL(document.location).searchParams;
let id = params.get("id");
localStorage.clear();

document.getElementById("orderId").innerHTML = id;
