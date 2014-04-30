function NodeTree()
{
	this.root = null;

	this.getRoot = function(){	return this.root;	}
	this.setRoot = function(root){	this.root = root;	}

	this.nodeToString = function(n, rang)
	{	
		if(rang > 500)
			return "";

		var indentation = "";
		var res = "";

		for(var i=0; i<rang; ++i){	indentation += "-----";	}

		res += indentation + n.getName() + "\n";
		
		res += indentation + "\tcontent: " + n.getContent() + "\n";

		for(var i=0; i<n.getAttributesCount(); ++i)
		{
			res += indentation + "\tattr: " + n.getAttribute(i).getName() + ": " + n.getAttribute(i).getValue() + "\n";
		}
		for(var i=0; i<n.getPropertiesCount(); ++i)
		{
			res += indentation + "\tprop: " + n.getProperty(i).getName() + ": " + n.getProperty(i).getValue() + "\n";
		}

		for(var i=0; i<n.getInternNodesCount(); ++i)
		{
			res += this.nodeToString(n.getInternNode(i), rang+1);
		}

		return res;
	}

	this.display = function()
	{	
		if(this.root !== null)
			alert(this.nodeToString(this.root, 0));
	}
}

function Node()
{
	this.name = "";
	this.id = "";
	this.content = "";
	this.attributes = [];
	this.properties = [];
	this.internNodes = [];

	this.getName = function(){	return this.name;	}
	this.setName = function(name){	this.name = name;	}

	this.getId = function(){    return this.id;    }
    this.setId = function(id){    this.id = id;    }
    
    this.getContent = function(){    return this.content;    }
    this.setContent = function(content){    this.content = content;    }

	this.addAttribute = function(attribute){	this.attributes.push(attribute);	}
	this.insertAttribute = function(attributeIndex, attribute){	this.attributes.splice(attributeIndex, 0, attribute);	}
	this.getAttribute = function(attributeIndex){	return this.attributes[attributeIndex];	}
	this.getAttributeByName = function(attributeName)
	{
		for(var i=0; i<this.attributes.length; ++i)
		{
			if(this.attributes[i].getName() == attributeName)
			{
				return this.attributes[i];
			}
		}
	}
	this.setAttribute = function(attributeIndex, attribute){    this.attributes[attributeIndex] = attribute;    }
	this.getAttributesCount = function(){	return this.attributes.length;	}
	this.removeAttribute = function(attributeName)
	{
		var curIndex = -1;
		for(var i=0; i<this.attributes.length; ++i)
		{
			if(this.attributes[i].getName() == attributeName)
			{
				curIndex = i;
				break;
			}
		}

		if(curIndex != -1)
			this.attributes.splice(curIndex, 1);
	}

	this.addProperty = function(property){	this.properties.push(property);	}
	this.insertProperty = function(propertyIndex, property){	this.properties.splice(propertyIndex, 0, property);	}
	this.getProperty = function(propertyIndex){	return this.properties[propertyIndex];	}
	this.getPropertyByName = function(propertyName)
	{
		for(var i=0; i<this.properties.length; ++i)
		{
			if(this.properties[i].getName() == propertyName)
			{
				return this.properties[i];
			}
		}
	}
	this.setProperty = function(propertyIndex, property){   this.properties[propertyIndex] = property;    }
	this.getPropertiesCount = function(){	return this.properties.length;	}
	this.removeProperty = function(propertyName)
	{
		var curIndex = -1;
		for(var i=0; i<this.properties.length; ++i)
		{
			if(this.properties[i].getName() == propertyName)
			{
				curIndex = i;
				break;
			}
		}

		if(curIndex != -1)
			this.properties.splice(curIndex, 1);
	}

	this.addInternNode = function(node){	this.internNodes.push(node);	}
	this.insertInternNode = function(nodeIndex, node){	this.internNodes.splice(nodeIndex, 0, node);	}
	this.getInternNode = function(nodeIndex){	return this.internNodes[nodeIndex];	}
	this.setInternNode = function(nodeIndex, node){ this.internNodes[nodeIndex] = node;    }
	this.getInternNodesCount = function(){	return this.internNodes.length;	}
	this.removeInternNode = function(nodeIndex){	this.internNodes.splice(nodeIndex, 1);	}
}

function Attribute()
{
	this.name = "";
	this.value = "";

	this.getName = function(){	return this.name;	}
	this.setName = function(name){	this.name = name;	}

	this.getValue = function(){	return this.value;	}
	this.setValue = function(value){	this.value = value;	}
}

function Property()
{
	this.name = "";
	this.value = "";

	this.getName = function(){	return this.name;	}
	this.setName = function(name){	this.name = name;	}

	this.getValue = function(){	return this.value;	}
	this.setValue = function(value){	this.value = value;	}
}

