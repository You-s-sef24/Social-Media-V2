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

    setTimeout(updateContainer, 500);
    setTimeout(updatePosts, 500);
    setTimeout(updateAbout, 500);
    setTimeout(updateFriends, 500);
});

updateNavbar();

function updateContainer() {
    const friendsNumber = profile.friends.length;
    document.querySelector('.container').innerHTML = `
                <div class="row d-flex justify-content-center align-items-center text-center text-md-start">
            <div class="col-5 col-md-2 rounded-circle d-flex justify-content-center align-items-center mb-2">
                <div class="profile rounded-circle">
                    <img class="w-100 h-100 rounded-circle profile-picture" src="${profile.image}">
                    <button class="rounded-circle edit-image px-2"><i class='bx bxs-camera'></i></button>
                </div>
            </div>
            <div class="col-12 col-md-5">
                <div class="col-12">
                    <h2 class="fw-bold m-0">${profile.name}</h2>
                </div>
                <div class="col-12 friends-number">
                ${friendsNumber > 1
                    ? `<p class="text-secondary fw-bold">${profile.friends.length} Friends</p>`
                    : `<p class="text-secondary fw-bold">${profile.friends.length} Friend</p>`
                }
                </div>
            </div>
            <div class="col-12 col-md-5 d-flex justify-content-center align-items-center">
                <button class="btn btn-baby" data-bs-toggle="modal" data-bs-target="#exampleModalLong"> Edit Profile <i
                        class='bx bxs-pencil'></i></button>
                <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Edit Profile</h5>
                                <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <label class="form-label">Edit Name</label>
                                <input type="text" class="form-control new-name mb-2" value="${profile.name}">

                                <label class="form-label">Edit Age</label>
                                <input type="date" class="form-control new-age mb-2" value="${profile.age}">

                                <label class="form-label">Edit Home</label>
                                <input type="text" class="form-control new-home mb-2" value="${profile.home}">

                                <label class="form-label">Edit University</label>
                                <input type="text" class="form-control new-uni mb-2" value="${profile.university}">

                                <label class="form-label">Edit Job</label>
                                <input type="text" class="form-control new-job mb-2" value="${profile.job}">
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button class="btn btn-baby save-profile" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr>

        <div class="row d-flex justify-content-center">
            <div class="col-12">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link baby active" id="posts-tab" data-bs-toggle="tab" data-bs-target="#posts"
                            role="tab">Posts</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link baby" id="about-tab" data-bs-toggle="tab" data-bs-target="#about"
                            role="tab">
                            About</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link baby" id="friends-tab" data-bs-toggle="tab" data-bs-target="#friends"
                            role="tab">Friends</button>
                    </li>
                </ul>
            </div>
            <div class="tab-content my-2 p-0">
                <div class="tab-pane active show fade" id="posts" role="tabpanel">
                    <div class="post-section row d-flex justify-content-center gap-3">
                    </div>
                </div>
                <div class="tab-pane about fade mb-5" id="about" role="tabpanel">
                </div>
                <div class="tab-pane friends fade mb-5" id="friends" role="tabpanel">
                </div>
            </div>
        </div>
    `;

    document.querySelector('.edit-image').addEventListener('click', () => {
        let fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);

        fileInput.addEventListener('change', function () {
            if (fileInput.files.length > 0) {
                let reader = new FileReader();
                reader.onload = function (event) {
                    let newImage = event.target.result;
                    profile.updateProfileImage(newImage);
                    document.querySelector('.profile-picture').src = newImage;
                    profile.saveToStorage();
                    profile.addPost("Updated my profile picture!", newImage);
                };
                reader.readAsDataURL(fileInput.files[0]);
            }
        });

        fileInput.click();
        setTimeout(updateNavbar,500);
        setTimeout(updatePosts,500);
    });

    document.querySelector('.save-profile').addEventListener('click', () => {
        const newName = document.querySelector('.new-name').value;
        const newAge = document.querySelector('.new-age').value;
        const newJob = document.querySelector('.new-job').value;
        const newHome = document.querySelector('.new-home').value;
        const newUni = document.querySelector('.new-uni').value;
        profile.updateName(newName);
        profile.updateAge(newAge);
        profile.updateJob(newJob);
        profile.updateHome(newHome);
        profile.updateUniversity(newUni);
        profile.saveToStorage();
        setTimeout(updateContainer,500);
        setTimeout(updatePosts,500);
        setTimeout(updateAbout,500);
    });
}

