class user {
    constructor(email, password, name, bio, image, university, job, home, age, linkedin, instagram) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.bio = bio;
        this.image = image;
        this.university = university;
        this.job = job;
        this.home = home;
        this.age = age;
        this.linkedin = linkedin;
        this.instagram = instagram;
        this.interests = [];
        this.people=["Hazem Mahmoud","Adel Mohamed","Hany Essam","Abdullah El Tamawy","Youssef Wafa"];
        this.friends=[];
        this.posts = [{
            posterImg: "assets/imgs/Blank profile pic.webp",
            poster: "Hazem Mahmoud",
            postTime: Date.now(),
            postText: "I Love Rivo",
            postImg: "assets/imgs/3.jpg",
            postLikes: 0,
        },
        {
            posterImg: "assets/imgs/arsenal logo.jpg",
            poster: "Arsenal",
            postTime: Date.now() - 86400000,
            postText: `Over 300 appearances for The Arsenal 👏<br>
                                   Happy birthday, Liam Brady! 🎈`,
            postImg: "assets/imgs/arsenal.jpg",
            postLikes: 0,
        }];

        this.loadFromStorage()
    }
    saveToStorage() {
        localStorage.setItem("userProfile", JSON.stringify(this));
    }
    loadFromStorage() {
        let savedData = JSON.parse(localStorage.getItem("userProfile"));
        if (savedData) {
            Object.assign(this, savedData);
            this.posts = (savedData.posts || []).map(post => ({
                ...post,
                postTime: Number(post.postTime) || Date.now(),
                postLikes: post.postLikes || 0,
            }));
        }else {
            this.posts = this.posts || [];
        }
    }
    addPost(postText, fileInputOrImgUrl) {
        if (typeof fileInputOrImgUrl === 'string') {
            this.savePostWithImage(postText, fileInputOrImgUrl); // It's an image URL
        } else if (fileInputOrImgUrl.files.length > 0) {
            const file = fileInputOrImgUrl.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.savePostWithImage(postText, reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            this.savePostWithImage(postText, "");
        }
    }
    savePostWithImage(postText, postImg) {
        if(postText==='' && postImg===''){
            return;
        }
        const newPost = {
            posterImg: this.image,
            poster: this.name,
            postTime: Date.now(),
            postText: postText,
            postImg: postImg, // Stores image as Base64
            postLikes: 0,
        };

        this.posts.unshift(newPost);
        this.saveToStorage();
    }
    addInterest(interest) {
        this.interests.push(interest);
        this.saveToStorage();
    }
    removeInterest(interestIndex) {
            this.interests.splice(interestIndex, 1);
            this.saveToStorage();
    }
    updateEmail(newEmail) {
        this.email = newEmail;
        this.saveToStorage();
    }
    updatePassword(newPassword) {
        this.password = newPassword;
        this.saveToStorage();
    }
    updateName(newName) {
        this.name = newName;
        this.saveToStorage();
    }
    updateBio(newBio) {
        this.bio = newBio;
        this.saveToStorage();
    }
    updateUniversity(newUniversity) {
        this.university = newUniversity;
        this.saveToStorage();
    }
    updateJob(newJob) {
        this.job = newJob;
        this.saveToStorage();
    }
    updateProfileImage(newImage) {
        this.image = newImage;
        this.saveToStorage();
    }
    updateHome(newHome) {
        this.home = newHome;
        this.saveToStorage();
    }
    updateAge(newAge) {
        this.age = newAge;
        this.saveToStorage();
    }
}

const profile = new user("01115658096", "You-s-sef_24", "Youssef Mahmoud", "I'm Youssef", "assets/imgs/2.jpg", "October 6 University (Faculty of Info Sys & Comp Science)", "Front-End Developer", "Shabramant ,Giza", "2004-07-07", "https://www.linkedin.com/in/youssef-mahmoud-239821275/", "https://www.instagram.com/youssefmahmoud.2004?fbclid=IwY2xjawIdr99leHRuA2FlbQIxMAABHRj7frDaMSGGWsruQoGU3pToQ24encXI_qJ9iIsTlJaGRU9aP1yphfTcmA_aem_S01pSfHsNIaV_jSKoPYtGA");

function updateNavbar(){
    document.querySelector('.Navbar').innerHTML+=`
            <nav class="navbar navbar-expand-sm navbar-light bg-warning">
                <div class="container-fluid d-flex align-items-center">
                <div class="col-2 col-sm-2 col-md-1 d-none d-sm-block d-flex justify-content-center">
                    <a href="home.html" class="link-underline link-underline-opacity-0">
                    <span class="fw-bold h1">Besar</span>
                    </a>
                </div>
                <div class="col-6 col-sm-8 col-md-9 d-flex justify-content-start">
                    <div class="row d-flex">
                        
                        <div class="col text-dark d-sm-none">
                            <a class="nav-link icon text-secondary" href="home.html" data-toggle="tooltip" data-bs-placement="bottom"
                            title="Home"> <i class="bx bxs-home"></i> </a>
                        </div>

                        <div class="col dropdown text-dark">
                            <a class="nav-link icon text-secondary" href="friends.html" data-toggle="tooltip" data-bs-placement="bottom" title="Friend requests"><i class="bx bxs-user"></i></a>
                        </div>

                        <div class="dropdown col">
                            <a class="nav-link icon text-secondary" href="#" data-toggle="tooltip" data-bs-placement="bottom" title="Notifications" id="triggerId" data-bs-toggle="dropdown"> <i class="bx bxs-bell"></i> </a>
                            <div class="dropdown-menu p-2" aria-labelledby="triggerId">
                                <p class="m-0 text-muted text-center">No notification yet</p>
                            </div>
                        </div>

                        <div class="dropdown col msgs">
                            <a class="nav-link icon text-secondary" href="" data-toggle="tooltip" data-bs-placement="bottom" title="Inbox" id="triggerId" data-bs-toggle="dropdown"> <i class="bx bxs-envelope"></i> </a>
                            <div class="dropdown-menu msgs-menu" aria-labelledby="triggerId">
                                <div class="dropdown-item">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h6 class="dropdown-header baby fw-bold ps-0">Besar</h6>
                                        <button class="btn btn-close dimiss"></button>
                                    </div>
                                    <p>Hello ${profile.name} ,Welcome to Besar</p>
                                </div>
                            </div>
                            <span class="msgs-alert bg-danger text-white rounded-circle">1</span>
                        </div>
                    </div>
                </div>
                <div class="col-2 dropdown d-flex rounded-circle justify-content-center">
                    <div id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="rounded-circle">
                    <a><img class="rounded-circle profile-icon"
                        src="${profile.image}"></a>
                    </div>
                    <div class="dropdown-menu" aria-labelledby="triggerId">
                    <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                    <li><a class="dropdown-item" href="settings.html">Settings</a></li>
                    <button class="dropdown-item logout">Log out</button>
                    </div>
                </div>
                </div>
            </nav>
    `;

    document.querySelector('.dimiss').addEventListener('click',()=>{
        document.querySelector('.msgs-menu').classList.add('p-2','text-muted','text-center');
        document.querySelector('.msgs-menu').innerHTML='No messeges yet';
        document.querySelector('.msgs-alert').remove();
    });
}

function formatDate(inputDate) {
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function timeAgo(timestamp) {
    if (!timestamp || isNaN(timestamp)) return "just now"; // Handle invalid timestamps

    const now = Date.now();
    const diff = now - timestamp;

    if (diff < 0) return "just now"; // Future posts issue

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days === 1) return "yesterday";
    return `${days} days ago`;
}