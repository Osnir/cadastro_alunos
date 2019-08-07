/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"ovly/cadastro_alunos69/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"ovly/cadastro_alunos69/test/integration/pages/View1",
	"ovly/cadastro_alunos69/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "ovly.cadastro_alunos69.view.",
		autoWait: true
	});
});