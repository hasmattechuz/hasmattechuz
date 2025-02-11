/*********************************/
/******** Banner Script **********/
/*********************************/

"use strict";
var theme = {
  init: function () {
    theme.backgroundImage();
    theme.swiperSlider();
    theme.addEventListeners();
  },

  /*** Background Image * Adds a background image link via data attribute "data-image-src" */
  backgroundImage: () => {
    var bg = document.querySelectorAll(".bg-image");
    for (var i = 0; i < bg.length; i++) {
      var isMobile = window.innerWidth <= 767; // Check if the device is mobile
      var url = isMobile
        ? bg[i].getAttribute("data-mobile-image-src") ||
          bg[i].getAttribute("data-image-src")
        : bg[i].getAttribute("data-image-src");
      if (url) {
        bg[i].style.backgroundImage = "url('" + url + "')";
      }
    }
  },

  /*** Add event listeners for resize and orientation change */
  addEventListeners: () => {
    window.addEventListener("resize", theme.backgroundImage);
    window.addEventListener("orientationchange", theme.backgroundImage);
  },

  swiperSlider: function () {
    var swiper1 = new Swiper('#swiper-hero1', {
      speed:1200,
      loop: true,
      spaceBetween: 0,
      autoplay: {
        delay: 6000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  },
};

theme.init();
/*********************************/
/***** End of Banner Script ******/
/*********************************/

/*********************************/
/***** Header Script ******/
/*********************************/

$(document).ready(function () {
  const $body = $("body");
  const $header = $(".header");
  const $navDv = $(".nav-dv");

  // Toggle active classes for opening/closing the menu
  $(".btn-hamburger-open").on("click", function () {
    $body.addClass("active-huburger-body");
    $header.addClass("active");
  });

  $(".btn-hamburger-close").on("click", function () {
    $body.removeClass("active-huburger-body");
    $header.removeClass("active");
  });

  // Close menu if click is outside the .nav-dv div
  $(document).on("click", function (event) {
    if (
      !$(event.target).closest($navDv).length &&
      !$(event.target).closest(".btn-hamburger-open").length
    ) {
      $body.removeClass("active-huburger-body");
      $header.removeClass("active");
    }
  });

  // Prevent event bubbling for clicks inside the nav-dv div to avoid closing on itself
  $navDv.on("click", function (event) {
    event.stopPropagation();
  });

  $(window).scroll(function () {
    var sticky = $(".header"),
      scroll = $(window).scrollTop();

    if (scroll >= 190) {
      sticky.addClass("header-sticky");
    } else {
      sticky.removeClass("header-sticky");
    }
  });

  document.querySelectorAll("header i.fa-angle-down").forEach(function (icon) {
    icon.addEventListener("click", function (event) {
      event.preventDefault();
      let submenu = this.closest(".menu-item-has-children").querySelector("ul");
      submenu.classList.toggle("active");
      this.parentElement.parentElement.classList.toggle("active");
      event.stopPropagation();
    });
  });
});


/*********************************/
/***** End of Header Script ******/
/*********************************/