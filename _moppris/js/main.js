window.onload = function()
{
    $('.menu-icon').on({
        'mouseenter':function(){
            $(this).addClass('fa-inverse');
        },
        'mouseleave':function(){
            $(this).removeClass('fa-inverse');
        }
    });
}
