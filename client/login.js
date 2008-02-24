/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

function md5(s) { 
	
	var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
	var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */
	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	 
	function core_md5(x, len)
	{
	  /* append padding */
	  x[len >> 5] |= 0x80 << ((len) % 32);
	  x[(((len + 64) >>> 9) << 4) + 14] = len;
	
	  var a =  1732584193;
	  var b = -271733879;
	  var c = -1732584194;
	  var d =  271733878;
	
	  for(var i = 0; i < x.length; i += 16)
	  {
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;
	
		a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
		d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
		c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
		b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
		a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
		d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
		c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
		b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
		a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
		d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
		c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
		b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
		a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
		d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
		c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
		b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
	
		a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
		d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
		c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
		b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
		a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
		d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
		c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
		b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
		a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
		d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
		c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
		b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
		a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
		d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
		c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
		b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
	
		a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
		d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
		c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
		b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
		a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
		d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
		c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
		b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
		a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
		d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
		c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
		b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
		a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
		d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
		c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
		b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
	
		a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
		d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
		c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
		b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
		a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
		d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
		c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
		b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
		a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
		d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
		c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
		b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
		a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
		d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
		c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
		b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
	
		a = safe_add(a, olda);
		b = safe_add(b, oldb);
		c = safe_add(c, oldc);
		d = safe_add(d, oldd);
	  }
	  return Array(a, b, c, d);
	
	}
	
	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t)
	{
	  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t)
	{
	  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t)
	{
	  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}
	
	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y)
	{
	  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return (msw << 16) | (lsw & 0xFFFF);
	}
	
	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt)
	{
	  return (num << cnt) | (num >>> (32 - cnt));
	}
	
	/*
	 * Convert a string to an array of little-endian words
	 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
	 */
	function str2binl(str)
	{
	  var bin = Array();
	  var mask = (1 << chrsz) - 1;
	  for(var i = 0; i < str.length * chrsz; i += chrsz)
		bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
	  return bin;
	}
	
	/*
	 * Convert an array of little-endian words to a hex string.
	 */
	function binl2hex(binarray)
	{
	  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
	  var str = "";
	  for(var i = 0; i < binarray.length * 4; i++)
	  {
		str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
			   hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
	  }
	  return str;
	}
	
	// Actually do stuff.
	return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}

// -------------------------------------------------------------------------------
// Above license ends here.
// -------------------------------------------------------------------------------

/* Copyright (c) 2008, Katharine Berry
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Katharine Berry nor the names of any contributors
 *       may be used to endorse or promote products derived from this software
 *       without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY KATHARINE BERRY ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL KATHARINE BERRY BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 ******************************************************************************/

var submitexpected = false;
var SUPPORTED_LANGUAGES = {
	en: 'English',
	he: 'Hebrew (עברית)',
	ja: 'Japanese',
	pt_br: 'Portuguese (Brazil)'
};

// Restores the login screen to its standard state.
function revertscreen()
{
	$(document.body).setStyle({backgroundColor: 'black', color: 'white'});
	if(window.parent && window.parent.document && window.parent.document.getElementById)
	{
		window.parent.document.getElementById('frameset').rows = '*,60';
		var node = window.parent.document.getElementById('loginpage');
		if(node && node.parentNode)
		{
			node.parentNode.insertBefore(node,window.parent.document.getElementById('loginform'));
		}
	}
}

// If not in a frameset, go to the index page, unless we're expecting to be standalone.
if(!window.parent.document.getElementsByTagName('frameset').length && location.search != '?noframes=1')
{
	location.replace('index.html');
}

function initui()
{
	AjaxLife.Debug("login: Switching visible screen.");
	$('loginscreen').hide();
	$('uiscreen').show();
	var wait = Ext.Msg.wait("Loading session data...");
	var link = new Ext.data.Connection({timeout: 30000});
	link.request({
		url: "details.kat",
		method: "POST",
		params: {
			sid: gSessionID
		},
		callback: function(options, success, response) {
			response = response.responseText;
			AjaxLife.Debug("login: sessiondata: "+response);
			wait.hide();
			wait = false;
			if(!success)
			{
				Ext.Msg.alert("Loading session data failed.");
				return;
			}
			var data = Ext.util.JSON.decode(response);
			gRegionCoords = data.RegionCoords;
			gRegion = data.Region;
			gPosition = data.Position;
			gMOTD = data.MOTD;
			gUserName = data.UserName;
			gAgentID = data.AgentID;
			gInventoryRoot = data.InventoryRoot;
			AjaxLife.Debug("login: Extracted session data.");
			gLanguageCode = $('lang').getValue();
			AjaxLife.Debug("login: Checking for login screen frame...");
			if(window.parent && window.parent.document && window.parent.document.getElementById)
			{
				var node = window.parent.document.getElementById('loginpage');
				if(node && node.parentNode)
				{
					AjaxLife.Debug('login: Removing login screen...');
					node.parentNode.removeChild(node);
				}
			}
			AjaxLife.Debug("login: Running AjaxLife init...");
			AjaxLife.Startup();
		}
	});
}

