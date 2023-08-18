
document.addEventListener('DOMContentLoaded', function () {
    loadMyJokes();
    loadMe();
});


function createJokeDiv(content) {
    const div = document.createElement('div');
    div.className = 'joke-container';
    
    const p = document.createElement('p');
    p.textContent = content;
    
    div.appendChild(p);
    
    return div;
}
  

async function loadMyJokes(){
    const _result = routeTo();

    if (_result) {
        try{
            const response = await fetch("/api/jokes", {
                method: "get",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            const data = await response.json();
            if (response.status == 200){
                const container = document.getElementById('jokes-container'); // Assuming you have a container element with this id

                data.forEach(element => {
                    const _div = createJokeDiv(element.content);
                    console.log(_div);
                    container.appendChild(_div);
                })
            }else{
                alert("something wrong happened. try to refresh")
            }
        }catch(err){
            console.log("error: ", err);
            alert("Error")
        }
    }
}

async function loadMe(){
    const _result = routeTo();

    if (_result){
        try{
            const response = await fetch("/api/me", {
                method: "get",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            const data = await response.json();
            if (response.status === 200){
                const nameDiv = document.querySelector(".name");
                nameDiv.innerHTML = data.username; 
            }
        }catch(err){
            console.log("error: ", err);
        }
    }
}