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
            try {
                var results = data.results.bindings;
                array['name'] = results[0]["nom"]["value"];
            } catch (error) {
            }

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
            try {
                var results = data.results.bindings;
                array['serieName'] = results[0]["nom"]["value"];
            } catch (error) {
            }
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
            try {
                var results = data.results.bindings;
                array['typeDB'] = [];
                results.forEach(function (element) {
                    var newElement = element["typeLanguage"]["value"];
                    if (array['typeDB'].indexOf(newElement) === -1) {
                        array['typeDB'].push(newElement);
                    }

                });
            } catch (error) {
            }
        });
}


async function getDescription(uri, language) {
    var query = `select ?com where{ <${uri}> dbo:abstract ?com.FILTER(LANG(?com) = "${language}")}`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            try {
                var results = data.results.bindings;
                array['description'] = results[0]["com"]["value"];

            } catch (error) {
            }
        });

}


async function getType(uri, language) {
    var query = `select ?typeSerie
            where
            {
             <${uri}> dct:subject ?subject.
            ?subject rdfs:label ?typeSerie.
            FILTER(LANG(?typeSerie) = "${language}")}`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            try {
                var results = data.results.bindings;
                array['type'] = [];
                results.forEach(function (element) {
                    var newElement = element["typeSerie"]["value"];
                    if (array['type'].indexOf(newElement) === -1) {
                        array['type'].push(newElement);
                    }
                });
            } catch (error) {
            }
        });
}

async function getRuntime(uri, language) {
    var query = `select ?runtime where{ <${uri}> <http://dbpedia.org/ontology/Work/runtime> ?runtime.}`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            try {
                var results = data.results.bindings;
                array['runtime'] = results[0]["runtime"]["value"];
            } catch (error) {
            }
        });

}

async function getCompany(uri, language) {
    var query = `select ?companyLabel
            where
            {
             <${uri}> dbo:company ?company.
             ?company rdfs:label ?companyLabel.
             FILTER(LANG(?companyLabel)="${language}")}`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            try {
                var results = data.results.bindings;
                array['company'] = [];
                results.forEach(function (element) {
                    var newElement = element["companyLabel"]["value"];
                    if (array['company'].indexOf(newElement) === -1) {
                        array['company'].push(newElement);
                    }
                });
            } catch (error) {
            }
        });
}


async function getRuntime(uri, language) {
    var query = `select ?runtime where{ <${uri}> <http://dbpedia.org/ontology/Work/runtime> ?runtime.}`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            try {
                var results = data.results.bindings;
                array['runtime'] = results[0]["runtime"]["value"];
            } catch (error) {
            }
        });

}

async function getLastDate(uri, language) {
    var query = `select ?date where{ <${uri}> dbo:completionDate ?date.}`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            try {
                var results = data.results.bindings;
                array['lastEpisodeDate'] = results[0]["date"]["value"];
            } catch (error) {
            }
        });

}

async function getCreators(uri, language) {
    var query = `select ?creatorName
            where
            {
             <${uri}> dbo:creator ?creator.
             ?creator rdfs:label ?creatorName.
             FILTER(LANG(?creatorName)="${language}")}`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            try {
                var results = data.results.bindings;
                array['creators'] = [];
                results.forEach(function (element) {
                    var newElement = element["creatorName"]["value"];
                    if (array['creators'].indexOf(newElement) === -1) {
                        array['creators'].push(newElement);
                    }
                });
            } catch (error) {
            }
        });
}

async function getDistributor(uri, language) {
    var query = `select ?distributorName
            where
            {
             <${uri}> dbo:distributor ?distributor.
             ?distributor rdfs:label ?distributorName.
             FILTER(LANG(?distributorName)="${language}")}`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            try {
                var results = data.results.bindings;
                array['distributors'] = [];
                results.forEach(function (element) {
                    var newElement = element["distributorName"]["value"];
                    if (array['distributors'].indexOf(newElement) === -1) {
                        array['distributors'].push(newElement);
                    }
                });
            } catch (error) {
            }
        });
}

