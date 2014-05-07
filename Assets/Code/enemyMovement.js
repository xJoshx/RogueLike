//El objetivo del enemigo
var target : Transform; 

//Velocidad de movimiento
var moveSpeed = 10; 

//Velocidad de giro
var rotationSpeed = 3; 

//Distancia desde la que empiezan a perseguir
var range : float = 15f;

//Distancia desde que empiezan a mirar
var range2 : float = 20f;

//Distancia a la que se para
var stop : float = 0;

//Los datos de Transform
var myTransform : Transform;

function Awake()
{
    myTransform = transform; //cache transform data for easy access/preformance
}
 
function Start()
{
     target = GameObject.FindWithTag("Player").transform; //target the player
 
}
 
function Update () {
    //Mira al jugador
    var distance = Vector3.Distance(myTransform.position, target.position);
    
    if (distance <= range2 &&  distance >= range){
    	myTransform.rotation = Quaternion.Slerp(myTransform.rotation,
    	Quaternion.LookRotation(target.position - myTransform.position), rotationSpeed*Time.deltaTime);
    }
 
    else if(distance <= range && distance > stop){
 
    	//Se mueve hacia el jugador
    	myTransform.rotation = Quaternion.Slerp(myTransform.rotation,
    	Quaternion.LookRotation(target.position - myTransform.position), rotationSpeed*Time.deltaTime);
    	myTransform.position += myTransform.forward * moveSpeed * Time.deltaTime;
    	//myTransform.position -= myTransform.forward * moveSpeed * Time.deltaTime;
    }
    
    else if (distance <= stop) {
    	myTransform.rotation = Quaternion.Slerp(myTransform.rotation,
    	Quaternion.LookRotation(target.position - myTransform.position), rotationSpeed * Time.deltaTime);
    }
 
 
}