
create extension "uuid-ossp";

CREATE TABLE public."order" (
	id serial NOT NULL,
	detail text NOT NULL,
	transaction_status text NOT NULL,
	transaction_id uuid NOT NULL DEFAULT uuid_generate_v4(),	
	created timestamp NULL DEFAULT now(),
	updated timestamp NULL DEFAULT now(),
	CONSTRAINT order_pk PRIMARY KEY (id),
	CONSTRAINT order_un UNIQUE (transaction_id)
);
