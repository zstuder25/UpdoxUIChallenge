var populateRow = function(item, flag = false){
    var provider = $('<tr/>')
            .attr('id', item['first_name'] + '_' + item['last_name'])
            .prepend($('<input/>')
                .attr('type', 'checkbox')
            )
            .append($('<td/>')
                .attr('id', 'name')
                .text(item['last_name'] + ', ' + item['first_name'])
                .append($('<div/>')
                    .attr('id', 'email')
                    .text(item['email_address'])
                )
            )
            .append($('<td/>')
                .attr('id', 'specialty')
                .text(item['specialty'])
                .append($('<div/>')
                    .text(item['practice_name'])
                )
            )

        $('#tableBody').append(provider);
}

$( document ).ready(function() {
    data.forEach(populateRow);

    var table = $('#providers').DataTable();
    table.columns().every( function () {
            var that = this;
            $( 'input', this.footer() ).off( 'keyup change', function () {
                    that
                        .search( this.value )
                        .draw();
            } );
        } );

    $( "#addProvider" ).submit(function( event ) {
      var provider = $('#addProvider').serializeArray()
        .reduce(function(obj, item) {
           obj[item.name] = item.value;
           return obj;
        }, {});
        table.row.add(populateRow(provider))
      return false;
    });

});