function updatePosts() {
    document.querySelector('.post-section').innerHTML = `
        <div class="col-12 col-md-4 bg-white rounded shadow p-3 h-75">
            <h4 class="fw-bold">Intro</h4>
            <p class="fw-bold text-secondary text-center">${profile.bio}</p>
            <button class="btn btn-baby edit-bio w-100 mb-3" data-bs-toggle="modal" data-bs-target="#editBio">Edit bio</button>
            <div class="modal fade" id="editBio" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
                aria-labelledby="modalTitleId" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalTitleId">Edit Bio</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" class="form-control new-bio" value="${profile.bio}">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-baby save-new-bio" data-bs-dismiss="modal">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row d-flex justify-content-center align-items-center mb-2">
                <div class="col-2 d-flex justify-content-center align-items-center">
                    <h5 class="fw-bold m-0"><i class='bx bxs-graduation'></i></h5>
                </div>
                <div class="col d-flex align-items-center">
                    <h5 class="fw-bold m-0">Studies at <span class="fw-bold m-0">${profile.university}</span>
                    </h5>
                </div>
            </div>
            <div class="row d-flex justify-content-center align-items-center mb-2">
                <div class="col-2 d-flex justify-content-center align-items-center">
                    <h5 class="fw-bold m-0"><i class="bx bxs-home"></i></h5>
                </div>
                <div class="col d-flex align-items-center">
                    <h5 class="fw-bold m-0">${profile.home}</h5>
                </div>
            </div>
            <div class="row d-flex justify-content-center align-items-center mb-2">
                <div class="col-2 d-flex justify-content-center align-items-center">
                    <h5 class="fw-bold m-0"><i class="bx bxl-linkedin-square"></i></h5>
                </div>
                <div class="col d-flex align-items-center">
                    <a class="fw-bold h5 baby link-underline link-underline-opacity-0 m-0"
                        href="${profile.linkedin}">Linkedin Profile</a>
                </div>
            </div>
            <div class="row d-flex justify-content-center align-items-center mb-2">
                <div class="col-2 d-flex justify-content-center align-items-center">
                    <h5 class="fw-bold m-0"><i class='bx bxl-instagram'></i></h5>
                </div>
                <div class="col d-flex align-items-center">
                    <a class="fw-bold h5 baby link-underline link-underline-opacity-0 m-0"
                        href="${profile.instagram}">Instagram Profile</a>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6">
            <div class="row">
                <div class="d-flex justify-content-center bg-white rounded shadow p-4 mb-3">
                    <div class="input-group me-1">
                        <input type="text" class="form-control new-text w-50" placeholder="What's in your mind">
                        <input type="file" class="d-none new-img" id="fileInput" accept="image/*">
                        <label for="fileInput" class="btn btn-warning text-white">Upload</label>
                    </div>
                    <button class="btn btn-warning text-white post w-25">Post</button>
                </div>
                <div class="col-12 posts p-0">
                </div>
            </div>
        </div>
    `;
    profile.posts.forEach((post, index) => {
        const formattedTime = timeAgo(post.postTime);
        const isUserPost = post.poster === profile.name;
        if (profile.posts.length-2===0) {
            document.querySelector('.posts').innerHTML=`
                <p class="text-center bg-white py-3 rounded shadow">No posts yet</p>
            `;
            return;
        }
        if (isUserPost) {
            if (post.postImg !== '') {
                document.querySelector('.posts').innerHTML += `
                        <div class="card rounded shadow pb-1 mb-3">
                            <div class="card-body">
                                <div class="row d-flex align-items-center mb-2">
                                    <div class="col-1 d-flex justify-content-center align-item-center text-center poster-img rounded-circle p-0">
                                        ${isUserPost
                        ? `<a href="profile.html" class="rounded-circle"><img class="w-75 rounded-circle" src="${profile.image}"></a>`
                        : `<img class="w-75 rounded-circle" src="${post.posterImg}">`
                    }
                                    </div>
                                    <div class="col-7 justify-content-start poster p-0">
                                       ${isUserPost
                        ? `<a href="profile.html" class="link-underline link-underline-opacity-0 card-title baby fw-bold m-0">${post.poster}</a>`
                        : `<h5 href="profile.html" class="link-underline link-underline-opacity-0 card-title baby fw-bold m-0">${post.poster}</h5>`
                    }
                                    </div>
                                    <div class="col-4 d-flex justify-content-end align-items-center">
                                        <small class="text-muted post-time">${formattedTime}</small>
                                        <div class="dropdown">
                                            <button class="btn border-0" id="dropdownMenuButton" data-bs-toggle="dropdown"><i class='bx bx-dots-vertical-rounded'></i></button>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <li><button class="dropdown-item delete-post" data-index="${index}">Delete</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p class="card-text post-text baby">${post.postText}</p>
                            </div>
                            <div class="post-img text-center">
                            <img src="${post.postImg}"class="card-img-bottom rounded">
                            <hr class="img-hr baby w-100 my-2">
                            </div>
                            <div class=" likes row" data-post-index="${index}">
                                ${post.postLikes > 0
                        ? `<p class="ps-3 mb-2 fw-bold baby">${post.postLikes} <i class='bx bxs-like'></i></p>`
                        : ``
                    }
                            </div>
                            <div class="input-group">
                                ${post.postLikes > 0
                        ? `<button class="btn btn-baby text-white like w-50" data-post-index="${index}">Unlike</button>`
                        : `<button class="btn btn-baby text-white like w-50" data-post-index="${index}">Like</button>`
                    }
                                <button class="btn btn-baby share w-50" data-post-index="${index}">Share</button>
                            </div>
                        </div>
                `;
            } else {
                document.querySelector('.posts').innerHTML += `
                            <div class="card rounded shadow pb-1 mb-3">
                            <div class="card-body pb-0">
                                <div class="row d-flex align-items-center mb-2">
                                    <div class="col-1 d-flex justify-content-center align-item-center text-center poster-img rounded-circle p-0">
                                        ${isUserPost
                        ? `<a href="profile.html" class="rounded-circle"><img class="w-75 rounded-circle" src="${profile.image}"></a>`
                        : `<img class="w-75 rounded-circle" src="${post.posterImg}">`
                    }
                                    </div>
                                    <div class="col-7 justify-content-start poster p-0">
                                        ${isUserPost
                        ? `<a href="profile.html" class="link-underline link-underline-opacity-0 card-title baby fw-bold m-0">${post.poster}</a>`
                        : `<h5 href="profile.html" class="link-underline link-underline-opacity-0 card-title baby fw-bold m-0">${post.poster}</h5>`
                    }
                                    </div>
                                    <div class="col-4 d-flex justify-content-end align-items-center">
                                        <small class="text-muted post-time">${formattedTime}</small>
                                        <div class="dropdown">
                                            <button class="btn border-0" id="dropdownMenuButton" data-bs-toggle="dropdown"><i class='bx bx-dots-vertical-rounded'></i></button>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <li><button class="dropdown-item delete-post" data-index="${index}">Delete</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p class="card-text post-text baby">${post.postText}</p>
                            </div>
                            <hr class="baby my-2">
                            <div class=" likes row" data-post-index="${index}">
                                ${post.postLikes > 0
                        ? `<p class="ps-3 mb-2 fw-bold baby">${post.postLikes} <i class='bx bxs-like'></i></p>`
                        : ``
                    }
                            </div>
                            <div class="input-group">
                                ${post.postLikes > 0
                        ? `<button class="btn btn-baby text-white like w-50" data-post-index="${index}">Unlike</button>`
                        : `<button class="btn btn-baby text-white like w-50" data-post-index="${index}">Like</button>`
                    }
                                <button class="btn btn-baby share w-50" data-post-index="${index}">Share</button>
                            </div>
                        </div>
                `;
            }
        }
    });

    document.querySelector('#fileInput').addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
        }
    });

    document.querySelector('.post').addEventListener('click', () => {
        const postText = document.querySelector('.new-text').value;
        const fileInput = document.querySelector('.new-img');

        profile.addPost(postText, fileInput);

        document.querySelector('.new-text').value = "";
        fileInput.value = "";
        setTimeout(updatePosts, 500);
    });

    document.querySelector('.save-new-bio').addEventListener('click', () => {
        const newBio = document.querySelector('.new-bio').value;
        profile.updateBio(newBio);
        profile.saveToStorage();
        updatePosts();
        updateAbout();
    });

    document.querySelectorAll('.delete-post').forEach((button) => {
        button.addEventListener('click', () => {
            const btnIndex = button.dataset.index;
            profile.posts.splice(btnIndex, 1);
            profile.saveToStorage();
            setTimeout(updatePosts, 500);
        });
    });

    document.querySelectorAll('.like').forEach((button) => {
        button.addEventListener('click', () => {
            let postIndex = button.dataset.postIndex;
            let likeSection = document.querySelector(`.likes[data-post-index="${postIndex}"]`);
            if (profile.posts[postIndex].postLikes === 0) {
                profile.posts[postIndex].postLikes = 1;
                likeSection.innerHTML = `<p class="ps-3 mb-2 fw-bold baby">${profile.posts[postIndex].postLikes} <i class='bx bxs-like'></i></p>`;
                button.textContent = 'Unlike';
            } else {
                profile.posts[postIndex].postLikes = 0;
                likeSection.innerHTML = '';
                button.textContent = 'Like';
            }
            profile.saveToStorage();
        });
    });

    document.querySelectorAll('.share').forEach((button) => {
        button.addEventListener('click', () => {
            let postIndex = button.dataset.postIndex;
            profile.addPost(profile.posts[postIndex].postText, profile.posts[postIndex].postImg);
            setTimeout(updatePosts, 500);
        });
    });
}

