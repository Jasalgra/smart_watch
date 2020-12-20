console.log(111);

$(document).ready(function(){
    $('.carousel__inner').slick({
      // infinite: true,
      // slidesToShow: 1,
      // slidesToScroll: 1
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      // adaptiveHeight: true,
      // autoplay: tru e,
      // autoplaySpeed: 2000,
      // fade: true,
      // cssEase: 'linear',
      prevArrow: '<button type="button" class="slick-prev"><img src="img/slider/arrow-left.jpg" alt=""></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="img/slider/arrow-right.jpg" alt=""></button>',
      // responsive: [
      //   {
      //     breakpoint: 920,
      //     settings: {
      //       // slidesToShow: 3,
      //       // slidesToScroll: 3,
      //       // infinite: true,
      //       dots: true,
      //       arrows: false
      //     }
      //   },
      //   {
      //     breakpoint: 480,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //       dots: true,
      //       arrows: false
      //     }
      //   }
      // ]      

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 920,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            arrows: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        }
      ]
    
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    // $('.catalog-item__link').each(function(i) {
    //   $(this).on('click', function(e) {
    //       e.preventDefault();
    //       $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //       $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // })
    // $('.catalog-item__back').each(function(i) {
    //   $(this).on('click', function(e) {
    //       e.preventDefault()
    //       $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //       $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // })

    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault()
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      })
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //MOdal

    // $('[data-modal=consultation]').fadeOut;
    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    // $('[data-modal=consultation]').fadeOut();
    // $('.button_mini').on('click', function() {
    //   $('.overlay, #order').fadeIn('slow');
    // })
    $('.button_mini').each(function(i) {
      // $('.catalog-item__subtitle')
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
        //.toggleClass('catalog-item__content_active');
      })
    })


    //Validation Form

    function validationForms(form) {
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Введите Ваше имя",
            minlength: jQuery.validator.format("Введите {0} символа!")
          },
          phone: "Введите Ваш номер телефона",
          email: {
            required: "Пожалуйста, введите свою почту",
            email: "Неправильно введен адрес почты"
          }
          // email: {
          //   required: "Нам нужна Ваша почта, что бы с Вами связаться",
          //   email: "Ваша почта должна быть в формате: name@domain.com"
          // }
        }
      }); 
      
    }
    validationForms('#consultation-form')
    validationForms('#consultation form')
    validationForms('#order form')

    //Mask Phone number
    $('input[name=phone]').mask("+3 (999) 999-9999");


    //PHP mailer

    $('form').submit(function (e) {
      e.preventDefault();
      $ajax({
        type:"POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function () {
        $(this).find('input').value("");

        $('#consultation, #order').fadeOut();
        // $('#thanks').fadeIn();
        $('.overlay, #thanks').fadeIn();
   

        $('form').trigger('reset');
      });
      return false;

    })

    // Smoth scroll up  & pageup

    $(window).scroll(function() {
      if($(this).scrollTop() > 1600) {
        $(".pageup").fadeIn();
      } else {
        $(".pageup").fadeOut();
      }
    })

    $("a[href^='#']").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });

  });
              