//Method that creates rows to be placed in the DataTable
function createRow(item){
//I originally had this matching to how the mockup looked, however, I found it extremely difficult
//to try and sort by columns that way, so I changed it more to a default Datatables look to satisfy
//the sort functionality requirement over the aesthetics
    return $('<tr/>')
        .append($('<td/>')
            .append($('<input>')
            .attr('type', 'checkbox'))
        )
        .append($('<td/>')
            .attr('class', 'name')
            .text(item['last_name'] + ', ' + item['first_name'])
        )
        .append($('<td/>')
            .text(item['email_address'])
        )
        .append($('<td/>')
            .text(item['specialty'])
        )
        .append($('<td/>')
            .text(item['practice_name'])
        );
}

//Method called from the forEach method
var populateRow = function(item){
    var provider = createRow(item);
    $('#tableBody').append(provider);
}

//Method to remove selected entries from the DataTable
function removeEntries(){
    var table = $('#providers').DataTable();
    var rows = table.rows().nodes();
    for(var i = 0; i < rows.length; i++){
        if(rows[i].firstChild.firstChild.checked){
            table.row(rows[i]).remove().draw();
        }
    }
}

$( document ).ready(function() {
    //Populate rows for table with the initial data
    data.forEach(populateRow);

    //Initialize and create the DataTable
    var table = $('#providers').DataTable({
          //Scroll functionality
          "scrollY":        "200px",
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

    //Setup listener for the submit button to get the form data, serialize it, and pass it into the row creator
    $( "#addProvider" ).submit(function( event ) {
      var provider = $('#addProvider').serializeArray()
        .reduce(function(obj, item) {
           obj[item.name] = item.value;
           return obj;
        }, {});
        var row = createRow(provider);
        table.row.add(row);
        //Prepend the row instead of just adding it
        $('#providers tbody').prepend(row);
      return false;
    });

});