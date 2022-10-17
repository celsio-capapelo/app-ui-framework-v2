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
// Custom Select

// Selections, variables
const selectCollection = document.querySelectorAll('.select--custom');

// Functions

selectCollection.forEach(select => {
  // Selections, variables
  const activeItem = select.querySelector(".select__btn");
  const selectList = select.querySelector(".select__list");
  let isOpenedList = false;
  const activeItemIcon = 
    activeItem.querySelector(".select--custom__icon");    
  const itemsCollection = select.querySelectorAll('.select__item');
  
  const closeList = () => {
    selectList.classList.add("select__list--hidden");
    isOpenedList = false;
  };

  const openList = () => {
    selectList.classList.remove("select__list--hidden");
    isOpenedList = true;
  };

  const toggleList = () =>
  isOpenedList ? closeList() : openList();

  // Event Listeners
   
  // Open or close the list by clicking on active item
  activeItem.addEventListener("click", (e) => {
    const icon = activeItem.querySelector(".select--custom__icon");

    // Rotate icon when activeIcon is clicked
    icon.classList.contains("select--custom__icon--rotate")
      ? icon.classList.remove("select--custom__icon--rotate")
      : icon.classList.add("select--custom__icon--rotate");

      toggleList();
      
  });

  // Close List clicking outside of select
  document.addEventListener("click", (e) => {
    const isClickOutsideSelect = !e.target.closest(".select--custom");
    if (isClickOutsideSelect && isOpenedList) closeList();
  });

  // // Close List by pressing the ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpenedList) closeList();
  });

  // Handle click on items
  itemsCollection.forEach(item => {
    item.addEventListener('click', (e) => {
      console.log(e.target);
      // 1) Remove class and atribute related to active on all item
      if ( !item.parentElement.getAttribute('aria-multiselectable') ) {
        itemsCollection.forEach(i => {
          i.setAttribute('aria-selected', false);
          i.classList.remove('select__item--active');
        });
      }
      // 2) Add class and atribute related to active on clicked item
      item.classList.add('select__item--active');
      item.setAttribute('aria-selected', true);

      //3) Update the aria-activedescendant value on the listbox 
      selectList.setAttribute('aria-activedescendant', item.getAttribute('id'))

      // 4) Update activeItem and close list
      
      // Rotate icon when activeIcon is clicked
      const icon = activeItem.querySelector(".select--custom__icon");
      icon.classList.contains("select--custom__icon--rotate")
      ? icon.classList.remove("select--custom__icon--rotate")
      : icon.classList.add("select--custom__icon--rotate");
      
      // Update img and span
      activeItem.querySelector('span').innerText = item.querySelector('span').innerText
      activeItem.querySelector('img').setAttribute('src', item.querySelector('img').getAttribute('src')); 

      // toggleList(); 
      if (!item.parentElement.getAttribute('aria-multiselectable')) closeList();
    });
  });

   // Handle 'Space bar' and 'Enter' press
   itemsCollection.forEach(item => {
    item.onkeydown = (e) => {
      // console.log(e.target, e.key);
      // if (e.key !== 'Enter') return;
      if (e.key !== ' ' && e.key !== 'Enter') return;
      console.log(e.target, e.key);
      // 1) Remove class and atribute related to active on all item
      itemsCollection.forEach(i => {
        i.setAttribute('aria-selected', false);
        i.classList.remove('select__item--active');
      });

      // 2) Add class and atribute related to active on clicked item
      item.classList.add('select__item--active');
      item.setAttribute('aria-selected', true);

      //3) Update the aria-activedescendant value on the listbox 
      selectList.setAttribute('aria-activedescendant', item.getAttribute('id'))

      // 4) Update activeItem and close list
      
      // Rotate icon when activeIcon is clicked
      const icon = activeItem.querySelector(".select--custom__icon");
      icon.classList.contains("select--custom__icon--rotate")
      ? icon.classList.remove("select--custom__icon--rotate")
      : icon.classList.add("select--custom__icon--rotate");
      
      // Update img and span
      activeItem.querySelector('span').innerText = item.querySelector('span').innerText
      activeItem.querySelector('img').setAttribute('src', item.querySelector('img').getAttribute('src')); 

      toggleList(); 
    }
   });
})

