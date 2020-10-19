// alert("I will go to client");  
const d=document;   
const loginForm=d.querySelector(".login");
const emailBox=d.querySelector(".email");
const passwordBox=d.querySelector(".password");

async function loginHelper(json) {
    console.log(json);

    const backendResponse = await axios.post("http://localhost:3000/api/users/login",json);

    console.log(backendResponse.data.status);
    if (backendResponse.data.status === "succ") {
      alert("user Logged In");
    location.assign("/profile");

      //  frontent browser
     
    } else {
      alert("Wrong Email or password");
    }
  }
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      // default behaviour 
      e.preventDefault();
      const email = emailBox.value;
      const password = passwordBox.value;
      console.log(email+" "+password);

      loginHelper({
			
            
        "email": email,
        "password":password
        
    });
        })
  }


