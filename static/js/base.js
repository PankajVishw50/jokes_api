async function getAccessToken(){
    const refresh_token = localStorage.getItem("refresh_token");

    if(!refresh_token){
        // Display alert with a button to redirect to the login page
        const shouldRedirect = confirm('Login is required. Do you want to go to the login page?');
        if (shouldRedirect) {
            window.location.href = '/login';
        }
        return;
    }

    try{
        const response = await fetch("/api/refresh-token", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                refresh_token:refresh_token
            })
        });

        let data = await response.json();
        console.log("made request to /refresh")
        console.log("data is :")
        console.log(data);
        if (response.status === 200){
            console.log("gettign access_t is passed")
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            data.inStatus = true
            console.log(data);
            return data;
        }

        data.inStatus = false
        return data;
    }
    catch(err){
        console.log("error occured in getAccessToken");
        console.log(err);
    }

}

function alertLogin(){
    // Display alert with a button to redirect to the login page
    const shouldRedirect = confirm('Login is required. Do you want to go to the login page?');
    if (shouldRedirect) {
        window.location.href = '/login';
    }
    return;
    
}

function displyJoke(joke){
    const container = document.getElementById("joke-space");
    console.log(container);
    container.innerText = joke;
}

function parseToken(){
    let access = localStorage.getItem("access_token");

    if (!access){
        return false
    }

    let parts = access.split(".");
    let token = JSON.parse(atob(parts[1]));
    token.exp*=1000;
    const now = Date.now();

    if (now > token.exp){
        return false
    }

    return token;
}

async function routeTo(){
    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");

    if (!access_token && !refresh_token){
        return alertLogin();
    }

    if (!access_token || !parseToken()){
        console.log("need access token first")
        const data = await getAccessToken();
        console.log("check from main function: ")
        console.log(data);

        if (!data.inStatus){
            console.log("data will return false")
            alertLogin();
            return false
        }
        access_token = data.access_token;
        refresh_token = data.refresh_token;
    }

    return true 
}
