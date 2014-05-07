	function OnTriggerEnter(hit : Collider){
	if(hit.name == "Hero")
		for(var i = 0; i < 4; i++)
			for(var j = 0; j < 4; j++){
				//Debug.Log("Las coordenadas son: x = " + i + " y = " + j + " y el contenido: " + gameGUI.dungeonGenerator.minimap[i][j]);
				//Debug.Log("He entrado en " + this.gameObject.name);
				
				if(gameGUI.dungeonGenerator.minimap[i][j] == int.Parse(Application.loadedLevelName)){
					if(this.gameObject.name == "Next Room Top"){
						GameObject.Find("Hero").SendMessage("saveHeroStatus");
						Application.LoadLevel("" + gameGUI.dungeonGenerator.minimap[i-1][j]);
					}
				
					if(this.gameObject.name == "Next Room Right"){
						GameObject.Find("Hero").SendMessage("saveHeroStatus");
						Application.LoadLevel("" + gameGUI.dungeonGenerator.minimap[i][j+1]);
					}
						
					if(this.gameObject.name == "Next Room Bottom"){
						GameObject.Find("Hero").SendMessage("saveHeroStatus");
						Application.LoadLevel("" + gameGUI.dungeonGenerator.minimap[i+1][j]);
					}
						
					if(this.gameObject.name == "Next Room Left"){
						GameObject.Find("Hero").SendMessage("saveHeroStatus");
						Application.LoadLevel("" + gameGUI.dungeonGenerator.minimap[i][j-1]);
					}
				}
			}
	}
