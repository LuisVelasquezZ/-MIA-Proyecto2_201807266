CREATE TABLE Usuario(
    idUsuario INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tipo VARCHAR2(10) DEFAULT 'user',
    Confirmacion VARCHAR2(5) DEFAULT 'no',
    nombre VARCHAR2(50),
    apellido VARCHAR2(50),
    correo VARCHAR2(50),
    pass VARCHAR2(200),
    pais VARCHAR2(50),
    foto VARCHAR2(50)
);

INSERT INTO Usuario(tipo,confirmacion,nombre,apellido,correo,pass,pais) 
VALUES('admin','si','administrador','administrador','fervzacarias@gmail.com','21232f297a57a5a743894a0e4a801fc3','Guatemala');

select * from usuario

COMMIT

select * from usuario where correo = 'fervzacarias@gmail.com' and pass = '21232f297a57a5a743894a0e4a801fc3'