$(document).ready(function(){
    $('#tag').draggable({
        helper:"clone",
        containment:"document"
    });

    $('#tagsCollection').droppable({
        drop:function(event, ui) {
            ui.draggable.detach().appendTo($(this));
        }
    });
});
