var populateRow = function(item){
    var provider = $('<tr/>')
            .prepend($('<input/>')
                .attr('type', 'checkbox')
            )
            .append($('<td/>')
                .attr('id', 'name')
                .text(item['last_name'] + ', ' + item['first_name'])
            )
            .append($('<td/>')
                .attr('id', 'specialty')
                .text(item['specialty'])
            )
            .append($('<td/>')
                .text(item['email_address'])
            )
            .append($('<td/>')
                .text(item['practice_name'])
            );

        $('#tableBody').append(provider);
}

//var applySearch = function(){
//    table.columns().every( function () {
//            var that = this;
//
//            $( 'input', this.footer() ).on( 'keyup change', function () {
//                if ( that.search() !== this.value ) {
//                    that
//                        .search( this.value )
//                        .draw();
//                }
//            } );
//        } );
//}

$( document ).ready(function() {
    data.forEach(populateRow);
    var table = $('#providers').DataTable();
});