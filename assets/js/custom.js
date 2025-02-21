"use strict";
var techuz = {
  init: function () {
    /******** Header Script *********/
    techuz.HeaderJS();
    /******** End of Header Script *********/

    /***** Banner Script *****/
    techuz.backgroundImage();
    techuz.addEventListeners();
    techuz.swiperSlider();
    /***** End of Banner Script *****/

    /****** GSAP Text Animation ****/
    techuz.typeEffects();
    /*** End of GSAP Text Animation */

    /***** GSAP Stacking Cards Animation ****/
    techuz.stackingCardsEffects();
    /* End of GSAP Stacking Cards Animation */

    /***** Cursor Effects ****/
    techuz.cursorJS();
    /* End of Cursor Effects Animation */
  },

  /*********************************/
  /********* Header Script *********/
  /*********************************/

  HeaderJS: () => {
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

      document
        .querySelectorAll("header i.fa-angle-down")
        .forEach(function (icon) {
          icon.addEventListener("click", function (event) {
            event.preventDefault();
            let submenu = this.closest(".menu-item-has-children").querySelector(
              "ul"
            );
            submenu.classList.toggle("active");
            this.parentElement.parentElement.classList.toggle("active");
            event.stopPropagation();
          });
        });
    });
  },

  /*********************************/
  /***** End of Header Script ******/
  /*********************************/

  /*********************************/
  /******** Banner Script **********/
  /*********************************/

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

  addEventListeners: () => {
    window.addEventListener("resize", techuz.backgroundImage);
    window.addEventListener("orientationchange", techuz.backgroundImage);
  },

  swiperSlider: function () {
    var swiper1 = new Swiper("#swiper-hero1", {
      speed: 1200,
      loop: true,
      spaceBetween: 0,
      autoplay: {
        delay: 600000,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  },

  /*********************************/
  /***** End of Banner Script ******/
  /*********************************/

  /*********************************/
  /******  GSAP Text Animation ****/
  /*********************************/

  typeEffects: function () {
    gsap.registerPlugin(ScrollTrigger);
    const splitTypes = document.querySelectorAll(".reveal-type");

    splitTypes.forEach((char) => {
      const text = new SplitType(char, { types: "words, chars" });

      gsap.from(text.chars, {
        scrollTrigger: {
          trigger: char,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
          // markers: true
        },
        opacity: 0.2,
        y: 20,
        stagger: 0.05,
      });
    });
  },

  /*********************************/
  /*** End of GSAP Text Animation **/
  /*********************************/

  /****************************************/
  /***** GSAP Stacking Cards Animation ****/
  /****************************************/
  stackingCardsEffects: function () {
    const cards = document.querySelectorAll(".stack-item");
    const stickySpace = document.querySelector(".stack-offset");
    const animation = gsap.timeline();
    let cardHeight;

    if (document.querySelector(".stack-item")) {
      function initCards() {
        animation.clear();
        cardHeight = cards[0].offsetHeight;
        //console.log("initCards()", cardHeight);
        cards.forEach((card, index) => {
          if (index > 0) {
            gsap.set(card, {
              y: index * cardHeight,
            });
            animation.to(
              card,
              {
                y: 0,
                duration: index * 0.5,
                ease: "none",
                onComplete: () => {
                  card.classList.add("active");
                },
              },
              0
            );
          }
        });
      }
      initCards();

      ScrollTrigger.create({
        trigger: ".stack-wrapper",
        start: "top top",
        pin: true,
        end: () => `+=${cards.length * cardHeight + stickySpace.offsetHeight}`,
        scrub: true,
        toggleClass: "active-wrapper",
        animation: animation,
        //markers: true,
        invalidateOnRefresh: true,
      });

      ScrollTrigger.addEventListener("refreshInit", initCards);
    }
  },
  /****************************************/
  /* End of GSAP Stacking Cards Animation */
  /***************************************/

  /****************************************/
  /************** Cursor Effects **********/
  /****************************************/
  cursorJS: function () {
    (function () {
      const links = document.querySelectorAll(".hover-this");
      const cursor = document.querySelector(".cursor");

      const animateit = function (e) {
        const hoverAnim = this.querySelector(".hover-anim");
        const { offsetX: x, offsetY: y } = e,
          { offsetWidth: width, offsetHeight: height } = this,
          move = 25,
          xMove = (x / width) * (move * 2) - move,
          yMove = (y / height) * (move * 2) - move;

        hoverAnim.style.transform = `translate(${xMove}px, ${yMove}px)`;
        if (e.type === "mouseleave") hoverAnim.style.transform = "";
      };

      const editCursor = (e) => {
        const { clientX: x, clientY: y } = e;
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
      };

      links.forEach((link) => {
        link.addEventListener("mousemove", animateit);
        link.addEventListener("mouseleave", animateit);
      });

      window.addEventListener("mousemove", editCursor);

      document.querySelectorAll("a, button, .cursor-pointer").forEach((element) => {
        element.addEventListener("mouseenter", () => {
          cursor.classList.add("cursor-active");
        });
        element.addEventListener("mouseleave", () => {
          cursor.classList.remove("cursor-active");
        });
      });
    })();
  },
  /****************************************/
  /******* End of Cursor Effects **********/
  /****************************************/
};

techuz.init();
