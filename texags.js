// ==UserScript==....................................
// @name           TexAgs Extension 
// @namespace      texags
// @description    Version 1.00
// ==/UserScript==


/*********  USER-DEFINED VARIABLES  ***********/
var userWatchList = Array('WatchOle', 'Liucci', 'JeremyK', 'MWR Admin', 'Moderator', 'ooshwa', 'myBCS.com', 'thisladyisacop', 'Mr. Traffic');

var sipList = Array('2005Horn', '33', '91 Horn', '94 Texas EX', 'A Corda', 'AkersN', 'AlexNguyen', 'austx', 'Authentic Horn', 'awinlonghorn', 'bassale47', 
'BleedOrange10', 'booleyHorn', 'BoyNamedSue', 'Chest Rockwell', 'Devinp23', 'Dr Drunkenstein', 'Fast Times', 'FtWorthHorn', 'Full Tilt', 'FWHORN', 
'gnglonghorn', 'GoHorns94', 'h264', 'Hellraiser97', 'horn1', 'Hornblood', 'Hornographer', 'Horns11', 'hookem3', 'huisache', 'IgnatiusReilly', 
'IIIHorn', 'INIGO MONTOYA', 'Jakovasaur', 'jefford22', 'jkavvytx', 'JTaylor', 'KidTwist', 'l-horndev', 'landman1', 'Lifeguard NO.2', 'Lhorn01', 'LHorns3',
'locohorn',  'LonghornsNo1', 'Lost Saucer', 'MidnightBevo', 'Mister Randy Watson', 'Mr. Drummond', 'MustangOrange', 'nbbob', 'NerveEndings', 
'Nonhostile Sip', 'northernhorn', 'Norwegian Wood', 'ObjectiveUTLAW91', 'onehorn', 'Pato', 'Professor Terguson', 'realhorn', 'rscharnell', 'saltwater', 
'Samsill98', 'Skihorn', 'sodiumacetate',  'TEXAS FIGHT!', 'Tex Pete', 'Texas velvet maestro', 'Texas_Fan', 'Texas75', 'TexasBorn', 'TexasEx1994', 'Texdoc',
'The Lat Man', 'Theo', 'THorns90', 'toucan82', 'UniHorn', 'UTGrad02', 'UTLawHorn', 'W.E. Henley', 'West Horn', 'Winston Wolfe', '@Texas.edu',
 'Nowhere Man', 'omaha28', 'MarcusT', 'Longhorn Nation', 'Nedley Mandingo', 'TexasBB', 'Gameover', 'Bevolution', 'Mailinator1892');

var tshirtSipList = Array('LonghornDub','squid', 'highwayman', 'johnnyyou', 'FXST', 'UT2005', 'hornsfan568', '20Horn09', 'OrangeRout', 'Hookem123', 'Rob Lowe', 
'Texasfan1224', 'horninatx', 'sugarlandbevo', 'RVHorn', 'RVHorn', 'UTex09', '13 0 National Champs', 'texasfight68', 'Dwayne Hoover', 'turk333', 'BDog', 'TheBeeve');

var specialList = Array( 'highwayman', 'johnnyyou', 'FXST', 'UT2005', 'Dwayne Hoover');

var cubList = Array('Hurin', 'LonghornDub', 'Big Old Bear');

var theifList = Array('PlanoGuy', 'Godfather', 'soonerborn');

var caneList = Array('TheU');

var tardList = Array('0raider0', 'Big 12-0', 'BillJack', 'BreakPoint778', 'Cowtown Raider', 'Cowtown Red', 'DrKennethNoisewater', 'Hong Kong Paul', 
'leachfan', 'PaleHorse', 'raiderjay', 'rockylarues', 'shiner raider', 'TechDiver', 'Techsan_02', 'TechTard', 'TENBOLLS', 'Texas Tech Universe', 
'ttechguy', 'TTechDeck', 'TTUClint', 'WreckemTXTech', 'Zorro', 'BonniePrinceBilly', 'MHBT_Raider', 'TheGoddess', 'Dr.K', 'Preferred Stock', 'Raider15', 'Matador05',
'TTPointMan', 'sexaT Tech', 'redraiderzuke');

var nickname = Array('highwayman');
var nicknames = Array('patch');

var maxImgSize = 1000;
var sigChecked = false;
var pageNumberThreshold = 4;
var maxPageNumbers = 8;

//use http://www.allprofitallfree.com/color-wheel2.html to pick the color of your choice 
//then copy and paste the 6 digit/letter HTML code after the # sign in place of the old color code

var watchListHighlightColor = '#ffdddd';
var postedHighlightColor = '#ddffdd';
var repliedHighlightColor = '#ddddff';
var sipOrange = '#c27334'; 
/**********************************************/


