--- Criação do Banco de Dados
CREATE DATABASE Tunel_do_Saber;

---Criação das tabelas no Schema public
CREATE TABLE public.Class (
	id uuid NOT NULL PRIMARY KEY,
	class varchar(80) NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	deleted_at timestamptz NOT NULL
);

CREATE TABLE public.Publishers (
	id uuid NOT NULL PRIMARY KEY,
	publisher varchar(80) NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	deleted_at timestamptz NOT NULL
);

CREATE TABLE public.Writers (
	id uuid NOT NULL PRIMARY KEY,
	writer varchar(80) NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	deleted_at timestamptz NOT NULL
);

CREATE TABLE public.Book_conditions (
	id uuid NOT NULL PRIMARY KEY,
	condition varchar(80) NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	deleted_at timestamptz NOT NULL
);

CREATE TABLE public.Categories (
	id uuid NOT NULL PRIMARY KEY,
	category varchar(80) NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	deleted_at timestamptz NOT NULL
);

CREATE TABLE public.Images (
	id uuid NOT NULL PRIMARY KEY,
	file_name varchar(80) NOT NULL,
	file_path TEXT NOT NULL,
	added_at timestamptz NOT NULL,
	deleted_at timestamptz NOT NULL
);

CREATE TABLE public.User_profile (
	id uuid NOT NULL PRIMARY KEY,
	name varchar(80) NOT NULL,
    image_id uuid NOT NULL,
    FOREIGN KEY (image_id) REFERENCES Images(id),
	class_id uuid NOT NULL,
    FOREIGN KEY (class_id) REFERENCES Class(id),
	email varchar(80) NOT NULL,
	telephone varchar(11),
	password varchar(80) NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	deleted_at timestamptz NOT NULL
);

CREATE TABLE public.Book (
	id uuid NOT NULL PRIMARY KEY,
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
	sale BOOLEAN NOT NULL,
	swao BOOLEAN NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	deleted_at timestamptz NOT NULL
);

CREATE TABLE public.Exchanges (
	id uuid NOT NULL PRIMARY KEY,
	new_owner_id uuid NOT NULL,
    FOREIGN KEY (new_owner_id) REFERENCES User_profile(id),
	book_id uuid NOT NULL,
    FOREIGN KEY (book_id) REFERENCES Book(id),
	requested_at timestamptz NOT NULL,
	accepted_at timestamptz NOT NULL,
	rejected_at timestamptz NOT NULL,
	concluded_at timestamptz NOT NULL,
	deleted_at timestamptz NOT NULL
);

CREATE TABLE public.Book_images (
	book_id uuid NOT NULL,
    FOREIGN KEY (book_id) REFERENCES Book(id),
	image_id uuid NOT NULL,
    FOREIGN KEY (image_id) REFERENCES Images(id),
	CONSTRAINT book_images_pk PRIMARY KEY (book_id,image_id)
);
