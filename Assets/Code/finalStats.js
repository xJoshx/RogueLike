#pragma strict

function Start () {
	GameObject.Find("Obtained Gold").guiText.text = "Oro obtenido: " + PlayerPrefs.GetInt("obtainedGold");
	GameObject.Find("Visited Rooms").guiText.text = "Salas visitadas: " + PlayerPrefs.GetInt("visitedRooms");
	GameObject.Find("Enemies Killed").guiText.text = "Enemigos asesinados: " + PlayerPrefs.GetInt("enemiesKilled");
}	
