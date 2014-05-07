var heroIsDead = false;

var deadTime = -1;

function Update () {
	if(heroIsDead == true && deadTime == -1)
		deadTime = Mathf.Round(Time.timeSinceLevelLoad);
		
	if(heroIsDead == true && deadTime != -1){
		Debug.Log("He muerto; hora: " + deadTime);
		Debug.Log("Hora actual - 3: " + (Mathf.Round(Time.timeSinceLevelLoad) - 3));
		if((Mathf.Round(Time.timeSinceLevelLoad) - 3) == deadTime)
			Application.LoadLevel("Game Recap");
	}
}

function setDead(){
	heroIsDead = true;
}