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

CREATE TABLE public.Publishers (
	id uuid NOT NULL PRIMARY KEY default gen_random_uuid(),
	publisher varchar(80) NOT NULL,
	created_at timestamptz default now(),
	updated_at timestamptz,
	deleted_at timestamptz
);

CREATE TABLE public.Writers (
	id uuid NOT NULL PRIMARY KEY default gen_random_uuid(),
	writer varchar(80) NOT NULL,
	created_at timestamptz default now(),
	updated_at timestamptz,
	deleted_at timestamptz
);

CREATE TABLE public.Book_conditions (
	id uuid NOT NULL PRIMARY KEY default gen_random_uuid(),
	condition varchar(80) NOT NULL,
	created_at timestamptz default now(),
	updated_at timestamptz,
	deleted_at timestamptz
);

CREATE TABLE public.Categories (
	id uuid NOT NULL PRIMARY KEY default gen_random_uuid(),
	category varchar(80) NOT NULL,
	created_at timestamptz default now(),
	updated_at timestamptz,
	deleted_at timestamptz
);

CREATE TABLE public.Images (
	id uuid NOT NULL PRIMARY KEY default gen_random_uuid(),
	file_name varchar(80) NOT NULL,
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
	publisher_id uuid NOT NULL,
    FOREIGN KEY (publisher_id) REFERENCES Publishers(id),
	writer_id uuid NOT NULL,
    FOREIGN KEY (writer_id) REFERENCES Writers(id),
	condition_id uuid NOT NULL,
    FOREIGN KEY (condition_id) REFERENCES Book_conditions(id),
	category_id uuid NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Categories(id),
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
INSERT INTO Book_conditions(condition) VALUES('antigo'), ('novo'), ('seminovo');