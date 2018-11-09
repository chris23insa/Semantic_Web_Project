/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function clearResponse()
{
    $("#response").empty()
}

var MAP = {"title":"Game of Thrones",
           "creators":["JM","toto","Paul"],
           "releaseDate":"01-01-2019"};

function getHTML(key,value,lvl)
{
    var container = document.createElement("div")
    var keyContainer = document.createElement("h"+lvl)
    keyContainer.innerHTML = key
    container.append(keyContainer)

    if(typeof value == 'string')
    {
        console.log('string')
        container.append(value)
        return container
    }
    if(value.isArray)
    {
        console.log('isarray')
        var listContainer = document.createElement('ul')
        for(var e in value)
        {
            var li = document.createElement('li')
            li.innerHTML = value[e]
            listContainer.appendChild(li)
        }
        container.append(listContainer)
        return container
    }
    return "test"
}

function displayMap(map)
{
    var title = map["title"]
    var container = document.createElement('div')
    var titleContainer = document.createElement('h1')
    titleContainer.innerHTML=title
    container.append(titleContainer)
    
    delete map["title"]
    for(elem in map)
    {
        var response = getHTML(elem,map[elem],1)
        container.append(getHTML(elem,map[elem],1))
    }
}


// fonction de test, sera supprimé au profit d'une fonction plus modulaire
/*function displayMap(map)
{
    var title = map["title"]
    var creators = map["creators"]
    var releaseDate = map["releaseDate"]

    var container = document.createElement('div')

    var titleContainer = document.createElement('h1')
    titleContainer.innerHTML=title
    container.append(titleContainer)

    var creatorsContainer = document.createElement('div')
    var creatorsTitleContainer = document.createElement('h2')
    creatorsTitleContainer.innerHTML = "Creator(s)"
    var creatorListContainer = document.createElement('ul')
    for(var c in creators)
    {
        var li = document.createElement('li')
        li.innerHTML = creators[c]
        creatorListContainer.appendChild(li)
    }
    creatorsContainer.append(creatorsTitleContainer)
    creatorsContainer.append(creatorListContainer)
    container.append(creatorsContainer)

    var creatorsContainer = document.createElement('div')
    var creatorsTitleContainer = document.createElement('h2')
    creatorsTitleContainer.innerHTML = "Release Date"
    var creatorListContainer = document.createElement('ul')

    $('#response')[0].append(container)
}*/


