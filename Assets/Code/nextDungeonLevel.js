var nextDungeonGenerator : createDungeon;

function OnTriggerEnter(hit : Collider){
	
	GameObject.Find("Hero").SendMessage("saveHeroStatus");
	
	//Creo la mazmorra
	nextDungeonGenerator = new createDungeon();
	nextDungeonGenerator.createMap();
	nextDungeonGenerator.generateDungeon();
	nextDungeonGenerator.setRoomsT3();
	nextDungeonGenerator.setRoomsT2();
	nextDungeonGenerator.stablishFirstRoom();
	nextDungeonGenerator.stablishStair();

	//Guardo la mazmorra creada
	PlayerPrefsX.SetIntArray("firstRow", nextDungeonGenerator.minimap[0]);
	PlayerPrefsX.SetIntArray("secondRow", nextDungeonGenerator.minimap[1]);
	PlayerPrefsX.SetIntArray("thirdRow", nextDungeonGenerator.minimap[2]);
	PlayerPrefsX.SetIntArray("fourthRow", nextDungeonGenerator.minimap[3]);
	
	PlayerPrefs.SetInt("stair", nextDungeonGenerator.giveStair());
	
	Debug.Log("La primera sala y las escaleras respectivamente son: " + nextDungeonGenerator.giveFirstRoom() + " y " + nextDungeonGenerator.giveStair());
	
	Debug.Log("Se ha guardado una nueva mazmorra :o");
		
	Application.LoadLevel("" + nextDungeonGenerator.giveFirstRoom());
	
}