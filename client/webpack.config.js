const path = require('path');

module.exports = {
  entry: {
    index: './src/js/index.js',
    registro: './src/js/registro.js',
    perfil: './src/js/perfil.js',
    main: './src/js/main.js',
    panelAdmin: './src/js/panelAdmin.js',
    gestionUsuarios: './src/js/gestionUsuarios.js',
    entregaLote: './src/js/entregaLote.js',
    paqueteEnviado: './src/js/paqueteEnviado.js',
    enviosColab: './src/js/enviosColab.js',
    clasificarLotes: './src/js/clasificarLotes.js',
    panelClasi: './src/js/panelClasi.js',
    gestComponentes: './src/js/gestComponentes.js',
    gestionEnvios: './src/js/gestionEnvios.js',
    disenador: './src/js/disenador.js',
    gestionInventario: './src/js/gestionInventario.js',
    recuperarPassword: './src/js/recuperarPassword.js',
  },
  output: {
    filename: '[name].main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  
  devServer: {
    static: path.resolve(__dirname, '../'),
    port: 8090,
    open: {
        target: '/client/src/html/index.html',
    },
    headers: {
        'Access-Control-Allow-Origin': '*',

    },
  }
}; 