function updateAbout() {
    document.querySelector('.about').innerHTML = `
        <div class="row d-flex justify-content-center align-items-center mb-2">
            <div class="col text-center text-secondary">
                <p class="fw-bold h4 m-0">${profile.bio}</p>
            </div>
        </div>
        <div class="row d-flex justify-content-center align-items-center mb-2">
            <div class="col-2 d-flex justify-content-center align-items-center">
                <p class="fw-bold h4 m-0"><i class='bx bxs-graduation'></i></p>
            </div>
            <div class="col d-flex align-items-center">
                <p class="fw-bold h4 m-0">Studies at <span class="fw-bold h4 m-0">${profile.university}</span></p>
            </div>
        </div>
        <div class="row d-flex justify-content-center align-items-center mb-2">
            <div class="col-2 d-flex justify-content-center align-items-center">
                <p class="fw-bold h4 m-0"><i class="bx bxs-briefcase"></i></p>
            </div>
            <div class="col d-flex align-items-center">
                <p class="fw-bold h4 m-0">${profile.job}</p>
            </div>
        </div>
        <div class="row d-flex justify-content-center align-items-center mb-2">
            <div class="col-2 d-flex justify-content-center align-items-center">
                <p class="fw-bold h4 m-0"><i class="bx bxs-home"></i></p>
            </div>
            <div class="col d-flex align-items-center">
                <p class="fw-bold h4 m-0">${profile.home}</p>
            </div>
        </div>
        <div class="row d-flex justify-content-center align-items-center mb-2">
            <div class="col-2 d-flex justify-content-center align-items-center">
                <p class="fw-bold h4 m-0"><i class="bx bxs-cake"></i></p>
            </div>
            <div class="col d-flex align-items-center">
                <p class="fw-bold h4 m-0">${formatDate(profile.age)}</p>
            </div>
        </div>
        <div class="row d-flex justify-content-center align-items-center mb-2">
            <div class="col-2 d-flex justify-content-center align-items-center">
                <p class="fw-bold h4 m-0"><i class="bx bxl-linkedin-square"></i></p>
            </div>
            <div class="col d-flex align-items-center">
                <a class="fw-bold link-underline link-underline-opacity-0 h4 m-0" href="${profile.linkedin}">Linkedin Profile</a>
            </div>
        </div>
        <div class="row d-flex justify-content-center align-items-center mb-2">
            <div class="col-2 d-flex justify-content-center align-items-center">
                <p class="fw-bold h4 m-0"><i class='bx bxl-instagram'></i></p>
            </div>
            <div class="col d-flex align-items-center">
                <a class="fw-bold link-underline link-underline-opacity-0 h4 m-0" href="${profile.instagram}">Instagram Profile</a>
            </div>
        </div>
    `;
}

