// base
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach
    (n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    }));

document.querySelectorAll(".dropdown").forEach(dropdown => {

    const button = dropdown.querySelector(".drop-btn");
    const items = dropdown.querySelector(".dropdown-items");
    const icon = dropdown.querySelector(".dropdown-icon");
    const selected = dropdown.querySelector(".selected-item");

    button.addEventListener("click", () => {
        items.classList.toggle("show");
        icon.classList.toggle("rotate");
    });

    dropdown.querySelectorAll(".dropdown-items a").forEach(a => {
        a.addEventListener("click", () => {
            if (selected) selected.textContent = a.textContent;
            items.classList.remove("show");
            icon.classList.remove("rotate");
        });
    });

});

window.addEventListener("click", e => {
    document.querySelectorAll(".dropdown").forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.querySelector(".dropdown-items").classList.remove("show");
            dropdown.querySelector(".dropdown-icon").classList.remove("rotate");
        }
    });
});

//==============================================================================

//auto load
document.addEventListener("DOMContentLoaded", () => {
    const allBtn = document.querySelector(".btn-all");
    if (allBtn) allBtn.click();
});

// ============================================================================

//Home Page

//page search bar
function pageSearch(event) {
    const input = document.getElementById("pageSearchInput");
    const list = document.getElementById("page-search-list");
    const pages = list.querySelectorAll("li");
    const finalInput = input.value.toLowerCase();

    if (finalInput === "") {
        list.style.display = "none";
        return;
    }

    let hasMatch = false;
    let matchingPage = null;

    pages.forEach(page => {
        const pageName = page.textContent.toLowerCase();
        const keywords = (page.getAttribute("keywords") || "").toLowerCase();

        if (pageName.includes(finalInput) || keywords.includes(finalInput)) {
            page.style.display = "block";

            if (!matchingPage) {
                matchingPage = page.querySelector("a").href;
            }

            hasMatch = true;
        } else {
            page.style.display = "none";
        }
    });

    if (hasMatch) {
        list.style.display = "block";
    }

    else {
        list.style.display = "none";
    }

    //enter key
    if (event && event.key === "Enter") {
        if (matchingPage) {
            window.location.href = matchingPage;
        }

        else {
            alert("Page Not Found!");
            input.value = "";
        }
    }
}

//filtering
const searchInput = document.getElementById("pageSearchInput");
if (searchInput) {
    searchInput.addEventListener("keyup", pageSearch)
}

//click outside => close list
document.addEventListener("click", function (e) {
    const input = document.getElementById("pageSearchInput");
    const list = document.getElementById("page-search-list");

    if (!input || !list) return;

    if (!input.contains(e.target) && !list.contains(e.target)) {
        list.style.display = "none";
    }
});


//=============================================================

//course search filter list

//select dropdown item
let selectedCourseType = "Undergraduate";
document.querySelectorAll("#course-dropdown-items a").forEach(item => {
    item.addEventListener("click", function (e) {
        e.preventDefault();

        selectedCourseType = this.textContent.trim();
        document.querySelector(".selected-item").textContent = selectedCourseType

        searchFilter();
    });
});

function matchCourseType(courseName, courseType) {
    const title = courseName.toUpperCase();

    if (selectedCourseType === "Postgraduate") {
        return courseType === "Postgraduate";
    }

    if (selectedCourseType === "Undergraduate + Foundation Year") {
        return (courseType === "Undergraduate" && title.includes("FOUNDATION"))
    }

    if (selectedCourseType === "Undergraduate") {
        return (courseType === "Undergraduate" && !title.includes("FOUNDATION"));
    }

    return false;
}

