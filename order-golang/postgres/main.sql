
create extension "uuid-ossp";

CREATE TABLE public."order" (
	id serial NOT NULL,
	detail text NOT NULL,
	transaction_status text NOT NULL,
	transaction_id uuid NOT NULL DEFAULT uuid_generate_v4(),
	"timestamp" timestamp NULL DEFAULT now()
);
