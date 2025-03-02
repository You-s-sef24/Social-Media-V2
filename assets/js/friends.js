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

    setTimeout(UpdateFriends,500);
});

updateNavbar();

function UpdateFriends(){
    document.querySelector('.container').innerHTML='';
    profile.people.forEach((one,index)=>{
        document.querySelector('.container').innerHTML+=`
            <div class="row d-flex align-items-center">
                <div class="col-1">
                    <img src="assets/imgs/Blank profile pic.webp" class="w-100 rounded-circle">
                </div>
                <div class="col">
                    <p class="fw-bold h5 m-0">${one}</p>
                </div>
                <div class="col-3 added fade show">
                    <button class="btn btn-baby add-friend" data-index="${index}">Add Friend</button>
                </div>
            </div>
            <hr>
        `;
    
        document.querySelectorAll('.add-friend').forEach((friend)=>{
            friend.addEventListener('click',()=>{
                const friendIndex=friend.dataset.index;
                profile.friends.push(profile.people[friendIndex]);
                profile.people.splice(friendIndex,1);
                event.target.classList.add('disabled');
                event.target.textContent='Added!';
                profile.saveToStorage();
                setTimeout(UpdateFriends,1000);
            });
        });
    });
}