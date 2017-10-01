var url = 'https://restcountries.eu/rest/v2/name/';
var myTable = $('#myTable');

$('#search').click(searchCountries);
$('#country-names').on('keypress', function (e) {
    if (e.keyCode == 13) {
        searchCountries();
    }
});

function searchCountries() {
    var countryName = $('#country-names').val();

    if (!countryName.length) {
        countryName = 'Poland';
    }
    $.ajax({
        url: url + countryName,
        method: 'GET',
        success: showCountriesList
    });
}

function createRow(key, value) {
    return $('<tr>').html(`<td> ${key} </td><td> : ${value} </td>`);
}

function showCountriesList(resp) {
    myTable.empty();

    resp.forEach(function (item) {

        var alpha3Code = item.alpha3Code,
            alpha3CodeLow = alpha3Code.toLowerCase(),
            flagLink = "https://restcountries.eu/data/" + alpha3CodeLow + '.svg',
            img = $('<img>').attr('src', flagLink).attr('width', 180).attr('height', 110),
            h1 = $('<h1>').text(item.name);

        $('<tr>').appendTo(myTable).append(img).append(h1).addClass('country');
        $('<thead>').text('Background Information :').appendTo(myTable).addClass('header');

        createRow('Capital City', item.capital).appendTo(myTable);
        createRow('Currency', item.currencies[0].name + '; ' + item.currencies[0].symbol).appendTo(myTable);
        createRow('Country Code', item.alpha2Code).appendTo(myTable);
        createRow('Area', item.area + ' km2').appendTo(myTable);
        createRow('Borders', item.borders).appendTo(myTable);
        createRow('Region', item.region).appendTo(myTable);
        createRow('Population', item.population + ' thousands').appendTo(myTable);
        $('<tfoot>').appendTo(myTable);
    });
}