function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < els.length; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function insertAtCursor(event) {
	event.preventDefault();
	var link, textarea, openTag, closeTag;
	link = event.currentTarget;
	openTag = '['+link.title+']';
	closeTag = '[/'+link.title+']';
	var textareas = document.getElementsByTagName('textarea');
	textarea = textareas[0];
	var scrollX = textarea.scrollLeft;
	var scrollY = textarea.scrollTop;
	if (textarea.selectionStart || textarea.selectionStart == '0') {
		var startPos = textarea.selectionStart;
		var endPos = textarea.selectionEnd;
		textarea.value = textarea.value.substring(0, startPos)
			+ openTag + textarea.value.substring(textarea.selectionStart, textarea.selectionEnd)
			+ closeTag +textarea.value.substring(endPos, textarea.value.length);
		if (startPos == endPos) textarea.selectionStart = endPos + openTag.length;
		else textarea.selectionStart = endPos + openTag.length + closeTag.length;
		textarea.selectionEnd = textarea.selectionStart;	
	} 
	textarea.focus();
	textarea.scrollLeft = scrollX;
	textarea.scrollTop = scrollY;
}

function postButton(imageSource,title,func) {
	var image, button;
	image = document.createElement('img');
	image.src =  imageSource;
	image.style.backgroundColor = '#5a121e';
	image.style.marginTop = 2;
	image.style.marginLeft = 2;
	image.addEventListener('mouseover', function (event) {this.style.backgroundColor = '#000000';}, false);
	image.addEventListener('mouseout', function (event) {this.style.backgroundColor = '#5a121e';}, false);
	button = document.createElement('a');
	button.title = title;
	button.href = title;
	button.addEventListener('click', func, false);
	button.appendChild(image);
	return button;
}

var testReply = /postreply/;
var testPost = /posttopic/;
var testPM = /privatemessage/;
var testEdit = /replyedit/;
var testTopic = /forum.topic/;
var testThread = /forum.reply/;
var testBCSTopic = /Topics/;
var testBCSThread = /Replies/;

