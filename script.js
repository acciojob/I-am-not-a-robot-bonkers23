//your code here
const images = ["img1", "img2", "img3", "img4", "img5"];
const container = document.createElement("div");
container.className = "flex";
document.querySelector("main").appendChild(container);

const h3 = document.createElement("h3");
h3.id = "h";
h3.innerText = "Please click on the identical tiles to verify that you are not a robot.";
document.querySelector("main").prepend(h3);

const p = document.createElement("p");
p.id = "para";
document.querySelector("main").appendChild(p);

const resetBtn = document.createElement("button");
resetBtn.id = "reset";
resetBtn.innerText = "Reset";
resetBtn.style.display = "none";
document.querySelector("main").appendChild(resetBtn);

const verifyBtn = document.createElement("button");
verifyBtn.id = "verify";
verifyBtn.innerText = "Verify";
verifyBtn.style.display = "none";
document.querySelector("main").appendChild(verifyBtn);

// Randomize images with one duplicate
let selected = [];
function loadImages() {
  container.innerHTML = "";
  selected = [];
  p.innerText = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  const randomIndex = Math.floor(Math.random() * images.length);
  const duplicate = images[randomIndex];

  let allImages = [...images, duplicate];
  allImages = allImages.sort(() => 0.5 - Math.random());

  allImages.forEach((cls, index) => {
    const img = document.createElement("img");
    img.classList.add(cls);
    img.dataset.img = cls;
    img.addEventListener("click", () => handleSelect(img));
    container.appendChild(img);
  });
}

function handleSelect(img) {
  if (selected.includes(img)) return;

  img.classList.add("selected");
  selected.push(img);

  resetBtn.style.display = "inline-block";

  if (selected.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
  if (selected.length > 2) {
    verifyBtn.style.display = "none";
  }
}

resetBtn.addEventListener("click", () => {
  selected.forEach(img => img.classList.remove("selected"));
  selected = [];
  p.innerText = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
});

verifyBtn.addEventListener("click", () => {
  const [first, second] = selected;
  if (first.dataset.img === second.dataset.img) {
    p.innerText = "You are a human. Congratulations!";
  } else {
    p.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  verifyBtn.style.display = "none";
});

loadImages();
