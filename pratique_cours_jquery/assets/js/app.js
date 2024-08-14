// window.onload= function() {
//     console.log(`test`, "test");
// }
// $(function() {
//     console.log(`test2`, "test2");
// })
$(document).ready(function () {


    // var frereItem5 = $(".item7a").prevAll();
    // frereItem5.addClass("red");


    $('#h1Jquery').click(function () {

        // $(this).css({
        //     color: "red"
        // });
        $(this).addClass('red')

    })

    $(window).scroll(function () {

        // $('body').addClass('red')


        var h2 = $('h2');
        h2.each(function () {
            var posScrollBar = $(window).scrollTop()
            var posH2 = $(this).offset().top
            console.log(posH2);
            console.log('posScrollBar' + '=' + posScrollBar);
            if (posH2 < posScrollBar + 20) {
                $(this).css({
                    'color': 'white',
                    'box-shadow': '1px 5px 2px gold',
                    'background-color': 'blue',
                    'text-align': 'center',
                    'height': '40px'
                })
            }

            $(this).click(function () {

                // $(this).next().hide();
                // $(this).next().show();
                //  var text = $(this).next().fadeTo(2000, 0.5);
                //  console.log(text);
                // $(this).next().slideUp(2000);
                // $(this).next().slideDown(2000);
                //    $(this).next().slideToggle(2000);


            })


        })


    })

    $('.play').click(function () {
        console.log("test");
        $('.objet').animate({
            marginLeft: "500px",
            width: "+=150px",
            height: "+=150px"
        }, 3000).animate({
            opacity: "0.2"
        }, {
            "queue": false,
            "duration": 3000
        });
    });


    $('.stop').click(function () {
        console.log("test stop");
        $('.objet').stop(true, false);
    });


    // var url = "./pages/users.html"
    // $('.container-load').load(url)


    var url = "./api/users.json"
    $.get(url, function (response, status) {
        console.log("response", response);
        console.log("status", status);
        if (status == 'success' && response.isSuccess) {
            var users = response.results;
            $.each(users, function (index, user) {
                
                console.log(user);

                var content = `<div class="user-item"> ${user.name} </div>`

                $('.users').append(content)

            });



        }

    })



































})



























































