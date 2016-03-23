window.onload = function()
{
    $('.fa').on({
        'mouseenter':function(){
            $(this).addClass('fa-inverse');
        },
        'mouseleave':function(){
            $(this).removeClass('fa-inverse');
        }
    });
}
