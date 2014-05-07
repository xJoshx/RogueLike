var healthPoints : int = 500;
var maxHealthPoins : int = 500;
var energy : int = 2000;
var maxEnergy: int = 2000;
var currentGold : int = 0;

var energyRegenerationRate : int = 50;
var healthRegenerationRate : int = 10;

var currentItems : Item;

var finalMessage : GUIText;

var lastTimeIRecoveredEnergy : int = -1;
var lastTimeIRecoveredHealth : int = -1;

function Start () {
	
	//Para ver el numero de salas visitadas
	var visitedRooms = PlayerPrefs.GetInt("visitedRooms");
	PlayerPrefs.SetInt("visitedRooms", visitedRooms + 1);
	
	GameObject.Find("Weapon").SendMessage("setEnergy", this.energy);
//	GameObject.Find("Demotivational Message").GetComponent(MeshRenderer).enabled = false;
	
	//Si no estan los valores predeterminados, debe cargar su estado
	if(PlayerPrefs.GetInt("health") != 0)
		this.loadHeroStatus();
	
	else this.saveHeroStatus();
		
}

function Update () {
	
	Debug.Log("Time: " + Mathf.Round(Time.timeSinceLevelLoad));
	Debug.Log("la ultima vez... " + lastTimeIRecoveredEnergy);
	
	//Actualiza el GUI
	this.updateGUI();
	
	if(Mathf.Round(Time.timeSinceLevelLoad) % 5 == 0 && energy < maxEnergy && Mathf.Round(Time.timeSinceLevelLoad) != lastTimeIRecoveredEnergy){
		recoverEnergy(this.energyRegenerationRate);
		Debug.Log("El ratio de recuperacion de energia es: " +this.energyRegenerationRate);
		lastTimeIRecoveredEnergy = Mathf.Round(Time.timeSinceLevelLoad);
	}
	
	if(Mathf.Round(Time.timeSinceLevelLoad) % 5 == 0 && healthPoints < maxHealthPoins && Mathf.Round(Time.timeSinceLevelLoad) != lastTimeIRecoveredHealth){
		recoverHP(this.healthRegenerationRate);
		Debug.Log("El ratio de recuperacion de vida es: " +this.healthRegenerationRate);
		lastTimeIRecoveredHealth = Mathf.Round(Time.timeSinceLevelLoad);
	}
				
	if(this.healthPoints <= 0){
		this.heroDead();
	}
	
	GameObject.Find("Weapon").SendMessage("setEnergy", this.energy);
}

function applyDamage(damage : int){
	healthPoints -= damage;
	Debug.Log("Quedan " + healthPoints + " puntos de vida");
	if(healthPoints <= 0)
		heroDead();
}

function recoverHP(hp : int){
	healthPoints += hp;
}

function upgradeHP(hp : int){
	maxHealthPoins += hp;
}

function upgradeHPRegenerationRate(hp : int){
	healthRegenerationRate += hp;
}

function spendEnergy(en : int){
	
	if(energy >= 50)
		energy -= en;
	
	else energy = 0;
}

function recoverEnergy(en : int){
	energy += en;
}

function upgradeEnergy(en : int){
	maxEnergy += en;
}

function upgradeEnergyRegenerationRate(en : int){
	energyRegenerationRate += en;
}

function heroDead(){

	GameObject.Find("User Status").SendMessage("setHealth", 0);
	//GameObject.Find("Demotivational Message").GetComponent(MeshRenderer).enabled = true;
	//finalMessage.active = true;
	PlayerPrefs.SetInt("health", 0);
	GameObject.Find("Observer").SendMessage("setDead", SendMessageOptions.DontRequireReceiver);
	GameObject.Find("" + this.gameObject.name).active = false;

	//GameObject.Find("Messages").SendMessage("setMessage", finalMessage, SendMessageOptions.DontRequireReceiver);
	//GameObject.Find("Message").SendMessage("setPosition", this., SendMessageOptions.DontRequireReceiver);
	//GameObject.Find("Message").SendMessage("setRotation", finalMessage, SendMessageOptions.DontRequireReceiver);
}

function grabGold(gold : int){
	currentGold += gold;
	
	var obtainedGold = PlayerPrefs.GetInt("obtainedGold");
	PlayerPrefs.SetInt("obtainedGold", obtainedGold + gold);
}

function spendGold(gold : int){
	currentGold -= gold;
}

function grabItem(item : Item){
}

function getHealthPoints(){
	return this.healthPoints;
}
function getMaxHealthPoints(){
	return this.maxHealthPoins;
}
function getEnergy(){
	return this.energy;
}
function getMaxEnergy(){
	return this.maxEnergy;
}
function getMaxGold(){
	return this.currentGold;
}

function saveHeroStatus(){
		PlayerPrefs.SetInt("health", this.healthPoints);
		PlayerPrefs.SetInt("maxHealth", this.maxHealthPoins);
		PlayerPrefs.SetInt("energy", this.energy);
		PlayerPrefs.SetInt("maxEnergy", this.maxEnergy);
		PlayerPrefs.SetInt("gold", this.currentGold);
		PlayerPrefs.SetInt("healthRegen", this.healthRegenerationRate);
		PlayerPrefs.SetInt("energyRegen", this.energyRegenerationRate);
}

function loadHeroStatus(){
		this.healthPoints = PlayerPrefs.GetInt("health");
		this.maxHealthPoins = PlayerPrefs.GetInt("maxHealth");
		this.energy = PlayerPrefs.GetInt("energy");
		this.maxEnergy = PlayerPrefs.GetInt("maxEnergy");
		this.currentGold = PlayerPrefs.GetInt("gold");
		this.healthRegenerationRate = PlayerPrefs.GetInt("healthRegen");
		this.energyRegenerationRate = PlayerPrefs.GetInt("energyRegen");
}

function updateGUI(){
	GameObject.Find("User Status").SendMessage("setHealth", healthPoints);
	GameObject.Find("User Status").SendMessage("setMaxHealth", maxHealthPoins);
	GameObject.Find("User Status").SendMessage("setEnergy", energy);
	GameObject.Find("User Status").SendMessage("setMaxEnergy", maxEnergy);
	GameObject.Find("User Status").SendMessage("setGold", currentGold);
	GameObject.Find("User Status").SendMessage("setHealthRegenRate", healthRegenerationRate);
	GameObject.Find("User Status").SendMessage("setEnergyRegenRate", energyRegenerationRate);
	
	GameObject.Find("User Status").SendMessage("setDamage", PlayerPrefs.GetInt("damage"));
	GameObject.Find("User Status").SendMessage("setShootRate", PlayerPrefs.GetInt("shootRange"));
	GameObject.Find("User Status").SendMessage("setRange", PlayerPrefs.GetInt("range"));
}