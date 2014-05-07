private var gold : int;

function OnTriggerEnter(hit : Collider){
	if(hit.name == "Hero"){
		gold = Mathf.Round(Random.Range(50, 150));
		hit.transform.SendMessage("grabGold", gold, SendMessageOptions.DontRequireReceiver);
		Debug.Log("Le he pasado " + gold + " de oro a " + hit.transform.name);
		GameObject.Find(this.gameObject.name).active = false;
	}
}
