var Country = Country || {};

Country.SearchEngine = new function() {
    
    $('#search').click(function() {
        Country.SearchEngine.searchCountries();
    });

    $('#country-names').on('keypress', function(e) {
        if (e.keyCode === 13) {
            Country.SearchEngine.searchCountries();
        }
    });

    this.searchCountries = function() {
        
        let countryName = $('#country-names').val(),
            url = 'https://restcountries.eu/rest/v2/name/';

        if (!countryName.length) {
            countryName = 'Poland';
        }
        
        $.ajax({
            url: url + countryName,
            method: 'GET'
        })
        .done(Country.SearchEngine.showCountriesList)
        .fail(function() {
            console.log('Error occurred');
        });
    };

    this.createRow = function(key, value) {
        return $('<tr>').html(`<td>${key}</td><td>${value}</td>`);
    };
    
    this.showCountriesList = function(resp) {
        let myTable = $('#myTable');
        
        myTable.empty();

        resp.forEach(function (item) {

            let alpha3Code = item.alpha3Code,
                alpha3CodeLow = alpha3Code.toLowerCase(),
                flagLink = "https://restcountries.eu/data/" + alpha3CodeLow + '.svg',
                img = $(`<img src="${flagLink}" alt="${alpha3CodeLow}">`),
                h2 = $('<h2>').text(item.name);

            $('<tr>').appendTo(myTable).append(img).append(h2).addClass('country');
            $('<thead>').appendTo(myTable).addClass('header');

            Country.SearchEngine.createRow('Capital City', item.capital).appendTo(myTable);
            Country.SearchEngine.createRow('Currency', item.currencies[0].name + '(' + item.currencies[0].symbol+ ')').appendTo(myTable);
            Country.SearchEngine.createRow('Country Code', item.alpha2Code).appendTo(myTable);
            Country.SearchEngine.createRow('Area', item.area + ' km<sup>2</sup>').appendTo(myTable);
            Country.SearchEngine.createRow('Borders', item.borders).appendTo(myTable);
            Country.SearchEngine.createRow('Region', item.region).appendTo(myTable);
            Country.SearchEngine.createRow('Population', (Math.floor(item.population))).appendTo(myTable);
            Country.SearchEngine.createRow('Time Zone', item.timezones).appendTo(myTable);
            Country.SearchEngine.createRow('Language', item.languages[0].name).appendTo(myTable);
        });
    };
};
