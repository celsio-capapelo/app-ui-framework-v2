'use strict';
const state = {
  selects: []
};
/////////////////////////////////////////////////
// Dropdown
const dropdownCollection = document.querySelectorAll('.dropdown');

dropdownCollection.forEach(dropdown => {
  const dropdownTrigger = dropdown.querySelector(".dropdown__trigger");
  const dropdownContent = dropdown.querySelector(".dropdown__content");
  let dropdownIsOpened = false;
  const dropdownTriggerIcon = dropdownTrigger.querySelector(".dropdown__icon");
  const toggleDropdownIcon = () => {
    if (dropdownTriggerIcon.classList.contains("la-angle-right"))
      dropdownTriggerIcon.classList.replace("la-angle-right", "la-angle-down");
    else
      dropdownTriggerIcon.classList.replace("la-angle-down", "la-angle-right");
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
    dropdownIsOpened ? closeDropdown() : openDropdown();

  // Open or close dropdown clicking on dropdownTrigger
  dropdownTrigger.addEventListener("click", toggleDropdown);

  // Close dropdown clicking outside dropdown
  document.addEventListener("click", (e) => {
    const clickOutsideDropdown = !e.target.closest(".dropdown");
    if (clickOutsideDropdown && dropdownIsOpened) closeDropdown();
  });

  // Close dropdown by pressing the ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dropdownIsOpened) closeDropdown();
  });
});

/////////////////////////////////////////////////
// Select Menus

// a) Functions
const toggleVisibility = (element) => 
  // getComputedStyle(element).display === "none" 
  //   ? element.style.display = "block"
  //   : element.style.display = "none";
  element.classList.contains('select__list--hidden')
    ? element.classList.remove('select__list--hidden')
    : element.classList.add('select__list--hidden')

// b) Selections

const selectNativeCollection =
  document.getElementsByClassName("select--native");
const selectListCollection =
  document.getElementsByClassName("select__list");
const selectActiveCollection =
  document.getElementsByClassName("select--collapsed");
Array.prototype.forEach.call(selectNativeCollection, (s, i) => {
  state.selects.push({
    id: i,
    isOpenedNextList: false,
  });

  // 1) Insert selectActive and selectList elements
  s.insertAdjacentHTML(
    "beforebegin",
    `
    <div class="select--collapsed u-vertical-center u-gap-s">
      <img class="u-circle" src="images/profile.png" alt="Item image">  
      <span></span>
      <i class="sidebar__icon las la-angle-right"></i>
    </div>
    <div class="select__list select__list--hidden u-border"></div> 
  `
  );

  // 2) Add items to selectList
  const optionTextArray = Array.prototype.map.call(
    s.options,
    (o) => o.innerHTML
  );

  let html = "";
  optionTextArray.forEach(
    (t) =>
      (html = html.concat(
        `<div class="select__item u-vertical-center u-gap-s">
          <img class="u-circle" src="images/profile.png" alt="Item image"> 
          <span>${t}</span>
          <i class="sidebar__icon"></i>
        </div>`
      ))
  );

  const selectList = s.previousElementSibling;
  selectList.innerHTML = html;

  // 3) Add initial HTML to selectActive's span
  selectList.previousElementSibling.querySelector('span').innerHTML = 
    `${s.options[s.options.selectedIndex].innerHTML}`;

  // 4) Update selectActive and selectNative WHEN selectItem is clicked
  const selectItemsCollection = selectList.querySelectorAll(".select__item");
  const selectActive = selectList.previousElementSibling;
  selectItemsCollection.forEach((item, index, arr) => {
    item.addEventListener("click", () => {
      // Add select--active class on clicked item
      // TODO: Remove select--active on every item & 'sidebar__icon las la-check' on every icon
      console.log(arr);
      arr.forEach((p) => {
        p.classList.remove("select--active");
        p.querySelector('.sidebar__icon').classList.remove('las', 'la-check');
      });
      item.classList.add("select--active");
      item.querySelector(".sidebar__icon").classList.add("las", "la-check");
      console.log(item.querySelector(".sidebar__icon"));
      // debugger;

      // Update selectActive's InnerHTML
      selectActive.innerHTML = "";
      selectActive.innerHTML = `
        <img class="u-circle" src="images/profile.png" alt="Item image">  
        <span>${item.querySelector("span").innerHTML}</span>
        <i class="sidebar__icon las la-angle-right"></i>
      `;

      // Update selectedOption on selectNative
      s.options.selectedIndex = index;

      // Close selectList
      toggleVisibility(selectListCollection[i]);
    });
  });

  // 5) Toggle selectList Visibility when selectActive is clicked
  selectActive.addEventListener("click", (e) => {
    const icon = e.target.parentNode.querySelector("i");
    icon.classList.contains("la-angle-right")
      ? icon.classList.replace("la-angle-right", "la-angle-down")
      : icon.classList.replace("la-angle-down", "la-angle-right");
    toggleVisibility(e.target.parentNode.nextElementSibling);
  });
});





console.log("SCRIPT_END");































