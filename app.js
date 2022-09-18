let bookmarkBtn = document.getElementById("bookmark-btn");
let bookmarkIcon = bookmarkBtn.querySelector("img");
let aTags = document.querySelectorAll("a");
let formGroups = document.querySelectorAll("[class='form-group']"); // The last form group has class "form-group--unavailable" that unable to selected
let formFooter = document.querySelectorAll(".form-group__footer");
let numberInputs = document.querySelectorAll(".number-input");
let lightbox = document.getElementById("lightbox");
let lightboxProject = lightbox.querySelector(".lightbox__project");
let lightboxComplete = lightbox.querySelector(".lightbox__completed");
let completeBtns = document.querySelectorAll(".complete-btn");
let backProjectBtn = document.getElementById("back-project-btn");
let xMark = document.getElementById("x-mark");

bookmarkBtn.addEventListener("click", (e) => {
	e.preventDefault();
	bookmarkBtn.classList.toggle("bookmarked");
	bookmarkBtn.innerHTML = bookmarkBtn.classList.contains("bookmarked")
		? "<img src='./images/icon-bookmarked.png' alt='bookmark icon' />Bookmarked"
		: "<img src='./images/icon-bookmark.svg' alt='bookmark icon' />Bookmark";
});

// Make a tag not scroll-to-top when clicked

aTags.forEach((tag) =>
	tag.addEventListener("click", (e) => e.preventDefault())
);

function selectPledge() {
	formGroups.forEach((group) => group.classList.remove("selected"));
	this.classList.add("selected");

	formFooter.forEach((footer) => footer.classList.remove("show"));
	this.querySelector(".form-group__footer").classList.add("show");

	localStorage.setItem("selected", this.id);
}

formGroups.forEach((group) => group.addEventListener("click", selectPledge));

window.addEventListener("load", () => {
	formGroups.forEach((group) => {
		if (group.id == localStorage.getItem("selected")) {
			group.classList.add("selected");
			group.querySelector(".form-group__footer").classList.add("show");
		}
	});
});

function toggleLightbox(firstState, secondState) {
	lightbox.classList.remove(firstState);
	lightbox.classList.add(secondState);
}

xMark.addEventListener("click", () => {
	toggleLightbox("show", "hidden");
	lightboxProject.classList.remove("show");
	lightboxProject.classList.add("hidden");
});
backProjectBtn.addEventListener("click", () => {
	toggleLightbox("hidden", "show");
	lightboxProject.classList.remove("hidden");
	lightboxProject.classList.add("show");
});

completeBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		lightboxProject.classList.remove("show");
		lightboxProject.classList.add("hidden");
		lightboxComplete.classList.remove("hidden");
		lightboxComplete.classList.add("show");
	});
});

lightboxComplete.querySelector("button").addEventListener("click", () => {
	toggleLightbox("show", "hidden");
	lightboxComplete.classList.remove("show");
	lightboxComplete.classList.add("hidden");

	formGroups.forEach((group) => {
		group.classList.remove("selected");
		group.querySelector(".form-group__footer").classList.remove("show");
	});

	localStorage.removeItem("selected");
});