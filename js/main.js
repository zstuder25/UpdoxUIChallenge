$( document ).ready(function() {
    var providers = JSON.parse(data);
    var provider = $(document.createElement('<li>'));
    $('#providers').append(provider);
});