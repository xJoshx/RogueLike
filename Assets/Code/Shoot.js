var projectile : Rigidbody;
var speed : int = 50;
var energy : int;
var energyCostShoot : int = 50;
var range : int = 1;

function Start (){

	if(PlayerPrefs.GetInt("fireRate") > 50)
		speed = PlayerPrefs.GetInt("fireRate");
		
	if(PlayerPrefs.GetInt("range") > 1)
		range = PlayerPrefs.GetInt("range");
		
}

function Update () {

	if(Input.GetButtonDown("Fire1") && energy > 0){
		clone = Instantiate(projectile, transform.position, transform.rotation);
		clone.velocity = transform.TransformDirection(Vector3(0, 0, speed));
		GameObject.Find("Hero").SendMessage("spendEnergy", energyCostShoot, SendMessageOptions.DontRequireReceiver);
		
		Destroy(clone.gameObject, range);
	}
}

function setEnergy(e : int){
	this.energy = e;
}

function setSpeed(s : int){
	this.speed = s;
}