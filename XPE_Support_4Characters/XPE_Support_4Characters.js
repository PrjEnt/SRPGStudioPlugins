// XPE_Support_4Characters
//	立ち絵を4人以上表示可能にする
//	(C)2024 Project Entertainments*, Hikaru Kurosaki
//	http://xprj.net/
// SPDX-License-Identifier: Undefined
; (function(global, undefined) {

	//Private data
	var data = {
		currentLayoutUnits: 3,
		prevLayoutUnits: 3,
		unitId: [],
		extraFaceViews: [],
		activeFlag: [],
		Commit: 1
	};

	var XPE_Support_Unit4 = XFramework.defineClass(null, {
		constructor: function() {},

		Commit: 1
	}, {
		constructor: function() {},

		enable: function(unitId, pos) {
			console.info('XPE_Support_Unit4:', 'Enable unit4 UI for', unitId);
			data.prevLayoutUnits = data.currentLayoutUnits;
			this.changeIllustLayout(4);
			data.activeFlag[0] = true;
			data.unitId[0] = unitId;
		},

		disable: function() {
			console.info('XPE_Support_Unit4:', 'Disable unit4 UI');
			this.changeIllustLayout(data.prevLayoutUnits);
			data.unitId[0] = null;
		},

		erase: function(pos) {
			var pos = parseInt(pos) || 0;
			if(data.extraFaceViews[pos]) {
				data.extraFaceViews[pos].endMessageView();
				data.extraFaceViews[pos] = null;
			}
			return pos;
		},

		changeIllustLayout: function(maxUnits) {
			data.currentLayoutUnits = parseInt(maxUnits) || 3;
			console.info('XPE_Support_Unit4:', 'Change illust layout mode to', data.currentLayoutUnits);
		},

		Commit: 1
	});

	SRSFramework.patchFunction("FaceView.setupMessageView", function(messageViewParam){
		if(messageViewParam.unit.getName() == data.unitId[0]) {
			messageViewParam.pos = Private.MessagePoxExtra[0];
			data.extraFaceViews[0] = createObject(FaceViewBottom);
			messageViewParam.messageLayout = root.getBaseData().getMessageLayoutList().getData(MessageLayout.BOTTOM);
			data.extraFaceViews[0].setupMessageView(messageViewParam);
			this.pThis._activePos = Private.MessagePoxExtra[0];

			data.activeFlag[0] = true;
			return;
		} else {
			if(messageViewParam.pos === MessagePos.BOTTOM){
				//XPE_Support_Unit4.erase(0);
				data.activeFlag[0] = false;
			}
		}

		return this.callOriginal(messageViewParam);
	});

	SRSFramework.patchFunction("FaceView._drawFaceViewCharIllust", function(isTopActive, isCenterActive, isBottomActive){
		if(data.extraFaceViews[0]) {
			data.extraFaceViews[0].drawCharIllust(data.activeFlag[0]);
		}
		return this.callOriginal(isTopActive, isCenterActive, isBottomActive);
	});

	SRSFramework.patchFunction("BaseMessageView.getIllustPos", function(image){
		var n = -1;

		var type = this.pThis._messageLayout.getCharIllustVisualType();
		switch(type){
			case CharIllustVisualType.LEFT: n = 0; break;
			case CharIllustVisualType.CENTER: n = 1; break;
			case CharIllustVisualType.RIGHT: n = 2; break;
		}

		if(this.pThis._name == data.unitId[0]) {
			n = 3;
		}

		var x, y;
		x = Math.floor(root.getGameAreaWidth() / data.currentLayoutUnits) * (data.currentLayoutUnits - n);
		x -= Math.floor(root.getGameAreaWidth() / data.currentLayoutUnits) / 2;
		x -= Math.floor(image.getWidth() / 2);

		y = this.pThis.getIllustY(image);

		return createPos(x, y);
	});

	SRSFramework.patchFunction("FaceView.eraseMessage", function(flag){
		if(flag == MessageEraseFlag.ALL){
			XPE_Support_Unit4.erase(0);
		}
		return this.callOriginal(flag);
	});

	SRSFramework.patchFunction("FaceView.drawMessageView", function() {
		var R = this.callOriginal();

		if(data.extraFaceViews[0] && data.activeFlag[0]) {
			data.extraFaceViews[0].drawMessageView((this.pThis._activePos == Private.MessagePoxExtra[0]), data.extraFaceViews[0].getMessagePos());
		}
		return R;
	});

	SRSFramework.patchFunction("BaseMessageView.getMessagePos", function() {
		if(this.pThis._activePos === Private.MessagePoxExtra[0]) {
			return this.pThis.getMessageBottomPos();
		}

		return this.callOriginal();
	});

	SRSFramework.patchFunction("FaceView.moveMessageView", function() {
		var result = MoveResult.CONTINUE;


		if(this.pThis._activePos === Private.MessagePoxExtra[0]) {
			result = data.extraFaceViews[0].moveMessageView();
			return result;
		}
		return this.callOriginal();
	});

	var Private = {
		MessagePoxExtra: [10000],

		Commit: 1
	};

	//Register to global
	global.XPE_Support_Unit4 = XPE_Support_Unit4;

	//Shortcuts
	global.PEUnit4Change = XPE_Support_Unit4.changeIllustLayout.bind(XPE_Support_Unit4);
	global.PEUnit4Enable = XPE_Support_Unit4.enable.bind(XPE_Support_Unit4);
	global.PEUnit4Disable = XPE_Support_Unit4.disable.bind(XPE_Support_Unit4);
	global.PEUnit4Change = XPE_Support_Unit4.erase.bind(XPE_Support_Unit4);


})((function() { if(typeof globalThis !== "undefined") { return globalThis; } return (new Function("return this;")()); })());