function updateFriends() {
    const friendsSection=document.querySelector('.friends');
    if(profile.friends.length===0){
        friendsSection.innerHTML=`<p class="text-center">No friends yet</p>`;
        return;
    }
    friendsSection.innerHTML='';
    profile.friends.forEach((friend,index)=>{
        friendsSection.innerHTML += `
            <div class="row mb-2">
                <div class="col-2 col-sm-1 d-flex align-items-center">
                    <img src="assets/imgs/Blank profile pic.webp" class="rounded-circle w-100">
                </div>
                <div class="col d-flex align-items-center">
                    <p class="fw-bold h4 m-0">${friend}</p>
                </div>
                <div class="col-3 d-flex justify-content-end align-items-center">
                    <button class="btn btn-baby unfriend" data-index="${index}">Unfriend</button>
                </div>
            </div>
            <hr>
        `;
    });

    document.querySelectorAll('.unfriend').forEach((button)=>{
        const friendsNumber=profile.friends.length;
        const btnIndex=button.dataset.index;
        button.addEventListener('click',()=>{
            profile.people.push(profile.friends[btnIndex]);
            profile.friends.splice(btnIndex,1);
            profile.saveToStorage();
            setTimeout(updateFriends,500);
            document.querySelector('.friends-number').innerHTML=`
                ${friendsNumber > 1
                    ? `<p class="text-secondary fw-bold">${profile.friends.length} Friends</p>`
                    : `<p class="text-secondary fw-bold">${profile.friends.length} Friend</p>`
                }
            `;
        });
    });
}