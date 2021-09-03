module.exports = {
    URL: process.env.BASE_URL || 'http://localhost:3000/#',
    PORT: process.env.NODE_PORT || 3000,
    DB: {
      TYPE: 'mysql',
      USERNAME: 'root',
      PSW_KEY: '1234',
      HOST: '127.0.0.1',
      NAME: 'compras',
      PORT: 3306,
      SYNC: false,
      LOG: true,
      PREFIX: 'CC'
    }
  };