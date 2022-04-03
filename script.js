const url = new URL("http://filltext.com/");
const delay = 200; // ms

//Get all categories in tags items
let categoryItems = document.getElementsByClassName("tag");
let categories = [];
for (let i = 0; i < categoryItems.length; i++) {
    let category = categoryItems[i].getAttribute('data-category');
    if(category){
        categories.push(category);
    }
}

// request params
let params = {
    rows: 10,
    fname: "{firstName}",
    lname: "{lastName}",
    pretty: true,
    category: JSON.stringify(categories)
}

// The parameters we are gonna pass to URL
Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

//Fetch function
fetch(url).then((response) => response.json())
.then((data) => {
    let html = ``;
    data.forEach((item, index)=>{
        var profileImage = item.fname.charAt(0) + item.lname.charAt(0);
        html += `<div class="profile-box" data-category="${item.category}">
                    <div class="profile-image">${profileImage}</div>
                    <h3 class="mb-10">${item.fname} ${item.lname}</h3>
                    <h4>${item.category}</h4>
                </div>`;
    });
    document.getElementById('people-list').innerHTML = html;

    //Show List Animation
    let items = document.getElementsByClassName("profile-box");
    for (let i = 0; i < items.length; ++i) {
        setTimeout(() => {
            items[i].classList.add('show')
        }, i * delay)
    }
});


//Tags Click
let tags = document.querySelectorAll(".tag");
tags.forEach(el => el.addEventListener('click', event => {
    event.preventDefault();

    //check if tag is already clicked
    if(event.target.classList.contains("selected")){
        return false;
    }

    //Remove selected class from old tag and add it to clicked tag
    for (let tag of tags) {
        tag.classList.remove('selected');
    }
    event.target.classList.add("selected");

    //show all profile box that contain same data-category attribute 
    //or show all when click on (all categories)
    let selectedCategory = event.target.getAttribute('data-category');
    let profilesElements = document.querySelectorAll(".profile-box");
    let counter = 0
    for(let i = 0, all = profilesElements.length; i < all; i++){   
        profilesElements[i].classList.remove('show');
        profilesElements[i].classList.add('d-none');
        if(!selectedCategory || selectedCategory == profilesElements[i].getAttribute('data-category')){
            profilesElements[i].classList.remove('d-none');
            setTimeout(() => {
                profilesElements[i].classList.add('show')
            }, counter++ * delay)
        }
    }
}));




