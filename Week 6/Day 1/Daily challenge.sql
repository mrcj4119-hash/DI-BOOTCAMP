--
-- PostgreSQL database dump
--

\restrict XhU7R3FfpbqTfwRtx1VhWs4pjRtlBSZqo1u7IzP8KlWAoUAIofYAweLtpW1bnpO

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-09-23 09:29:26

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
-- TOC entry 219 (class 1259 OID 16407)
-- Name: actors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.actors (
    first_name character varying(50)
);


ALTER TABLE public.actors OWNER TO postgres;

--
-- TOC entry 4955 (class 0 OID 16407)
-- Dependencies: 219
-- Data for Name: actors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.actors (first_name) FROM stdin;
\.


-- Completed on 2026-09-23 09:29:26

--
-- PostgreSQL database dump complete
--

\unrestrict XhU7R3FfpbqTfwRtx1VhWs4pjRtlBSZqo1u7IzP8KlWAoUAIofYAweLtpW1bnpO

