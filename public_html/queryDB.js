var url = "http://dbpedia.org/sparql";
var uri = "http://dbpedia.org/resource/Quantico_(TV_series)";
var language = "en";

var array = {};

async function getName(uri, language) {
    var query = `select ?nom where{ <${uri}> rdfs:label ?nom.FILTER(LANG(?nom) = "${language}")}`;
    console.log(query);
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            var results = data.results.bindings;
            array['name'] = results[0]["nom"]["value"];
        });
}

getName(uri, language).then(function () {
    console.log(array);
});