// /////////////////////////////////////////////////
// // Select Menus

// // a) Functions
// const toggleVisibility = (element) =>
//   element.classList.contains("select__list--hidden")
//     ? element.classList.remove("select__list--hidden")
//     : element.classList.add("select__list--hidden");

// // b) Selections
// const selectNativeCollection =
//   document.getElementsByClassName("select--native");
// const selectListCollection =
//   document.getElementsByClassName("select__list");
// const selectActiveCollection =
//   document.getElementsByClassName("select--active");

// Array.prototype.forEach.call(selectNativeCollection, (s, i) => {
//   // 1) Insert selectActive and selectList elements
//   s.insertAdjacentHTML(
//     "beforebegin",
//     `
//     <div class="select--container u-border">
//       <div class="select--active u-vertical-center u-gap-s">
//         <img class="u-circle" src="images/profile.png" alt="Item image">  
//         <span class="u-vertical-center"></span>
//         <i class="dropdown__icon las la-angle-right"></i>
//       </div>
//       <div class="select__list select__list--hidden u-border"></div> 
//     </div>
//   `
//   );

//   // 2) Add items to selectList
//   const optionTextArray = Array.prototype.map.call(
//     s.options,
//     (o) => o.innerHTML
//   );

//   let html = "";
//   optionTextArray.forEach(
//     (t) =>
//       (html = html.concat(
//         `<div class="select__item u-vertical-center u-gap-s">
//           <img class="u-circle" src="images/profile.png" alt="Item image"> 
//           <span class="u-vertical-center">${t}</span>
//           <i class="dropdown__icon"></i>
//         </div>`
//       ))
//   );

//   const selectList = s.previousElementSibling.querySelector('.select__list');
//   selectList.innerHTML = html;

//   // 3) Add initial HTML to selectActive's span
//   selectList.previousElementSibling.querySelector('span').innerHTML = 
//     `${s.options[s.options.selectedIndex].innerHTML}`;

//   // 4) Update selectActive and selectNative WHEN selectItem is clicked
//   const selectItemsCollection = selectList.querySelectorAll(".select__item");
//   const selectActive = selectList.previousElementSibling;
//   selectItemsCollection.forEach((item, index, arr) => {
//     item.addEventListener("click", () => {
//       // Add select--active class on clicked item
//       arr.forEach((p) => {
//         p.classList.remove("select--active");
//         p.querySelector('.dropdown__icon').classList.remove('las', 'la-check');
//       });
//       item.classList.add("select--active");
//       item.querySelector(".dropdown__icon").classList.add("las", "la-check");

//       // Update selectActive's InnerHTML
//       selectActive.removeChild(selectActive.querySelector("img"));
//       selectActive.removeChild(selectActive.querySelector("span"));
//       selectActive.insertAdjacentHTML(
//         "afterbegin",
//         `
//         <img class="u-circle" src="images/profile.png" alt="Item image">  
//         <span class="u-vertical-center">${item.querySelector("span").innerHTML}</span>
//       `
//       );
//       selectActive
//         .querySelector("i")
//         .classList.remove("dropdown__icon--rotate");

//       // Update selectedOption on selectNative
//       s.options.selectedIndex = index;

//       // Close selectList
//       toggleVisibility(selectListCollection[i]);
//     });
//   });

//   // 5) Rotate icon when selectActive is clicked
//   selectActive.addEventListener("click", (e) => {
//     const icon = e.target.parentNode.querySelector("i");
//     icon.classList.contains("dropdown__icon--rotate")
//       ? icon.classList.remove("dropdown__icon--rotate")
//       : icon.classList.add("dropdown__icon--rotate");
//     toggleVisibility(e.target.parentNode.nextElementSibling);
//   });
// });

console.log("SCRIPT_END");