// This function deals with logging in.
function handlelogin()
{
	$('first').disable();
	$('last').disable();
	$('password').disable();
	$('btn_login').disable();
	// If we have a parent, set this frame to be the whole screen.
	if(window.parent && window.parent.document && window.parent.document.getElementById)
	{
		var node = window.parent.document.getElementById('loginpage');
		if(node && node.parentNode)
		{
			node.parentNode.appendChild(node);
			window.parent.document.getElementById('frameset').rows = '*,0';
		}
	}
	// Change the background, in order to make the progress look right.
	$(document.body).setStyle({backgroundColor: 'white', color: 'black'});
	// We do this to avoid an odd bug. Eh.
	setTimeout(function() {
		// Make a fuss if this isn't an LL grid
		if(!$('grid').getValue().endsWith('(Linden Lab)'))
		{
			if(!confirm("You are about to send data to a login server that is NOT owned by Linden Lab.\n"+
				"The login info will be passed on UNENCRYPTED.\n\n"+
				"DO NOT USE your Second Life account to log into this grid.\n"+
				"If you are using an account specifically for "+$('grid').getValue()+", it is safe to proceed.\n"+
				"Do you wish to continue?"))
			{
				revertscreen();
				return false;
			}
			
		}
		// Put up a nice waiting dialog.
		var hanging = Ext.Msg.wait("Encrypting login details...");
		var logindetails = Encrypt();
		hanging.updateText("Logging in to Second Life...");
		// Send the request and wait up to two minutes for a response.
		// Pass on all data, and wait for the response.
		var link = new Ext.data.Connection({timeout: 120000});
		link.request({
			url: "connect.kat",
			method: "POST",
			params: {
				logindata: logindetails,
				grid: $('grid').getValue(),
				session: gSessionID
			},
			// If the request was successful, submit the form containing the sessionid to the UI page.
			// Otherwise show the error.
			callback: function(options, success, response) {
				hanging.hide();
				hanging = false;
				if(success)
				{
					try
					{
						var response = Ext.util.JSON.decode(response.responseText);
						if(response.success)
						{
							initui();
						}
						else
						{
							Ext.Msg.alert("Error",response.message.escapeHTML(),revertscreen);
						}
					}
					catch(e)
					{
						Ext.Msg.alert("Server Error","A C# Exception was caught:<pre>"+response.responseText.escapeHTML()+"</pre>",revertscreen);
					}
				}
				else
				{
					Ext.Msg.alert("Error","Despite our best efforts, something has gone wrong.<br /><br />Blah blah blah. Please try again later.",revertscreen);
				}
				$('first').enable();
				$('last').enable();
				$('password').enable();
				$('btn_login').enable();
			}
		});
	}, 100);
}

function base64encode(str) {

	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var base64DecodeChars = new Array(
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
	52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
	-1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
	15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
	-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
	41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
	var out, i, len;
	var c1, c2, c3;

	len = str.length;
	i = 0;
	out = "";
	while(i < len) {
	c1 = str.charCodeAt(i++) & 0xff;
	if(i == len)
	{
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt((c1 & 0x3) << 4);
		out += "==";
		break;
	}
	c2 = str.charCodeAt(i++);
	if(i == len)
	{
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
		out += base64EncodeChars.charAt((c2 & 0xF) << 2);
		out += "=";
		break;
	}
	c3 = str.charCodeAt(i++);
	out += base64EncodeChars.charAt(c1 >> 2);
	out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
	out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
	out += base64EncodeChars.charAt(c3 & 0x3F);
	}
	return out;
}

function Encrypt()
{
	setMaxDigits(131);
	key = new RSAKeyPair(RSA_EXPONENT, "", RSA_MODULUS);
	encrypted = encryptedString(key, CHALLENGE + "\\" 
				+ base64encode(Ext.get('first').dom.value) + "\\" 
				+ base64encode(Ext.get('last').dom.value) + "\\"
				+ base64encode('$1$'+md5(Ext.get('password').dom.value)));
	return encrypted;
}

// When we're ready, set up the login handler and disable the default login action.
// Place the cursor in the First Name box.
Ext.onReady(function() {
	// Login button handler
	Ext.get('btn_login').on('click',handlelogin);
	
	var ret = function(event) {
		if(event.keyCode == 13 || event.which == 13)
		{
			handlelogin();
		}
	};
	
	// Handle hitting return.
	Ext.get('first').addListener('keyup', ret);
	Ext.get('last').addListener('keyup', ret);
	Ext.get('password').addListener('keyup', ret);

	// Handle form submission.
	$('form_login').onsubmit = function(e) {
		if (e && e.preventDefault) e.preventDefault();
		else if (window.event && window.event.returnValue)
		window.eventReturnValue = false;
		handlelogin();
		return false;
	};
	
	if($('lang')) // Don't do any of this if #lang doesn't exist.
	{
		var options = [];
		var lang = navigator.language?navigator.language:navigator.browserLanguage;
		try
		{
			if(!lang || !lang.gsub)
			{
				lang = 'en';
			}
			else
			{
				lang = lang.gsub('-','_');
			}
			if(!SUPPORTED_LANGUAGES[lang])
			{
				if(!SUPPORTED_LANGUAGES[lang.substr(0,2)])
				{
					lang = 'en';
				}
				else
				{
					lang = lang.substr(0,2);
				}
			}
		}
		catch(e)
		{
			lang = 'en';
		}
		$('lang').childElements().invoke('remove'); // Remove anything currently in it.
		for(var i in SUPPORTED_LANGUAGES)
		{
			var opt = document.createElement('option');
			opt.appendChild(document.createTextNode(SUPPORTED_LANGUAGES[i]));
			opt.value = i;
			if(i == lang)
			{
				opt.selected = 'selected'; // Select it if it's our language.
			}
			$('lang').appendChild(opt);
		}
	}
	
	$('first').activate();
});