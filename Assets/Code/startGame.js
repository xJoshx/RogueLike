var dungeonGenerator : createDungeon = new createDungeon();

function OnMouseDown(){
		
		//Reinicio los prefs
		PlayerPrefs.DeleteAll();
		
		//Creo la mazmorra
		dungeonGenerator = new createDungeon();
		dungeonGenerator.createMap();
		dungeonGenerator.generateDungeon();
		dungeonGenerator.setRoomsT3();
		dungeonGenerator.setRoomsT2();
		dungeonGenerator.stablishFirstRoom();
		dungeonGenerator.stablishStair();
		
		//Guardo la mazmorra creada
		PlayerPrefsX.SetIntArray("firstRow", dungeonGenerator.minimap[0]);
		PlayerPrefsX.SetIntArray("secondRow", dungeonGenerator.minimap[1]);
		PlayerPrefsX.SetIntArray("thirdRow", dungeonGenerator.minimap[2]);
		PlayerPrefsX.SetIntArray("fourthRow", dungeonGenerator.minimap[3]);
		
		//Establezco algunos parametros iniciales
		PlayerPrefs.SetInt("damage", 50);
		PlayerPrefs.SetInt("shootRange", 50);
		PlayerPrefs.SetInt("range", 1);
		
		Debug.Log("La primera sala y las escaleras respectivamente son: " + dungeonGenerator.giveFirstRoom() + " y " + dungeonGenerator.giveStair());
		PlayerPrefs.SetInt("stair", dungeonGenerator.giveStair());
		
		Debug.Log("Se ha guardado una nueva mazmorra :o");
		
		Application.LoadLevel("" + dungeonGenerator.giveFirstRoom());
}

