function onOpen(){
   
  let ui = SpreadsheetApp.getUi();
  ui.createMenu('BANCOS')
                  .addItem('(1) Extraer información', 'extraerInformacion')
                  .addItem('(2) Dividir información', 'dividirInformacion')
                  .addToUi();

  ui.createMenu('KISSFLOW')
                  .addItem('(3) Crear item', 'sequenceKissflow')
                  .addToUi();
  
  ui.createMenu('EMAIL')
                  .addItem('(4) Enviar correo comprobantes', 'mailSequence')
                  .addToUi();
          

  
}