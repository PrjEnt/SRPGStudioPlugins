; (function() {

	SRSFramework.patchFunction('ScriptCall_Initialize', function(startupInfo) { // initialize engine
		data.event.execHandler('initialize', startupInfo);
		return this.callOriginal(startupInfo);
	});

	SRSFramework.patchFunction('ScriptCall_Setup', function() { // open game window
		data.event.execHandler('setup');
		return this.callOriginal();
	});

	SRSFramework.patchFunction('ScriptCall_Backup', function() { //
		data.event.execHandler('backup');
		return this.callOriginal();
	});

	SRSFramework.patchFunction('ScriptCall_Retry', function(customObject) {
		data.event.execHandler('retry', customObject);
		return this.callOriginal(customObject);
	});

	SRSFramework.patchFunction('ScriptCall_Reset', function() { // game reset
		data.event.execHandler('reset');
		data.event.execHandler('reload');
		return this.callOriginal();
	});

	SRSFramework.patchFunction('ScriptCall_Load', function() { // load savegame
		data.event.execHandler('load');
		data.event.execHandler('reload');
		return this.callOriginal();
	});

	SRSFramework.patchFunction('ScriptCall_Enter', function(sceneType, commandType) { // New scene, start event command
		data.event.execHandler('enter', { sceneType: sceneType, commandType: commandType } );
		return this.callOriginal(sceneType, commandType);
	});

	SRSFramework.patchFunction('ScriptCall_CheckInput', function(reason) {
		data.event.execHandler('checkinput', reason);
		return this.callOriginal(reason);
	});

	SRSFramework.patchFunction('ScriptCall_DebugAction', function() {
		data.event.execHandler('debugaction');
		return this.callOriginal();
	});

	SRSFramework.patchFunction('ScriptCall_CheckDebugAction', function() {
		data.event.execHandler('checkdebugaction');
		return this.callOriginal();
	});

	SRSFramework.patchFunction('ScriptCall_EraseMessage', function(value) {
		data.event.execHandler('erasemessage', value);
		return this.callOriginal(value);
	});

	SRSFramework.patchFunction('ScriptCall_AppearEventUnit', function(unit) {
		data.event.execHandler('appeareventunit', unit);
		return this.callOriginal(unit);
	});

	SRSFramework.patchFunction('ScriptCall_NewCustomRenderer', function(unit) {
		data.event.execHandler('newcustomrenderer', unit);
		return this.callOriginal(unit);
	});

	SRSFramework.patchFunction('ScriptCall_GetWeapon', function(unit) {
		data.event.execHandler('getweapon', unit);
		return this.callOriginal(unit);
	});

	SRSFramework.patchFunction('ScriptCall_isItemReused', function(checkerArray, item) {
		data.event.execHandler('isitemreused', { checkerArray: checkerArray, item: item });
		return this.callOriginal(checkerArray, item);
	});

	SRSFramework.patchFunction('ScriptCall_CheckItem', function(unit, item) {
		data.event.execHandler('checkitem', { unit: unit, item: item });
		return this.callOriginal(unit, item);
	});

	SRSFramework.patchFunction('ScriptCall_GetUnitAttackRange', function(unit) {
		data.event.execHandler('getunitattackrange', unit);
		return this.callOriginal(unit);
	});

	SRSFramework.patchFunction('ScriptCall_GetSimulationFilterFlag', function(unit) {
		data.event.execHandler('getsimulationfilterflag', unit);
		return this.callOriginal(unit);
	});

	SRSFramework.patchFunction('ScriptCall_GetMoveCostArray', function(unit) {
		data.event.execHandler('getmovecostarray', unit);
		return this.callOriginal(unit);
	});

	SRSFramework.patchFunction('ScriptCall_GetUnitMoveCource', function(unit, xGoal, yGoal) {
		data.event.execHandler('getunitmovecource', { unit: unit, xGoal: xGoal, yGoal: yGoal });
		return this.callOriginal(unit, xGoal, yGoal);
	});

	SRSFramework.patchFunction('ScriptCall_TurnEnd', function() {
		data.event.execHandler('turnend');
		return this.callOriginal();
	});

	SRSFramework.patchFunction('ScriptCall_DisableTurnSkip', function() {
		data.event.execHandler('disableturnskip');
		return this.callOriginal();
	});

	SRSFramework.patchFunction('ScriptCall_CheckGameAcceleration', function() {
		data.event.execHandler('checkgameacceleration');
		return this.callOriginal();
	});


	//Hook 'ScriptCall_Draw' directly to minimize impact on speed
	var SCD = global.ScriptCall_Draw;
	global.ScriptCall_Draw = function(sceneType, layerNumber, commandType) {
		data.event.execHandler('requestAnimationFrame ');
		return SCD(sceneType, layerNumber, commandType);
	};

	//Hook 'ScriptCall_Move' directly to minimize impact on speed
	var SCM = global.ScriptCall_Move;
	global.ScriptCall_Move = function(sceneType, commandType) {
		data.frameCounter++;
		return SCM(sceneType, commandType);
	};


})();
