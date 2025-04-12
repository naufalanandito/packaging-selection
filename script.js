const weightOptions = {
  "Heavy Part > 1kg": ["Duplex", "Carton", "Bubble bag", "Bottle"],
  "Medium weight 0.5-1kg": ["No Pack", "Duplex", "Bubble bag", "Plastic"],
  "Light Part < 0.5kg": ["No Pack", "Duplex", "Plastic"]
};

const dimensionOptions = {
  "Big part": ["Carton", "Bubble bag"],
  "Length part": ["Duplex", "Carton", "Bubble bag"],
  "Medium Part": ["Bubble bag"],
  "Small Part": ["Plastic"]
};

const weightSelect = document.getElementById("weight");
const dimensionSelect = document.getElementById("dimension");
const packagingList = document.getElementById("packagingList");

function updatePackagingList() {
  const weight = weightSelect.value;
  const dimension = dimensionSelect.value;

  packagingList.innerHTML = "";

  if (weight && dimension) {
    const weightPackages = weightOptions[weight] || [];
    const dimensionPackages = dimensionOptions[dimension] || [];
    const intersect = weightPackages.filter(pkg => dimensionPackages.includes(pkg));

    if (intersect.length > 0) {
      intersect.forEach(pkg => {
        const li = document.createElement("li");
        li.textContent = pkg;
        packagingList.appendChild(li);
      });
    } else {
      packagingList.innerHTML = "<li>No matching packaging found.</li>";
    }
  } else {
    packagingList.innerHTML = "<li>Select both weight and dimension to see options.</li>";
  }
}

weightSelect.addEventListener("change", updatePackagingList);
dimensionSelect.addEventListener("change", updatePackagingList);