if (testReply.test(window.location.href) || testPost.test(window.location.href) || testEdit.test(window.location.href) || testPM.test(window.location.href)) {
var allInputs;
	allInputs = document.evaluate("//input[@type='checkbox']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var j = 0; j < allInputs.snapshotLength; j++)
		allInputs.snapshotItem(j).checked = sigChecked;
	if (testReply.test(window.location.href)) {
		var url = window.location.href;
		var findTopicID = /topic_id=(\d+)/;
		url.match(findTopicID);
		var topicID = RegExp.$1;
		var submitSpan = getElementsByClass("inlinewordbuttons",null,"span");
		submitSpan[0].childNodes[0].childNodes[0].addEventListener('click', function(event) {
			if(null == localStorage.getItem(topicID))
				localStorage.setItem(topicID, 'none');
			}, false);
	}
	var headings = getElementsByClass("formlabel", null, "td");
	var reply = /Your/;
	for (var i = 0; i < headings.length; i++) {
		if (reply.test(headings[i].innerHTML)) {
			var textareas = document.getElementsByTagName('textarea');
			var textarea = textareas[0];
			headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhKAAPAKEBAMDAwP///////////yH5BAEAAAAALAAAAAAoAA8AAAJCjI+pywkPo5y0PmOzrnj73X0iFV7RAQSQqppgu0ptx8avjKc6i3qlfnJhYLDMD5Eaxoi+4uiZhEqj0+ev+mpot40CADs=', 'url', insertAtCursor), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhKAAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAAoAA8AAAJHjI+pyzkPo5y0PmOzrnj73X0iFV5YAKHDkXYIqUbqica1FMPTvPbOXCvJcpdi0dY7ZoQsJHLlYu2Io6qwOrpiP9otqAEOgwsAOw==', 'img', insertAtCursor), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhKAAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAAoAA8AAAJGjI+pyzkPo5y0PmOzrnj73X0iFULHZV6dg0jlEKQxOsMpSta4Xcf9DXsFXbLi7pebnFS9UvMl3I0y0emnagXpsqKG9/stAAA7', 'quote', insertAtCursor), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhKAAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAAoAA8AAAJHjI+pyzkPo5y0PmOzrnj73X0iFV7HEEAp2p2rVaIRRqvXncWnnPYI/uIEZbbba4XU6Fy2I8sXUw1H1ChVZL16slpl4wv+FgAAOw==', 'email', insertAtCursor), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhEwAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAATAA8AAAImjI+Zw+3PDJxOUmovzA1NHnVbMIIR+aCD2rGnubraOY91Ks/KvhcAOw==', 'b', insertAtCursor), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhEwAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAATAA8AAAIjjI+Zw+3PDJxOUmovzJU3/2EBJpITOBznqG1s28EPqim2XQAAOw==', 'i', insertAtCursor), headings[i].lastChild.nextSibling);
		}
	}
}

else if (testTopic.test(window.location.href)) {
	var theFooter = getElementsByClass("footer2");
	var myUserName = theFooter[0].childNodes[1].innerHTML;
	var topics = getElementsByClass("topics", null, "a");
	var findTopicID = /topic_id=(\d+)/;
	var thisTopic, topicID, lastReplyCount, currentReplyCount;
	for (i=0; i<topics.length;i++) {
		thisTopic = topics[i];
		if (pageNumberThreshold && thisTopic.parentNode.parentNode.childNodes[4].innerHTML > ((pageNumberThreshold - 1) * 35 - 1)) {
			thisTopic.style.paddingRight = 25;
			var forumID = /(&forum_id=\d+)$/;
			var numberOfPages = Math.ceil(thisTopic.parentNode.parentNode.childNodes[4].innerHTML/35 + 1/35);
			for (var j = 1; j <= numberOfPages; j++) {
				if (numberOfPages > maxPageNumbers && j == Math.floor(maxPageNumbers/2)+1) {
					thisTopic.parentNode.insertBefore(document.createTextNode("..."), thisTopic.parentNode.lastChild.nextSibling);
					j = (numberOfPages - Math.ceil(maxPageNumbers/2) + 1);
				}
				var pageLink = document.createElement('a');
				if (j==1) pageLink.href = thisTopic.href;
				else pageLink.href = thisTopic.href.replace(forumID, "&page="+j+"$1");
				pageLink.setAttribute('class', 'topics');
				pageLink.style.padding = 2;
				pageLink.innerHTML = j;
				thisTopic.parentNode.insertBefore(pageLink, thisTopic.parentNode.lastChild.nextSibling);
			}
		}
		thisTopic.href.match(findTopicID);
		topicID = RegExp.$1;
		lastReplyCount = localStorage.getItem(topicID);
		if (lastReplyCount == null) {
			if (thisTopic.parentNode.parentNode.childNodes[3].innerHTML == myUserName) {
				for(j=0;j<thisTopic.parentNode.parentNode.childNodes.length; j++){
					thisTopic.parentNode.parentNode.childNodes[j].style.backgroundColor = postedHighlightColor;
					thisTopic.parentNode.parentNode.childNodes[j].style.fontWeight = 'bold';
				}
				localStorage.setItem(topicID, thisTopic.parentNode.parentNode.childNodes[4].innerHTML);
			}
			for(j=0; j<userWatchList.length; j++){
				if (userWatchList[j].toUpperCase() == thisTopic.parentNode.parentNode.childNodes[3].innerHTML.toUpperCase()){
					for(k=0;k<thisTopic.parentNode.parentNode.childNodes.length; k++){
						thisTopic.parentNode.parentNode.childNodes[k].style.backgroundColor = watchListHighlightColor;
						thisTopic.parentNode.parentNode.childNodes[k].style.fontWeight = 'bold';
					}
				}
			}
		}
		else {
			var bgColor;
			if (thisTopic.parentNode.parentNode.childNodes[3].innerHTML == myUserName) bgColor = postedHighlightColor;
			else bgColor = repliedHighlightColor;
			for(j=0;j<thisTopic.parentNode.parentNode.childNodes.length; j++){
				thisTopic.parentNode.parentNode.childNodes[j].style.backgroundColor = bgColor;
				thisTopic.parentNode.parentNode.childNodes[j].style.fontWeight = 'bold';
			}
			currentReplyCount = thisTopic.parentNode.parentNode.childNodes[4].innerHTML;
			if (lastReplyCount == 'none') {localStorage.setItem(topicID,currentReplyCount);}
			else if (currentReplyCount != lastReplyCount) {
				thisTopic.parentNode.parentNode.childNodes[4].innerHTML = lastReplyCount +" <font color='red'>+" + (currentReplyCount-lastReplyCount) + "</font>";
				localStorage.setItem(topicID,currentReplyCount);
			}
		}
	}
}

else if (testThread.test(window.location.href)) {
	var thisAnchor, userLevelImg, userName;
	var allAnchors = document.evaluate('//a[@name]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allAnchors.snapshotLength; i++) {
		thisAnchor = allAnchors.snapshotItem(i);
		userLevelImg = thisAnchor.parentNode.nextSibling.childNodes[1].childNodes[0];
		userName = thisAnchor.childNodes[0].innerHTML.toUpperCase();
		for (var j = 0; j < sipList.length; j++) {
		       if (sipList[j].toUpperCase() == userName) {
			//thisAnchor.childNodes[0].style.backgroundColor = sipOrange;
		       	var sipTag = document.createElement('img');
		       	sipTag.src = 'data:image/gif;base64,R0lGODlhGwAUAMT/AP////r6+vTw6+7n3OnezuPZ1+LTvNzKrtr'+
		       		'JwdC3kM23qcmsf8SicMKih8DAwL6ZYriQU7aMWbGEQat7M6p4LqZyJKVuGaBpFpd1TIlgKXxdN3xQEnR'+
		       		'SKAAAAMDAwAAAACH5BAEAAB4ALAAAAAAbABQAQAXMoCeOZGmeYkNZ1yIQAAQBl/ECzMVe2Klgm6BwOMQ'+
		       		'oUB5EIxKhOJ9QZwRxilhYD4ABN6sBYLnLZdNDms+ewnK1u0RoYvH1GimUnCwJbMCACGoLbnBiGyUFGHG'+
		       		'JcQaBiWR2aJGSkycFCApLTJqaDQqQJ0pNbBcVEHFzFhRGJgpNeRAVOhEXEhMQEzpXFw0lrjUGEgsyNAY'+
		       		'GLX9xGSUYugkLFQcGMxbFLQNxG8okDW0TTaSzjN/YvCUKFIqJtdgbGkcoahgcREIcGA2flJEhADs=';
		       	userLevelImg.parentNode.insertBefore(sipTag, userLevelImg.nextSibling);
		       }
		}	
		for (var k = 0; k < specialList.length; k++) {
			if (specialList[k].toUpperCase() == userName) {
				var specialTag = document.createElement('img');
				specialTag.src ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAATCAYAAABhh3'+
						'Y4AAAEu0lEQVR42s2VeUyUVxTFp1FaaG1RhA5obFisQVtQ0boEERMbVMTWKu6lQo'+
						'WgLShoVYJVFNC2irHFUBsZM0GFiUIBwYV9GVBgQAeHbQYEWcOAjAuIiEV/feGvxi'+
						'W2/ad9yc37vuTe77x77nnnk0j+b4uuLikdtdBZBl3XwFAC+iLoEfvdCgb1FTzoaz'+
						'n37wHK6hlMzMAQdwa9LIqW4wE0xqynQb4ajdyD1syN9Nbto6EqnOzS/cTkHkBWLO'+
						'eyqhDt7U7+Hkj74FRSVRi27aVp+Wd0B6ykPciFzlB7mg5IUUeZ0HvVUXS0kN4nn6'+
						'O8v47I2mX41KxmaYYXG2PDCYlRkJbf9XpAksvo2R1NvrMbuTMnolthR/OmsTRul1'+
						'CxS4I+ScLDWjP6+u2pZTY7K8bjpXXFQbkAu/MbcIoMx9n3N7w2Z5GSOPBqQJQ36A'+
						'/YR+m8JVBbD/XFlPjYUR1oTOF3EgwZxgxpjekzWNA0NAcNmzlHGAuveyKVe2F6aD'+
						'8W/nHYeFxioWsJYX7NNCt5OWDfcTlN891ImWAN7W1wr5bkLRPJDjZGq5hIS+kkWm'+
						'9Z0vFkBjEqa76+Ys+GivVY/+qBVdgWzPwiMP8ijqmLCnGfVobX5BzOBmvFoZ8DRN'+
						'eE9tutpI8fB1cuwp0u6G8Us0mAvhihwmOAjMdE0cB+/NOmU8QVstExJfBLKp89o6'+
						'4fCquhWQOXQsDvfQU7Phb1Vc+DVWnIXexKjqMll+dPEh9vggEN8SdmUZy1SAClME'+
						'QOl1sj8JK7sCrBnTxukjc4wJTlfhiewh+PYZnLnuFORDpbR8sItDwBqufBygtJmC'+
						'pFt9YGlY+96KhSVBRTmu1IcdEEHvEDPSTSTgnXhpS4/byKTPGmFN04LNvF3UGR3g'+
						'trHPciUiALgsYcI1j6E1z/Cxh320LQlqL2X4Da25TSbRZiXomiQkG3fjE17TPI7P'+
						'Ak7laQUKBaHLQNp1BfsgXA1Vb4xOUgjx6J9HsQsiAW8sXzSTgsPcmPttGIkuc669'+
						'Sgi1rL1cB3UB8cxZDOR1SEi9jLHSKoIFqQmEgqBYRWJzNh8x6yOqCmHNwdTgwDcV'+
						'9EnojzcMO5GtmIWC7MTn0JjfpqOtNDKY+0RCc3pSrbiiyVLXkPPNmpms2SjFm4K7'+
						'9iZnwg5kHbsFlzimlz01hlV4CvTTIIYVAHOywikEkTSB+ZyIW34ukIFrOveYn8aU'+
						'mlNckV3e+jqdWMoWRgMrtbrZlTaoWL1oMP0zZh+n0EY1fECeqUeE6pJsiqjp3v5i'+
						'BkOTynBHMFF42SyJcko55WIJT9invGw0pxaSPRV3pws/kj4ntscVObMve2cAiVD0'+
						'aH/HnbOxb7RcW421ezRdpA2Hv1HBxZxBETBafN4kkxSuDiG2dQjr8AUUNwm1cbtP'+
						'AiDN0K8tv88c20xrnEiZnl3piE+TNq4xE+8EjGySEb33Fq9phUEjaijMOSXBLfzC'+
						'BlhIIko5MUTE9hIPr+MK2v9cfBp20hjVzibPePbG8Ow/roSiy8ArBdehT7eTF8Ov'+
						'0s68xkfGN8igBjGRFmp5GbnyFzchKG7cII0gWlLYT8o9+MnkZxP9vQPO2i9SHeL8'+
						'6YEEHTL8N7E8oXbOm/XH8CnzDhujSvTQIAAAAASUVORK5CYII%3D';
				userLevelImg.parentNode.insertBefore(specialTag, userLevelImg.nextSibling);
			}
		}
		for (var k = 0; k < cubList.length; k++) {
			if (cubList[k].toUpperCase() == userName) {
				var cubTag = document.createElement('img');
				//Green Tag
				//cubTag.src = 	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAUCAYAAAB8gkaA'+
				//		'AAAAm0lEQVR42mNgGAW0BI9uXP/vHM/wn8GRdAzWRywAKSbXIpIspNQSoi2kpkUwy0'+
				//		'DRgd02R+paht93NLAMjPFZ9mELPxwjayqrZAdjGHvLdG4UOWR9VjHMhC0DGQAzEKQB'+
				//		'2UJCliHrQ5bDaRm6b8j1GVHBSMhnMAuQLcbmMxQLyYkzQvGJLAezGGdqpG8+o2cJQk'+
				//		'0LSS6M6WLRsAAAuEzFWLGk764AAAAASUVORK5CYII%3D';
				//Gold Tag
				cubTag.src =	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAUCAYAAAB8gkaA'+
						'AAABFklEQVR42mNgGAW0BI9uXP//8Vr3/3drGEjCID0gTLRFMA2kWkSyhdsmM/6f0g'+
						'LEzQxwPBmIby5i+P92NQQv6ICITYbKP1oGEb8wDyE2q5Xh/5O12v/x+gjkMgZHTCzo'+
						'wfB/fgfE5dcWoso9WQ4RB1mILH57jtR/UHTgtmw1A9zCy/MRQfN8JUQM5EOYGIiPLR'+
						'iNwlGDFKtlYAU4LHsBtWzbZNIsA6sj1TKDMIb/KoFohlDTMmyYqpa9xeGz16sgYmVl'+
						'dLAMJhachsp/tBzTMud4IiwDpRxcll1dABFb1IlqGbagRRbDmRpBEmv6cMfXrimoBs'+
						'OyA754xZnPIEHJSHYxhY6frNUhXGRRwyKSC2OaFsLDCgAAqWbSuLT4+tQAAAAASUVO'+
						'RK5CYII%3D';
				userLevelImg.parentNode.insertBefore(cubTag, userLevelImg.nextSibling);
			}
		}

		for (var k = 0; k < tardList.length; k++) {
			if (tardList[k].toUpperCase() == userName) {
				var tardTag = document.createElement('img');
//credit to crewez of TexAgs for creating the tard tag image
				tardTag.src = 'data:image/gif;base64,R0lGODlhIQAUAMQfAMQIAdmEgMVGQME2MNR0cMlVUOzCwIkIAa0HA'+
					'M5lYPrw8K4XD7oHALknIOiysN2TkL02MMOSgpxJO6sHAM2zqOXY1vbh4OKjoNrIwMUNBsJJP6oGAIQJAb'+
					'EIAP///////yH5BAEAAB8ALAAAAAAhABQAAAX/4CeOZGmeaKqubOtWGBVpdG3fEVWp2KxlAGAwQwQMiUg'+
					'NBtX7ZTrQDgOBmECn1WgnI6GYKrPnoqDtIMrnDsQQ1exIlJ85wNYyyveOwBPdREoRTwgDFgoPHQQGBgQd'+
					'CRcODwsPBhd8HRsbEiVyHQsXFQMBCgQPHqEeDgEXFgEWfAiYCyVEUXQdAwUCBB4ColAeCR0Fr5gcJRJat'+
					'gkeFg68th28t8QcsiQaUGe2BocDz3UKAY18ExscmiQRl1Z7DxcKDoUB0MsGCh6w5n8kFRKYEwgKJJhQgE'+
					'CDAQMaQIgygMACAcUkvIGTAZPFfwjuYLxDxdw5LycoSOBAsiSHAyhLFqI8YLKLCjAjTcqcKSHCRBc4c+o'+
					'0EQIAOw==';
				userLevelImg.parentNode.insertBefore(tardTag, userLevelImg.nextSibling);
			}
		}
		for (var k = 0; k < theifList.length; k++) {
			if (theifList[k].toUpperCase() == userName) {
				var theifTag = document.createElement('img');
				theifTag.src = 	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAUCAYAAAB8gkaAAAACGUlEQ'+
						'VR42u2Uz0uUQRjH/TP0EN0ED106SHiRqLCiSBDCCjx0CMGjCN76YQTtIqa7JUWBdQmR1oM/8c1D'+
						'bYfoUEs/1FBYrUOx7mosuu/MvG98e57xB+/GzLgduogDDzPvzDzzeb/P88xUVR20/9m+Lcxj/k0'+
						'as08e4XlXJwZaLpTZ4KWLeHy1TRuP2VK3buDt6Auwb8UghrAjH5o4XK+tv6UZuZUVlEol+L4PSf'+
						'3sQP/uetT4B/iMikCs5O8DctkshCBIKBFKCREqbKyvYTp21wi8fu6sVukMnQnEJoWAJMjOd29dP'+
						'YIwRJGApv07Cq0h5fzYHBkU0uFRGH+X8gWrD9vUvT4zbKij3eokhKIQBog3nUCgfm8pUwrFQgFe'+
						'MomF9GujX8/lVjOs7/wZh7IAitTFm04iCJSGKeqLa3l49xMEe2X1NcJc4ZBCkpJQV2VAxRE/fYq'+
						'gAT5OTuDlgyS+UmGZ/Fprqs2wm3SQDfZuZFjnTUhFCimkFMLM5Lhee59KWcNoVfbMkTO2jOdhU2'+
						'1V5c/l7O78Z5o3wXoOHbHnjCvHBWN72HaFYKps7tOMZ1VmrUa+E/wnLliMcuUTbH01h1/5VV2N/'+
						'sYmZgYTxkp0Pl1862PHGpzAsTu3sZz5gO9zX/BjaRHpp0NloeP+2vFG9wsSBXKx6JhvOxvvUGSt'+
						'bEyKKgJFQ8rxZsfu2qN75pL38F72+adXf1+0P9r9685J7fk5AAAAAElFTkSuQmCC';
				userLevelImg.parentNode.insertBefore(theifTag, userLevelImg.nextSibling);
			}
		}

		for (var k = 0; k < caneList.length; k++) {
			if (caneList[k].toUpperCase() == userName) {
				var caneTag = document.createElement('img');
				caneTag.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAARCAYAAADHeGwwAAAABGdBT'+
					'UEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIzSURBVHjapJVNax'+
					'NBGMf/sy8lrY3BCiYhIcnB2kA8eCjJB8hFAyK9esjJiyD4WTxID/oRBE8pgoRCiUjitQuhB4khbQwk6Lp'+
					'pE8xm13nWzGZ37VpbH1h2dmfn939e5plltm0jxJ7g8vY6+EI5B1rh1ya/8oZhKN1u90JqJpNBNBo1F2v3'+
					'vELMEwHBn3PoXQHtdDqXcj+Xy6FQKBzy4QshIgR8cAEeDAbOfTabnQtUVdX3HI/HEYlEUC6XKZqnJCJSV'+
					'PHCLwILE/OyLIMx5q7TNE3hkVREDcj7h174gw8vET0dQrJMNLcqOEpv+8AEo8iPhwO82n+DOR+nNm7h2f'+
					'3Hzlyj0aC67PC67Em0gIrp9fza2TesT3WsTQ2smJM/PBd1M6059MkYxvQU388MWJblRtVqtZy7I+DdKfT'+
					'BnMlwEBKDxaTQFDHPWJYkR0CYYErhu4WRqwHMv1u/318KUOVFen6jmYtl4Y0YaqPRCMlkcimQSCT8vtsU'+
					'qk3VxMwKB6mK4nMq2HyugHgQBbIlDndEGG4aXxeC/l1EdsJ3kZiZmj993xSLxaUA305vs9msO7m/9QjHG'+
					'7cxUVexOdSw3X6H1OgzIhMd4/EPHJ18wcHhJ7zXPmJ9ZRU31q7jXuqOm55SqeQwg528W6vVlF6vd6WiEp'+
					'gsnU6jWq26nRw8i3br9brSbDavJEKee4+J4GHnnqa88XaoUdrtNnRd/ys0Foshn887OV+kJfQ0/Z//QOg'+
					'/4ZcAAwCgnRI4iqwhtwAAAABJRU5ErkJggg%3D%3D';
				userLevelImg.parentNode.insertBefore(caneTag, userLevelImg.nextSibling);
			}
		}

		for (var k = 0; k < tshirtSipList.length; k++) {
			if (tshirtSipList[k].toUpperCase() == userName) {
				var tshirtSipTag = document.createElement('img');
				tshirtSipTag.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAUCAYAAAB8gkaAAAACmU'+
						'lEQVR42tWUy08TURTG+WeUR2s7JSq+gnGBC02MC3XtogkLdxaNhDRtpy0SlCYqC1Ex8VEfUYzEa'+
						'khMIfIQqjBlWgZqbUuLKHTRFhBN03bm885UaoulDlIXnuTLzcz9zvndc+/cqagoEdH5eTU78hoT'+
						'/S8QmQ2glNc/NQmfhynpyQXrGsJw7130d5vh7GjEIH0c7/UHwbXshK+lFiPGI3DeouGbdBUUHOq'+
						'5gQGbVvIyLfsxbDyK/staqc5bxwN4mbHCBXhHnehr3I65C9sQ1Vdiia7BinUHEYUlogTRskWFBX'+
						'01uHPVcOnUGNNpMNmkRLi5CjGTgsxTkn+F+JZoBalThcD5SoyfrUHU9ewXcHrMCZYkrrZqELdoE'+
						'Csi8X2CaFks2Erha2t2TFiL50h+MrdsViLl7smDkc7cTQqSrCYmSjJuBJWrbA2KdK1EsgDmGsA7'+
						'nQpxsxord04jw38H0pm/BiUB8MIqEve1WDQo8Y3J28ZPQR+GrpzBjO0E/BcbEDbvwwJdi5QAJHn'+
						'IhqQgICmkpdyweS+pdRjejlOIcW8KP5LPkRCC7hHMDDwB+7gd7ksn8cVUK20FYWZD4JEfgjiTSe'+
						'WexTNaNFHwtB3DhN1Kaj1FiB3983VgHrYhbNotba24ap5PY6MQeEHyiLA5gwYTt5sRCX6Ud+fE4'+
						'Ho7EabrCEwlFcqAl8b1IS3k57gG89pN8kFZ2DXSWV2uszUVdJThC+bWYB67sTyw1HRfDha3HSon'+
						'bM9vsPzu1r/fAqxzC7B/cGbrgWU/s1L6P2BTz69i1rgLcfIjjdEqWUqQOxnRq+C5Z9gcjHXchJt'+
						'ugJ8+AL+5XpYClnqwhnowj9o3B4tw4+BedcPnuA7fyy5Z+kDEOboQYgaLwn4AGVAnkUyPrDUAAA'+
						'AASUVORK5CYII%3D';
				userLevelImg.parentNode.insertBefore(tshirtSipTag, userLevelImg.nextSibling);
			}
		}

		for (var k = 0; k < nickname.length; k++) {
			if (nickname[k].toUpperCase() == userName) {
 				thisAnchor.childNodes[0].innerHTML = nicknames[k];
			}
		}

	}
	var allImages = document.getElementsByTagName('img');
	for (i=0; i < allImages.length; i++) 
		if(allImages[i].width > maxImgSize) 
			allImages[i].width = maxImgSize;
	var pageNumber, lastPage, testPageNumbers = /Page:/, findPageNumber = /\s(\d+)\s/;
	var pageNumbers = getElementsByClass("mediumboxtitle", null, "div");
	for(i=0;i<pageNumbers.length;i++) 
		if (testPageNumbers.test(pageNumbers[i].innerHTML)) {
			pageNumbers[i].innerHTML.match(findPageNumber);
			pageNumber = RegExp.$1;
			lastPage = (pageNumbers[i].childNodes.length+1)/2;
			if (pageNumber < lastPage) {
				var nextPage = document.createElement('a');
				nextPage.href = pageNumbers[i].childNodes[pageNumber*2-1].href;
				pageNumbers[i].insertBefore(nextPage, pageNumbers[i].lastChild.nextSibling);
				var nextArrow = document.createElement('img');
				nextArrow.src = 'data:image/gif;base64,R0lGODlhDAAMAIcAAAAAAGZmZsvLy93d3e7u7v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAAYALAAAAAAMAAwA'+
					'AAhDAA0IGEiwoMACCBMqHFiAgMOHDgcwhBjgoUQBDR8GqEjgYsONICt6JBByY8eJGjmO1GgRJcSI'+
					'DAfInDlTgMCCOA0EBAA7';
				nextPage.insertBefore(nextArrow, nextPage.firstChild);
			}
			if (pageNumber > 1) {
				var prevPage = document.createElement('a');
				prevPage.href = pageNumbers[i].childNodes[pageNumber*2-3].href;
				pageNumbers[i].insertBefore(prevPage, pageNumbers[i].firstChild);
				var prevArrow = document.createElement('img');
				prevArrow.src = 'data:image/gif;base64,R0lGODlhDAAMAIcAAAAAAGZmZsvLy93d3e7u7v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAAYALAAAAAAMAAwA'+
					'AAhCAA0IGEiwoMACCBMqHFiAgMOHDgcwfBgAokQBDQkEqPjwYsONICt61BhS5ESSFk9qTIkRIssC'+
					'A2LKlClAYMGbBgICADs=';
				prevArrow.style.paddingRight = 3;
				prevPage.insertBefore(prevArrow, prevPage.firstChild);
			}
		}
}

if (testBCSTopic.test(window.location.href)) {
	var theHeader = getElementsByClass("first", null, "a");
	var myUserName = theHeader[0].innerHTML;
	var bcstopics = getElementsByClass("text", null, "td");
	var findTopicID = /tid=(\d+)/;
	var thisTopic, topicID, lastReplyCount, currentReplyCount, row;
	for (i=0; i < bcstopics.length; i++) {
		thisTopic = bcstopics[i].childNodes[0];
		thisTopic.href.match(findTopicID);
		topicID = RegExp.$1;
		lastReplyCount = localStorage.getItem(topicID);
		if (lastReplyCount == null) {
			if (thisTopic.parentNode.parentNode.childNodes[4].innerHTML == myUserName) {
				for(j=1;j<(thisTopic.parentNode.parentNode.childNodes.length-1); j++){
					thisTopic.parentNode.parentNode.childNodes[j].style.backgroundColor = postedHighlightColor;
					thisTopic.parentNode.parentNode.childNodes[j].style.borderColor = postedHighlightColor;
					thisTopic.parentNode.parentNode.childNodes[j].style.fontWeight = 'bold';
				}
				localStorage.setItem(topicID, thisTopic.parentNode.parentNode.childNodes[5].innerHTML);
			}
			for(j=0; j<userWatchList.length; j++){
				if (userWatchList[j].toUpperCase() == thisTopic.parentNode.parentNode.childNodes[4].innerHTML.toUpperCase()){
					for(k=1;k<(thisTopic.parentNode.parentNode.childNodes.length-1); k++){
						thisTopic.parentNode.parentNode.childNodes[k].style.backgroundColor = watchListHighlightColor;
						thisTopic.parentNode.parentNode.childNodes[k].style.borderColor = watchListHighlightColor;
						thisTopic.parentNode.parentNode.childNodes[k].style.fontWeight = 'bold';
					}
				}
			}
		}
		else {
			var bgColor;
			if (thisTopic.parentNode.parentNode.childNodes[4].innerHTML == myUserName) bgColor = postedHighlightColor;
			else bgColor = repliedHighlightColor;
			for(j=1;j<(thisTopic.parentNode.parentNode.childNodes.length-1); j++){
				thisTopic.parentNode.parentNode.childNodes[j].style.backgroundColor = bgColor;
				thisTopic.parentNode.parentNode.childNodes[j].style.borderColor = bgColor;
				thisTopic.parentNode.parentNode.childNodes[j].style.fontWeight = 'bold';
			}
			currentReplyCount = thisTopic.parentNode.parentNode.childNodes[5].innerHTML;
			if (lastReplyCount == null) {localStorage.setItem(topicID,currentReplyCount);}
			else if (currentReplyCount != lastReplyCount) {
				thisTopic.parentNode.parentNode.childNodes[5].innerHTML = lastReplyCount +" <font color='red'>+" + (currentReplyCount-lastReplyCount) + "</font>";
				localStorage.setItem(topicID,currentReplyCount);
			}
		}
	}
}

else if (testBCSThread.test(window.location.href)) {
	var thisPost, userLevelImg, userName;
	var allPosts = getElementsByClass("poster", null, "td");
	for (var i = 0; i < allPosts.length; i++) {
		thisPost = allPosts[i];
		userLevelImg = thisPost.childNodes[1].childNodes[3].childNodes[0];
		userName = thisPost.childNodes[1].childNodes[1].childNodes[1].innerHTML.toUpperCase();
		for (var j = 0; j < sipList.length; j++) {
			if (sipList[j].toUpperCase() == userName) {
				var sipTag = document.createElement('img');
				sipTag.src = 'data:image/gif;base64,R0lGODlhGwAUAMT/AP////r6+vTw6+7n3OnezuPZ1+LTvNzKrtr'+
					'JwdC3kM23qcmsf8SicMKih8DAwL6ZYriQU7aMWbGEQat7M6p4LqZyJKVuGaBpFpd1TIlgKXxdN3xQEnR'+
					'SKAAAAMDAwAAAACH5BAEAAB4ALAAAAAAbABQAQAXMoCeOZGmeYkNZ1yIQAAQBl/ECzMVe2Klgm6BwOMQ'+
					'oUB5EIxKhOJ9QZwRxilhYD4ABN6sBYLnLZdNDms+ewnK1u0RoYvH1GimUnCwJbMCACGoLbnBiGyUFGHG'+
					'JcQaBiWR2aJGSkycFCApLTJqaDQqQJ0pNbBcVEHFzFhRGJgpNeRAVOhEXEhMQEzpXFw0lrjUGEgsyNAY'+
					'GLX9xGSUYugkLFQcGMxbFLQNxG8okDW0TTaSzjN/YvCUKFIqJtdgbGkcoahgcREIcGA2flJEhADs=';
				userLevelImg.parentNode.insertBefore(sipTag, userLevelImg.nextSibling);
			}
		}
		for (var k = 0; k < tardList.length; k++) {
			if (tardList[k].toUpperCase() == userName) {
				var tardTag = document.createElement('img');
				tardTag.src = 'data:image/gif;base64,R0lGODlhIQAUAMQfAMQIAdmEgMVGQME2MNR0cMlVUOzCwIkIAa0HA'+
					'M5lYPrw8K4XD7oHALknIOiysN2TkL02MMOSgpxJO6sHAM2zqOXY1vbh4OKjoNrIwMUNBsJJP6oGAIQJAb'+
					'EIAP///////yH5BAEAAB8ALAAAAAAhABQAAAX/4CeOZGmeaKqubOtWGBVpdG3fEVWp2KxlAGAwQwQMiUg'+
					'NBtX7ZTrQDgOBmECn1WgnI6GYKrPnoqDtIMrnDsQQ1exIlJ85wNYyyveOwBPdREoRTwgDFgoPHQQGBgQd'+
					'CRcODwsPBhd8HRsbEiVyHQsXFQMBCgQPHqEeDgEXFgEWfAiYCyVEUXQdAwUCBB4ColAeCR0Fr5gcJRJat'+
					'gkeFg68th28t8QcsiQaUGe2BocDz3UKAY18ExscmiQRl1Z7DxcKDoUB0MsGCh6w5n8kFRKYEwgKJJhQgE'+
					'CDAQMaQIgygMACAcUkvIGTAZPFfwjuYLxDxdw5LycoSOBAsiSHAyhLFqI8YLKLCjAjTcqcKSHCRBc4c+o'+
					'0EQIAOw==';
				userLevelImg.parentNode.insertBefore(tardTag, userLevelImg.nextSibling);
			}
		}
	}
	var allImages = document.getElementsByTagName('img');
	for (i=0; i < allImages.length; i++) 
		if(allImages[i].width > maxImgSize) 
			allImages[i].width = maxImgSize;
}

