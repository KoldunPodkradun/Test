$(document).ready(function($) {
    //open and close menu and popup

    $('.hamburger').click(function() {
        $('.mob-menu').toggleClass('open-menu');
        $('.hamburger').toggleClass('cross');
        return false;
    });

    // open/close menu/serch

    $('.middle-line-btn').click(function() {
        $('.popup').addClass('popup-open');
        return false;
    });

    $('.contact-form-cross').click(function() {
        $('.popup').removeClass('popup-open');
        return false;
    });


    $('.top-line-search').click(function() {
        $('.search-wrapp').addClass('search-open');
        return false;
    });

    $('.search-cross').click(function() {
        $('.search-wrapp').removeClass('search-open');
        return false;
    });


    /*передает данные в форму*/

    $('.contact-form-submit').click(function() {
        var oneVal = $(this).attr('name');
        $('.form-id').val(oneVal);
    });

    //form

    $('form').submit(function(e) {
        var thisForm = $(this);
        var form = $('form');
        var submitBtn = thisForm.find('input[type="submit"]');
        var data = new FormData(thisForm[0]);
        submitBtn.prop("disabled", true);
        $.ajax({
            url: '/mail.php',
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            type: 'POST',
            success: function(data) {
                thisForm[0].reset();
                form[0].reset();
                submitBtn.prop("disabled", false);
                $('.popup').removeClass('popup-open');
            },
        });
        e.preventDefault();
    });

    //map
    initMap();

    function initMap() {

        var map = new google.maps.Map(document.getElementById('map'), {
            scrollwheel: false,
            zoom: 15,
        });

        var geocoder = new google.maps.Geocoder();

        var address = $('.map-address').text();

        geocoder.geocode({ 'address': address }, function(results, status) {
            if (status == 'OK') {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: document.title,
                    icon: 'img/contacts/map-pin.png'
                });
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    };
});