function NodeTreeParser()
{
	this.parseFromString = function(xmlString)
	{
		var nodeTree = new NodeTree();
		var xmlDoc = null;
		if (window.DOMParser)
		{
			var parser=new DOMParser();
			xmlDoc=parser.parseFromString(xmlString,"text/xml");
		}
		else // Internet Explorer
		{
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async=false;
			xmlDoc.loadXML(xmlString);
		}
		
		var rootNode = this.parseNodeFromXml(xmlDoc.getElementsByTagName("node")[0]);
		nodeTree.setRoot(rootNode);

		return nodeTree;
	}

	this.parseNodeFromXml = function(xmlNode)
	{
		var node = new Node();
		node.setName(xmlNode.getAttribute("name"));

		var curXmlNode = this.getFirstChild(xmlNode);

		while(curXmlNode !== null)
		{
			if(curXmlNode.nodeName == "content")
            {
                node.setContent(curXmlNode.childNodes[0].nodeValue);
            }
            else if(curXmlNode.nodeName == "attribute")
            {
                var tmpAttribute = new Attribute();
                tmpAttribute.setName(curXmlNode.getAttribute("name"));
                tmpAttribute.setValue(curXmlNode.childNodes[0].nodeValue);
                node.addAttribute(tmpAttribute);
            }
			else if(curXmlNode.nodeName == "property")
			{
				var tmpProperty = new Property();
				tmpProperty.setName(curXmlNode.getAttribute("name"));
				tmpProperty.setValue(curXmlNode.childNodes[0].nodeValue);
				node.addProperty(tmpProperty);
			}
			else if(curXmlNode.nodeName == "node")
			{
				var tmpNode = this.parseNodeFromXml(curXmlNode);
				node.addInternNode(tmpNode);
			}

			curXmlNode = this.getNextSibling(curXmlNode);
		}

		return node;
	}

	this.getFirstChild = function(xmlNode)
	{
		var fc = xmlNode.firstChild;
		if(typeof(fc) == 'undefined')
			fc = null;
		if(fc !== null && fc.nodeType != 1)
		{
			fc = this.getNextSibling(fc);
		}
		return fc;
	}

	this.getNextSibling = function(xmlNode)
	{
		var ns = xmlNode.nextSibling;
		if(typeof(ns) == 'undefined')
			ns = null;
		while(ns !== null && ns.nodeType != 1)
		{
			ns = ns.nextSibling;
		}
		return ns;
	}

	this.getPreviousSibling = function(xmlNode)
	{
		var ps = xmlNode.previousSibling;
		if(typeof(ps) == 'undefined')
			ps = null;
		while(ps !== null && ps.nodeType != 1)
		{
			ps = ps.previousSibling;
		}
		return ps;
	}

	this.getLastChild = function(xmlNode)
	{
		var lc = xmlNode.lastChild;
		if(typeof(lc) == 'undefined')
			lc = null;
		if(lc !== null && lc.nodeType != 1)
		{
			lc = this.getPreviousSibling(lc);
		}
		return lc;
	}

	this.parseToString = function(nodeTree)
    {
        var xmlString = '<?xml version = "1.0" encoding="UTF-8" standalone="yes" ?>\n<base>\n</base>';

        var xmlDoc = null;
        if (window.DOMParser)
        {
            var parser=new DOMParser();
            xmlDoc=parser.parseFromString(xmlString,"text/xml");
        }
        else // Internet Explorer
        {
            xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async=false;
            xmlDoc.loadXML(xmlString);
        }

        var xmlRoot = xmlDoc.getElementsByTagName("base")[0];
        var xmlNode = this.parseXmlFromNode(nodeTree.getRoot(), xmlDoc, xmlRoot);

        var oSerializer = new XMLSerializer();
        var xmlResString = oSerializer.serializeToString(xmlDoc);

        return xmlResString;
    }

    this.parseXmlFromNode = function(node, xmlDoc, xmlRoot)
    {
        var xmlNode = xmlDoc.createElement("node");
        var xmlNodeName = xmlDoc.createAttribute("name");
        xmlNodeName.nodeValue=node.getName();
        xmlNode.setAttributeNode(xmlNodeName);
        
        if(node.getContent() !== "")
        {
            var xmlContent = xmlDoc.createElement("content");
            var xmlContentText=xmlDoc.createTextNode(node.getContent());
            xmlContent.appendChild(xmlContentText);
            xmlNode.appendChild(xmlContent);
        }

        for(var i=0; i<node.getAttributesCount(); ++i)
        {
            var xmlAttribute = xmlDoc.createElement("attribute");
            var xmlAttributeName = xmlDoc.createAttribute("name");
            xmlAttributeName.nodeValue=node.getAttribute(i).getName();
            xmlAttribute.setAttributeNode(xmlAttributeName);
            var xmlAttributeText=xmlDoc.createTextNode(node.getAttribute(i).getValue());
            xmlAttribute.appendChild(xmlAttributeText);
            xmlNode.appendChild(xmlAttribute);
        }

        for(var i=0; i<node.getPropertiesCount(); ++i)
        {
            var xmlProperty = xmlDoc.createElement("attribute");
            var xmlPropertyName = xmlDoc.createAttribute("name");
            xmlPropertyName.nodeValue=node.getProperty(i).getName();
            xmlProperty.setAttributeNode(xmlPropertyName);
            var xmlPropertyText=xmlDoc.createTextNode(node.getProperty(i).getValue());
            xmlProperty.appendChild(xmlPropertyText);
            xmlNode.appendChild(xmlProperty);
        }

        for(var i=0; i<node.getInternNodesCount(); ++i)
        {
            var tmpXmlNode = this.parseXmlFromNode(node.getInternNode(i), xmlDoc, xmlNode);
            xmlNode.appendChild(tmpXmlNode);
        }

        xmlRoot.appendChild(xmlNode);
        return xmlNode;
    }
}

