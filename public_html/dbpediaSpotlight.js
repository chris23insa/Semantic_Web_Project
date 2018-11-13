var uri = null;
var myconfidence =0.5; // degré de confiance choisi


    /* Instruction pour requêter dbpediaSpotlight : 
    getURIWithFilter(mytext, myconfidence, traitementURIWithFilter);
    //La variable uri vaut null si aucun uri n'a été trouvé, elle contient l'uri trouvée sinon.
    */
    
            
	/* 
		Fonction permettant de retourner l'URI correspondante au titre de la série rentrée ou sélectionnée par l'utilisateur
		mytext est le titre de la série dont l'utilisateur souhaite rechercher les informations
		myconfidence est le niveau de confiance de la détection de l'URI à partir de la chaîne de caractère, fixé à 0.5
    stocke l'uri résultat dans la variable uri
	*/
    function getURIWithFilter(mytext,myconfidence, traitementURIWithFilter) {
    		var myTextUpperCase = mytext.toUpperCase();
                    $.ajax({
                        url: "http://model.dbpedia-spotlight.org/en/annotate", 
                        data : {
                            text : myTextUpperCase,
                            confidence : myconfidence,
    			                  types : "DBpedia:TelevisionShow"
                        },
                        async:false,
                        headers: {          
                            Accept: "application/json"
                        },  
                        success: traitementURIWithFilter
                    });
      }

    /*
    Fonction qui récupère l'URI de la recherche avec filtre si elle existe, et lance la recherche sans filtre sinon.
    */
  	function traitementURIWithFilter(result){
  		if (result.Resources !== undefined && result.Resources[0]["@URI"] !== null) {
  			uri = result.Resources[0]["@URI"];
  		} else {
  		  getURIWithoutFilter(result["@text"], result["@confidence"], traitementURIWithoutFilter);
  		}
  	}


	function getURIWithoutFilter(myTextUpperCase,myconfidence, traitementURIWithoutFilter) {
      $.ajax({
          url: "http://model.dbpedia-spotlight.org/en/annotate", 
          data : {
              text : myTextUpperCase,
              confidence : myconfidence
          },
          async:false,
          headers: {          
              Accept: "application/json"
          },  
          success: traitementURIWithoutFilter
      });
 	 }

	function traitementURIWithoutFilter(result){
		if (result.Resources !== undefined && result.Resources[0]["@URI"] !== null) {
			uri = result.Resources[0]["@URI"];
		} 
		else {		
			uri = null;
		}
	}		
  

