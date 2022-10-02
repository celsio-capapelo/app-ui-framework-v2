'use strict';

/////////////////////////////////////////////////
// Dropdown
const dropdownTrigger = document.querySelector(".dropdown__trigger");
const dropdownContent = document.querySelector(".dropdown__content");
let dropdownIsOpened = false;
const dropdownTriggerIcon = dropdownTrigger.querySelector('.dropdown__icon');

const toggleDropdownIcon = () => {
  if (dropdownTriggerIcon.classList.contains("la-angle-right"))
    dropdownTriggerIcon.classList.replace("la-angle-right", "la-angle-down");
  else dropdownTriggerIcon.classList.replace("la-angle-down", "la-angle-right");
};

const closeDropdown = () => {
  dropdownContent.classList.add("dropdown__content--hidden");
  toggleDropdownIcon();
  dropdownIsOpened = false;
};

const openDropdown = () => {
  dropdownContent.classList.remove("dropdown__content--hidden");
  toggleDropdownIcon();
  dropdownIsOpened = true;
};

const toggleDropdown = () =>
  dropdownIsOpened ? closeDropdown() : openDropdown()

// Open or close dropdown clicking on dropdownTrigger
dropdownTrigger.addEventListener('click', toggleDropdown);

// Close dropdown clicking outside dropdown
document.addEventListener('click', (e) => {
  const clickOutsideDropdown = !e.target.closest('.dropdown');
  if (clickOutsideDropdown && dropdownIsOpened) closeDropdown();
});

// Close dropdown by pressing the ESC key
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && dropdownIsOpened) closeDropdown()
});


console.log("SCRIPT_END");































