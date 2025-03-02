const email = document.querySelector('.email');
const password = document.querySelector('.password');

document.querySelector('.login').addEventListener('click', () => {

    if (email.value === profile.email && password.value === profile.password) {
        email.classList.remove('is-invalid');
        password.classList.remove('is-invalid');
        email.classList.add('is-valid');
        password.classList.add('is-valid');
        document.querySelector('.invalid').innerHTML = '';

        // Store login status
        localStorage.setItem("auth", "true");

        setTimeout(() => {
            window.location.replace("home.html");
        }, 1000);

    } else {
        email.classList.remove('is-valid');
        password.classList.remove('is-valid');
        email.classList.add('is-invalid');
        password.classList.add('is-invalid');
        document.querySelector('.invalid').innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

            <strong>Invalid Email or Password!</strong>
        </div>
        `;
    }
});
