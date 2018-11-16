var url = "http://dbpedia.org/sparql";
var uri = "http://dbpedia.org/resource/Friends";
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
                console.log("getName : ", data.results);
                var results = data.results.bindings;
                array['title'] = results[0]["nom"]["value"];
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
                console.log("getSerieName : ", data.results);
                var results = data.results.bindings;
                array['Serie Name'] = results[0]["nom"]["value"];
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
                console.log("getTypeDB : ", data.results);
                var results = data.results.bindings;
                array['Type article DBpedia'] = [];
                results.forEach(function (element) {
                    var newElement = element["typeLanguage"]["value"];
                    if (array['Type article DBpedia'].indexOf(newElement) === -1) {
                        array['Type article DBpedia'].push(newElement);
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
                console.log("getDescription : ", data.results);
                var results = data.results.bindings;
                array['Description'] = results[0]["com"]["value"];

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
                console.log("getType : ", data.results);
                var results = data.results.bindings;
                array['Type'] = [];
                results.forEach(function (element) {
                    var newElement = element["typeSerie"]["value"];
                    if (array['Type'].indexOf(newElement) === -1) {
                        array['Type'].push(newElement);
                    }
                });
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
                console.log("getCompany : ", data.results);
                var results = data.results.bindings;
                array['Company'] = [];
                results.forEach(function (element) {
                    var newElement = element["companyLabel"]["value"];
                    if (array['Company'].indexOf(newElement) === -1) {
                        array['Company'].push(newElement);
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
                console.log("getRuntime : ", data.results);
                var results = data.results.bindings;
                array['Runtime'] = [];
                results.forEach(function (element) {
                    var newElement = element["runtime"]["value"].replace('-','');
                    if (array['Runtime'].indexOf(newElement) === -1) {
                        array['Runtime'].push(newElement);
                    }
                });
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
                console.log("getLastDate : ", data.results);
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
                console.log("getCreators : ", data.results);
                var results = data.results.bindings;
                array['Creators'] = [];
                results.forEach(function (element) {
                    var newElement = element["creatorName"]["value"];
                    if (array['Creators'].indexOf(newElement) === -1) {
                        array['Creators'].push(newElement);
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
                console.log("getDistributor : ", data.results);
                var results = data.results.bindings;
                array['Distributors'] = [];
                results.forEach(function (element) {
                    var newElement = element["distributorName"]["value"];
                    if (array['Distributors'].indexOf(newElement) === -1) {
                        array['Distributors'].push(newElement);
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
                console.log("getStars : ", data.results);
                var results = data.results.bindings;
                array['Stars'] = [];
                results.forEach(function (element) {
                    var newElement = element["starsName"]["value"];
                    if (array['Stars'].indexOf(newElement) === -1) {
                        array['Stars'].push(newElement);
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
                console.log("getNetwork : ", data.results);
                var results = data.results.bindings;
                array['Network'] = results[0]["networkName"]["value"];
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
                console.log("getNumberEpisodes : ", data.results);
                var results = data.results.bindings;
                array['Number Of Episodes'] = results[0]["nbrEpisode"]["value"];
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
                console.log("getNumberSeasons : ", data.results);
                var results = data.results.bindings;
                array['Number Of Seasons'] = results[0]["nbrSeasons"]["value"];
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
                console.log("getTheme : ", data.results);
                var results = data.results.bindings;
                array['theme'] = results[0]["Theme Name"]["value"];
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
                console.log("getReleaseDate : ", data.results);
                var results = data.results.bindings;
                array['Release Date'] = results[0]["relDate"]["value"];
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
                console.log("getRelatedWorks : ", data.results);
                var results = data.results.bindings;
                array['Related Series'] = results[0]['relName']['value'];
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
                console.log("getCountry : ", data.results);
                var results = data.results.bindings;
                array['Country'] = [];
                results.forEach(function (element) {
                    var newElement = element['country']['value'];
                    if (array['Country'].indexOf(newElement) === -1) {
                        array['Country'].push(newElement);
                    }
                });
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
                console.log("getLanguage : ", data.results);
                var results = data.results.bindings;
                array['Language'] = results[0]['rel']['value'];
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
                console.log("getLogo : ", data.results);
                var results = data.results.bindings;
                array['image'] = results[0]['rel']['value'];
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
                console.log("getThumbnail : ", data.results);
                var results = data.results.bindings;
                array['thumbnail'] = results[0]['rel']['value'];
            } catch (error) {
            }
        });
}

async function getData(uri, language) {
	array = {};
    await Promise.all([
        getName(uri, language), 
        getSerieName(uri, language), 
        getTypeDB(uri,language), 
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

    
    getData(uri, language).then((array1) => {
        console.log(JSON,array1);
        console.log(JSON.stringify(array1));
        });
        
async function getSeriesListByCategories(language, genre) {
    var query =
        `select distinct ?uri ?nameSerie
        where
        {
            ?uri rdf:type dbo:TelevisionShow.
            ?uri foaf:name ?nameSerie.
            ?uri dbo:genre ?genre.
            ?genre rdfs:label ?genreName.
            FILTER(contains(?genreName, "${genre}"))
            FILTER(LANG(?nameSerie)="${language}") 
        }`;
    var queryUrl = encodeURI(url + "?query=" + query + "&format=json");
    
    var results;

    await
        $.ajax({
            dataType: "jsonp",
            url: queryUrl
        }).done((data) => {
            try{
                results = data.results.bindings; 
            }catch(error){}
        });
        
    return results;
}

/*getSeriesListByCategories(language, "Action").then((response) => {
    console.log(response);
});*/

