const data = {
  "Weight": {
    "Heavy Part > 1kg": ["Duplex", "Carton", "Bubble bag", "Bottle"],
    "Medium weight 0.5-1kg": ["No Pack", "Duplex", "Bubble bag", "Plastic","Bottle"],
    "Light Part < 0.5kg": ["No Pack", "Duplex", "Plastic","Bottle"]
  },
  "Dimention": {
    "Big part": ["Carton", "Bubble bag"],
    "Length part": ["Duplex", "Carton", "Bubble bag"],
    "Medium Part": ["Bubble bag"],
    "Small Part": ["Plastic"],
    "No NG": ["No Pack"],
    "Liquid": ["Bottle"]
  },
  "Quality": {
    "Fragile": ["Duplex", "Carton", "Bubble bag"],
    "Broken": ["Duplex", "Carton", "Bubble bag"],
    "Dent": ["Duplex", "Carton", "Bubble bag"],
    "Scratched": ["Duplex", "Carton", "Bubble bag"],
    "Leak": ["Carton", "Bottle"],
    "No NG": ["No Pack"]
  },
  "Material Part": {
    "Steel": ["Duplex", "Carton", "Bubble bag", "Plastic"],
    "Iron": ["Duplex", "Carton", "Bubble bag", "Plastic"],
    "PE": ["Duplex", "Carton", "Bubble bag", "Plastic"],
    "Alumunium": ["No Pack", "Duplex", "Carton", "Bubble bag", "Plastic"],
    "Rubber": ["Duplex", "Plastic"],
    "Paper": ["Plastic"],
    "Fluid": ["Carton", "Bottle"],
    "Electronic": ["Duplex", "Carton", "Bubble bag"],
    "Glass": ["Carton"],
    "Wiring": ["No Pack", "Wiring"]
  },
  "Shape": {
    "Flat": ["No Pack", "Duplex", "Carton", "Bubble bag", "Plastic"],
    "Wavy": ["No Pack", "Duplex", "Carton", "Bubble bag", "Plastic"],
    "Sharp": ["No Pack", "Carton", "Bubble bag"],
    "Liquid": ["Bottle"]
  }
};

const criteria = ["Weight", "Dimention", "Quality", "Material Part", "Shape"];
const selectors = {};

function createDropdowns() {
  const form = document.getElementById("form-area");

  criteria.forEach(key => {
    const label = document.createElement("label");
    label.textContent = `Select ${key}:`;

    const select = document.createElement("select");
    select.id = key;
    select.innerHTML = `<option value="">-- Choose ${key} --</option>`;

    Object.keys(data[key]).forEach(option => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      select.appendChild(opt);
    });

    select.addEventListener("change", updateResult);
    selectors[key] = select;

    form.appendChild(label);
    form.appendChild(select);
  });
}

function updateResult() {
  let selectedSets = [];

  criteria.forEach(key => {
    const val = selectors[key].value;
    if (val && data[key][val]) {
      selectedSets.push(new Set(data[key][val]));
    }
  });

  const packagingList = document.getElementById("packagingList");
  packagingList.innerHTML = "";

  if (selectedSets.length === 0) {
    packagingList.innerHTML = "<li>Please select at least one criterion.</li>";
    return;
  }

  let intersection = [...selectedSets[0]];
  selectedSets.slice(1).forEach(set => {
    intersection = intersection.filter(item => set.has(item));
  });

  if (intersection.length > 0) {
    intersection.forEach(pkg => {
      const li = document.createElement("li");
      li.textContent = pkg;
      packagingList.appendChild(li);
    });
  } else {
    packagingList.innerHTML = "<li>No matching packaging found.</li>";
  }
}

// Initialize dropdowns and event listeners
document.addEventListener("DOMContentLoaded", createDropdowns);
