let userArray = localStorage.getItem('lsUser') ?
    JSON.parse(localStorage.getItem('lsUser'))
    : [];

localStorage.setItem("lsUser", JSON.stringify(userArray));
let userData = JSON.parse(localStorage.getItem('lsUser'));


let loggedInUser = localStorage.getItem('lsUserLoggedIn') ?
    JSON.parse(localStorage.getItem('lsUserLoggedIn'))
    : {};

localStorage.setItem("lsUserLoggedIn", JSON.stringify(loggedInUser));
let loggedInData = JSON.parse(localStorage.getItem('lsUserLoggedIn'));


let userRecipient = localStorage.getItem('lsUserRecipient') ?
    JSON.parse(localStorage.getItem('lsUserRecipient'))
    : {};

localStorage.setItem("lsUserRecipient", JSON.stringify(userRecipient));
let userRecipientData = JSON.parse(localStorage.getItem('lsUserRecipient'));


if (localStorage.getItem('lsUserLoggedIn') === "{}") {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("userInfo").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
} else {
    document.getElementById("dashboard").style.display = "flex block";
    document.getElementById("userInfo").style.display = "block";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("userID").innerHTML = loggedInData.userName;
    document.getElementById("userBalance").innerHTML = "Balance: ₱" + loggedInData.balance;
}

function storeData() {
    let newFullName = document.getElementById("createFullName");
    let newUserName = document.getElementById("createUserName");
    let newEmail = document.getElementById("createEmail");
    let newPassword = document.getElementById("createPassword");
    let newBalance = document.getElementById("createBalance");

    let newUser = {
        fullName: `${newFullName.value}`,
        userName: `${newUserName.value}`,
        email: `${newEmail.value}`,
        balance: `${newBalance.value}`,
        password: `${newPassword.value}`,
    };

    for (let i = 0; i < userData.length; i++) {
        if (newUserName.value === userData[i].userName) {
            alert("Username already exist!");
            return;
        }
    }
    userArray.push(newUser);
    localStorage.setItem("lsUser", JSON.stringify(userArray));
    alert("Account successfully created!");
    document.getElementById("signup-form").reset();
    window.location.reload();
}

function login() {
    let loginUserName = document.getElementById("login-UserName").value;
    let loginPassword = document.getElementById("login-Password").value;
    for (let i = 0; i < userData.length; i++) {
        if (loginUserName === userData[i].userName &&
            loginPassword === userData[i].password) {
            document.getElementById("dashboard").style.display = "flex block";
            document.getElementById("login-form").style.display = "none";
            localStorage.setItem("lsUserLoggedIn", JSON.stringify(userData[i]));
            alert("Login successful!");
            return;
        }
    }
    alert("Invalid username/password!");
}

let signupButton = document.getElementById("signup").addEventListener("click", signupDisplay);
function signupDisplay() {
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
}

let loginButton = document.getElementById("login").addEventListener("click", loginDisplay);
function loginDisplay() {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

let depositContentbtn = document.getElementById("depositContentbtn").addEventListener("click", depositDisplay);
let withdrawContentbtn = document.getElementById("withdrawContentbtn").addEventListener("click", withdrawDisplay);
let transferContentbtn = document.getElementById("transferContentbtn").addEventListener("click", transferDisplay);



function depositDisplay() {
    document.getElementById("depositContent").style.display = "block";
    document.getElementById("withdrawContent").style.display = "none";
    document.getElementById("transferContent").style.display = "none";
}

function withdrawDisplay() {
    document.getElementById("depositContent").style.display = "none";
    document.getElementById("withdrawContent").style.display = "block";
    document.getElementById("transferContent").style.display = "none";
}

function transferDisplay() {
    document.getElementById("depositContent").style.display = "none";
    document.getElementById("withdrawContent").style.display = "none";
    document.getElementById("transferContent").style.display = "block";
}

function depositMoney() {
    let depositAmt = document.getElementById("depositAmount");

    for (let i = 0; i < userArray.length; i++) {
        if (loggedInData.userName === userData[i].userName && depositAmt.value > 0) {
            loggedInData.balance = +loggedInData.balance + +depositAmt.value;
            userArray[i] = loggedInData;
            localStorage.setItem("lsUser", JSON.stringify(userArray));
            localStorage.setItem("lsUserLoggedIn", JSON.stringify(userArray[i]));
            alert("Deposit complete!")
            return;
        }
    }
    alert("Invalid amount!");
}

function withdrawMoney() {

    let withdrawAmt = document.getElementById("withdrawAmount");

    for (let i = 0; i < userArray.length; i++) {
        if (loggedInData.userName === userData[i].userName &&
            withdrawAmt.value <= loggedInData.balance && withdrawAmt.value > 0) {
            loggedInData.balance = +loggedInData.balance - +withdrawAmt.value;
            userArray[i] = loggedInData;
            localStorage.setItem("lsUser", JSON.stringify(userArray));
            localStorage.setItem("lsUserLoggedIn", JSON.stringify(userArray[i]));
            alert("Withdraw complete!")
            return;
        }
    }
    alert("Invalid amount!");
}

function transferMoney() {
    let transferAmt = document.getElementById("transferAmount");
    let recipient = document.getElementById("userRecipient");

    for (let i = 0; i < userData.length; i++) {
        if (recipient.value === userData[i].userName && recipient.value !== loggedInData.userName
            && transferAmt.value <= loggedInData.balance && transferAmt.value > 0) {
            //saves the recipient's data in the local storage and adds the transferred amount
            localStorage.setItem("lsUserRecipient", JSON.stringify(userData[i]));
            userRecipientData = JSON.parse(localStorage.getItem('lsUserRecipient'));
            userRecipientData.balance = +userRecipientData.balance + +transferAmt.value;
            userArray[i] = userRecipientData;

            loggedInData.balance = +loggedInData.balance - +transferAmt.value;
            localStorage.setItem("lsUserLoggedIn", JSON.stringify(loggedInData));
            for (let x = 0; x <= userData.length; x++) {
                if (loggedInData.userName === userData[x].userName) {
                    userArray[x] = loggedInData;
                    break;
                }
            }

            localStorage.setItem("lsUser", JSON.stringify(userArray));
            localStorage.removeItem("lsUserRecipient");
            alert("Transfer complete!");
            return;
        }
    }
    alert("Invalid recipient/amount!");
}

document.getElementById("logoutBtn").addEventListener("click", logout);
function logout() {
    localStorage.removeItem("lsUserLoggedIn");
    alert("Successfully logged out!");
    window.location.reload();
}


    //create another db for recepient then access the user to transfer