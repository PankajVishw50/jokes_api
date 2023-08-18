
document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.getElementById('logout-link');  
    logoutLink.addEventListener("click", linkLogout);
    
  });


async function linkLogout(event){
  event.preventDefault();

  const _result = await routeTo();

  if (_result === true){
    try{
      const response = await fetch("/logout", {
        method: "get", 
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });

      if (response.status === 200){
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        window.location.href = "/login";
      } else {
          alert('Something went wrong');
      }
    }catch(err){
      console.log("Error generate ", err);
    };

  }

}






  