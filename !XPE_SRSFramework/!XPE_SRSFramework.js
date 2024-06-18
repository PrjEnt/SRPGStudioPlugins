// SRPG Studio Plugin Framework
//	(C)2024 Project Entertainments*
//	http://xprj.net/
// SPDX-License-Identifier: Undefined
; (function(global, undefined) {

	if(typeof global.SRSFramework === "object") {
		throw new Error("\n\nSRPG Studio Plugin Framework: Already loaded.");
	}

	var SRSLibInfo = {
		ID: "SRSFramework",
		AppCode: "RPFRW:X:A:A:20240505001",
		Description: "JScript Framework for SRPG Studio Plugin",
		Copyrights: "(C)2024 Project Entertainments",
		URL: "http://xprj.net/",
		Commit: 1
	};

	var blankFunc = function() {};

	//Private data
	var data = {
		frameCounter: 0,

		Commit: 1
	};

	var SRSFramework = {

		startMicroTask: function(func) {
			var a = arguments;
			var XHR = new ActiveXObject("Microsoft.XMLHTTP");
			XHR.onreadystatechange = function() {
				if(XHR.readyState == 4) {
					func.apply(global, a);
				}
			};
			XHR.open("GET", "http://0.0.0.0/", true);
			XHR.send();
		},

		patchFunction: function(patchTo, f) {
			var pObj = global;
			var pFunc = function() {};
			var pName = 'unknown';

			switch(typeof patchTo) {
				case 'string':
					var R = XFramework.object.getEx(patchTo);
					pObj = R.parent;
					pFunc = R.object;
					pName = R.name;
					break;

				default:
					throw new Error("Cannot patch '" + (typeof patchTo) + "' types");
			}

			var patcher = new blankFunc();

			patcher.f = f;
			patcher.pObj = pObj;
			patcher.pFunc = pFunc;

			if(!pFunc) {
				throw new Error("Failed to patch '" + pName + "'");
			}

			patcher.callOriginal = function() {
				return patcher.pFunc.apply(patcher.pThis, arguments);
			};

			pObj[pName] = function() {
				patcher.pThis = this;
				return patcher.f.apply(patcher, arguments);
			};
		},

		addEventListener: function(event, func) { return data.event.addHandler(event, func); },

		addEventListenerOnce: function(event, func) { return data.event.addHandlerOnce(event, func); },

		removeEventListener: function(event, func) { return data.event.removeHandler(event, func); },

		Commit: 1
	};

	//Very limited setTimeout implementation for XFramework.Async (It will override)
	global.setTimeout = function(code, delay) {
		if(delay != 0) { throw new Error('This setTimeout() support delay is only 0 ms!'); }
		SRSFramework.startMicroTask(code);
	};

	//requestAnimationFrame
	global.requestAnimationFrame = function(callback) { data.event.addHandlerOnce('requestAnimationFrame ', callback); };
	global.cancelAnimationFrame = function(requestID) { data.event.removeHandler('requestAnimationFrame ', requestID); };

	//XFramework (ES3)
	#include "XFramework_Helper.js";
	XFramework_Support.registerGlobal({ force: true });

	//Console override
	global.console.write = function(s) {
		try {
			root.log(s);
		} catch(e) {
			XFramework_Support.console.logs.push(s);
		}
	};
	global.console.clear = function() { root.resetConsole(); };

	#include "XFramework.js";
	#include "XFramework.ASync.js";
	#include "XFramework.Event.js";

	//Hook game event
	data.event = new XFramework.Event();
	#include "SRSFramework_Hook.js";

	//Register to global
	global.SRSFramework = SRSFramework;

	//log in early startup
	console.group(SRSLibInfo.Description);
	console.log(SRSLibInfo.Copyrights);
	console.log(SRSLibInfo.URL);
	console.groupEnd();

	SRSFramework.startMicroTask(function() {
		for(var i = 0; i < XFramework_Support.console.logs.length; i++) {
			try {
				root.log(XFramework_Support.console.logs[i]);
			} catch(e) {}
		}
		XFramework_Support.console.logs = [];
	});

})((function() { if(typeof globalThis !== "undefined") { return globalThis; } return (new Function("return this;")()); })());
