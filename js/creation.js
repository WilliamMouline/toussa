window.onload = function() {
	document.getElementById("ajouter1").addEventListener("click", plus, true);
}

var a, a1,a2, a3, nbDiv;
// ajouter un champ avec son "name" propre;
function plus(){
    a1=document.getElementById('allAttributs');
	a=a1.getElementsByTagName('div');
	nbDiv=a.length;
    a2=a1.getElementsByTagName('input');
    a3=document.createElement('div');
	
    a3.setAttribute('class','attributs');
    a3.setAttribute('id','ajout_attribut'+nbDiv);
    a1.appendChild(a3);
	
    a1=document.getElementById('ajout_attribut'+nbDiv);
    a3=document.createElement('select');
     
    a3.setAttribute('name','atribut'+nbDiv);
    a3.setAttribute('id','atr'+nbDiv);
    a1.appendChild(a3);
	
    a1=document.getElementById('atr'+nbDiv);
    a3=document.createElement('option');
     
    a3.setAttribute('value','Atr'+nbDiv);
	a3.textContent="Atr"+nbDiv;
    a1.appendChild(a3);
    
    a1=document.getElementById('ajout_attribut'+nbDiv);
    a3=document.createElement('label');
     
    a3.setAttribute('for','valueattr'+nbDiv);
	a3.textContent="Value :";
    a1.appendChild(a3);
    
    a1=document.getElementById('ajout_attribut'+nbDiv);
    a3=document.createElement('textarea');
     
    a3.setAttribute('name','vatr'+nbDiv);
    a3.setAttribute('id','valueattr'+nbDiv);
    a3.setAttribute('rows','1');
    a1.appendChild(a3);
    
    a1=document.getElementById('ajout_attribut'+nbDiv);
    a3=document.createElement('input');
     
    a3.setAttribute('type','button');
    a3.setAttribute('id','modifier'+nbDiv);
    a3.setAttribute('name','modifier');
    a3.setAttribute('value','Modifier');
    a1.appendChild(a3);
    
    a1=document.getElementById('ajout_attribut'+nbDiv);
    a3=document.createElement('input');
     
    a3.setAttribute('type','button');
    a3.setAttribute('id','supprimer'+nbDiv);
    a3.setAttribute('name','supprimer');
    a3.setAttribute('value','Supprimer');
    a1.appendChild(a3);
}
 
// supprimer le dernier champ;
function moins(){
    if(a2.length>0){a1.removeChild(a2[a2.length-1])}
    if(a2.length==0){document.getElementById('sup').style.display='none'};
}

