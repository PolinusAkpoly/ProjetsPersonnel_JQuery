import { datasImages } from "../datas/datasImages.js";

$(document).ready(function () {

  var datas = datasImages;
  var currentIndex = 1;


 

  $(datas).each(function (index, dataImage) {
    var affichImages = `<div class="img" id="${dataImage.id}">
        <img src="${dataImage.imageUrl}" alt="Image ${dataImage.id}">
    </div>`;

    $('.container').append(affichImages);

    // image
    $(`#${dataImage.id}`).click(function (event) {
      event.preventDefault();
      $('.img').addClass('image');

      $('#next').removeClass('d-none');
      $('#prev').removeClass('d-none');
      $('.options').removeClass('d-none');

      var id = $(this).attr('id');
      currentIndex = parseInt(id, 10) - 1;
      // console.log(currentIndex);
      showImage(currentIndex);

    });

    // $("#moin").click(function () {
    //   console.log("test");
    // })

  });



  function showImage(index) {
    $('.image').removeClass('active');
    $(`.image:eq(${index})`).addClass('active');
  }

  // showImage(currentIndex);


  $('#next').click(function () {
    currentIndex = (currentIndex + 1) % datas.length;
    showImage(currentIndex);
  });

  $('#prev').click(function () {
    currentIndex = (currentIndex - 1 + datas.length) % datas.length;
    showImage(currentIndex);
  });


  function getScaleValue(matrix) {
    var values = matrix.split('(')[1].split(')')[0].split(',');
    return parseFloat(values[0]);
  }

  

  $("#moin").click(function () {

    $(".img.image.active img").each(function() {
      var $this = $(this);
      var transformMatrix = $this.css('transform');
      // console.log($this.css('transform'));
      var scaleValue = getScaleValue(transformMatrix);

      if (scaleValue === 1) {
        $this.css({
          'transform': 'scale(0.8)',
          'transition': 'transform 1s'
        });
      } else if (scaleValue === 0.8) {
        $this.css({
          'transform': 'scale(0.6)',
          'transition': 'transform 1s'
        });
      } else if (scaleValue === 0.6) {
        $this.css({
          'transform': 'scale(0.4)',
          'transition': 'transform 1s'
        });
      } else if (scaleValue === 0.4){
        $this.css({
          'transform': 'scale(0.2)',
          'transition': 'transform 1s'
        });
      }
    });
  });


  $("#plus").click(function () {

    $(".img.image.active img").each(function () {
      var $this = $(this);
      var transformMatrix = $this.css('transform');
      var scaleValue = getScaleValue(transformMatrix);

      if (scaleValue === 0.8) {
        $this.css({
          'transform': 'scale(1)',
          'transition': 'transform 1s'
        });
      } else if (scaleValue === 0.6) {
        $this.css({
          'transform': 'scale(0.8)',
          'transition': 'transform 1s'
        });
      } else if (scaleValue === 0.4) {
        $this.css({
          'transform': 'scale(0.6)',
          'transition': 'transform 1s'
        });
      } else if (scaleValue === 0.2) {
        $this.css({
          'transform': 'scale(0.4)',
          'transition': 'transform 1s'
        });
      }
    });
  });

  // $("#rotateDrote").click(function () {

  //   $(".img.image.active img").each(function() {
  //     var $this = $(this);
  //     console.log($this);
  //     $this.css({
  //       "transform": "rotate(45deg)",
  //       'transition': 'transform 2s'

  //     });
  //   });
  // });


  var currentAngle = 0;

  $("#rotateDrote").click(function () {
    var increment = 45; // Angle de rotation en degrés pour chaque clic
    currentAngle += increment;
    $(".img.image.active img").css({
      "transform": "rotate(" + currentAngle + 'deg)',
      "padding": "30px",
      'transition': 'transform 1s'
    });
  });

  $("#rotateGauche").click(function () {
    var increment = 45; // Angle de rotation en degrés pour chaque clic
    currentAngle -= increment;
    $(".img.image.active img").css({
      "transform": "rotate(" + currentAngle + 'deg)',
      "padding": "30px",
      'transition': 'transform 1s'
    });
  });

  $('#home').click(function () {
    window.location.reload()
  })

  var indexImageUrl = 0;

  function incrementIndexImageUrl() {
    $('#slideshowImage').attr('src', datas[indexImageUrl].imageUrl).show();
    indexImageUrl = (indexImageUrl + 1) % datas.length
  }
  // $('#slideshowImage').hide();
  $('#diasporama').click(function () {
    $('.galeries').hide();
    $('.options').hide();
    setInterval(incrementIndexImageUrl, 1000);

  });













































































  // var currentIndex = 0;

  //   function showNextImage() {
  //     $("#slideshowImage").attr("src", datas[currentIndex].imageUrl).show();
  //     currentIndex = (currentIndex + 1);
  //   }

  //   $("#startSlideshow").click(function() {

  //     currentIndex = 0; // Reset to the first image
  //     showNextImage(); // Show the first image immediately

  //     setInterval(showNextImage, 2000);
  //   });















});
















