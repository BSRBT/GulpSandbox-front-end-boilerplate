$( document ).ready(function() {
    $('pre').each(function(i, e){
        if($(e).find('.comment').text().indexOf('dark') > 0){
            $(e).prev().css('background-color', '#2A2A2A');
        }
        if($(e).find('.comment').text().indexOf('gray') > 0){
            $(e).prev().css('background-color', '#F6F6F6');
        }
        if($(e).find('.comment').text().indexOf('visible') > 0){
            $(e).prev().css({'overflow': 'visible', 'zIndex': '1'});
        }
        if($(e).text().indexOf('no-preview') > 0){
            $(e).prev().hide();

        }
    })

    var grid = function() {
        return {
            data: {
                //konami: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
                konami: [71],
                n: 0
            },
            init: function() {
                $(document).on("keydown", this.onKeydown.bind(this))
            },
            onKeydown: function(e) {
                if (e.keyCode === this.data.konami[this.data.n++]) {
                    if (this.data.n === this.data.konami.length)
                        return $('.ds-grid-debug').toggleClass("visible"),
                        this.data.n = 0,
                        !1
                } else
                    this.data.n = 0
            }
        }
    }();
    grid.init();
    uikit.init();
});
