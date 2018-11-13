var url = "http://dbpedia.org/sparql";
var uri = "http://dbpedia.org/resource/Friends";
var language = "en";

var array = {};

async function getName(uri, language) {
    var query =
        `select ?typeLanguage
        where
        {
             <${uri}> rdf:type ?type.
            ?type rdfs:label ?typeLanguage.
        FILTER(LANG(?typeLanguage) = "${language}")
        }`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            var results = data.results.bindings;
            array['name'] = results[0]["typeLanguage"]["value"];
        });
}

async function getRelatedWorks(uri, language) {
    var query =
        `select ?relName
        where
        {
        <${uri}> dbo:subsequlanguagetWork ?rel.
        ?rel rdfs:label ?relName.
        FILTER(LANG(?relName)="language")
    }`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");

    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            var results = data.results.bindings;
            console.log(results);
            array['country'] = results[0]['country']['value'];
        });
}

async function getCountry(uri, language) {
    var query =
        `select ?country
        where
        {
           <${uri}>  dbp:country ?country.        
        }`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");

    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            var results = data.results.bindings;
            array['country'] = results[0]['country']['value'];
        });
}

async function getLanguage(uri, language) {
    var query =
        `select ?rel
        where
        {
           <${uri}>  dbp:language ?rel.        
        }`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");

    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            var results = data.results.bindings;
            array['language'] = results[0]['rel']['value'];
        });
}

async function getLogo(uri, language) {
    var query =
        `select ?rel
        where
        {
           <${uri}>  <http://xmlns.com/foaf/0.1/depiction> ?rel.        
        }`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");

    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            var results = data.results.bindings;
            array['logo'] = results[0]['rel']['value'];
        });
}

async function getThumbnail(uri, language) {
    var query =
        `select ?rel
        where
        {
            <${uri}> dbo:thumbnail ?rel.        
        }`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");

    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            var results = data.results.bindings;
            array['thumbnail'] = results[0]['rel']['value'];
        });
}

Promise.all([
    getName(uri, language),
    getRelatedWorks(uri, language),
    getCountry(uri, language),
    getLanguage(uri, language),
    getLogo(uri, language),
    getThumbnail(uri, language)
]).then(() => {
    console.log(array);
});