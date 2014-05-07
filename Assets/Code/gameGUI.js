var windowRect : Rect = Rect(100, 600, 100, 200);
var tileTexture : Texture2D;
var emptyTile : Texture2D;

var variableTile : Texture2D;

//El minimapa ya con texturas
var finalMinimapRow1: Texture2D[] = new Texture2D[4];
var finalMinimapRow2: Texture2D[] = new Texture2D[4];
var finalMinimapRow3: Texture2D[] = new Texture2D[4];
var finalMinimapRow4: Texture2D[] = new Texture2D[4];

//Para saber la sala en la que estoy
static var actualRoom;

//Declaro el generador
static var dungeonGenerator : createDungeon;

function Start(){
	
	dungeonGenerator = new createDungeon();
	
	//Cargo la mazmorra anterior
	dungeonGenerator.minimap[0] = PlayerPrefsX.GetIntArray("firstRow");
	dungeonGenerator.minimap[1] = PlayerPrefsX.GetIntArray("secondRow");
	dungeonGenerator.minimap[2] = PlayerPrefsX.GetIntArray("thirdRow");
	dungeonGenerator.minimap[3] = PlayerPrefsX.GetIntArray("fourthRow");
	
	dungeonGenerator.setStair(PlayerPrefs.GetInt("stair"));
	
	Debug.Log("He cargado las escaleras: " + dungeonGenerator.giveStair());
	
	var textToShow = "";
	
	for(var i = 0; i < dungeonGenerator.minimap[0].length; i++){
		for(var j = 0; j < dungeonGenerator.minimap[0].length; j++){
			textToShow += "" + dungeonGenerator.minimap[i][j] + " ";
		}
		textToShow += "\n";
	}
	
	Debug.Log(textToShow);
	
	//Quito las escaleras en caso de que no sea la sala en la que deben estar
	if(dungeonGenerator.stair != int.Parse(Application.loadedLevelName))
		GameObject.Find("Stair").active = false;
	
    actualRoom = int.Parse(Application.loadedLevelName);
    deleteIncorrectDoors();
    this.inicializeTextures();
	putTehTexturesOnTheMapYo();
}

function inicializeTextures(){

	for(var i = 0; i < 4; i++){
		finalMinimapRow1[i] = new Texture2D(30, 30);
		finalMinimapRow2[i] = new Texture2D(30, 30);
		finalMinimapRow3[i] = new Texture2D(30, 30);
		finalMinimapRow4[i] = new Texture2D(30, 30);
	}
	
}

function OnGUI(){
	windowRect = GUI.Window(0, windowRect, DoMyWindow, "Minimap");
}