//filtering
function searchFilter(event) {
    const input = document.getElementById('myInput');
    const finalInput = input.value.toUpperCase();
    const ul = document.getElementById("search-list");
    const courses = ul.getElementsByTagName('li');

    if (finalInput === "") {
        ul.style.display = "none";
        return;
    }

    ul.style.display = "block";

    let matchItem = null;

    for (const course of courses) {
        const courseName = course.querySelector(".course-name").textContent.toUpperCase();
        const courseType = course.getAttribute("course-type");

        if (courseName.includes(finalInput) && matchCourseType(courseName, courseType)) {
            course.style.display = "";

            if (!matchItem) {
                matchItem = course.querySelector("a").href;
            }
        }

        else {
            course.style.display = "none";
        }

    };

    //enter key
    if (event && event.key === "Enter") {
        if (matchItem) {
            window.location.href = matchItem;
        }

        else {
            alert("Course Not Found!");
            input.value = "";
        }
    }

}

//click outside
document.addEventListener("click", function (e) {
    const searchSection = document.querySelector(".search-section");
    const list = document.getElementById("search-list");

    if (!searchSection || !list) return;
    if (!searchSection.contains(e.target) && !list.contains(e.target)) {
        list.style.display = "none";
    }
});

//================================================================
//courses page

function filterSelection(type) {
    const items = document.getElementsByClassName("course-item");
    const input = document.getElementById("courseInput")

    if (input) input.value = "";
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("show");

        const courseType = items[i].getAttribute("course-type");
        const hasFoundationYear = items[i].getAttribute("foundation");

        if (type === "all") {
            items[i].classList.add("show");
        }

        else if (type === "Undergraduate" && courseType === "Undergraduate" && hasFoundationYear == "0") {
            items[i].classList.add("show");
        }

        else if (type === "Foundation" && courseType === "Undergraduate" && hasFoundationYear === "1") {
            items[i].classList.add("show");
        }

        else if (type === "Postgraduate" && courseType === "Postgraduate") {
            items[i].classList.add("show");
        }
    }

    updateList();
}

//courses search bar
function courseSearch() {
    const input = document.getElementById('courseInput');
    const finalInput = input.value.toUpperCase();
    const course = document.getElementsByClassName("course-item");

    for (let i = 0; i < course.length; i++) {
        const courseName = course[i].textContent.toUpperCase();

        if (finalInput === "") {
            course[i].classList.add("show");
        }

        else if (courseName.includes(finalInput)) {
            course[i].classList.add("show");
        }
        else {
            course[i].classList.remove("show");
        }
    }

    updateList();
}

function updateList() {
    const subject = document.getElementsByClassName("subject-group");
    const existingCourse = document.querySelectorAll(".course-item.show");
    const notFound = document.getElementById("notFound");

    for (let i = 0; i < subject.length; i++) {
        const existingCourse =
            subject[i].querySelectorAll(".course-item.show");

        if (existingCourse.length > 0) {
            subject[i].style.display = "block";
        } 
        
        else {
            subject[i].style.display = "none";
        }
    }

    if (existingCourse.length === 0) {
        notFound.style.display = "block";
    } 
    
    else {
        notFound.style.display = "none";
    }
}

const btns = document.querySelectorAll(".filter-btn, .btn-all");

btns.forEach(btn => {
    btn.addEventListener("click", function () {
        const selected = document.querySelector(".active");
        if (selected) selected.classList.remove("active");
        this.classList.add("active");
    });
});

//==================================================================

//rotating images
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".rotating-images");
    if (!container) return;

    const getImg = container.querySelector("img");
    const images = JSON.parse(container.dataset.images);

    let currentIndex = 0;
    function chgImage() {
        currentIndex++;
        if (currentIndex >= images.length)
            currentIndex = 0;
        getImg.src = images[currentIndex];
    }

    setInterval(chgImage, 4000);
});

//==================================================================

//info for business
document.querySelectorAll(".service-item").forEach(item => {
    item.addEventListener("click", () => {
        const parent = item.parentElement;
        const btn = item.querySelector(".plus");

        parent.classList.toggle("active");

        // Change + to −
        if (parent.classList.contains("active")) {
            btn.textContent = "-";
        } else {
            btn.textContent = "+";
        }
    });
});