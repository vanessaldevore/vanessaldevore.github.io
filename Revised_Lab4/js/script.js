//event listensers
document.getElementById("zip").addEventListener("change", displayCity);
document.addEventListener("DOMContentLoaded", displayStates);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("click", getSuggestedPassword);
document.querySelector("#signupForm").addEventListener("submit", function(event) {
    validateForm(event);
});

//functions

//displating city from web api after entering a zipcode
async function displayCity() {
    let zipInput = document.querySelector("#zip");
    let zipValue = zipInput.value;
    let zipCodeError = document.querySelector("#zipCodeError");
    //console.log(zipcode);
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipValue}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    //checking if zip code is valid and displaying error message if not
    if (zipValue.length >= 5 && data.city === undefined) {
        zipCodeError.textContent = "Zip code not found";
        zipInput.style.backgroundColor = "lightcoral";
       } else {
        zipCodeError.textContent = "";
        zipInput.style.backgroundColor = "lightgreen";
       }
        
    document.querySelector("#city").textContent = data.city;
    document.querySelector("#latitude").textContent = data.latitude;
    document.querySelector("#longitude").textContent = data.longitude;
}

// displaying all states from web api in dropdown menu
async function displayStates() {
    let stateSelect = document.querySelector("#state");
    stateSelect.innerHTML = "<option value=''>Select a State</option>";

    let url = `https://csumb.space/api/allStatesAPI.php`;
    let response = await fetch(url);
    let data = await response.json();

    for (let i = 0; i < data.length; i++) {
        let stateName = data[i].state;
        let stateCode = data[i].usps.toLowerCase();
        stateSelect.innerHTML += `<option value="${stateCode}">${stateName}</option>`;
    }
}

//displaying counties from web api after selecting a state
async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option>Select County</option>";
    for (let i = 0; i < data.length; i++) {
        countyList.innerHTML += `<option>${data[i].county}</option>`;
    }
}

//checking if username is available from web api
async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameAvailError = document.querySelector("#usernameAvailError");
    if (data.available) {
        usernameAvailError.textContent = " Username is available";
        usernameAvailError.style.color = "green";
    } else {
        usernameAvailError.textContent = " Username is not available";
        usernameAvailError.style.color = "red";
    }   
}

//get suggested password from API and display it in password input when clicked on
async function getSuggestedPassword() {
    let suggestedPwd = document.querySelector("#suggestedPwd");
    let url = `https://csumb.space/api/suggestedPassword.php?length=8`;
    try {
       const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
       const data = await response.json();
       console.log(data);
    
       suggestedPwd.textContent = " Suggested Password: " + data.password;


       } catch (err) {
             if (err instanceof TypeError) {
                alert("Error accessing API endpoint (network failure)");
              } else {
                alert(err.message);
              }
      }  //catch
}

//validating form data
function validateForm(e) {
    let isValid = true;

    //checking if username is empty
    let usernameInput = document.querySelector("#username");
    if (usernameInput.value.length == 0) {
        document.querySelector("#usernameAvailError").innerHTML = " Username cannot be empty";
        isValid = false;
    }

    //checking if passwords match and are at least 6 characters long
    let passwordInput = document.querySelector("#password");
    let retypePasswordInput = document.querySelector("#retypePassword");
    let passwordStatus = document.querySelector("#passwordError");
    if (retypePasswordInput.value !== passwordInput.value) {
        retypePasswordInput.style.backgroundColor = "lightcoral";
        passwordInput.style.backgroundColor = "lightcoral";
        passwordStatus.textContent = "Passwords do not match";
        isValid = false;
    } else if (retypePasswordInput.value.length < 6) {
        passwordStatus.textContent = "Password is too short";
        passwordInput.style.backgroundColor = "lightcoral";
        isValid = false;
    } else {
        retypePasswordInput.style.backgroundColor = "lightgreen";
    }

    //check username has at least 3 characters
    let usernameStatus = document.querySelector("#usernameLenError");
    if (usernameInput.value.length < 3) {
        usernameStatus.textContent = "Username must be at least 3 characters long";
        usernameStatus.style.color = "red";
        usernameInput.style.backgroundColor = "lightcoral";
        isValid = false;
        }    

    if (!isValid) {
        e.preventDefault();
    }

}