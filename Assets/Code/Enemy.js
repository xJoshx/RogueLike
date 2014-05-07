var healthPoints : int = 200;
var dropItemRate : int = 90;
var dropGoldRate : int = 90;

var Item : GameObject;
var Gold : GameObject;

var damage : int = 100;

function Start () {

}

function Update () {

}

function OnCollisionEnter (hit : Collision){
	if(PlayerPrefs.GetInt("health") == 0)
		heroIsDead();
	if(hit.collider.name == "Hero")
		attack();
}

function applyDamage(damage : int){
	healthPoints = healthPoints - damage;
	Debug.Log("Quedan " + healthPoints + " puntos de vida");
	if(healthPoints <= 0)
		enemyDead();
}

function enemyDead(){
	GameObject.Find("" + this.gameObject.name).active = false;
	var type : int = -1;
	type = Random.Range(0, 2);
	
	Debug.Log("type es " + type);
	
	if(type <= .5)
		dropItem();
		
	else if (type >= .5)
		dropGold();
	
		
	var enemiesKilled = PlayerPrefs.GetInt("enemiesKilled");
	PlayerPrefs.SetInt("enemiesKilled", enemiesKilled + 1);
}

function dropItem(){
	
	var aux = Random.Range(0, 100);
	if(aux <= dropItemRate)
		Instantiate(Item, Vector3(transform.position.x, 1, transform.position.z), transform.rotation);
}

function dropGold(){

	var aux = Random.Range(0, 100);
	if(aux <= dropItemRate)
		Instantiate(Gold, Vector3(transform.position.x, 1, transform.position.z), transform.rotation);
}

function attack(){
	Debug.Log("ataca!!");
	GameObject.Find("Hero").SendMessage("applyDamage", damage, SendMessageOptions.DontRequireReceiver);
}

function heroIsDead(){
	Debug.Log("Hero is dead!!1");
	GetComponent(enemyMovement).enabled = false;
}
