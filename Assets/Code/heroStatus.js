var health : int;
var maxHealth : int;
var energy : int;
var maxEnergy : int;
var gold : int;

var healthRegen : int;
var energyRegen : int;

var damage : int;
var shootRate : int;
var range : int;

function Update () {
	GameObject.Find("User Status").guiText.text = "Salud: " + health + "/" + maxHealth + "\nEnergia: " + energy + "/" + maxEnergy + "\nOro: " + gold + "\nRegeneracion de vida:" + healthRegen + "\nRegeneracion de energia: " + energyRegen + "\nPotencia: " + damage + "\nVelocidad de disparo: " + shootRate + "\nAlcance: " + range;
}

function setHealth(h : int){
	health = h;
}
function setMaxHealth(mh : int){
	maxHealth = mh;
}
function setEnergy(e : int){
	//if(energy >= 50)
		energy = e;
	
	//else energy = 0;
}
function setMaxEnergy(me : int){
	maxEnergy = me;
}
function setGold(g : int){
	gold = g;
}

function setHealthRegenRate(hr : int){
	healthRegen = hr;
}

function setEnergyRegenRate(er : int){
	energyRegen = er;
}

function setDamage(d : int){
	damage = d;
}

function setShootRate(sr : int){
	shootRate = sr;
}

function setRange(r : int){
	range = r;
}