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
           "Autre":{"Ceci est un test":1, "et un autre":[1,2,3,4,5,6]},
           "releaseDate":"01-01-2019"};

function getHTML(key,value,lvl)
{
    var container = document.createElement("div")
    var keyContainer = document.createElement("h"+lvl)
    keyContainer.innerHTML = key
    container.append(keyContainer)

    if(typeof value == 'string')
    {
        container.append(value)
        return container
    }
    if(Array.isArray(value))
    {
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

    for(e in value)
    {
      container.append(getHTML(e,value[e],lvl+1))
    }
    return container

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

    $("#response")[0].appendChild(container)
}