function DoMyWindow(windowID : int){
	
	GUI.DrawTexture(Rect(10, 20, 30, 30), finalMinimapRow1[0], ScaleMode.ScaleToFit, true, 0);
	GUI.DrawTexture(Rect(40, 20, 30, 30), finalMinimapRow1[1], ScaleMode.ScaleToFit, true, 0);
	GUI.DrawTexture(Rect(70, 20, 30, 30), finalMinimapRow1[2], ScaleMode.ScaleToFit, true, 0);
	GUI.DrawTexture(Rect(100, 20, 30, 30), finalMinimapRow1[3], ScaleMode.ScaleToFit, true, 0);
	
	GUI.DrawTexture(Rect(10, 50, 30, 30), finalMinimapRow2[0], ScaleMode.ScaleToFit, true, 0);
	GUI.DrawTexture(Rect(40, 50, 30, 30), finalMinimapRow2[1], ScaleMode.ScaleToFit, true, 0);
	GUI.DrawTexture(Rect(70, 50, 30, 30), finalMinimapRow2[2], ScaleMode.ScaleToFit, true, 0);
	GUI.DrawTexture(Rect(100, 50, 30, 30), finalMinimapRow2[3], ScaleMode.ScaleToFit, true, 0);
	
	GUI.DrawTexture(Rect(10, 80, 30, 30), finalMinimapRow3[0], ScaleMode.ScaleToFit, true, 0);
	GUI.DrawTexture(Rect(40, 80, 30, 30), finalMinimapRow3[1], ScaleMode.ScaleToFit, true, 0);
	GUI.DrawTexture(Rect(70, 80, 30, 30), finalMinimapRow3[2], ScaleMode.ScaleToFit, true, 0);
	GUI.DrawTexture(Rect(100, 80, 30, 30), finalMinimapRow3[3], ScaleMode.ScaleToFit, true, 0);
	
	GUI.DrawTexture(Rect(10, 110, 30, 30), finalMinimapRow4[0], ScaleMode.ScaleToFit, true, 0);
	GUI.DrawTexture(Rect(40, 110, 30, 30), finalMinimapRow4[1], ScaleMode.ScaleToFit, true, 0);
	GUI.DrawTexture(Rect(70, 110, 30, 30), finalMinimapRow4[2], ScaleMode.ScaleToFit, true, 0);
	GUI.DrawTexture(Rect(100, 110, 30, 30), finalMinimapRow4[3], ScaleMode.ScaleToFit, true, 0);
	
	GUI.DragWindow(Rect(0, 0, 10000, 10000));

}

function putTehTexturesOnTheMapYo(){

Debug.Log("El contenido1 es: " + dungeonGenerator.minimap[0][0]);
Debug.Log("El contenido2 es: " + dungeonGenerator.minimap[1][1]);
Debug.Log("Tamaño del array: " + dungeonGenerator.minimap.length);
Debug.Log("Tamaño del array2: " + dungeonGenerator.minimap[3].length);


for(var i = 0; i < dungeonGenerator.minimap.length; i++){
	for(var j = 0; j < dungeonGenerator.minimap[i].length; j++){
		if(i == 0)
			if(dungeonGenerator.minimap[i][j] == -1)
				finalMinimapRow1[j] = emptyTile;
		
			else finalMinimapRow1[j] = tileTexture;
		
		if(i == 1)
			if(dungeonGenerator.minimap[i][j] == -1)
				finalMinimapRow2[j] = emptyTile;
		
			else finalMinimapRow2[j] = tileTexture;
			
		if(i == 2)
			if(dungeonGenerator.minimap[i][j] == -1)
				finalMinimapRow3[j] = emptyTile;
		
			else finalMinimapRow3[j] = tileTexture;
			
		if(i == 3)	
			if(dungeonGenerator.minimap[i][j] == -1)
				finalMinimapRow4[j] = emptyTile;
		
			else finalMinimapRow4[j] = tileTexture;
		}
	}
}
//Para borrar las puertas que no sean correctas
function deleteIncorrectDoors(){
	
	for(var i = 0; i < 4; i++)
		for(var j = 0; j < 4; j++){
			if(dungeonGenerator.minimap[i][j] == actualRoom){
				//Las puertas de los bordes las quito a mano
				if(i == 0)
					GameObject.Find("Next Room Top").active = false;
			
				if(j == 0)
					GameObject.Find("Next Room Left").active = false;
			
				if(i == 3)
					GameObject.Find("Next Room Bottom").active = false;
			
				if(j == 3)
					GameObject.Find("Next Room Right").active = false;
				/******/
				
				if(i != 0 && dungeonGenerator.minimap[i-1][j] == -1)
					GameObject.Find("Next Room Top").active = false;
					
				if(j != 3 && dungeonGenerator.minimap[i][j+1] == -1)
					GameObject.Find("Next Room Right").active = false;
						
				if(i != 3 && dungeonGenerator.minimap[i+1][j] == -1)
					GameObject.Find("Next Room Bottom").active = false;
						
				if(j != 0 && dungeonGenerator.minimap[i][j-1] == -1)
					GameObject.Find("Next Room Left").active = false;
			}
		}
}