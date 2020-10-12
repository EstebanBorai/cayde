GRANT ALL PRIVILEGES ON DATABASE cupboard_api TO cupboard_api;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.units (
    id UUID UNIQUE DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    short_name VARCHAR NOT NULL
);

CREATE TABLE public.ingredients (
    id UUID UNIQUE DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    unit_id UUID NOT NULL,
    quantity DECIMAL NOT NULL,
    price DECIMAL NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (unit_id) REFERENCES units(id)
);

CREATE TABLE public.recipes (
    id UUID UNIQUE DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    preparation TEXT
);

CREATE TABLE public.recipe_ingredient (
    id UUID UNIQUE DEFAULT uuid_generate_v4(),
    recipe_id UUID NOT NULL,
    ingredient_id UUID NOT NULL,
    quantity DECIMAL NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);
