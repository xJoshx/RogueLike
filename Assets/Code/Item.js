var hpRegenRate : int = 5;
var energyRegenRate : int = 25;
var upgradeDamage : int = 20;
var upgradeShootRate : int = 5;
var upgradeRange : int = 0.2;

var aux : int = -1;

function OnTriggerEnter(hit : Collider){
	if(hit.name == "Hero"){
	
		GameObject.Find(this.gameObject.name).active = false;
		Debug.Log("Has cogido: " + this.gameObject.name);
		
		if(this.gameObject.name == "HealthRegenBoost(Clone)")
			GameObject.Find("Hero").SendMessage("upgradeHPRegenerationRate", hpRegenRate, SendMessageOptions.DontRequireReceiver);
		else if(this.gameObject.name == "EnergyRegenBoost(Clone)")
			GameObject.Find("Hero").SendMessage("upgradeEnergyRegenerationRate", energyRegenRate, SendMessageOptions.DontRequireReceiver);
		else if(this.name == "DamageBoost(Clone)"){
				aux = PlayerPrefs.GetInt("damage");
				PlayerPrefs.SetInt("damage", upgradeDamage + aux);
		}
		else if(this.name == "FireRateBoost(Clone)"){
				aux = PlayerPrefs.GetInt("fireRate");
				PlayerPrefs.SetInt("fireRate", upgradeShootRate + aux);
		}
		else if(this.name == "RangeBoost(Clone)"){
				aux = PlayerPrefs.GetInt("range");
				PlayerPrefs.SetInt("range", upgradeRange + aux);
		}
				
	}
}
