let user;
let global;

document.addEventListener('DOMContentLoaded', function () {
    const jokeForm = document.getElementById('joke-form');

    jokeForm.addEventListener('submit', getJokeRandom);
});



async function getJokeRandom(event){
    event.preventDefault();

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
            return alertLogin();
        }
        access_token = data.access_token;
        refresh_token = data.refresh_token;
    }

    await fetch("/api/jokes/random", {
        method: "get",
        headers: {
            authorization: `Bearer ${access_token}`
        }
    })
    .then(async res => {
        const data = await res.json();

        if (!data || data.error){
            return alertLogin();
        }
        displyJoke(data.content);
    })
    .catch(err => {
        console.log("Error generated");
        console.log(err);
    })

}
