// const d=document;   
const name1=d.querySelector(".name1");
const signUpPage=d.querySelector(".form1");
const emailBox1=d.querySelector(".email1");
const passwordBox1=d.querySelector(".password1");
const confirmPasswordBox1=d.querySelector(".confirmPassword1");
const role1=d.querySelector(".role1");

async function signUpHelper(json) {
    console.log(json);

    const backendResponse = await axios.post("http://localhost:3000/api/users/signUp",json);
    
    if (backendResponse.data.status === "user created") {
      alert("Account Created ");
    // location.assign("/profile");

      //  frontent browser
     
    } else {
      alert("Wrong Input Fields . Please check them");
    }
  } 
  if (signUpPage) {
    signUpPage.addEventListener("submit", function (e) {
      // default behaviour 
    console.log("asdasd");

      e.preventDefault();
      const name=name1.value;
      const email = emailBox1.value;
      const password = passwordBox1.value;
      const confirmPassword = confirmPasswordBox1.value;
      const role=role1.value;
      console.log(email+" "+password);

      signUpHelper({
			
            
        "email": email,
        "password":password,
        "confirmPassword":confirmPassword,
        "name":name,
        "role":role
        
    });
        })
  }
  
