
document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('post-form');

    postForm.addEventListener('submit', postJoke);
});


async function postJoke(event){
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    console.log("inside");


    const _result = await routeTo();

    if (_result === true){
        try{
            const response = await fetch("/api/joke",{
                method: "post",
                headers: {
                    authorization: `Bearer ${localStorage.access_token}`,
                },
                body: formData
            });

            const data = await response.json();

            if (response.status === 200){
                return alert("Joke Posted Successfully")
            }
            return alert(data.error.msg);
        }catch(err){
            return alert("Something went wrong");
        }
    }

}