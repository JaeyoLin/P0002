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

  // Money Requirements 初始化
  moneyRequirementInit();

  // Login Validate Init
  loginValidateInit();

  // Register Validate Init
  registerValidateInit();

  // Register 1 Validate Init
  register1ValidateInit();

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

/**
 * moneyRequirementInit 
 * Money Requirements 初始化
 * 
 */
function moneyRequirementInit() {
  openLoader('money_requirement_loader');

  setTimeout(() => {
    var tmpHtml = '';
    var responseData = [
      {
        isSuccess: true,
        title: "個人資金周轉",
        lineID: "xxxx",
        name: "xxxx",
        money: "100",
        type: "本金",
        place: "台北",
        time: "一小時前",
      },
      {
        isSuccess: false,
        title: "個人資金周轉1111",
        lineID: "xxxx",
        name: "xxxx",
        money: "10012",
        type: "本金",
        place: "台北",
        time: "兩小時前",
      },
      {
        isSuccess: true,
        title: "個人資金周轉11112222",
        lineID: "xxxx",
        name: "xxxx",
        money: "10012",
        type: "本金",
        place: "高雄",
        time: "兩小時前",
      },
    ];

    responseData.forEach(function(issue) {
      tmpHtml = tmpHtml + '<div class="load_money_item">';
      tmpHtml = tmpHtml + '  <div class="">';
      if (issue.isSuccess) {
        tmpHtml = tmpHtml + '<div class="load_money_sucess">借錢成功</div>';
      }
      tmpHtml = tmpHtml + '<span class="load_money_item_title">' + issue.title + '</span>';
      tmpHtml = tmpHtml + '  </div>';
      tmpHtml = tmpHtml + '  <div class="">';
      tmpHtml = tmpHtml + '    <i class="fa-solid fa-user"></i>';
      tmpHtml = tmpHtml + '    <i class="fa-brands fa-line fa-xl" style="color: #00C200; margin-right: 5px;"></i>';
      tmpHtml = tmpHtml + '    <span style="margin-right">' + issue.name + '</span>';
      tmpHtml = tmpHtml + '    <i class="fa-solid fa-dollar-sign" style="margin-right: 5px;"></i>';
      tmpHtml = tmpHtml + '    <span style="margin-right">' + issue.money + '</span>';
      tmpHtml = tmpHtml + '    <i class="fa-solid fa-shield-halved" style="margin-right: 5px;"></i>';
      tmpHtml = tmpHtml + '    <span style="margin-right">' + issue.type + '</span>';
      tmpHtml = tmpHtml + '    <i class="fa-solid fa-map-pin" style="margin-right: 5px;"></i>';
      tmpHtml = tmpHtml + '    <span style="margin-right">' + issue.place + '</span>';
      tmpHtml = tmpHtml + '    <i class="" style="margin-right: 5px;"></i>';
      tmpHtml = tmpHtml + '    <span style="margin-right">' + issue.time + '</span>';
      tmpHtml = tmpHtml + '  </div>';
      tmpHtml = tmpHtml + '</div>';
    });

    $('#money_requirement_container').html(tmpHtml);

    closeLoader('money_requirement_loader');
    $('#money_requirement_container').show();
  }, 2000);
}

/**
 * registerValidateInit
 * Register Validate Init
 * 
 */
 function registerValidateInit() {
  var config = {
    errorPlacement: function(error, element) {
			// Append error within linked label
			$( element )
				.closest( "form" )
        .find( "div[id='" + element.attr( "id" ) + "_box']" )
					// .find( "label[for='" + element.attr( "id" ) + "']" )
						.append( error );
		},
    // errorElement: "div",
    // lang: 'vi',
    rules: {
      account: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 8,
      },
      nickname: {
        required: true,
      },
      mobile_phone: {
        required: true,
      },
      load_money: {
        required: true,
        number: true,
      },
    },
    submitHandler: function(form) {
      console.log('TODO', 'Register');
    }
  };

  if ($("#registerForm").exists()) {
    var validator = $("#registerForm").validate(config);

    validator.resetForm();
    $(".error").removeClass("error");
  }
}

/**
 * register1ValidateInit
 * Register 1 Validate Init
 * 
 */
 function register1ValidateInit() {
  var config = {
    errorPlacement: function(error, element) {
			// Append error within linked label
			$( element )
				.closest( "form" )
        .find( "div[id='" + element.attr( "id" ) + "_box']" )
					// .find( "label[for='" + element.attr( "id" ) + "']" )
						.append( error );
		},
    // errorElement: "div",
    // lang: 'vi',
    rules: {
      account: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 8,
      },
      company_name: {
        required: true,
      },
      mobile_phone: {
        required: true,
      },
      max_load_monet: {
        required: true,
        number: true,
      },
    },
    submitHandler: function(form) {
      console.log('TODO', 'Register 1');
    }
  };

  if ($("#registerForm_1").exists()) {
    var validator = $("#registerForm_1").validate(config);

    validator.resetForm();
    $(".error").removeClass("error");
  }
}

/**
 * loginValidateInit
 * Login Validate Init
 * 
 */
 function loginValidateInit() {
  var config = {
    errorPlacement: function(error, element) {
			// Append error within linked label
			$( element )
				.closest( "form" )
        .find( "div[id='" + element.attr( "id" ) + "_box']" )
					// .find( "label[for='" + element.attr( "id" ) + "']" )
						.append( error );
		},
    // errorElement: "div",
    // lang: 'vi',
    rules: {
      account: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 8,
      },
    },
    submitHandler: function(form) {
      console.log('TODO', 'Login');
    }
  };

  if ($("#loginForm").exists()) {
    var validator = $("#loginForm").validate(config);

    validator.resetForm();
    $(".error").removeClass("error");
  }
}