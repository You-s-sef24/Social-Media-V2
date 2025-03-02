document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("auth")) {
        if (!window.location.pathname.includes("login.html")) {
            window.location.replace("login.html");
        }
    }
    document.querySelector('.logout').addEventListener('click', () => {
        localStorage.removeItem("auth");
        setTimeout(() => {
            window.location.replace("login.html");
        }, 1000);
    });
});

updateNavbar();

document.querySelector('.confirm-email').addEventListener('click',()=>{
    let oldPass=document.querySelector('.old-pass').value;
    let newEmail=document.querySelector('.new-email').value;
    if (oldPass===profile.password && !newEmail.includes(" ")) {
        profile.updateEmail(newEmail);
        document.querySelector('.old-pass').value='';
        document.querySelector('.new-email').value='';
        document.querySelector('.error').innerHTML=`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>Email Changed Successfully</strong>
            </div>
        `;
    }
    else if(oldPass!==profile.password){
        document.querySelector('.error').innerHTML=`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>Incorrect Password</strong>
            </div>
        `;
    }else{
        document.querySelector('.error').innerHTML=`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>Invalid Email Address</strong>
            </div>
        `;
    }
});

document.querySelector('.confirm-pass').addEventListener('click',()=>{
    let currentPassword=document.querySelector('.current-pass').value;
    let newPassword=document.querySelector('.new-pass').value;
    if (currentPassword===profile.password && newPassword.length>=8) {
        profile.updatePassword(newPassword);
        document.querySelector('.current-pass').value='';
        document.querySelector('.new-pass').value='';
        document.querySelector('.error').innerHTML=`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>Password Changed Successfully</strong>
            </div>
        `;
    }
    else if(currentPassword!==profile.password){
        document.querySelector('.error').innerHTML=`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>Incorrect Password</strong>
            </div>
        `;
    }else{
        document.querySelector('.error').innerHTML=`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>Weak Password</strong>
            </div>
        `;
    }
});


document.getElementById('toggleOldPassword2').addEventListener('click', function() {
    const passwordInput = document.getElementById('oldPasswordInput2');
    const icon = this.querySelector('i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('bx-hide');
        icon.classList.add('bx-show');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('bx-show');
        icon.classList.add('bx-hide');
    }
});
document.getElementById('toggleOldPassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('oldPasswordInput');
    const icon = this.querySelector('i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('bx-hide');
        icon.classList.add('bx-show');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('bx-show');
        icon.classList.add('bx-hide');
    }
});
document.getElementById('toggleNewPassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('newPasswordInput');
    const icon = this.querySelector('i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('bx-hide');
        icon.classList.add('bx-show');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('bx-show');
        icon.classList.add('bx-hide');
    }
});
