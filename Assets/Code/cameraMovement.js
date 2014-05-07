var target : Transform;
var distance : float;
var x : float;
var y : float;

function Update(){
 
    transform.position.z = target.position.z - distance;
    transform.position.y = target.position.y + y;
    transform.position.x = target.position.x + x;
 
}