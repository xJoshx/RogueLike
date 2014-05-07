function OnMouseDown(){
	if(this.GetComponent(MeshRenderer).active == true)
		Application.LoadLevel("Main Menu");
}