$.fn.exists = function () {
  return this.length !== 0;
}

$(function() {
  // i18n 初始化
  i18nInit();

  // Go to top 初始化
  goToTopInit();

  // Search Tags 初始化
  searchTagsInit();

  // Register Validate Init
  // registerValidateInit();

  $('.slideImageWrapper').slick({
    dots: false,
    infinite: true,
    speed: 500,
    // fade: true,
    cssEase: 'linear',
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  });
});

/**
 * i18nInit
 * i18n 初始化
 * 
 */
function i18nInit() {
  var lang = localStorage.getItem(I18N_LANG_KEY);
  
  // 預設英文
  if (lang === undefined || lang === null) {
    lang = 'en_US';
  }

  $.i18n({
    locale: lang,
  });

  // 讀取語系檔
  $.i18n().load({
    'en_US': './i18n/en_US.json',
    'zh_TW': './i18n/zh_TW.json',
    'vi_VN': './i18n/vi_VN.json'
  }).done(function (){

    // 語系初始化
    $('body').i18n();
  });

  // Validation Language
  $.extend($.validator.messages, VALIDATE_LANG[lang]);

  // Language menu init
  var langOptions = $('.langOption');
  if (langOptions !== undefined && langOptions !== null) {
    for (var i = 0; i < langOptions.length; i++) {
      var $tmpObject = $(langOptions[i]);
      $tmpObject.removeClass('active');
      
      if ($tmpObject.attr('value') === lang) {
        $tmpObject.addClass('active');
      }
    }
  }

  // click language option
  $('.langOption').on('click', function(e) {
    let locale = $(this).attr('value');
    $('.langOption').removeClass('active');
    $(this).addClass('active');
    
    localStorage.setItem(I18N_LANG_KEY, locale);

    $.i18n({
      locale: locale
    });
    $('body').i18n();

    $.extend($.validator.messages, VALIDATE_LANG[locale]);
  });
}

/**
 * goToTopInit
 * Go to top 初始化
 * 
 */
function goToTopInit() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 500, 'easeInOutExpo');
    return false;
  });
}

/**
 * registerValidateInit
 * Register Validate Init
 * 
 */
 function registerValidateInit() {
  var config = {
    // lang: 'vi',
    rules: {
      account: "required",
      password: {
        required: true,
        minlength: 8
      },
      confirm_password: {
        required: true,
        minlength: 8,
        equalTo: "#password"
      },
      email: {
        required: true,
        email: true
      },
      mobile_phone: {
        required: true
        // required: true,
        // number: true
      },
      invitation_code: "required"
    },
    // messages: {
    //   mobile_phone: {
    //     number: $.i18n('browser_recommendation'),
    //   }
    // },
    submitHandler: function(form){
      // form.submit();
      console.log('TODO', 'Register');
    }
  };
  
  if ($("#registerForm").exists()) {
    var validator = $("#registerForm").validate(config);

    $("#btn_register").click(function() {
      $('#account').val(null);
      $('#password').val(null);
      $('#confirm_password').val(null);
      $('#email').val(null);
      $('#mobile_phone').val(null);
      $('#invitation_code').val(null);
      
      validator.resetForm();
      $(".error").removeClass("error");
    });
  }
}

/**
 * openLoader
 * 開啟 loader
 * 
 * @param {string} elementId HTML element id
 */
function openLoader(elementId) {
  $('#' + elementId).show();
  $('#' + elementId).scheletrone();
}

/**
 * closeLoader
 * 關閉 loader
 * 
 * @param {string} elementId HTML element id
 */
function closeLoader(elementId) {
  $('#' + elementId).hide();
}

/**
 * searchTagsInit
 * 搜尋 Tags 初始化
 * 
 */
function searchTagsInit() {
  openLoader('search_tags_loader');

  setTimeout(() => {
    var tmpHtml = '';
    var responseData = [
      {
        title: '借錢',
      },
      {
        title: '小額借款',
      },
      {
        title: '當鋪',
      },
      {
        title: '小額借錢',
      },
      {
        title: '我要借錢',
      },
      {
        title: '快速借錢',
      },
      {
        title: '無薪轉無勞保貸款',
      },
    ];

    responseData.forEach(function(tag) {
      tmpHtml = tmpHtml + '<div class="widget_search_tag">';
      tmpHtml = tmpHtml + tag.title;
      tmpHtml = tmpHtml + '</div>';
    });

    $('#search_tags_container').html(tmpHtml);

    closeLoader('search_tags_loader');
    $('#search_tags_container').show();
  }, 2000);
}