function TagsPropertiesXmlParser()
{
    this.tagsHash = {};
    this.propertiesHash = {};
    
    this.getTagsHash = function(){    return this.tagsHash;    }
    this.getPropertiesHash = function(){    return this.propertiesHash;    }
    
    this.parseFromString = function(xmlString)
    {
        var xmlDoc = null;
        if (window.DOMParser)
        {
            var parser=new DOMParser();
            xmlDoc=parser.parseFromString(xmlString,"text/xml");
        }
        else
        {
            xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async=false;
            xmlDoc.loadXML(xmlString);
        }
        this.parseTagsPropertiesFromXml(xmlDoc);
    }

    this.parseTagsPropertiesFromXml = function(xmlDoc)
    {
        var root = xmlDoc.documentElement;
        var tagsList = root.getElementsByTagName("node");
        
        for (var i = 0 ; i < tagsList.length ; i++)
        {
            var tagName = tagsList[i].getAttribute("name");
            var attributesList = tagsList[i].getElementsByTagName("attribute");            
            var attributesListHash = {};
            for (var j = 0 ; j < attributesList.length ; j++)
            {
                var attributeName = attributesList[j].getAttribute("name");
                var attributesValues = attributesList[j].getElementsByTagName("attribute-value");
                var valuesList = [];
                for (var k = 0 ; k < attributesValues.length ; k++)
                {
                    var attributeValue = attributesValues[k].firstChild.nodeValue;
                    valuesList[k] = attributeValue;
                }
                if(valuesList.length > 0) {
                    attributesListHash[attributeName] = valuesList;
                } else {
                    attributesListHash[attributeName] = ['null'];
                }
            }
            if(Object.keys(attributesListHash).length > 0) {
                this.tagsHash[tagName] = attributesListHash;    
            } else {
                this.tagsHash[tagName] = {'null':'null'};
            }

        }
        
        var propertiesList =  root.getElementsByTagName("property");
        
        for (var i = 0 ; i < propertiesList.length ; i++)
        {
            var propertyName = propertiesList[i].getAttribute("name");
            var propertiesValues = propertiesList[i].getElementsByTagName("property-value");            
            var valuesList = [];
            for (var j = 0 ; j < propertiesValues.length ; j++)
            {
                var propertyValue = propertiesValues[j].firstChild.nodeValue;
                valuesList.push(propertyValue);                
            }
            if(valuesList.length > 0) {
                this.propertiesHash[propertyName] = valuesList;        
            } else {
                this.propertiesHash[propertyName] = ['null'];
            }
        }
    }
    
    this.getTags = function () {
        var tags = [];
        for(var key in this.tagsHash)
        {
            tags.push(key);
        }
        return tags;
    }
    
    this.getAttributes = function (tagName) {
        var attributesHash = this.tagsHash[tagName];
        var attributes = [];
        for(var key in attributesHash)
        {
            attributes.push(key);
        }
        if(attributes[0] == "null")
        {
            return null;
        } else {
            return attributes;
        }
    }
    
    this.getAttributeValues = function (tagName,attributeName) {
        var attributesHash = this.tagsHash[tagName];
        var values = attributesHash[attributeName];
        if(values[0] == "null")
        {
            return null;
        } else {
            return values;
        }
    }
    
    this.getProperties = function () {
        var properties = [];
        for(var key in this.propertiesHash)
        {
            properties.push(key);
        }
        return properties;
    }
    
    this.getPropertyValues = function(propertyName) {
        var propertiesValues = this.propertiesHash[propertyName];
        if (propertiesValues[0] == "null") {
            return null;
        } else {
            return propertiesValues;
        }
    }
}

window.onload = function()
{
	initFileInput();
}

function initFileInput()
{
	var fileInput = document.getElementById('fileInput');

	fileInput.addEventListener('change', function(e) {
		var file = fileInput.files[0];
		var textType = /.*.xml/;

		if (file.type.match(textType)) {
			loadFile(file);
		} else {
			alert("Vous devez s\351lectionner un fichier xml");
		}
	});
}

function loadFile(file)
{
	var reader = new FileReader();

	reader.onload = function(e) {
		/*var parser = new NodeTreeParser();
        var xmlContent = reader.result;
        alert(xmlContent);
        var nodeTree = parser.parseFromString(xmlContent);
        nodeTree.display();

        alert(parser.parseToString(nodeTree));*/
        
        var parser = new TagsPropertiesXmlParser();
        var xmlContent = reader.result;
        parser.parseFromString(xmlContent);
        var test = parser.getPropertyValues('text-transform');
        if (test === null) {
            alert('pas de valeurs pour cet propriete');
        } else {
            alert(test[0]);
        }
	}

	reader.readAsText(file);
}