sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, JSONModel, MessageToast, MessageBox) {
	"use strict";
	
	return Controller.extend("ovly.cadastro_alunos69.controller.View1", {
		
		onInit: function () {
			var oAluno = { nome: "", sobrenome: "" };
			
			var oAlunoModel = new JSONModel(oAluno);
			this.getView().setModel(oAlunoModel, "aluno");
		},
		
		inserirAluno: function (oEvent) {
			var oDataModel  = this.getView().getModel();
			var oAlunoModel = this.getView().getModel("aluno");
			
			var mParameters = {
				success: function(data, response) {
					oAlunoModel.setProperty("/nome", "");
					oAlunoModel.setProperty("/sobrenome", "");
					MessageToast.show("Operação realizada com sucesso!");
				},
				error: function(error) {
					var oError = JSON.parse(error.responseText);
					var sMensagem = oError.error.message.value;
					MessageBox.show(sMensagem);
				}
			};
			
			var sFisrtName = this.byId("input_firstName").getValue();
			var sLastName  = oAlunoModel.getProperty("/sobrenome");
			var oAluno     = { FirstName: sFisrtName, LastName: sLastName };
			
			var oAlunoItem = this.byId("list").getSelectedItem();
			
			if (oAlunoItem) {
				var sPath = oAlunoItem.getBindingContext().getPath();
				oDataModel.update(sPath, oAluno, mParameters);
			} else {
				oDataModel.create("/Students", oAluno, mParameters);
			}
		},

		deletarAluno: function (oEvent) {
			var oAlunoItem = this.byId("list").getSelectedItem();
			
			if (!oAlunoItem) {
				MessageBox.show("Selecione um aluno");
				return;
			}
			
			var oDataModel = this.getView().getModel();
			
			var fnCallbackMessageBox = function(sResult) {
				if (sResult === MessageBox.Action.YES) {
					var oAlunoContext = oAlunoItem.getBindingContext();
					var sPath = oAlunoContext.getPath();
					
					var mParameters = {
						success: function() {
							MessageToast.show("Aluno excluído");
						},
						error: function(error) {
							var oError = JSON.parse(error.responseText);
							var sMensagem = oError.error.message.value;
							MessageBox.show(sMensagem);
						}
					};
					
					oDataModel.remove(sPath, mParameters);
				}
			};
			
			MessageBox.show("Confirma a exclusão do registro?", {
				icon: MessageBox.Icon.QUESTION,
				title: "Excluir",
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: fnCallbackMessageBox
			});
		},
		
		selecionaAluno: function (oEvent) {
			var oItem  = oEvent.getParameter("listItem");
			var oAluno = oItem.getBindingContext().getObject();
			
			this.byId("list").setSelectedItem(oItem);
			this.byId("input_firstName").setValue(oAluno.FirstName);
			this.getView().getModel("aluno").setProperty("/sobrenome", oAluno.LastName);
		}
	});
});