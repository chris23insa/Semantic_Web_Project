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

async function getSerieName(uri, language) {
    var query = `select ?nom where{ <${uri}> foaf:name ?nom.FILTER(LANG(?nom) = "${language}")}`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await 
            $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            var results = data.results.bindings;
            array['serieName'] = results[0]["nom"]["value"];
        });
        
}

async function getTypeDB(uri, language) {
    var query = `select ?typeLanguage
            where
            {
             <${uri}> rdf:type ?type.
            ?type rdfs:label ?typeLanguage.
            FILTER(LANG(?typeLanguage) = "${language}")}`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await 
            $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            var results = data.results.bindings;         
            array['typeDB'] = [];
            results.forEach(function (element){
                var newElement = element["typeLanguage"]["value"];
                if (array['typeDB'].indexOf(newElement) === -1)
                {
                    array['typeDB'].push(newElement);
                }                   
            });
        });       
}


async function getDescription(uri, language) {
    var query = `select ?com where{ <${uri}> foaf:name ?nom.FILTER(LANG(?nom) = "${language}")}`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await 
            $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            var results = data.results.bindings;
            array['serieName'] = results[0]["nom"]["value"];
        });
        
}

Promise.all([getName(uri, language), getSerieName(uri, language)]), getTypeDB(uri,language).then(() => {
    console.log(array);
});