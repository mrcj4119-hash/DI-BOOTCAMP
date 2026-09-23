--
-- PostgreSQL database dump
--

\restrict zni7YkD3rjDno2BZPn33cSA1lc5lNcr0ZhAswNJ2OJxcZCinwJhhAqz43m0Et4u

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-09-23 07:49:15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16440)
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16437)
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    item_name character varying(100),
    price character varying(100)
);


ALTER TABLE public.items OWNER TO postgres;

--
-- TOC entry 4960 (class 0 OID 16440)
-- Dependencies: 220
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (first_name, last_name) FROM stdin;
Greg	Jones
Sandra	Jones
Scott	Scott
Trevor	Green
Melanie	Johnson
\.


--
-- TOC entry 4959 (class 0 OID 16437)
-- Dependencies: 219
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (item_name, price) FROM stdin;
Small Desk	100
Large desk	300
Fan	80
\.


-- Completed on 2026-09-23 07:49:16

--
-- PostgreSQL database dump complete
--

\unrestrict zni7YkD3rjDno2BZPn33cSA1lc5lNcr0ZhAswNJ2OJxcZCinwJhhAqz43m0Et4u

