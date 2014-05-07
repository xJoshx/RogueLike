var damage : int = 50;
var collisioned : boolean = false;

function OnCollisionEnter (hit : Collision){
	
	if(PlayerPrefs.GetInt("damage") > 50)
		damage = PlayerPrefs.GetInt("damage");
	
	if(collisioned == false){
		hit.transform.SendMessage("applyDamage", damage, SendMessageOptions.DontRequireReceiver);
		collisioned = true;
	}
}