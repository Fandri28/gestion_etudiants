--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

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
-- Name: Absence; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Absence" (
    id integer NOT NULL,
    studentmatricule character varying(50) NOT NULL,
    matiere character varying(100) NOT NULL,
    date timestamp without time zone NOT NULL,
    justification text,
    type character varying(50) NOT NULL,
    classe character varying(100),
    date_debut time without time zone,
    date_fin time without time zone
);


ALTER TABLE public."Absence" OWNER TO postgres;

--
-- Name: Absence_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Absence_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Absence_id_seq" OWNER TO postgres;

--
-- Name: Absence_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Absence_id_seq" OWNED BY public."Absence".id;


--
-- Name: Student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Student" (
    matricule text NOT NULL,
    nom text NOT NULL,
    prenom text NOT NULL,
    niveau text NOT NULL,
    email text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Student" OWNER TO postgres;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'user'::character varying NOT NULL,
    email character varying(100)
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: classe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.classe (
    id integer NOT NULL,
    nom_classe character varying(100) NOT NULL
);


ALTER TABLE public.classe OWNER TO postgres;

--
-- Name: classe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.classe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.classe_id_seq OWNER TO postgres;

--
-- Name: classe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.classe_id_seq OWNED BY public.classe.id;


--
-- Name: matiere; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.matiere (
    id integer NOT NULL,
    nom character varying(100) NOT NULL,
    code character varying(20) NOT NULL
);


ALTER TABLE public.matiere OWNER TO postgres;

--
-- Name: matiere_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.matiere_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.matiere_id_seq OWNER TO postgres;

--
-- Name: matiere_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.matiere_id_seq OWNED BY public.matiere.id;


--
-- Name: Absence id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Absence" ALTER COLUMN id SET DEFAULT nextval('public."Absence_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: classe id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classe ALTER COLUMN id SET DEFAULT nextval('public.classe_id_seq'::regclass);


--
-- Name: matiere id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matiere ALTER COLUMN id SET DEFAULT nextval('public.matiere_id_seq'::regclass);


--
-- Data for Name: Absence; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Absence" (id, studentmatricule, matiere, date, justification, type, classe, date_debut, date_fin) FROM stdin;
6	2222	Physic	2002-02-12 00:00:00	gyyu	Absence	\N	\N	\N
7	001	Math	2024-11-01 00:00:00	mmm	Retard	\N	\N	\N
9	001	Math	2024-02-11 00:00:00	aucun	Retard	\N	\N	\N
10	2412	Math	2024-08-03 00:00:00	Narary kibo	Absence	\N	\N	\N
11	2412	Physic	2025-11-19 00:00:00	aucun	Retard	003	\N	\N
12	2412	Math	2022-11-20 00:00:00	ccccc	Absence	002	\N	\N
14	2412	Math	2025-11-19 00:00:00	xxx	Absence	002	\N	\N
8	001	Math	2025-01-10 00:00:00	manque de sommeil	Absence	006	\N	\N
15	2412	Math	2025-11-18 00:00:00	jjj	Retard	006	14:30:00	15:30:00
13	2412	Math	2025-12-18 00:00:00	cc	Absence	006	12:23:00	14:00:00
\.


--
-- Data for Name: Student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Student" (matricule, nom, prenom, niveau, email, "createdAt") FROM stdin;
001	mlml	lkml	L1	Mm@gmail.com	2025-11-09 01:52:35.341
2222	kll	lkk	L2	m6@gmai.com	2025-11-07 04:42:21.635
2412	milan 	nnn	L2	Mm3@gmail.com	2025-11-10 22:56:17.956
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, username, password, role, email) FROM stdin;
2	miilan	$2b$10$f19Cr2r1DG0R1glb3mJrNu7M.UKhrM4zQgGbHPBBUeEpSZb8rF80W	user	mi@gmail.com
8	mi	user123	utilisateur	mil@gmail.com
9	Mi	$2b$10$CpG.pg8mex8jnUOqjlzEb.Xo7RI1u.uKMZObgj/H6O/V6qn1EOJYm	user	mimi@gmail.com
10	admin	$2b$10$19UDWCvhi2Fg1SqAwmpVpuIUgIDBGsHJy3y29cORd/w7pnhMDuJfy	admin	admin@exemple.com
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
9afe79b9-489d-4c06-82b6-7469f5afce15	0bcd3161181864c2675da9c8aba64f5e493c56a8d7faa94e6b66de790bdd03cc	2025-11-07 02:02:43.582428-09	20251016144750_init	\N	\N	2025-11-07 02:02:43.571965-09	1
77b72a71-47f4-49fd-92c6-5889cc61bf9c	5ac9bb3597fd74df690cda0dcad98eb66ab95ff565da1c3f353f97ee19f1e455	2025-11-07 02:02:43.597599-09	20251017030036_init	\N	\N	2025-11-07 02:02:43.58281-09	1
d4f6b3a6-6e1c-4815-92a8-e1ca7da478c9	6e1f14c928bd762c29d94ea144b4dc69060c4d2fe8ac14960119f3c069fb08ce	2025-11-07 02:06:33.800949-09	20251107110633_create_student	\N	\N	2025-11-07 02:06:33.788537-09	1
62c741fd-e30a-497a-bb56-c3a392878995	ed46dc52dfc39a032c3aff1a0be2ec20e72f2143ec1ca16f2f0627d3cbb74210	2025-11-09 00:10:36.92126-09	20251109091036_init_absences	\N	\N	2025-11-09 00:10:36.899897-09	1
\.


--
-- Data for Name: classe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.classe (id, nom_classe) FROM stdin;
2	003
3	002
1	006
\.


--
-- Data for Name: matiere; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.matiere (id, nom, code) FROM stdin;
3	Math	001
4	Physic	2
5	Anglais	002
6	Mtu	004
\.


--
-- Name: Absence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Absence_id_seq"', 15, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 10, true);


--
-- Name: classe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.classe_id_seq', 3, true);


--
-- Name: matiere_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.matiere_id_seq', 6, true);


--
-- Name: Absence Absence_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Absence"
    ADD CONSTRAINT "Absence_pkey" PRIMARY KEY (id);


--
-- Name: Student Student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY (matricule);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: classe classe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classe
    ADD CONSTRAINT classe_pkey PRIMARY KEY (id);


--
-- Name: matiere matiere_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matiere
    ADD CONSTRAINT matiere_code_key UNIQUE (code);


--
-- Name: matiere matiere_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matiere
    ADD CONSTRAINT matiere_pkey PRIMARY KEY (id);


--
-- Name: Student_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Student_email_key" ON public."Student" USING btree (email);


--
-- PostgreSQL database dump complete
--

