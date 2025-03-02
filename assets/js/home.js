document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("auth")) {
        if (!window.location.pathname.includes("login.html")) {
            window.location.replace("login.html");
        }
    }
    document.querySelector('.logout').addEventListener('click', () => {
        localStorage.removeItem("auth"); // Clear authentication
        setTimeout(() => {
            window.location.replace("login.html");
        }, 1000);
    });

    setTimeout(updateSidebar, 500);
    setTimeout(updateNewsFeed, 500);
});

// localStorage.setItem("userProfile", JSON.stringify([])); // Reset to an empty array

updateNavbar();

function updateSidebar() {
    document.querySelector('.left-sidebar').innerHTML = `
    <div class="card bg-white rounded shadow mb-3">
        <p class="fw-bold text-center baby">My Profile</p>
        <img class="card-img-top rounded-circle" src="${profile.image}" />
        <div class="card-body">
            <a href="profile.html" class="card-title baby h5 link-underline link-underline-opacity-0">${profile.name}</a>
            <hr>
            <p class="card-text baby"> <i class="bx bxs-briefcase"></i> ${profile.job}</p>
            <p class="card-text baby"> <i class="bx bxs-home"></i> ${profile.home}</p>
            <p class="card-text baby"> <i class="bx bxs-cake"></i> ${formatDate(profile.age)}</p>
            <a class="link-underline link-underline-opacity-0 baby" href="${profile.linkedin}" data-toggle="tooltip" data-bs-placement="bottom" title="Linkedin profile"> <i class="bx bxl-linkedin-square"></i> Linkedin </a>
        </div>
    </div>
    <div class="bg-white rounded shadow p-2">
        <div class="d-flex align-items-center mb-2">
            <p class="fw-bold m-0">Interests</p>
            <button class="ms-auto btn p-0" data-bs-toggle="modal" data-bs-target="#modalId"><i class='baby bx bx-plus'></i></button>
            <div class="modal fade" id="modalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalTitleId">
                                Add new interest
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" class="form-control new-interest">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" class="btn btn-baby add-interest" data-bs-dismiss="modal">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="interests d-flex flex-wrap gap-1">
        </div>
    </div>
`;
    document.querySelector('.interests').innerHTML += '';
    profile.interests.forEach((interest,index) => {
        document.querySelector('.interests').innerHTML += `
            <span class="bg-baby text-white rounded p-1">${interest} <button class="btn p-0 delete-interest" data-index="${index}"><i class='text-white bx bx-x'></i></button></span>
        `;
    });
    
    document.querySelector('.add-interest').addEventListener('click',()=>{
        const newInterest=document.querySelector('.new-interest').value;
        profile.addInterest(newInterest);
        profile.saveToStorage();
        updateSidebar();
    });

    document.querySelectorAll('.delete-interest').forEach((button)=>{
        button.addEventListener('click',()=>{
            const interestIndex=button.dataset.index;
            profile.removeInterest(interestIndex);
            profile.saveToStorage();
            updateSidebar();
        });
    });
}

function updateNewsFeed() {
    document.querySelector('.posting').innerHTML=`
        <div class="d-flex justify-content-center bg-white rounded shadow p-4 mb-3">
            <div class="input-group me-1">
                <input type="text" class="form-control new-text w-50" placeholder="What's in your mind">
                <input type="file" class="d-none new-img" id="fileInput" accept="image/*">
                <label for="fileInput" class="btn btn-warning text-white">Upload</label>
            </div>
            <button class="btn btn-warning text-white post w-25">Post</button>
        </div>
    `;
    document.querySelector('.posts').innerHTML = '';
    profile.posts.forEach((post, index) => {
        const formattedTime = timeAgo(post.postTime);
        const isUserPost = post.poster === profile.name;
        if (post.postImg !== '') {
            document.querySelector('.posts').innerHTML += `
            <div class="card rounded shadow pb-1 mb-3">
                <div class="card-body">
                    <div class="row d-flex align-items-center mb-2">
                        <div class="col-1 d-flex justify-content-center align-item-center text-center poster-img rounded-circle p-0">
                        ${isUserPost
                    ? `<a href="profile.html" class="rounded-circle"><img class="w-75 rounded-circle" src="${post.posterImg}"></a>`
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
                            ${
                                isUserPost
                                ?`
                                  <div class="dropdown">
                                    <button class="btn border-0" id="dropdownMenuButton" data-bs-toggle="dropdown"><i class='bx bx-dots-vertical-rounded'></i></button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li><button class="dropdown-item delete-post" data-index="${index}">Delete</button></li>
                                    </ul>
                                  </div>
                                 `
                                :``
                            }
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
                    ? `<a href="profile.html" class="rounded-circle"><img class="w-75 rounded-circle" src="${post.posterImg}"></a>`
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
                            ${
                                isUserPost
                                ?`
                                  <div class="dropdown">
                                    <button class="btn border-0" id="dropdownMenuButton" data-bs-toggle="dropdown"><i class='bx bx-dots-vertical-rounded'></i></button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li><button class="dropdown-item delete-post" data-index="${index}">Delete</button></li>
                                    </ul>
                                  </div>
                                 `
                                :``
                            }
                        </div>
                    </div>
                    <p class="card-text post-text baby">${post.postText}</p>
                </div>
                <hr class="baby my-2">
                <div class=" likes row" data-post-index="${index}">
                    ${post.postLikes > 0
                    ? `<p class="ps-3 mb-2 fw-bold baby">${post.postLikes} like</p>`
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
    
        document.querySelector('.new-text').value = ""; // Clear input
        fileInput.value = ""; // Clear file input
        setTimeout(updateNewsFeed,500);
    });

    document.querySelectorAll('.delete-post').forEach((button)=>{
        button.addEventListener('click',()=>{
            const btnIndex=button.dataset.index;
            profile.posts.splice(btnIndex,1);
            profile.saveToStorage();
            setTimeout(updateNewsFeed,500);
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
            setTimeout(updateNewsFeed,500);
        });
    });
}

// localStorage.removeItem("userProfile");
// window.location.reload();