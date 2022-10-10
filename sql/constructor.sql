--- Criação do Banco de Dados
CREATE DATABASE Tunel_do_Saber;

---Criação das tabelas no Schema public
CREATE TABLE public.User_classes (
	id uuid NOT NULL PRIMARY KEY default gen_random_uuid(),
	class varchar(80) NOT NULL,
	created_at timestamptz default now(),
	updated_at timestamptz,
	deleted_at timestamptz
);

CREATE TABLE public.Images (
	id uuid NOT NULL PRIMARY KEY default gen_random_uuid(),
	file_name TEXT NOT NULL,
	file_path TEXT NOT NULL,
	added_at timestamptz default now(),
	deleted_at timestamptz
);

CREATE TABLE public.User_profile (
	id uuid NOT NULL PRIMARY KEY default gen_random_uuid(),
	name varchar(80) NOT NULL,
	description varchar(80),
    image_id uuid NOT NULL,
    FOREIGN KEY (image_id) REFERENCES Images(id),
	class_id uuid NOT NULL,
    FOREIGN KEY (class_id) REFERENCES User_classes(id),
	email varchar(80) NOT NULL,
	telephone varchar(11),
	password varchar(80) NOT NULL,
	approved boolean,
	created_at timestamptz default now(),
	updated_at timestamptz,
	deleted_at timestamptz
);

CREATE TABLE public.Book (
	id uuid NOT NULL PRIMARY KEY default gen_random_uuid(),
	name varchar(80) NOT NULL,
	details TEXT NOT NULL,
	user_id uuid NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User_profile(id),
	publisher varchar(80) NOT NULL,
	writer varchar(80) NOT NULL,
	condition varchar(80) NOT NULL,
	category varchar(80) NOT NULL,
	synopsis TEXT NOT NULL,
	approved boolean,
	created_at timestamptz default now(),
	updated_at timestamptz,
	deleted_at timestamptz
);

CREATE TABLE public.Exchanges (
	id uuid NOT NULL PRIMARY KEY default gen_random_uuid(),
	new_owner_id uuid NOT NULL,
    FOREIGN KEY (new_owner_id) REFERENCES User_profile(id),
	book_id uuid NOT NULL,
    FOREIGN KEY (book_id) REFERENCES Book(id),
	requested_at timestamptz,
	accepted_at timestamptz,
	rejected_at timestamptz,
	concluded_at timestamptz,
	deleted_at timestamptz
);

CREATE TABLE public.Book_images (
	book_id uuid NOT NULL,
    FOREIGN KEY (book_id) REFERENCES Book(id),
	image_id uuid NOT NULL,
    FOREIGN KEY (image_id) REFERENCES Images(id),
	CONSTRAINT book_images_pk PRIMARY KEY (book_id,image_id)
);

--default values
INSERT INTO User_classes(class) VALUES('cliente'), ('administrador');

--após criar um usuário inicial, utilize esse comando para torná-lo o primeiro administrador
UPDATE user_profile SET class_id = 'id da classe administrador', approved = true, updated_at = now() WHERE id = 'id do usuário'
-- feito isso, transfira a imagem do administrador para a pasta approved e faça login pela interface para receber o token de administrador :)