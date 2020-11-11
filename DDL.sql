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
update usuario set creditos = 9950.00 where idusuario = 61;

update usuario set creditos=(select creditos from usuario where idusuario=61)-50 where idusuario=61;
commit
select * from bitacora
delete  from usuario 
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
commit
select * from producto
delete from producto where idusuario = 43
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
update comentario set idusuario = 61
commit
delete from comentario
commit
select * from comentario inner join usuario on usuario.idusuario = comentario.idusuario where comentario.idproducto= 1;

CREATE TABLE Denuncia(
    idDenuncia INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    contenido VARCHAR2(250),
    estado VARCHAR2(10) DEFAULT 'revisar' ,
    idusuario INTEGER REFERENCES Usuario(idusuario),
    idproducto INTEGER REFERENCES Producto(idproducto),
    fecha DATE DEFAULT SYSDATE
);
select * from denuncia
ALTER TABLE Denuncia ADD fecha  DATE DEFAULT SYSDATE;
select iddenuncia, contenido, denuncia.estado, denuncia.idusuario, denuncia.idproducto, producto.nombreproducto, fecha
from denuncia  inner join producto on denuncia.idproducto = producto.idproducto
     where denuncia.estado = 'revisar'
select * from denuncia     


CREATE TABLE Carrito(
    idCarrito INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    estado VARCHAR2(20) DEFAULT 'espera',
    idusuario INTEGER  REFERENCES Usuario(idusuario),
    idproducto INTEGER REFERENCES Producto(idproducto)
);
select * from carrito
delete from carrito where idproducto = 2
commit


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

select * from usuario
select idproducto, nombreproducto, detalle, palabras, precio, idusuario, nombrecategoria,fotoproducto 
    from producto inner join categoria on producto.idcategoria = categoria.idcategoria
     where idusuario = 43 and estado = 'publicada' order by precio desc
     
/********CONSULTAS*******/
select * from carrito
select idproducto as 'idprod', nombreproducto, nombre,
(select count(idproducto) from carrito where idproducto = 21 and estado = 'confirmado') as cant
from producto

select carrito.idproducto,count(*) as cant, producto.nombreproducto, usuario.nombre from carrito 
inner join producto on carrito.idproducto = producto.idproducto
inner join usuario on producto.idusuario = usuario.idusuario 
group by carrito.idproducto, nombreproducto, nombre 
order by cant desc FETCH FIRST 5 ROWS ONLY;



select nombre,correo, creditos from usuario
order by creditos desc FETCH FIRST 10 ROWS ONLY;

select nombre,correo, creditos from usuario
order by creditos asc FETCH FIRST 10 ROWS ONLY;


select usuario.idusuario, usuario.nombre, usuario.correo, count(*) as cant
from denuncia inner join usuario on denuncia.idusuario = usuario.idusuario
group by usuario.idusuario, usuario.nombre,usuario.correo order by cant desc
FETCH FIRST 10 ROWS ONLY;

select usuario.idusuario, usuario.nombre, usuario.correo, count(*) as cant
from producto inner join usuario on producto.idusuario = usuario.idusuario
group by usuario.idusuario, usuario.nombre,usuario.correo order by cant desc
FETCH FIRST 10 ROWS ONLY;

select * from usuario
select  usuario.pais,  count(*) as cant
from producto inner join usuario on producto.idusuario = usuario.idusuario
group by usuario.pais order by cant desc
FETCH FIRST 10 ROWS ONLY;

select pais, sum(creditos) as cred,
(select  count(usuario.pais) from producto inner join usuario on producto.idusuario = usuario.idusuario
where usuario.pais = 'Guatemala' ) as cant from usuario group by pais, idusuario

/*  ultima  consulta correcta */
select  q1.pais, q1.cred, q1.us, q2.cant from
(select pais, sum(creditos) as cred, count(idusuario) as us from usuario group by pais) q1 
left join
(select pais, count(*) as cant from producto
inner join usuario on producto.idusuario = usuario.idusuario
group by pais) q2 
on q1.pais = q2.pais FETCH FIRST 10 ROWS ONLY

