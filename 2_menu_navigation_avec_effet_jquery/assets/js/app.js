$(document).ready(function () {

  var menu = $("#menu li a");

  $(menu).click(function (event) { 
    event.preventDefault();
    
    var href = $(this).attr('href');
    console.log(`href`, href);

    if (href === '#produits') {
      //  $('.divproduitsItem').removeClass('d-none');
      // $('.divproduitsItem').show();
      $('.divproduitsItem').slideDown(1000);

      
    }

// affichage du contenu de a au click

    var content = $("#content").children();
     $.each(content, function (index, div) { 
        $(div).hide()
       var id = '#' + $(div).attr('id');
    //    console.log(`id`, id);
       if (href === id) {
        $(div).show();
       }
    });

    // animation de a au click
    // $(this).animate({
    //     fontSize: '20px'
    // },2000);


    
    
  });
  





 $(menu).hover(
    function (event) { 
      event.stopPropagation();
    // $(this).addClass('hover');
    $(this).css({'background-color': 'black',
      'borderLeft': '1px solid white',
      'borderRight': '1px solid white'
    });
    $(this).animate({
        fontSize: '+=10px'
    },1000);
    
},
function (event) { 
  event.stopPropagation();
  $(this).css({'background-color': '',
    'borderLeft': '',
    'borderRight': ''
  });
  $(this).animate({
    fontSize: '-=10px'
},1000);

}); 

$("#produitsItem li a").hover(
    function (event) { 
      event.stopPropagation();
    // $(this).addClass('hover');
    $(this).css({'background-color': 'black',
      'borderLeft': '1px solid white',
      'borderRight': '1px solid white'
    });
    $(this).animate({
        fontSize: '+=10px'
    },1000);

},
function (event) { 
  event.stopPropagation();
  $(this).css({'background-color': '',
    'borderLeft': '',
    'borderRight': ''
  });
  $(this).animate({
    fontSize: '-=10px'
},1000);


});


$('.divproduitsItem').hover(
  function () { 
  $(this).show()
}, function () { 
  $(this).hide()
}
);


let menuresponsive = $('.menuresponsive'); 
let nav = $('#menu');

menuresponsive.click(function(){
console.log( 'click');
  $(this).toggleClass('menunouvo');
  nav.toggle();

});

    

    
























});


























