function test() {
	alert('coucou');
}

var c,c2, ch;
 
// ajouter un champ avec son "name" propre;
function plus(){
    c=document.getElementById('form');
    c2=c.getElementsByTagName('input');
    ch=document.createElement('div');
     
    ch.setAttribute('class','attributs');
    ch.setAttribute('id','ajout_attribut'+c2.length/3);
    c.appendChild(ch);
    
    c=document.getElementById('ajout_attribut'+c2.length/3);
    ch=document.createElement('select');
     
    ch.setAttribute('name','atribut'+c2.length/3);
    ch.setAttribute('id','atr'+c2.length/3);
    c.appendChild(ch);
    
    c=document.getElementById('atr'+c2.length/3);
    ch=document.createElement('option');
     
    ch.setAttribute('value','Atr'+c2.length/3);
    c.appendChild(ch);
    
    c=document.getElementById('ajout_attribut'+c2.length/3);
    ch=document.createElement('label');
     
    ch.setAttribute('for','valueattr'+c2.length/3);
    c.appendChild(ch);
    
    c=document.getElementById('ajout_attribut'+c2.length/3);
    ch=document.createElement('textarea');
     
    ch.setAttribute('name','vatr'+c2.length/3);
    ch.setAttribute('id','valueattr'+c2.length/3);
    ch.setAttribute('rows','1');
    c.appendChild(ch);
    
    c=document.getElementById('ajout_attribut'+c2.length/3);
    ch=document.createElement('input');
     
    ch.setAttribute('type','button');
    ch.setAttribute('id','ajouter'+c2.length/3);
    ch.setAttribute('name','ajouter');
    ch.setAttribute('value','Ajouter');
    c.appendChild(ch);
    
    c=document.getElementById('ajout_attribut'+c2.length/3);
    ch=document.createElement('input');
     
    ch.setAttribute('type','button');
    ch.setAttribute('id','modifier'+c2.length/3);
    ch.setAttribute('name','modifier');
    ch.setAttribute('value','Modifier');
    c.appendChild(ch);
    
    c=document.getElementById('ajout_attribut'+c2.length/3);
    ch=document.createElement('input');
     
    ch.setAttribute('type','button');
    ch.setAttribute('id','supprimer'+c2.length/3);
    ch.setAttribute('name','supprimer');
    ch.setAttribute('value','Supprimer');
    c.appendChild(ch);
    
    
     
    document.getElementById('ajout_attribut'+c2.length/3).style.display='inline';
}
 
// supprimer le dernier champ;
function moins(){
    if(c2.length>0){c.removeChild(c2[c2.length-1])}
    if(c2.length==0){document.getElementById('sup').style.display='none'};
}

