public class createDungeon{
	
	//Número de salas que tendrá la mazmorra
	var numberOfRooms = 4;

	//Tipos de salas; las inicializo con el máximo de las mismas que pueden ser seleccionadas
	var numberOfRoomsT1 = 3;
	var numberOfRoomsT2 = 2;
	var numberOfRoomsT3 = 1;

	//El array que contendrá la mazmorra
	var selectedRooms = new Array();

	//Creo el minimapa
	public var minimap = new Array();

	//Para saber la sala en la que estoy
	var actualRoom;

	var randomNumber : int;

	//Se utiliza para saber en que habitacion se empieza
	var firstRoom = -1;
	
	//La sala donde estan las escaleras al siguiente nivel
	var stair = -1;
	
	/*********************************************
	**********************************************
	Funciones para crear, cargar y guardar el mapa
	**********************************************
	*********************************************/

function createMap(){
    
	minimap[0] = [-1, -1, -1, -1];
	minimap[1] = [-1, -1, -1, -1];
	minimap[2] = [-1, -1, -1, -1];
	minimap[3] = [-1, -1, -1, -1];

	Debug.Log("Mapa creado, mapa creado!! :))");	
    
}

function createDungeon(){

}

public function giveMap(){
	Debug.Log("El tamaño del array es: " + this.minimap.length);
    return this.minimap;
}

//Mediante esta función genero el tipo de habitaciones que tendrá la mazmorra
function generateDungeon() {

    //A medida que elijo habitaciones de forma aleatoria, voy restando del total de habitaciones que he establecido (n). Como en esta demo solo va a haber 4 habitaciones, genero la lógica de manera semi-aleatoria: es decir, al haber puesto ese tope definitivo, siempre serán 2 habitaciones de 2 puertas y 2 de 1, o 1 de 3 puertas y 3 de 1. Este algoritmo de generación de mazmorras NO está diseñado para soportar cambios (es decir, añadir más habitaciones, etc), por lo que de querer ampliarlo en un futuro se deberá revisar por completo
	while (numberOfRooms > 0) {

		aux = Random.Range(0, 2);
		aux = Mathf.Round(aux);
		
		if (aux == 0 && numberOfRoomsT1 > 0) {
			numberOfRoomsT1 -= 1;
            numberOfRooms -= 1;
		}
	
		else if (aux == 1 && numberOfRoomsT2 > 0 && numberOfRoomsT1 > 0 && numberOfRoomsT3 == 1) {
			numberOfRoomsT2 -= 2;
            numberOfRooms -= 2;
		}
	
		else if (aux == 2 && numberOfRoomsT3 > 0 && numberOfRoomsT2 == 2) {
			numberOfRoomsT3 -= 1;
            numberOfRooms -= 1;
		}
	}
	
}

//Seleccionar de la carpeta las imágenes para el minimapa. También servirá para saber qué niveles cargar
function selectCorrectRooms() {
    
    //Para simplificar el posicionamiento en la siguiente función
    var selectedRoomsT1 = new Array();
    var selectedRoomsT2 = new Array();
    var selectedRoomsT3 = new Array();
    
    var duplicateElements = false;
    
    //genero las salas, asegurando que no vaya a haber ninguno repetido
    do{
        selectedRoomsT1 = generateRooms(1);
        duplicateElements = checkDuplicates(selectedRoomsT1);
    }while(duplicateElements == true);
   
    do{
        selectedRoomsT2 = generateRooms(2);
        duplicateElements = checkDuplicates(selectedRoomsT2);
    }while(duplicateElements == true);
        
    //Como de T3 solo selecciono una, no hace falta comprobar los duplicados    
    selectedRoomsT3 = generateRooms(3);

    //alert("¿Hay alguno repetido? "+checkEqualRooms(selectedRooms));
    selectedRooms[0] = selectedRoomsT1;
    selectedRooms[1] = selectedRoomsT2;
    selectedRooms[2] = selectedRoomsT3;

}

//Función que devuelve un array con habitaciones para la mazmorra
function generateRooms(roomType){
    
    //Primero tengo que saber cuántas salas va a haber de cada tipo
    var numberOfT1 = 3 - numberOfRoomsT1;
    var numberOfT2 = 2 - numberOfRoomsT2;
    var numberOfT3 = 1 - numberOfRoomsT3;
    
    //Creo variables auxiliares; i es un contador y auxSelectedRooms para devolver las que genere
    var aux = 0;
    var i = 0;
    var auxSelectedRooms = new Array();
    
     //3 bucles para ir seleccionando aleatoriamente las salas. Uno por cada tipo de sala
    if(roomType == 1){
        
        while(numberOfT1 > 0){
        	aux = Random.Range(0, 7);
        	aux = Mathf.Round(aux);
        	//TODO: revisar si esto está bien, al igual que las de abajo
        	//auxSelectedRooms[i] = "T1_" + aux + ".png";
        	auxSelectedRooms[i] = 10 + aux;
        	i++;
        	numberOfT1--;
        }
    }
    
    else if(roomType == 2){
    
        while(numberOfT2 > 0){
        	aux = Random.Range(0, 3);
        	aux = Mathf.Round(aux);
       		auxSelectedRooms[i] = 20 + aux;
       		i++;
        	numberOfT2--;
        }
    
    }
    
    else if(roomType == 3){
    
        while(numberOfT3 > 0){
        	aux = Random.Range(0, 1);
        	aux = Mathf.Round(aux);
        	auxSelectedRooms[i] = 30 + aux;
       		i++;
        	numberOfT3--;
        }
    
    //alert("Almacenados t3: " + selectedRoomsT3.toString());
    
    }
    
    return auxSelectedRooms;
}

//Coloca correctamente las habitaciones en el minimapa
function setRoomsT3(){
    
    //Obtengo la selección de salas creadas anteriormente
    var rooms = new Array();
    selectCorrectRooms();
    rooms = this.selectedRooms;
    
    //Creo dos variables para elegir aleatoriamente las salas centrales: he decidido que serán las de más puertas, por motivos puramente estéticos
    
    /********************
     ********************
               c1 c2
                
             -1  -1 -1  -1
    fila1    -1 |-1 -1| -1
    fila2    -1 |-1 -1| -1
             -1  -1 -1  -1
            
     ********************
     ********************/
    
    var auxRow = 1;
    var auxColumn = 1;
    
    //TODO: terminar de colocarlas correctamente en el minimapa. En principio para T3 SOLVED.
    //TODO: en 1 1 y 1 2 va bien pero se repite el mensaje. En las otras dos da cosas raras. En 2 1 falta la central a veces, a veces tb faltan 2, la central y otra. En 2 2 igual. En principio SOLVED.
    //La de 3 puertas tiene que estar obligatoriamente en el centro
    
    if(rooms[2].length > 0){
        
        auxColumn += Random.Range(0, 1);
        auxColumn = Mathf.Round(auxColumn);
        
        auxRow += Random.Range(0, 1);
        auxRow = Mathf.Round(auxRow);
        
        //alert("Los auxiliares para T3 son: fila = " + auxRow + " y columna = " + auxColumn);
        
        //Un auxiliar para saber dónde posicionar las salas adicionales sabiendo
        /*********
         *********
         
            -1 1 -1
             4 x  2
            -1 3 -1
            
         *********
         *********/
        
        var auxAditionalRooms = 1;
        auxAditionalRooms += Random.Range(0, 3);
        auxAditionalRooms = Mathf.Round(auxAditionalRooms);
        
        var cont = 3;
        
        //Coloco la sala y las de alrededor
        if(auxRow == 1){
            minimap[1][auxColumn] = rooms[2][0];

        //Las de alrededor se colocan mediante un bucle. Aleatoriamente elijo una posición; si está ocupada, simplemente repito el bucle.
            do{
                if(auxAditionalRooms == 1 && minimap[0][auxColumn] == -1){
                    minimap[0][auxColumn] = rooms[0][cont-1];
                    cont--;
                }
                if(auxAditionalRooms == 2 && minimap[1][auxColumn+1] == -1){
                    minimap[1][auxColumn+1] = rooms[0][cont-1];
                    cont--;
                }
                if(auxAditionalRooms == 3 && minimap[2][auxColumn] == -1){
                    minimap[2][auxColumn] = rooms[0][cont-1];
                    cont--;
                }
                if(auxAditionalRooms == 4 && minimap[1][auxColumn-1] == -1){
                    minimap[1][auxColumn-1] = rooms[0][cont-1];
                    cont--;
                }
            
            auxAditionalRooms = 1;
            auxAditionalRooms += Random.Range(0, 3);
            auxAditionalRooms = Mathf.Round(auxAditionalRooms);
            
            }while(cont > 0);
        }
        
        else if(auxRow == 2){
            minimap[2][auxColumn] = rooms[2][0];
            
            //Exactamente igual que el anterior pero una fila más abajo
            do{
                if(auxAditionalRooms == 1 && minimap[1][auxColumn] == -1){
                    minimap[1][auxColumn] = rooms[0][cont-1];
                    cont--;
                }
                if(auxAditionalRooms == 2 && minimap[2][auxColumn+1] == -1){
                    minimap[2][auxColumn+1] = rooms[0][cont-1];
                    cont--;
                }
                if(auxAditionalRooms == 3 && minimap[3][auxColumn] == -1){
                    minimap[3][auxColumn] = rooms[0][cont-1];
                    cont--;
                }
                if(auxAditionalRooms == 4 && minimap[2][auxColumn-1] == -1){
                    minimap[2][auxColumn-1] = rooms[0][cont-1];
                    cont--;
                }
            
            auxAditionalRooms = 1;
            auxAditionalRooms += Random.Range(0, 3);
            auxAditionalRooms = Mathf.Round(auxAditionalRooms);
            
            }while(cont > 0);
        }
    }
}



//Para colocar las habitaciones de T2
function setRoomsT2(){
    
    //Obtengo la selección de salas creadas anteriormente
    var rooms = new Array();
    selectCorrectRooms();
    rooms = this.selectedRooms;
    
    //Creo dos variables para elegir aleatoriamente las salas centrales, igual que en el caso anterior. Se coloca una sala de T2 y recursivamente se vuelve a colocar otra de T2, que estará obligatoriamente también en el centro. Cuando se inicie la recursividad, se colocarán las de T1, una a cada lado de una de T2. El porqué de esto es básicamente que la mazmorra tenga lógica, porque de dejar que la segunda sala de T2 se coloque aleatoriamente, es muy posible que se quedaran puertas sin conectar con otra sala. Un ejemplo del funcionamiento sería:
    
    /******************************************************************************************
     ******************************************************************************************
     
     Leyenda:
        * = habitación de T2
        · = habitación de T1
     
     
     Ejemplo:
     
               c1 c2
                
             0  0 0  0           0 0 0 0          0 0 0 0          0 0 0 0          0 0 0 0
    fila1    0 |0 0| 0  ---\     0 0 * 0 ---\     0 0 * 0 ---\     0 0 * 0 ---\     0 · * 0
    fila2    0 |0 0| 0  ---/     0 0 0 0 ---/     0 0 * 0 ---/     0 0 * · ---/     0 0 * ·
             0  0 0  0           0 0 0 0          0 0 0 0          0 0 0 0          0 0 0 0
            
     ******************************************************************************************
     ******************************************************************************************/
    
    var auxRow = 1;
    var auxColumn = 1;

    if(rooms[1].length > 0){
        
        auxColumn += Random.Range(0, 1);
        auxColumn = Mathf.Round(auxColumn);
            
        auxRow += Random.Range(0, 1);
        auxRow = Mathf.Round(auxRow);
            
        //alert("Los auxiliares para T2 son: fila = " + auxRow + " y columna = " + auxColumn);
        
        //Un auxiliar para saber dónde posicionar las salas adicionales sabiendo
        /*********
        *********
            
            0 1 0
            4 x 2
            0 3 0
                
        *********
        *********/
        
        var auxAditionalRooms = 1;
        auxAditionalRooms += Random.Range(0, 3);
        auxAditionalRooms = Mathf.Round(auxAditionalRooms);
        
        //Contadores para saber cuándo se colocan las salas. El de T1 es para pasar como parámetro a la función que coloca las salas T1
        var contT1 = 2;
        var contT2 = 1;
        
        //Coloco la sala y las de alrededor
        if(auxRow == 1){
            minimap[1][auxColumn] = rooms[1][0];
            
            //Coloco la sala T1 correspondiente
            setRoomT1(auxRow, auxColumn, rooms, contT1);
            contT1--;
//            alert("1 - Primero coloco " + rooms[1][0]);
        //Primero coloco la de T2 restante al lado de la anterior. Tengo cuidado de que no se ponga encima de la anterior
            do{
                if(auxAditionalRooms == 2 && minimap[1][auxColumn+1] == -1 && auxColumn == 1){
                    minimap[1][auxColumn+1] = rooms[1][contT2];
                    contT2--;
                    setRoomT1(1, auxColumn+1, rooms, contT1);
                    contT1--;
                }
                else if(auxAditionalRooms == 3 && minimap[2][auxColumn] == -1){
                    minimap[2][auxColumn] = rooms[1][contT2];
                    contT2--;
                    setRoomT1(2, auxColumn, rooms, contT1);
                    contT1--;
                }
                else if(auxAditionalRooms == 4 && minimap[1][auxColumn-1] == -1 && auxColumn == 2){
                    minimap[1][auxColumn-1] = rooms[1][contT2];
                    contT2--;
                    setRoomT1(1, auxColumn-1, rooms, contT1);
                    contT1--;
                }
                
            auxAditionalRooms = 1;
            auxAditionalRooms += Random.Range(0, 3);
            auxAditionalRooms = Mathf.Round(auxAditionalRooms);
            
            }while(contT2 > 0);
        }
        
        else if(auxRow == 2){
            minimap[2][auxColumn] = rooms[1][0];
            
            //Coloco la sala T1 correspondiente
            setRoomT1(auxRow, auxColumn, rooms, contT1);
            contT1--;
            
            //Exactamente igual que el anterior pero una fila más abajo
            do{
                if(auxAditionalRooms == 1 && minimap[1][auxColumn] == -1){
                    minimap[1][auxColumn] = rooms[1][contT2];
                    contT2--;
                    setRoomT1(1, auxColumn, rooms, contT1);
                    contT1--;
                }
                else if(auxAditionalRooms == 2 && minimap[2][auxColumn+1] == -1 && auxColumn == 1){
                    minimap[2][auxColumn+1] = rooms[1][contT2];
                    contT2--;
                    setRoomT1(2, auxColumn+1, rooms, contT1);
                    contT1--;
                }
                else if(auxAditionalRooms == 4 && minimap[2][auxColumn-1] == -1 && auxColumn == 2){
                    minimap[2][auxColumn-1] = rooms[1][contT2];
                    contT2--;
                    setRoomT1(2, auxColumn-1, rooms, contT1);
                    contT1--;
                }
                
            auxAditionalRooms = 1;
            auxAditionalRooms += Random.Range(0, 3);
            auxAditionalRooms = Mathf.Round(auxAditionalRooms);
            
            }while(contT2 > 0);
        }
    }
}

//Para colocar las habitaciones de T1
function setRoomT1(row, column, selectedRooms, cont){
        
        //Un auxiliar para saber dónde posicionar las salas adicionales sabiendo
        /*********
        *********
            
            0 1 0
            4 x 2
            0 3 0
                
        *********
        *********/
        
        var auxAditionalRooms = 1;
        auxAditionalRooms += Random.Range(0, 3);
        auxAditionalRooms = Mathf.Round(auxAditionalRooms);
        
        //Las habitaciones que quedan
        var contRoomsLeft = cont;
    
        //Flag para saber cuándo se ha colocado la sala
        var contT1 = 1;
    
        //Coloco la sala y las de alrededor
        if(row == 1){
        
        //Partiendo de la posición de las coordenadas de la sala T2 que se pasan como parámetro, coloco la sala T1
            do{
                if(auxAditionalRooms == 1 && minimap[0][column] == -1){
                    minimap[0][column] = selectedRooms[0][contRoomsLeft-1];
                    contT1--;
                }
                else if(auxAditionalRooms == 2 && minimap[1][column+1] == -1){
                    minimap[1][column+1] = selectedRooms[0][contRoomsLeft-1];
                    contT1--;
                }
                else if(auxAditionalRooms == 3 && minimap[2][column] == -1){
                    minimap[2][column] = selectedRooms[0][contRoomsLeft-1];
                    contT1--;
                }
                else if(auxAditionalRooms == 4 && minimap[1][column-1] == -1){
                    minimap[1][column-1] = selectedRooms[0][contRoomsLeft-1];
                    contT1--;
                }
                
            auxAditionalRooms = 1;
            auxAditionalRooms += Random.Range(0, 3);
            auxAditionalRooms = Mathf.Round(auxAditionalRooms);
                
            }while(contT1 > 0);
        }
        
        else if(row == 2){
            do{
                if(auxAditionalRooms == 1 && minimap[1][column] == -1){
                    minimap[1][column] = selectedRooms[0][contRoomsLeft-1];
                    contT1--;
                }
                else if(auxAditionalRooms == 2 && minimap[2][column+1] == -1){
                    minimap[2][column+1] = selectedRooms[0][contRoomsLeft-1];
                    contT1--;
                }
                else if(auxAditionalRooms == 3 && minimap[3][column] == -1){
                    minimap[3][column] = selectedRooms[0][contRoomsLeft-1];
                    contT1--;
                }
                else if(auxAditionalRooms == 4 && minimap[2][column-1] == -1){
                    minimap[2][column-1] = selectedRooms[0][contRoomsLeft-1];
                    contT1--;
                }
                
            auxAditionalRooms = 1;
            auxAditionalRooms += Random.Range(0, 3);
            auxAditionalRooms = Mathf.Round(auxAditionalRooms);
                
            }while(contT1 > 0);
        }
}

//Compruebo si alguna sala se repite
function checkDuplicates(arrayToCheck){
    
    //Primero creo y referencio el auxiliar al que quiero comprobar
    var aux = new Array();
    aux = arrayToCheck;
    
    //Segundo creo un flag
    var repeated = false;
    for(var i = 0; i < arrayToCheck.length-1; i++){
        for(var j = i+1; j < arrayToCheck.length; j++)
            if(aux[i] == arrayToCheck[j])
                repeated = true;
    }
    
    return repeated;
}

function stablishFirstRoom(){

	var x = 0;
	var y = 0;
	
	while(firstRoom == -1){
		x = Mathf.Round(Random.Range(0, 3));
		y = Mathf.Round(Random.Range(0, 3));
		
		firstRoom = minimap[x][y];
	}
}

function stablishStair(){

	var x = 0;
	var y = 0;
	
	while(stair == -1){
		x = Mathf.Round(Random.Range(0, 3));
		y = Mathf.Round(Random.Range(0, 3));
		
		if(minimap[x][y] != firstRoom)
			stair = minimap[x][y];
	}
}

function giveFirstRoom(){
	return this.firstRoom;
}

function giveStair(){
	return this.stair;
}

function setStair(newStair){
	this.stair = newStair;
}

}


