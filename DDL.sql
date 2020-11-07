CREATE TABLE Usuario(
    idUsuario NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tipo VARCHAR2(10),
    Confirmacion VARCHAR2(5),
    nombre VARCHAR2(50),
    apellido VARCHAR2(50),
    correor VARCHAR2(50),
    pass VARCHAR2(200),
    pais VARCHAR2(50),
    foto VARCHAR2(50)
);

INSERT INTO Usuario(tipo,confirmacion,nombre,apellido,correor,pass,pais) 
VALUES('admin','confirmado','administrador','21232f297a57a5a743894a0e4a801fc3');
