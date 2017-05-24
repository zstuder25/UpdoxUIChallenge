function createRow(item){
    return $('<tr/>')
        .attr('id', item['first_name'] + '_' + item['last_name'])
        .prepend($('<input/>')
            .attr('type', 'checkbox')
            .attr('class', 'checkbox')
        )
        .append($('<td/>')
            .attr('class', 'name')
            .text(item['last_name'] + ', ' + item['first_name'])
            .append($('<div/>')
                .attr('class', 'email')
                .text(item['email_address'])
            )
        )
        .append($('<td/>')
            .attr('class', 'specialty1')
            .text(item['specialty'])
            .append($('<div/>')
                .text(item['practice_name'])
            )
        );
}

var populateRow = function(item){
    var provider = createRow(item);
    $('#tableBody').append(provider);
}

function removeEntries(){
    var table = $('#providers').DataTable();
    var rows = table.rows().nodes();
    for(var i = 0; i < rows.length; i++){
        if(rows[i].firstChild.checked){
            table.row(rows[i]).remove().draw();
        }
    }
}

$( document ).ready(function() {
    data.forEach(populateRow);

    var table = $('#providers').DataTable({
          "scrollY":        "400px",
          "scrollCollapse": true,
          "paging":         false
      });
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
        table.row.add(createRow(provider)).draw(false);
      return false;
    });

});