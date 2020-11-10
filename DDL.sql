CREATE TABLE Usuario(
    idUsuario INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tipo VARCHAR2(10) DEFAULT 'user',
    Confirmacion VARCHAR2(5) DEFAULT 'no',
    nombre VARCHAR2(50),
    apellido VARCHAR2(50),
    correo VARCHAR2(50),
    pass VARCHAR2(200),
    pais VARCHAR2(50),
    foto VARCHAR2(50),
    creditos INTEGER DEFAULT 10000
);

ALTER TABLE usuario ADD  creditos DECIMAL(7,2) default 10000.00;

CREATE TABLE Categoria(
    idcategoria INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombrecategoria VARCHAR2(100)
);


CREATE TABLE Producto(
    idProducto INTEGER  GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombreproducto VARCHAR2(100),
    detalle VARCHAR2(200),
    palabras VARCHAR2(200),
    precio DECIMAL(7,2),
    idusuario INTEGER REFERENCES Usuario(idusuario),
    idcategoria INTEGER REFERENCES Categoria(idcategoria),
    estado VARCHAR(10) DEFAULT 'publicada',
    fotoproducto VARCHAR(100) 
);

ALTER TABLE Producto ADD estado VARCHAR(10) DEFAULT 'publicada';
ALTER TABLE Producto ADD fotoproducto VARCHAR(100);

CREATE TABLE Bitacora(
    idBitacora INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    contenido VARCHAR2(250),
    fecha DATE DEFAULT SYSDATE,
    idusuario INTEGER REFERENCES Usuario(idusuario)
);

CREATE TABLE Comentario(
    idComentario INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    contenido VARCHAR2(250),
    fecha DATE DEFAULT SYSDATE,
    idusuario INTEGER REFERENCES Usuario(idusuario),
    idproducto INTEGER REFERENCES Producto(idproducto)
);

CREATE TABLE Denuncia(
    idDenuncia INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    contenido VARCHAR2(250),
    estado VARCHAR2(10) DEFAULT 'revisar' ,
    idusuario INTEGER REFERENCES Usuario(idusuario),
    idproducto INTEGER REFERENCES Producto(idproducto),
    fecha DATE DEFAULT SYSDATE
);

ALTER TABLE Denuncia ADD fecha  DATE DEFAULT SYSDATE;


CREATE TABLE Carrito(
    idCarrito INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    estado VARCHAR2(20) DEFAULT 'espera',
    idusuario INTEGER  REFERENCES Usuario(idusuario),
    idproducto INTEGER REFERENCES Producto(idproducto)
);


CREATE TABLE Chat(
    idChat INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cliente INTEGER REFERENCES Usuario(idusuario),
    vendedor INTEGER REFERENCES Usuario(idusuario)
);

CREATE TABLE Mensaje(
    idMensaje INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    texto VARCHAR2(250),
    idusuario INTEGER REFERENCES Usuario(idusuario),
    idchat INTEGER REFERENCES Chat(idchat)
);


INSERT INTO Usuario(tipo,confirmacion,nombre,apellido,correo,pass,pais) 
VALUES('admin','si','administrador','administrador','fervzacarias@gmail.com','21232f297a57a5a743894a0e4a801fc3','Guatemala');



COMMIT

select * from producto
