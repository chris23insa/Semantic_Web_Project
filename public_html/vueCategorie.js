
function searchCategorie(e)
{
    displayList(getSeriesListByCategories("en",e.id))
    getSeriesListByCategories("en",e.id).then((json) => {
      clearResponse()
      displayList(json)
    })
}

function displayList(list)
{
  var container = $("#response")[0]
  for(i in list)
  {
    var data = list[i]
    var aContainer = document.createElement("a")
    aContainer.innerHTML = data.nameSerie.value
    aContainer.id = data.uri.value
    aContainer.addEventListener("click",function(e){console.log(e);displaySerieInfo(e.target.id)},false)
    container.appendChild(aContainer)
    container.appendChild(document.createElement("br"))
  }
}

function displaySerieInfo(link)
{
  getJson(link  )
}