async function getStars(uri, language) {
    var query = `select ?starsName
            where
            {
             <${uri}> dbo:starring ?stars.
            ?stars rdfs:label ?starsName.
            FILTER(LANG(?starsName)="${language}").
            }`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            try {
                var results = data.results.bindings;
                array['stars'] = [];
                results.forEach(function (element) {
                    var newElement = element["starsName"]["value"];
                    if (array['stars'].indexOf(newElement) === -1) {
                        array['stars'].push(newElement);
                    }
                });
            } catch (error) {
            }

        });
}

async function getNetwork(uri, language) {
    var query = `select ?networkName where{ <${uri}> dbo:network ?network.
    ?network rdfs:label ?networkName.
    FILTER(LANG(?networkName)="${language}")
    }`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            try {
                var results = data.results.bindings;
                array['network'] = results[0]["networkName"]["value"];
            } catch (error) {
            }

        });

}

async function getNumberEpisodes(uri, language) {
    var query = `select ?nbrEpisode 
    where{ <${uri}> dbo:numberOfEpisodes ?nbrEpisode.
    }`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            try {
                var results = data.results.bindings;
                array['numberOfEpisodes'] = results[0]["nbrEpisode"]["value"];
            } catch (error) {
            }

        });

}


async function getNumberSeasons(uri, language) {
    var query = `select ?nbrSeasons 
    where{ <${uri}> dbo:numberOfSeasons ?nbrSeasons.
    }`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            try {
                var results = data.results.bindings;
                array['numberOfSeasons'] = results[0]["nbrSeasons"]["value"];
            } catch (error) {
            }
        });

}

async function getTheme(uri, language) {
    var query = `select ?themeName 
    where{ <${uri}> dbo:openingTheme ?theme.
   ?theme rdfs:label ?themeName.
    FILTER(LANG(?themeName)="${language}")
    }`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            try {
                var results = data.results.bindings;
                array['theme'] = results[0]["themeName"]["value"];
            } catch (error) {
            }
        });

}

async function getReleaseDate(uri, language) {
    var query = `select ?relDate 
    where{ <${uri}> dbo:releaseDate ?relDate.
    }`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            try {
                var results = data.results.bindings;
                array['releaseDate'] = results[0]["relDate"]["value"];
            } catch (error) {
            }
        });

}

async function getRelatedWorks(uri, language) {
    var query =
        `select ?relName
        where
        {
            <${uri}> dbo:subsequentWork ?rel.
            ?rel rdfs:label ?relName.
            FILTER(LANG(?relName)="${language}")
        }`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");

    return await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            try {
                var results = data.results.bindings;
                array['relName'] = results[0]['relName']['value'];
            } catch (error) {
            }
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
            try {
                var results = data.results.bindings;
                array['country'] = results[0]['country']['value'];
            } catch (error) {
            }
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
            try {
                var results = data.results.bindings;
                array['language'] = results[0]['rel']['value'];
            } catch (error) {
            }
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
            try {
                var results = data.results.bindings;
                array['logo'] = results[0]['rel']['value'];
            } catch (error) {
            }
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
            try {
                var results = data.results.bindings;
                array['thumbnail'] = results[0]['rel']['value'];
            } catch (error) {
            }
        });
}

async function getData(uri, language) {
    await Promise.all([
        getName(uri, language),
        getSerieName(uri, language),
        getTypeDB(uri, language),
        getDescription(uri, language),
        getType(uri, language),
        getRuntime(uri, language),
        getCompany(uri, language),
        getLastDate(uri, language),
        getCreators(uri, language),
        getDistributor(uri, language),
        getStars(uri, language),
        getNetwork(uri, language),
        getNumberEpisodes(uri, language),
        getNumberSeasons(uri, language),
        getTheme(uri, language),
        getReleaseDate(uri, language),
        getRelatedWorks(uri, language),
        getCountry(uri, language),
        getLanguage(uri, language),
        getLogo(uri, language),
        getThumbnail(uri, language)
    ]);
    return array;
}

getData(uri, language).then((array) => {
    console.log(array);
});
