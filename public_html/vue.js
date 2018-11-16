/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function startSearch()
{
  var value = $("#searchInput")[0].value
  console.log(getURIWithFilter(value,myconfidence,traitementURIWithFilter))
}

function clearResponse()
{
    $("#response").empty()
}

var MAP = {"title":"Game of Thrones",
            "image":"https://o.aolcdn.com/images/dims3/GLOB/crop/1200x601+0+38/resize/630x315!/format/jpg/quality/85/http%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F539adfa5932c24f59de7bd379d433c2d%2F206220727%2Fcq5dam.web.1200.675.jpeg",
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
    container.classList.add("bigContainer")
    var titleContainer = document.createElement('h1')
    titleContainer.innerHTML=title

    if('image' in map)
    {
      var imgContainer = document.createElement('img')
      imgContainer.src = map['image']
      container.append(imgContainer)
      delete map['image']
    }

    if('thumbnail' in map)
    {
      var imgContainer = document.createElement('img')
      imgContainer.src = map['thumbnail']
      container.append(imgContainer)
      delete map['thumbnail']
    }

    container.append(titleContainer)

    delete map["title"]
    for(elem in map)
    {
        container.append(getHTML(elem,map[elem],2))
    }

    $("#response")[0].appendChild(container)
}
