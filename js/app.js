const CLINIC_WA = "919000000000"; // replace with clinic WhatsApp number
const DATA = {
  "Cosmetology & Aesthetic": {
    doctors: {"Dr. Siddhi Divekar":"Mon, Wed, Fri · 10 AM – 6 PM"},
    illness: ["Acne / Pimples","Pigmentation / Dark spots","Hair fall","Dandruff","Skin allergy / Rashes","Laser hair removal","Anti-ageing / Wrinkles","Scars / Stretch marks","Other skin or hair concern"]
  },
  "General Physician": {
    doctors: {"Dr. Siddhi Divekar":"Tue, Thu, Sat · 9 AM – 2 PM"},
    illness: ["Fever / Viral infection","Cold, cough, sore throat","Diabetes / Sugar check","BP / Hypertension","Stomach pain / Acidity","Headache / Body pain","Allergy","General check-up","Other"]
  }
};
const $ = id => document.getElementById(id);
const fill = (el, items, ph) => el.innerHTML = `<option value="">${ph}</option>` + items.map(i=>`<option>${i}</option>`).join("");
$("date").min = new Date().toISOString().split("T")[0];
$("dept").onchange = e => {
  const d = DATA[e.target.value];
  fill($("doctor"), d ? Object.keys(d.doctors) : [], d ? "Select doctor" : "Select department first");
  fill($("illness"), d ? d.illness : [], d ? "Select illness" : "Select department first");
  $("avail").textContent = "Doctor availability will appear here.";
};
$("doctor").onchange = e => {
  const d = DATA[$("dept").value];
  $("avail").textContent = e.target.value ? "Available: " + d.doctors[e.target.value] : "Doctor availability will appear here.";
};
$("bookForm").onsubmit = e => {
  e.preventDefault();
  const msg = `Hello ${$("name").value}, thank you for booking at Ashwini Clinic.\n` +
    `Department: ${$("dept").value}\nDoctor: ${$("doctor").value}\nConcern: ${$("illness").value}\n` +
    `Patient type: ${$("ptype").value}\nDate: ${$("date").value}\nAllergies: ${$("allergy").value || "None"}\n` +
    `Our doctor will contact you soon.`;
  // Message goes to the patient's number; swap to CLINIC_WA to notify the clinic instead.
  window.open(`https://wa.me/91${$("phone").value}?text=${encodeURIComponent(msg)}`, "_blank");
};
