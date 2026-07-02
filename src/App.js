import { useState, useEffect, useRef } from "react";

const API = "https://mds-novatech.onrender.com";
const GROQ_KEY = "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";

const INESTID_CONTEXT = `Tu es l'assistant IA officiel d'INESTID. Voici tout ce que tu dois savoir sur INESTID :

NOM : INESTID
SLOGAN : « L'innovation au service de la croissance »
DATE DE CRÉATION : 2026
MISSION : Aider les entreprises et les particuliers à réussir leur transformation numérique grâce à des solutions innovantes.
VISION : Devenir l'une des références africaines en intelligence artificielle et en développement numérique.
VALEURS : Innovation, Excellence, Intégrité, Créativité, Satisfaction client.

QUI EST INESTID ? INESTID est une entreprise spécialisée dans le développement de solutions numériques, l'intelligence artificielle, la formation et l'accompagnement des entreprises.

SERVICES :
- Informatique & Digital : Développement web & applications mobiles, Infrastructure réseau & cloud, Cybersécurité, Maintenance et support technique, Conseil et audit informatique
- Intelligence Artificielle & Data : Développement de solutions IA, Analyse et traitement de données, Automatisation des processus, Chatbots et assistants virtuels, Machine Learning & prédiction

PRODUIT PHARE : Une intelligence artificielle capable de répondre aux clients 24h/24 en plusieurs langues.

CONTACT : WhatsApp, Facebook, e-mail ou téléphone.
EMAIL : contact@inestid.com

PAIEMENT : MTN Mobile Money, Moov Money, cartes bancaires et virements bancaires.

REMBOURSEMENT : Les remboursements sont étudiés au cas par cas conformément aux conditions générales.

FONDATEUR : Yolou Atekeyollo Mathieu Patient — Fondateur et Directeur Général.

COMPORTEMENT : Si tu ne connais pas la réponse, dis : "Je suis désolé, je ne dispose pas encore de cette information. Je peux transmettre votre demande à un conseiller INESTID."

IMPORTANT : Réponds toujours dans la langue utilisée par l'utilisateur. Sois professionnel, concis et utile. Tu représentes INESTID.`;

const T = {
  fr: {
    nav_accueil:"Accueil", nav_services:"Services", nav_actualites:"Actualités", nav_partenariats:"Partenariats", nav_contact:"Contact",
    hero_badge:"Innovation · Technologie · Intelligence Artificielle",
    hero_t1:"Solutions", hero_t2:"Digitales", hero_t3:"Propulsées par", hero_t4:"l'IA",
    hero_desc:"INESTID propulse votre entreprise avec des solutions informatiques de pointe et une expertise en intelligence artificielle. Une vision, votre réussite.",
    hero_btn1:"Nos services", hero_btn2:"Nous contacter",
    hero_s1:"Clients satisfaits", hero_s2:"Années d'expérience", hero_s3:"Secteurs expertise",
    about_tag:"À propos", about_title:"Qui sommes-nous ?",
    about_p1:"INESTID est une entreprise dynamique spécialisée dans l'informatique, le digital et l'intelligence artificielle.",
    about_p2:"Notre équipe pluridisciplinaire combine expertise technique et innovation pour offrir des solutions concrètes et durables.",
    about_btn:"Voir nos services",
    about_c1:"Expertise Tech", about_c1d:"Solutions numériques complètes pour votre entreprise",
    about_c2:"Intelligence IA", about_c2d:"Solutions d'IA adaptées à vos besoins",
    about_c3:"Équipe Dédiée", about_c3d:"Des professionnels passionnés à votre service",
    about_c4:"Fiabilité", about_c4d:"Partenaire de confiance depuis 2026",
    svc_tag:"Ce que nous faisons", svc_title:"Nos Domaines d'Expertise",
    svc_sub:"Des solutions adaptées à vos besoins dans le numérique et l'intelligence artificielle.",
    svc_tech_title:"Informatique & Digital",
    svc_tech_desc:"Solutions technologiques complètes pour moderniser votre activité.",
    svc_ai_title:"Intelligence Artificielle & Data",
    svc_ai_desc:"Des solutions IA innovantes pour automatiser et optimiser vos processus.",
    news_tag:"Notre blog", news_title:"Actualités & Informations",
    news_sub:"Restez informé des dernières nouvelles d'INESTID.",
    news_subscribe:"S'abonner", news_empty:"Aucun article publié pour le moment",
    news_filter_all:"Tout",
    part_tag:"Partenariats", part_title:"Partenariats Stratégiques",
    part_sub:"Découvrez nos partenaires et proposez une collaboration.",
    part_tab1:"Nos Partenaires", part_tab2:"Collaborons",
    part_empty:"Aucun partenaire pour le moment",
    part_become:"Devenez notre premier partenaire !",
    part_propose_btn:"Proposer un partenariat",
    part_visit:"Visiter le site",
    part_form_title:"Proposer un Partenariat",
    part_form_sub:"Notre équipe vous contactera sous 48h.",
    part_org:"Nom de l'organisation *", part_contact:"Contact", part_email:"Email *",
    part_type:"Type de partenariat", part_prop:"Votre proposition",
    part_send:"Envoyer la proposition", part_sending:"Envoi en cours...",
    collab_p1:"Partenariat Commercial", collab_d1:"Développez votre réseau et accédez à notre base de clients.",
    collab_p2:"Partenariat Technologique", collab_d2:"Intégrez vos solutions ou co-développez des produits innovants.",
    collab_p3:"Partenariat Institutionnel", collab_d3:"Rejoignez nos projets à fort impact social.",
    collab_p4:"Investissement", collab_d4:"Participez à notre croissance et expansion régionale.",
    contact_tag:"Parlons-nous", contact_title:"Contactez-Nous",
    contact_sub:"Notre équipe est disponible pour répondre à toutes vos questions.",
    contact_desc:"Vous avez un projet ou une question ? N'hésitez pas à nous écrire.",
    contact_addr:"Adresse", contact_addr_val:"Siège social INESTID",
    contact_phone:"Téléphone", contact_email:"Email", contact_hours:"WhatsApp",
    contact_hours_val:"Discuter sur WhatsApp",
    contact_form_title:"Envoyer un message",
    contact_fn:"Prénom", contact_ln:"Nom *", contact_em:"Email *",
    contact_service:"Service concerné", contact_msg:"Message *",
    contact_send:"Envoyer le message", contact_sending:"Envoi en cours...",
    promo_tag:"Notre fondateur", promo_title:"Le Promoteur",
    promo_sub:"Découvrez l'homme derrière la vision d'INESTID.",
    promo_role:"Promoteur & Fondateur",
    promo_bio_title:"Biographie", promo_parcours:"Parcours", promo_values:"Valeurs & Vision",
    promo_bio1:"YOLOU ATEKEYOLLO MATHIEU PATIENT est un jeune entrepreneur africain visionnaire, fondateur et promoteur d'INESTID. Né en Afrique centrale, il grandit avec une passion profonde pour les technologies et le développement numérique de son continent.",
    promo_bio2:"Très tôt, il comprend que l'Afrique a besoin de solutions locales adaptées à ses réalités. C'est cette conviction qui le pousse, dès ses études, à s'orienter vers l'informatique et l'intelligence artificielle.",
    promo_bio3:"Fort de cette expertise, il fonde INESTID avec une vision claire : créer une entreprise africaine capable de répondre aux défis technologiques de demain.",
    promo_bio4:"Animé par des valeurs de rigueur, d'intégrité et de service, MATHIEU PATIENT reste convaincu que la jeunesse africaine est la clé du développement du continent.",
    promo_t1:"Formation", promo_t1t:"Études en Informatique & IA", promo_t1d:"Formation qui forge sa vision unique.",
    promo_t2:"Idée", promo_t2t:"Naissance du concept INESTID", promo_t2d:"Une vision : créer une entreprise africaine d'excellence.",
    promo_t3:"Lancement", promo_t3t:"Création d'INESTID", promo_t3d:"Fondation officielle avec une équipe passionnée.",
    promo_t4:"Aujourd'hui", promo_t4t:"Reconnaissance & Expansion", promo_t4d:"Prix de l'Innovation 2026 et développement continu.",
    promo_v1:"Recherche", promo_v1d:"Toujours chercher des solutions innovantes.",
    promo_v2:"Innovation", promo_v2d:"Transformer les idées en solutions concrètes.",
    promo_v3:"Développement", promo_v3d:"Contribuer au progrès du continent africain.",
    promo_v4:"Intégrité", promo_v4d:"Agir avec honnêteté en toutes circonstances.",
    footer_desc:"Solutions informatiques et IA pour bâtir un avenir connecté et prospère.",
    footer_services:"Services", footer_company:"Entreprise", footer_legal:"Légal",
    footer_about:"À propos", footer_partner:"Partenariats", footer_promoter:"Le Promoteur",
    footer_mentions:"Mentions légales", footer_privacy:"Confidentialité", footer_cgu:"CGU",
    footer_rights:"Tous droits réservés.",
    lang_label:"Langue",
    newsletter_title:"Newsletter INESTID",
    newsletter_desc:"Recevez nos dernières actualités directement dans votre boîte mail.",
    newsletter_email:"Votre email", newsletter_btn:"S'abonner", newsletter_sending:"Envoi...",
    mentions_title:"Mentions Légales", mentions_sub:"Informations légales relatives à INESTID.",
    mentions_alert:"Conformément aux dispositions légales, voici les mentions obligatoires du site INESTID.",
    confidentialite_title:"Politique de Confidentialité", confidentialite_sub:"Comment INESTID protège vos données personnelles.",
    confidentialite_alert:"Vos données personnelles sont traitées avec le plus grand soin.",
    cgu_title:"Conditions Générales d'Utilisation", cgu_sub:"Règles régissant l'utilisation du site INESTID.",
    cgu_alert:"En utilisant ce site, vous acceptez les présentes CGU.",
    legal_tag:"Légal",
    donnees:"Données collectées", finalites:"Finalités du traitement", droits:"Vos droits", dpo:"Contact DPO",
    objet:"1. Objet", acces:"2. Accès au site", interdit:"3. Utilisations interdites", modif:"4. Modifications",
    objet_text:"Les présentes CGU définissent les conditions d'utilisation du site web d'INESTID.",
    acces_text:"INESTID s'efforce de maintenir le site accessible 24h/24, 7j/7.",
    modif_text:"INESTID se réserve le droit de modifier les présentes CGU à tout moment.",
    editeur:"Éditeur du site", hebergement:"Hébergement", propriete:"Propriété intellectuelle", droit_app:"Droit applicable",
    last_update:"Dernière mise à jour",
    bot_title:"Assistant INESTID",
    bot_subtitle:"IA · Disponible 24h/24",
    bot_placeholder:"Posez votre question...",
    bot_start:"Démarrer une discussion",
    bot_welcome:"Bonjour ! Je suis l'assistant IA d'INESTID. Comment puis-je vous aider aujourd'hui ?",
    bot_error:"Une erreur s'est produite. Veuillez réessayer.",
    bot_thinking:"En train de réfléchir...",
  },
  en: {
    nav_accueil:"Home", nav_services:"Services", nav_actualites:"News", nav_partenariats:"Partnerships", nav_contact:"Contact",
    hero_badge:"Innovation · Technology · Artificial Intelligence",
    hero_t1:"Digital", hero_t2:"Solutions", hero_t3:"Powered by", hero_t4:"AI",
    hero_desc:"INESTID empowers your business with cutting-edge IT solutions and artificial intelligence expertise. One vision: your success.",
    hero_btn1:"Our services", hero_btn2:"Contact us",
    hero_s1:"Satisfied clients", hero_s2:"Years of experience", hero_s3:"Areas of expertise",
    about_tag:"About us", about_title:"Who are we?",
    about_p1:"INESTID is a dynamic company specializing in IT, digital and artificial intelligence.",
    about_p2:"Our multidisciplinary team combines technical expertise and innovation to deliver concrete and sustainable solutions.",
    about_btn:"See our services",
    about_c1:"Tech Expertise", about_c1d:"Complete digital solutions for your business",
    about_c2:"AI Intelligence", about_c2d:"AI solutions adapted to your needs",
    about_c3:"Dedicated Team", about_c3d:"Passionate professionals at your service",
    about_c4:"Reliability", about_c4d:"Trusted partner since 2026",
    svc_tag:"What we do", svc_title:"Our Areas of Expertise",
    svc_sub:"Solutions tailored to your needs in digital and artificial intelligence.",
    svc_tech_title:"IT & Digital",
    svc_tech_desc:"Complete technological solutions to modernize your activity.",
    svc_ai_title:"Artificial Intelligence & Data",
    svc_ai_desc:"Innovative AI solutions to automate and optimize your processes.",
    news_tag:"Our blog", news_title:"News & Information",
    news_sub:"Stay informed about the latest news from INESTID.",
    news_subscribe:"Subscribe", news_empty:"No articles published yet",
    news_filter_all:"All",
    part_tag:"Partnerships", part_title:"Strategic Partnerships",
    part_sub:"Discover our partners and propose a collaboration.",
    part_tab1:"Our Partners", part_tab2:"Collaborate",
    part_empty:"No partners yet",
    part_become:"Become our first partner!",
    part_propose_btn:"Propose a partnership",
    part_visit:"Visit website",
    part_form_title:"Propose a Partnership",
    part_form_sub:"Our team will contact you within 48h.",
    part_org:"Organization name *", part_contact:"Contact", part_email:"Email *",
    part_type:"Partnership type", part_prop:"Your proposal",
    part_send:"Send proposal", part_sending:"Sending...",
    collab_p1:"Commercial Partnership", collab_d1:"Grow your network and access our client base.",
    collab_p2:"Technology Partnership", collab_d2:"Integrate your solutions or co-develop innovative products.",
    collab_p3:"Institutional Partnership", collab_d3:"Join our high social impact projects.",
    collab_p4:"Investment", collab_d4:"Participate in our growth and regional expansion.",
    contact_tag:"Let's talk", contact_title:"Contact Us",
    contact_sub:"Our team is available to answer all your questions.",
    contact_desc:"Have a project or question? Feel free to write to us.",
    contact_addr:"Address", contact_addr_val:"INESTID Headquarters",
    contact_phone:"Phone", contact_email:"Email", contact_hours:"WhatsApp",
    contact_hours_val:"Chat on WhatsApp",
    contact_form_title:"Send a message",
    contact_fn:"First name", contact_ln:"Last name *", contact_em:"Email *",
    contact_service:"Service concerned", contact_msg:"Message *",
    contact_send:"Send message", contact_sending:"Sending...",
    promo_tag:"Our founder", promo_title:"The Promoter",
    promo_sub:"Discover the man behind the INESTID vision.",
    promo_role:"Promoter & Founder",
    promo_bio_title:"Biography", promo_parcours:"Journey", promo_values:"Values & Vision",
    promo_bio1:"YOLOU ATEKEYOLLO MATHIEU PATIENT is a visionary young African entrepreneur, founder and promoter of INESTID. Born in Central Africa, he grew up with a deep passion for technology and digital development on his continent.",
    promo_bio2:"Early on, he understood that Africa needs local solutions adapted to its realities. This conviction led him to focus on computer science and artificial intelligence.",
    promo_bio3:"With this expertise, he founded INESTID with a clear vision: to create an African company capable of meeting tomorrow's technological challenges.",
    promo_bio4:"Driven by values of rigor, integrity and service, MATHIEU PATIENT remains convinced that African youth is the key to the continent's development.",
    promo_t1:"Training", promo_t1t:"Studies in IT & AI", promo_t1d:"Training that forges his unique vision.",
    promo_t2:"Idea", promo_t2t:"Birth of the INESTID concept", promo_t2d:"A vision: creating an African company of excellence.",
    promo_t3:"Launch", promo_t3t:"Creation of INESTID", promo_t3d:"Official founding with a passionate team.",
    promo_t4:"Today", promo_t4t:"Recognition & Expansion", promo_t4d:"Innovation Award 2026 and continuous development.",
    promo_v1:"Research", promo_v1d:"Always seeking innovative solutions.",
    promo_v2:"Innovation", promo_v2d:"Transforming ideas into concrete solutions.",
    promo_v3:"Development", promo_v3d:"Contributing to African continent progress.",
    promo_v4:"Integrity", promo_v4d:"Acting with honesty in all circumstances.",
    footer_desc:"IT and AI solutions to build a connected and prosperous future.",
    footer_services:"Services", footer_company:"Company", footer_legal:"Legal",
    footer_about:"About", footer_partner:"Partnerships", footer_promoter:"The Promoter",
    footer_mentions:"Legal notice", footer_privacy:"Privacy", footer_cgu:"TOU",
    footer_rights:"All rights reserved.",
    lang_label:"Language",
    newsletter_title:"INESTID Newsletter",
    newsletter_desc:"Receive our latest news directly in your mailbox.",
    newsletter_email:"Your email", newsletter_btn:"Subscribe", newsletter_sending:"Sending...",
    mentions_title:"Legal Notice", mentions_sub:"Legal information relating to INESTID.",
    mentions_alert:"In accordance with legal provisions, here are the mandatory notices for the INESTID website.",
    confidentialite_title:"Privacy Policy", confidentialite_sub:"How INESTID protects your personal data.",
    confidentialite_alert:"Your personal data is processed with the utmost care.",
    cgu_title:"Terms of Use", cgu_sub:"Rules governing the use of the INESTID website.",
    cgu_alert:"By using this site, you accept these Terms of Use.",
    legal_tag:"Legal",
    donnees:"Data collected", finalites:"Processing purposes", droits:"Your rights", dpo:"DPO Contact",
    objet:"1. Purpose", acces:"2. Site access", interdit:"3. Prohibited uses", modif:"4. Modifications",
    objet_text:"These Terms of Use define the conditions for using the INESTID website.",
    acces_text:"INESTID strives to keep the site accessible 24/7.",
    modif_text:"INESTID reserves the right to modify these Terms of Use at any time.",
    editeur:"Site editor", hebergement:"Hosting", propriete:"Intellectual property", droit_app:"Applicable law",
    last_update:"Last updated",
    bot_title:"INESTID Assistant",
    bot_subtitle:"AI · Available 24/7",
    bot_placeholder:"Ask your question...",
    bot_start:"Start a conversation",
    bot_welcome:"Hello! I'm INESTID's AI assistant. How can I help you today?",
    bot_error:"An error occurred. Please try again.",
    bot_thinking:"Thinking...",
  }
};

const LIGHT = {
  "--bg":"#f5f7ff","--bg2":"#eef1fb","--bg3":"#e6eaf8",
  "--card":"#ffffff","--border":"#dde2f0",
  "--text":"#1a2540","--text2":"#4a5578","--gray":"#64748b",
};
const DARK = {
  "--bg":"#070d1a","--bg2":"#0d1829","--bg3":"#111f35",
  "--card":"#0d1829","--border":"#1e3a5f",
  "--text":"#f0f4ff","--text2":"#8a9bc0","--gray":"#8a9bc0",
};

const injectAssets = () => {
  if (!document.getElementById("fa-cdn")) {
    const l = document.createElement("link");
    l.id = "fa-cdn"; l.rel = "stylesheet";
    l.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
    document.head.appendChild(l);
  }
  if (!document.getElementById("gfonts")) {
    const l = document.createElement("link");
    l.id = "gfonts"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap";
    document.head.appendChild(l);
  }
};

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
*, *::before, *::after { -webkit-user-select: none; user-select: none; }
input, textarea { -webkit-user-select: text !important; user-select: text !important; }
:root {
  --blue: #1a3a8f; --blue-l: #2a52c9; --blue-g: #3a6fff;
  --green: #2ea312; --green-l: #3ecb18;
  --bg: #f5f7ff; --bg2: #eef1fb; --bg3: #e6eaf8;
  --card: #ffffff; --border: #dde2f0;
  --gray: #64748b; --dark: #0f1e3d;
  --text: #1a2540; --text2: #4a5578;
}
html, body { height: 100%; overflow: hidden; background: var(--bg); }
body { color: var(--text); font-family: 'DM Sans', sans-serif; transition: background 0.3s; }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg2); }
::-webkit-scrollbar-thumb { background: var(--blue-l); border-radius: 2px; }
.nav {
  position: fixed; top: 14px; left: 14px; right: 14px; z-index: 100;
  height: 60px; padding: 0 20px;
  display: flex; align-items: center; justify-content: space-between;
  background: var(--card); backdrop-filter: blur(20px);
  border: 1px solid var(--border); border-radius: 100px;
  box-shadow: 0 4px 24px rgba(26,58,143,0.1);
  transition: background 0.3s, border-color 0.3s;
}
.logo { display: flex; align-items: center; cursor: pointer; }
.logo-img { height: 42px; width: auto; object-fit: contain; }
.nav-links { display: flex; gap: 2px; list-style: none; align-items: center; }
.nav-links button {
  background: none; border: none; cursor: pointer;
  color: var(--gray); font-family: 'DM Sans', sans-serif; font-size: 0.86rem; font-weight: 500;
  padding: 8px 13px; border-radius: 100px;
  display: flex; align-items: center; gap: 6px; transition: all 0.2s;
}
.nav-links button:hover { color: var(--text); background: var(--bg3); }
.nav-links button.active { color: var(--blue-l); background: rgba(42,82,201,0.08); font-weight: 600; }
.nav-links button.cta { background: linear-gradient(135deg, var(--blue-l), var(--blue-g)); color: #fff; margin-left: 6px; box-shadow: 0 4px 14px rgba(42,82,201,0.25); }
.nav-links button.cta:hover { opacity: 0.9; transform: translateY(-1px); }
.nav-right { display: flex; align-items: center; gap: 10px; }
.theme-toggle { display: flex; align-items: center; gap: 7px; }
.t-icon { font-size: 0.82rem; color: var(--gray); transition: color 0.3s; }
.t-icon.active { color: var(--blue-l); }
.toggle-track {
  width: 42px; height: 23px; border-radius: 100px;
  background: var(--bg3); border: 1.5px solid var(--border);
  position: relative; cursor: pointer;
  transition: background 0.35s, border-color 0.35s; flex-shrink: 0;
}
.toggle-track.dark { background: #1a3a8f; border-color: rgba(58,111,255,0.5); }
.toggle-thumb {
  position: absolute; top: 2px; left: 2px;
  width: 17px; height: 17px; border-radius: 50%;
  background: white; box-shadow: 0 2px 6px rgba(0,0,0,0.18);
  transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.35s;
}
.toggle-track.dark .toggle-thumb { transform: translateX(19px); background: var(--blue-g); }
.hamburger { display: none; background: none; border: none; cursor: pointer; padding: 6px; flex-direction: column; gap: 5px; }
.hamburger span { display: block; width: 22px; height: 2px; background: var(--text); border-radius: 2px; transition: all 0.3s; }
.mob-menu {
  display: none; position: fixed; top: 84px; left: 14px; right: 14px; z-index: 99;
  background: var(--card); backdrop-filter: blur(20px);
  padding: 16px; border: 1px solid var(--border);
  border-radius: 24px; flex-direction: column; gap: 4px;
  box-shadow: 0 8px 32px rgba(26,58,143,0.12); transition: background 0.3s;
}
.mob-menu.open { display: flex; }
.mob-menu button {
  background: none; border: none; cursor: pointer;
  color: var(--gray); font-family: 'DM Sans', sans-serif; font-size: 0.97rem;
  padding: 12px 14px; border-radius: 12px; text-align: left;
  display: flex; align-items: center; gap: 10px; transition: all 0.2s;
}
.mob-menu button:hover, .mob-menu button.active { color: var(--text); background: var(--bg3); }
.mob-menu-divider { height: 1px; background: var(--border); margin: 6px 0; }

/* BOT BUTTON */
.bot-btn {
  background: linear-gradient(135deg, var(--blue-l), var(--blue-g));
  color: white; border: none; cursor: pointer;
  padding: 12px 14px; border-radius: 12px; text-align: left;
  display: flex; align-items: center; gap: 10px; transition: all 0.2s;
  font-family: 'DM Sans', sans-serif; font-size: 0.97rem; font-weight: 500;
  width: 100%;
}
.bot-btn:hover { opacity: 0.9; transform: translateX(3px); }
.bot-btn-dot {
  width: 8px; height: 8px; border-radius: 50%; background: #4eff91;
  margin-left: auto; animation: blink 2s infinite;
}

/* BOT MODAL */
.bot-overlay {
  position: fixed; inset: 0; z-index: 300;
  background: rgba(7,13,26,0.6); backdrop-filter: blur(12px);
  display: flex; align-items: flex-end; justify-content: center;
  padding: 0;
}
.bot-panel {
  width: 100%; max-width: 520px;
  height: 88vh; max-height: 700px;
  background: var(--card);
  border-radius: 28px 28px 0 0;
  display: flex; flex-direction: column;
  overflow: hidden;
  box-shadow: 0 -20px 60px rgba(26,58,143,0.2);
  animation: slideUp 0.35s cubic-bezier(0.4,0,0.2,1);
}
@keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.bot-header {
  background: linear-gradient(135deg, #0f1e3d, #1a3a8f);
  padding: 20px 20px 16px;
  display: flex; align-items: center; gap: 14px;
  flex-shrink: 0;
}
.bot-avatar {
  width: 46px; height: 46px; border-radius: 14px;
  background: linear-gradient(135deg, var(--blue-g), var(--green));
  display: flex; align-items: center; justify-content: center;
  font-size: 1.3rem; flex-shrink: 0;
}
.bot-header-info { flex: 1; }
.bot-header-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; font-weight: 800; color: #fff; margin-bottom: 2px; }
.bot-header-sub { font-size: 0.75rem; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 6px; }
.bot-online { width: 7px; height: 7px; border-radius: 50%; background: #4eff91; animation: blink 2s infinite; }
.bot-close { background: rgba(255,255,255,0.1); border: none; color: rgba(255,255,255,0.7); width: 34px; height: 34px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; font-size: 1rem; }
.bot-close:hover { background: rgba(255,255,255,0.2); color: #fff; }
.bot-messages {
  flex: 1; overflow-y: auto; padding: 20px 16px;
  display: flex; flex-direction: column; gap: 14px;
  scroll-behavior: smooth;
}
.bot-messages::-webkit-scrollbar { width: 3px; }
.bot-messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
.bot-msg { display: flex; gap: 10px; animation: up 0.3s ease; }
.bot-msg.user { flex-direction: row-reverse; }
.bot-msg-avatar {
  width: 32px; height: 32px; border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 0.85rem;
}
.bot-msg.bot .bot-msg-avatar { background: linear-gradient(135deg, var(--blue-l), var(--blue-g)); color: white; }
.bot-msg.user .bot-msg-avatar { background: linear-gradient(135deg, var(--green), var(--green-l)); color: white; }
.bot-msg-bubble {
  max-width: 78%; padding: 12px 16px; border-radius: 18px;
  font-size: 0.88rem; line-height: 1.6;
}
.bot-msg.bot .bot-msg-bubble { background: var(--bg2); color: var(--text); border-radius: 4px 18px 18px 18px; }
.bot-msg.user .bot-msg-bubble { background: linear-gradient(135deg, var(--blue-l), var(--blue-g)); color: white; border-radius: 18px 4px 18px 18px; }
.bot-msg-time { font-size: 0.68rem; color: var(--gray); margin-top: 4px; }
.bot-msg.user .bot-msg-time { text-align: right; }
.bot-typing { display: flex; gap: 5px; align-items: center; padding: 12px 16px; background: var(--bg2); border-radius: 4px 18px 18px 18px; width: fit-content; }
.bot-typing span { width: 7px; height: 7px; border-radius: 50%; background: var(--gray); animation: typing 1.2s infinite; }
.bot-typing span:nth-child(2) { animation-delay: 0.2s; }
.bot-typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes typing { 0%,60%,100%{transform:translateY(0);opacity:0.4} 30%{transform:translateY(-6px);opacity:1} }
.bot-suggestions { padding: 0 16px 12px; display: flex; gap: 8px; flex-wrap: wrap; }
.bot-suggestion { background: rgba(42,82,201,0.08); border: 1px solid rgba(42,82,201,0.2); color: var(--blue-l); border-radius: 100px; padding: 6px 14px; font-size: 0.78rem; font-weight: 500; cursor: pointer; transition: all 0.2s; white-space: nowrap; font-family: 'DM Sans', sans-serif; }
.bot-suggestion:hover { background: rgba(42,82,201,0.15); }
.bot-input-area {
  padding: 12px 16px 16px; border-top: 1px solid var(--border);
  display: flex; gap: 10px; align-items: flex-end; flex-shrink: 0;
  background: var(--card);
}
.bot-input {
  flex: 1; background: var(--bg); border: 1.5px solid var(--border);
  border-radius: 16px; padding: 11px 16px;
  color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
  outline: none; resize: none; max-height: 100px; overflow-y: auto;
  transition: border-color 0.2s;
  -webkit-user-select: text !important; user-select: text !important;
}
.bot-input:focus { border-color: var(--blue-l); }
.bot-send {
  width: 42px; height: 42px; border-radius: 13px; border: none; cursor: pointer;
  background: linear-gradient(135deg, var(--blue-l), var(--blue-g));
  color: white; display: flex; align-items: center; justify-content: center;
  font-size: 1rem; transition: all 0.2s; flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(42,82,201,0.3);
}
.bot-send:hover { transform: scale(1.05); }
.bot-send:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
.bot-powered { text-align: center; padding: 6px; font-size: 0.68rem; color: var(--gray); }

.pages { position: fixed; top: 88px; left: 0; right: 0; bottom: 0; overflow: hidden; }
.page {
  position: absolute; inset: 0; overflow-y: auto;
  padding: 0 56px 60px;
  opacity: 0; transform: translateY(16px);
  transition: opacity 0.32s ease, transform 0.32s ease;
  pointer-events: none; background: var(--bg);
}
.page.active { opacity: 1; transform: translateY(0); pointer-events: all; }
.home-hero { min-height: calc(100vh - 88px); display: flex; align-items: center; position: relative; overflow: hidden; }
.hero-bg {
  position: absolute; inset: 0; pointer-events: none;
  background-image: url('/fond.jpg');
  background-size: 80%; background-position: center; background-repeat: no-repeat; opacity: 0.15;
}
.hero-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 56px 56px; opacity: 0.5;
}
.hero-body { position: relative; z-index: 1; max-width: 640px; }
.badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(46,163,18,0.08); border: 1px solid rgba(46,163,18,0.25); border-radius: 100px; padding: 5px 15px; font-size: 0.76rem; font-weight: 600; color: var(--green); margin-bottom: 26px; animation: up 0.5s ease both; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: blink 2s infinite; }
@keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.6)} }
.hero-body h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: clamp(2.4rem, 4.5vw, 3.8rem); line-height: 1.1; margin-bottom: 20px; color: var(--text); animation: up 0.5s 0.08s ease both; transition: color 0.3s; }
.hero-body h1 .b { color: var(--blue-l); }
.hero-body h1 .g { color: var(--green); }
.hero-desc { color: var(--text2); font-size: 1rem; line-height: 1.7; max-width: 490px; margin-bottom: 34px; animation: up 0.5s 0.16s ease both; }
.hero-btns { display: flex; gap: 12px; flex-wrap: wrap; animation: up 0.5s 0.24s ease both; }
.hero-stats { position: absolute; right: 0; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 14px; animation: up 0.5s 0.32s ease both; }
.stat { background: var(--card); border: 1px solid var(--border); border-radius: 15px; padding: 20px 24px; text-align: center; min-width: 144px; box-shadow: 0 4px 20px rgba(26,58,143,0.07); transition: transform 0.3s; }
.stat:hover { transform: translateX(-5px); }
.stat-n { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.9rem; font-weight: 800; background: linear-gradient(135deg, var(--blue-l), var(--green)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.stat-l { font-size: 0.73rem; color: var(--gray); margin-top: 3px; }
.home-sections { padding-top: 20px; }
.home-about { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; padding: 80px 0; border-top: 1px solid var(--border); }
.about-text h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 800; color: var(--text); margin-bottom: 14px; }
.about-text p { color: var(--text2); line-height: 1.75; font-size: 0.95rem; margin-bottom: 12px; }
.about-cards { display: flex; flex-direction: column; gap: 13px; }
.about-card { display: flex; align-items: center; gap: 14px; background: var(--card); border-radius: 14px; padding: 17px 19px; border: 1px solid var(--border); box-shadow: 0 2px 10px rgba(26,58,143,0.05); transition: all 0.2s; }
.about-card:hover { border-color: rgba(42,82,201,0.3); box-shadow: 0 4px 18px rgba(42,82,201,0.1); transform: translateY(-2px); }
.about-card-icon { width: 40px; height: 40px; border-radius: 11px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
.about-card h4 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.9rem; font-weight: 700; color: var(--text); margin-bottom: 2px; }
.about-card p { font-size: 0.8rem; color: var(--gray); }
.page-hero { padding: 52px 0 40px; border-bottom: 1px solid var(--border); margin-bottom: 40px; position: relative; overflow: hidden; }
.page-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 100% at 85% 50%, rgba(42,82,201,0.05) 0%, transparent 70%); pointer-events: none; }
.page-hero-inner { position: relative; z-index: 1; }
.page-tag { display: inline-flex; align-items: center; gap: 7px; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--green); margin-bottom: 12px; }
.page-tag::before { content: ''; width: 16px; height: 2px; background: var(--green); border-radius: 1px; }
.page-hero h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 800; color: var(--text); margin-bottom: 10px; }
.page-hero p { color: var(--text2); font-size: 0.96rem; line-height: 1.7; max-width: 520px; }
.btn { border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500; border-radius: 100px; padding: 12px 24px; display: inline-flex; align-items: center; gap: 7px; transition: all 0.25s; }
.btn-blue { background: linear-gradient(135deg, var(--blue-l), var(--blue-g)); color: #fff; box-shadow: 0 5px 20px rgba(42,82,201,0.22); }
.btn-blue:hover { transform: translateY(-2px); box-shadow: 0 9px 28px rgba(42,82,201,0.32); }
.btn-blue:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.btn-outline { background: var(--card); border: 1px solid var(--border); color: var(--text); box-shadow: 0 2px 8px rgba(26,58,143,0.06); }
.btn-outline:hover { background: var(--bg2); border-color: rgba(42,82,201,0.3); }
.btn-green { background: linear-gradient(135deg, var(--green), var(--green-l)); color: #fff; box-shadow: 0 5px 20px rgba(46,163,18,0.2); }
.btn-green:hover { transform: translateY(-2px); }
.btn-green:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.btn-full { width: 100%; justify-content: center; }
.alert { padding: 12px 16px; border-radius: 10px; font-size: 0.88rem; margin-top: 12px; display: flex; align-items: center; gap: 8px; }
.alert-success { background: rgba(46,163,18,0.1); border: 1px solid rgba(46,163,18,0.25); color: var(--green); }
.alert-error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); color: #ef4444; }
.svc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.svc-panel { border-radius: 20px; padding: 36px; border: 1px solid var(--border); background: var(--card); box-shadow: 0 4px 20px rgba(26,58,143,0.06); transition: transform 0.3s, box-shadow 0.3s; }
.svc-panel:hover { transform: translateY(-4px); box-shadow: 0 10px 36px rgba(26,58,143,0.12); }
.svc-panel.tech { border-top: 3px solid var(--blue-l); }
.svc-panel.ai { border-top: 3px solid var(--green); }
.svc-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.35rem; margin-bottom: 20px; }
.tech .svc-icon { background: rgba(42,82,201,0.1); color: var(--blue-l); }
.ai .svc-icon { background: rgba(46,163,18,0.1); color: var(--green); }
.svc-panel h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.3rem; font-weight: 700; color: var(--text); margin-bottom: 10px; }
.svc-panel p { color: var(--text2); font-size: 0.88rem; line-height: 1.7; margin-bottom: 20px; }
.svc-list { list-style: none; display: flex; flex-direction: column; gap: 9px; }
.svc-list li { display: flex; align-items: center; gap: 9px; font-size: 0.86rem; color: var(--text); }
.tech .svc-list li i { color: var(--blue-l); font-size: 0.72rem; }
.ai .svc-list li i { color: var(--green); font-size: 0.72rem; }
.news-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 26px; flex-wrap: wrap; gap: 12px; }
.news-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.news-card { background: var(--card); border-radius: 16px; overflow: hidden; border: 1px solid var(--border); cursor: pointer; box-shadow: 0 2px 12px rgba(26,58,143,0.05); transition: transform 0.3s, box-shadow 0.3s; }
.news-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(42,82,201,0.12); }
.news-thumb { height: 150px; display: flex; align-items: center; justify-content: center; font-size: 2.6rem; }
.news-body { padding: 20px; }
.cat { display: inline-flex; align-items: center; gap: 5px; font-size: 0.69rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; padding: 3px 9px; border-radius: 5px; margin-bottom: 8px; }
.news-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.95rem; font-weight: 700; color: var(--text); margin-bottom: 8px; line-height: 1.4; }
.news-excerpt { color: var(--text2); font-size: 0.82rem; line-height: 1.6; }
.news-date { color: var(--gray); font-size: 0.75rem; margin-top: 12px; display: flex; align-items: center; gap: 5px; }
.newsletter-modal { background: var(--card); border-radius: 20px; padding: 32px; max-width: 420px; width: 100%; border: 1px solid var(--border); position: relative; box-shadow: 0 20px 60px rgba(26,58,143,0.18); }
.newsletter-modal h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.2rem; font-weight: 700; color: var(--text); margin-bottom: 6px; }
.newsletter-modal p { color: var(--text2); font-size: 0.86rem; margin-bottom: 20px; }
.partner-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
.benefits { display: flex; flex-direction: column; gap: 13px; margin-top: 26px; }
.benefit { display: flex; gap: 13px; align-items: flex-start; background: var(--card); border-radius: 14px; padding: 17px; border: 1px solid var(--border); box-shadow: 0 2px 10px rgba(26,58,143,0.05); transition: all 0.3s; }
.benefit:hover { border-color: rgba(46,163,18,0.3); box-shadow: 0 5px 18px rgba(46,163,18,0.1); transform: translateY(-2px); }
.ben-icon { width: 40px; height: 40px; border-radius: 11px; background: rgba(46,163,18,0.1); color: var(--green); display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
.ben-text h4 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.9rem; font-weight: 700; color: var(--text); margin-bottom: 3px; }
.ben-text p { color: var(--text2); font-size: 0.81rem; line-height: 1.5; }
.contact-layout { display: grid; grid-template-columns: 1fr 1.4fr; gap: 50px; align-items: start; }
.contact-cards { display: flex; flex-direction: column; gap: 14px; margin-top: 26px; }
.ccard { display: flex; gap: 13px; align-items: center; }
.ccard-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(42,82,201,0.08); border: 1px solid rgba(42,82,201,0.15); display: flex; align-items: center; justify-content: center; font-size: 1.05rem; color: var(--blue-l); flex-shrink: 0; }
.ccard-lbl { font-size: 0.79rem; color: var(--gray); }
.ccard-val { font-size: 0.91rem; font-weight: 500; color: var(--text); }
.promo-layout { display: grid; grid-template-columns: 340px 1fr; gap: 56px; align-items: start; }
.promo-card { background: var(--card); border-radius: 24px; overflow: hidden; border: 1px solid var(--border); box-shadow: 0 8px 32px rgba(26,58,143,0.1); position: sticky; top: 20px; }
.promo-photo-wrap { position: relative; width: 100%; height: 320px; overflow: hidden; }
.promo-photo-wrap img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
.promo-photo-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 50%, rgba(15,30,61,0.85) 100%); }
.promo-photo-name { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; }
.promo-photo-name h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.1rem; font-weight: 800; color: #fff; margin-bottom: 4px; }
.promo-photo-name span { display: inline-flex; align-items: center; gap: 6px; font-size: 0.78rem; color: rgba(255,255,255,0.75); background: rgba(255,255,255,0.12); border-radius: 100px; padding: 4px 12px; }
.promo-card-body { padding: 20px; }
.promo-quote { background: linear-gradient(135deg, rgba(42,82,201,0.06), rgba(46,163,18,0.06)); border-left: 3px solid var(--blue-l); border-radius: 0 12px 12px 0; padding: 14px 16px; margin-bottom: 16px; }
.promo-quote p { font-style: italic; font-size: 0.88rem; color: var(--text2); line-height: 1.6; }
.promo-quote cite { display: block; margin-top: 8px; font-size: 0.75rem; color: var(--blue-l); font-weight: 600; font-style: normal; }
.promo-socials { display: flex; gap: 8px; }
.promo-soc { width: 36px; height: 36px; border-radius: 10px; background: var(--bg2); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 0.85rem; color: var(--gray); cursor: pointer; transition: all 0.2s; text-decoration: none; }
.promo-soc:hover { background: rgba(42,82,201,0.1); border-color: rgba(42,82,201,0.3); color: var(--blue-l); }
.promo-content { display: flex; flex-direction: column; gap: 28px; }
.promo-section { background: var(--card); border-radius: 20px; padding: 28px; border: 1px solid var(--border); box-shadow: 0 2px 12px rgba(26,58,143,0.05); }
.promo-section-title { display: flex; align-items: center; gap: 10px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; font-weight: 800; color: var(--text); margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
.promo-section-title i { color: var(--blue-l); font-size: 0.95rem; }
.promo-bio { color: var(--text2); font-size: 0.92rem; line-height: 1.85; }
.promo-bio p { margin-bottom: 12px; }
.promo-bio p:last-child { margin-bottom: 0; }
.promo-mots { background: linear-gradient(135deg, rgba(42,82,201,0.04), rgba(46,163,18,0.04)); border-radius: 16px; padding: 28px; border: 1px solid var(--border); position: relative; overflow: hidden; }
.promo-mots::before { content: '"'; position: absolute; top: -10px; left: 16px; font-size: 8rem; color: rgba(42,82,201,0.07); font-family: Georgia, serif; line-height: 1; pointer-events: none; }
.promo-mots p { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.15rem; font-weight: 700; color: var(--text); line-height: 1.6; font-style: italic; position: relative; z-index: 1; }
.promo-mots cite { display: flex; align-items: center; gap: 8px; margin-top: 14px; font-size: 0.82rem; color: var(--blue-l); font-weight: 600; font-style: normal; position: relative; z-index: 1; }
.promo-mots cite::before { content: ''; width: 24px; height: 2px; background: var(--blue-l); border-radius: 1px; }
.promo-timeline { display: flex; flex-direction: column; gap: 0; }
.timeline-item { display: flex; gap: 16px; position: relative; }
.timeline-item:not(:last-child)::after { content: ''; position: absolute; left: 19px; top: 40px; bottom: -8px; width: 2px; background: var(--border); }
.timeline-dot { width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; border: 2px solid var(--border); background: var(--card); color: var(--blue-l); z-index: 1; }
.timeline-body { padding-bottom: 24px; flex: 1; }
.timeline-year { font-size: 0.72rem; font-weight: 700; color: var(--blue-l); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 3px; }
.timeline-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.92rem; font-weight: 700; color: var(--text); margin-bottom: 3px; }
.timeline-desc { font-size: 0.82rem; color: var(--text2); line-height: 1.5; }
.legal-content { max-width: 760px; }
.legal-section { margin-bottom: 36px; }
.legal-section h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--text); margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
.legal-section h3 i { color: var(--blue-l); font-size: 0.95rem; }
.legal-section p { color: var(--text2); font-size: 0.9rem; line-height: 1.8; margin-bottom: 8px; }
.legal-section ul { list-style: none; display: flex; flex-direction: column; gap: 7px; padding-left: 4px; }
.legal-section ul li { color: var(--text2); font-size: 0.9rem; display: flex; align-items: flex-start; gap: 8px; }
.legal-section ul li i { color: var(--blue-l); font-size: 0.72rem; margin-top: 4px; flex-shrink: 0; }
.legal-alert { background: rgba(42,82,201,0.06); border: 1px solid rgba(42,82,201,0.18); border-radius: 12px; padding: 16px 20px; margin-bottom: 28px; display: flex; align-items: flex-start; gap: 12px; color: var(--text2); font-size: 0.88rem; line-height: 1.6; }
.legal-alert i { color: var(--blue-l); font-size: 1rem; margin-top: 2px; flex-shrink: 0; }
.footer { background: #070d1a; border-top: 1px solid rgba(255,255,255,0.07); padding: 48px 56px 26px; }
.footer-top { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 32px; margin-bottom: 38px; }
.footer-desc { color: rgba(255,255,255,0.45); font-size: 0.84rem; line-height: 1.7; max-width: 250px; margin-top: 13px; }
.footer-col h4 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.86rem; font-weight: 700; margin-bottom: 13px; color: rgba(255,255,255,0.9); }
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 9px; }
.footer-col ul button { background: none; border: none; cursor: pointer; color: rgba(255,255,255,0.4); font-family: 'DM Sans', sans-serif; font-size: 0.84rem; display: flex; align-items: center; gap: 7px; padding: 0; transition: color 0.2s; }
.footer-col ul button:hover { color: #fff; }
.footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.3); font-size: 0.79rem; flex-wrap: wrap; gap: 12px; }
.socials { display: flex; gap: 9px; }
.soc { width: 33px; height: 33px; border-radius: 8px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.2s; text-decoration: none; }
.soc:hover { background: rgba(42,82,201,0.4); border-color: rgba(42,82,201,0.5); color: #fff; }
.form-box { background: var(--card); border-radius: 20px; padding: 38px; border: 1px solid var(--border); max-width: 680px; box-shadow: 0 4px 20px rgba(26,58,143,0.06); transition: background 0.3s; }
.form-box h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.35rem; font-weight: 700; color: var(--text); margin-bottom: 6px; }
.form-box .sub { color: var(--text2); font-size: 0.88rem; margin-bottom: 26px; }
.frow { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; margin-bottom: 13px; }
.fg { display: flex; flex-direction: column; gap: 6px; margin-bottom: 13px; }
.fg label { font-size: 0.81rem; color: var(--gray); font-weight: 500; display: flex; align-items: center; gap: 6px; }
.fg input, .fg textarea { background: var(--bg); border: 1.5px solid var(--border); border-radius: 10px; padding: 11px 14px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.88rem; outline: none; transition: border-color 0.2s, box-shadow 0.2s; width: 100%; }
.fg input:focus, .fg textarea:focus { border-color: var(--blue-l); box-shadow: 0 0 0 3px rgba(42,82,201,0.1); }
.fg textarea { resize: vertical; min-height: 110px; }
.upload { border: 2px dashed var(--border); border-radius: 10px; padding: 24px; text-align: center; cursor: pointer; transition: all 0.2s; margin-bottom: 13px; background: var(--bg); }
.upload:hover { border-color: var(--blue-l); background: rgba(42,82,201,0.03); }
.upload i { font-size: 1.7rem; color: var(--gray); display: block; margin-bottom: 7px; }
.upload p { color: var(--gray); font-size: 0.83rem; }
.upload span { color: var(--blue-l); font-weight: 600; }
.custom-select-wrap { position: relative; }
.custom-select-trigger { background: var(--bg); border: 1.5px solid var(--border); border-radius: 10px; padding: 11px 14px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.88rem; cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: border-color 0.2s, box-shadow 0.2s; user-select: none; }
.custom-select-trigger:hover { border-color: rgba(42,82,201,0.4); }
.custom-select-trigger.open { border-color: var(--blue-l); box-shadow: 0 0 0 3px rgba(42,82,201,0.1); border-radius: 10px 10px 0 0; }
.custom-select-trigger i { color: var(--gray); font-size: 0.8rem; transition: transform 0.2s; }
.custom-select-trigger.open i { transform: rotate(180deg); }
.custom-select-dropdown { position: absolute; top: 100%; left: 0; right: 0; z-index: 50; background: var(--card); border: 1.5px solid var(--blue-l); border-top: none; border-radius: 0 0 10px 10px; box-shadow: 0 8px 24px rgba(42,82,201,0.15); overflow: hidden; }
.custom-select-option { padding: 10px 14px; font-size: 0.88rem; color: var(--text); cursor: pointer; display: flex; align-items: center; gap: 8px; transition: background 0.15s; }
.custom-select-option:hover { background: var(--bg2); }
.custom-select-option.selected { background: rgba(42,82,201,0.07); color: var(--blue-l); font-weight: 600; }
.custom-select-option i { color: var(--gray); font-size: 0.82rem; width: 14px; }
.custom-select-option.selected i { color: var(--blue-l); }
.overlay { position: fixed; inset: 0; z-index: 200; background: rgba(15,30,61,0.55); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal { background: var(--card); border-radius: 20px; padding: 36px; max-width: 460px; width: 100%; border: 1px solid var(--border); position: relative; box-shadow: 0 20px 60px rgba(26,58,143,0.18); }
.modal h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.2rem; font-weight: 700; color: var(--text); margin-bottom: 5px; }
.modal .sub { color: var(--text2); font-size: 0.86rem; margin-bottom: 20px; }
.modal-x { position: absolute; top: 13px; right: 13px; background: var(--bg2); border: 1px solid var(--border); color: var(--gray); width: 28px; height: 28px; border-radius: 7px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.modal-x:hover { background: var(--bg3); color: var(--text); }
.success { text-align: center; padding: 16px 0; color: var(--green); }
.success i { font-size: 2.8rem; margin-bottom: 10px; display: block; }
.success strong { color: var(--text); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.1rem; }
@keyframes up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 1024px) {
  .hero-stats { display: none; }
  .footer-top { grid-template-columns: 1fr 1fr; }
  .promo-layout { grid-template-columns: 1fr; }
  .promo-card { position: static; }
}
@media (max-width: 768px) {
  .nav { top: 10px; left: 10px; right: 10px; }
  .nav-links { display: none; }
  .hamburger { display: flex; }
  .pages { top: 84px; }
  .page { padding: 0 20px 50px; }
  .footer { padding: 40px 20px 22px; }
  .svc-grid, .news-grid, .partner-grid, .contact-layout, .home-about { grid-template-columns: 1fr; }
  .footer-top { grid-template-columns: 1fr 1fr; }
  .hero-btns { flex-direction: column; }
  .hero-btns .btn { justify-content: center; }
  .frow { grid-template-columns: 1fr; }
  .form-box { padding: 22px 16px; }
  .modal { padding: 24px 16px; }
  .bot-panel { border-radius: 0; height: 100vh; max-height: 100vh; }
}
@media (max-width: 480px) {
  .footer-top { grid-template-columns: 1fr; }
  .news-grid { grid-template-columns: 1fr; }
}
`;

const PAGES_LIST = ["accueil","services","actualites","partenariats","contact","promoteur","mentions","confidentialite","cgu","admin"];
const NAV_ITEMS = (t) => [
  { id:"accueil",       icon:"fa-house",      label:t.nav_accueil },
  { id:"services",      icon:"fa-briefcase",  label:t.nav_services },
  { id:"actualites",    icon:"fa-newspaper",  label:t.nav_actualites },
  { id:"partenariats",  icon:"fa-handshake",  label:t.nav_partenariats },
];
const PHOTO = "/promoteur.jpg";

function CustomSelect({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const current = options.find(o => o.value === value) || options[0];
  return (
    <div className="custom-select-wrap" ref={ref}>
      <div className={`custom-select-trigger${open?" open":""}`} onClick={() => setOpen(!open)}>
        <span style={{display:"flex",alignItems:"center",gap:8}}>
          <i className={`fa-solid ${current.icon}`} style={{color:"var(--gray)",fontSize:"0.82rem",width:14}}/>
          {current.label}
        </span>
        <i className="fa-solid fa-chevron-down"/>
      </div>
      {open && (
        <div className="custom-select-dropdown">
          {options.map(o => (
            <div key={o.value} className={`custom-select-option${value===o.value?" selected":""}`}
              onClick={() => { onChange(o.value); setOpen(false); }}>
              <i className={`fa-solid ${o.icon}`}/>{o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FG({ label, icon, children }) {
  return (
    <div className="fg">
      <label><i className={`fa-solid ${icon}`}/> {label}</label>
      {children}
    </div>
  );
}

function PH({ tag, ticon, title, sub }) {
  return (
    <div className="page-hero">
      <div className="page-hero-inner">
        <div className="page-tag"><i className={`fa-solid ${ticon}`}/> {tag}</div>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
    </div>
  );
}

function Alert({ type, msg }) {
  if (!msg) return null;
  return (
    <div className={`alert alert-${type}`}>
      <i className={`fa-solid ${type==="success"?"fa-circle-check":"fa-circle-exclamation"}`}/>
      {msg}
    </div>
  );
}

function LangSelector({ lang, setLang, t }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{padding:"0 4px"}}>
      <button style={{background:"none",border:"none",cursor:"pointer",color:"var(--gray)",fontFamily:"'DM Sans',sans-serif",fontSize:"0.97rem",padding:"12px 14px",borderRadius:12,textAlign:"left",display:"flex",alignItems:"center",gap:10,width:"100%",justifyContent:"space-between"}}
        onClick={()=>setOpen(!open)}>
        <span style={{display:"flex",alignItems:"center",gap:10}}>
          <i className="fa-solid fa-globe"/>
          {t.lang_label} — <strong>{lang==="fr"?"Français":"English"}</strong>
        </span>
        <i className={`fa-solid fa-chevron-${open?"up":"down"}`} style={{fontSize:"0.8rem"}}/>
      </button>
      {open && (
        <div style={{paddingLeft:16,display:"flex",flexDirection:"column",gap:4,marginBottom:8}}>
          {[{code:"fr",flag:"🇫🇷",label:"Français"},{code:"en",flag:"🇬🇧",label:"English"}].map(l=>(
            <button key={l.code} onClick={()=>{ setLang(l.code); setOpen(false); }}
              style={{background:lang===l.code?"rgba(42,82,201,0.08)":"none",border:"none",cursor:"pointer",color:lang===l.code?"var(--blue-l)":"var(--gray)",fontFamily:"'DM Sans',sans-serif",fontSize:"0.9rem",padding:"10px 14px",borderRadius:10,textAlign:"left",display:"flex",alignItems:"center",gap:10,fontWeight:lang===l.code?600:400}}>
              {l.flag} {l.label}
              {lang===l.code && <i className="fa-solid fa-check" style={{marginLeft:"auto",fontSize:"0.8rem"}}/>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── BOT IA ──
function BotIA({ lang, onClose }) {
  const t = T[lang];
  const [messages, setMessages] = useState([
    { role:"assistant", content: t.bot_welcome, time: new Date().toLocaleTimeString(lang==="fr"?"fr-FR":"en-US",{hour:"2-digit",minute:"2-digit"}) }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = lang==="fr"
    ? ["Quels sont vos services ?", "Comment vous contacter ?", "Qui est le fondateur ?", "Moyens de paiement ?"]
    : ["What are your services?", "How to contact you?", "Who is the founder?", "Payment methods?"];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");
    const time = new Date().toLocaleTimeString(lang==="fr"?"fr-FR":"en-US",{hour:"2-digit",minute:"2-digit"});
    const newMessages = [...messages, { role:"user", content:userText, time }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_KEY}`
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            { role:"system", content: INESTID_CONTEXT },
            ...newMessages.map(m => ({ role: m.role, content: m.content }))
          ],
          max_tokens: 512,
          temperature: 0.7,
        })
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || t.bot_error;
      setMessages(prev => [...prev, {
        role:"assistant",
        content: reply,
        time: new Date().toLocaleTimeString(lang==="fr"?"fr-FR":"en-US",{hour:"2-digit",minute:"2-digit"})
      }]);
    } catch {
      setMessages(prev => [...prev, { role:"assistant", content: t.bot_error, time: new Date().toLocaleTimeString() }]);
    }
    setLoading(false);
  };

  return (
    <div className="bot-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="bot-panel">
        {/* HEADER */}
        <div className="bot-header">
          <div className="bot-avatar"><i className="fa-solid fa-robot"/></div>
          <div className="bot-header-info">
            <div className="bot-header-title">{t.bot_title}</div>
            <div className="bot-header-sub">
              <span className="bot-online"/>
              {t.bot_subtitle}
            </div>
          </div>
          <button className="bot-close" onClick={onClose}><i className="fa-solid fa-xmark"/></button>
        </div>

        {/* MESSAGES */}
        <div className="bot-messages">
          {messages.map((m, i) => (
            <div key={i} className={`bot-msg ${m.role}`}>
              <div className="bot-msg-avatar">
                <i className={`fa-solid ${m.role==="assistant"?"fa-robot":"fa-user"}`}/>
              </div>
              <div>
                <div className="bot-msg-bubble">{m.content}</div>
                <div className="bot-msg-time">{m.time}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="bot-msg bot">
              <div className="bot-msg-avatar"><i className="fa-solid fa-robot"/></div>
              <div className="bot-typing"><span/><span/><span/></div>
            </div>
          )}
          <div ref={messagesEndRef}/>
        </div>

        {/* SUGGESTIONS */}
        {messages.length <= 2 && (
          <div className="bot-suggestions">
            {suggestions.map(s=>(
              <button key={s} className="bot-suggestion" onClick={()=>sendMessage(s)}>{s}</button>
            ))}
          </div>
        )}

        {/* INPUT */}
        <div className="bot-input-area">
          <textarea
            ref={inputRef}
            className="bot-input"
            placeholder={t.bot_placeholder}
            value={input}
            rows={1}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage();} }}
          />
          <button className="bot-send" onClick={()=>sendMessage()} disabled={loading||!input.trim()}>
            <i className="fa-solid fa-paper-plane"/>
          </button>
        </div>
        <div className="bot-powered">Powered by INESTID AI · Llama 3</div>
      </div>
    </div>
  );
}

function HomePage({ nav, lang }) {
  const t = T[lang];
  return (
    <div>
      <div className="home-hero">
        <div className="hero-bg"/><div className="hero-grid"/>
        <div className="hero-body">
          <div className="badge"><span className="dot"/> {t.hero_badge}</div>
          <h1>{t.hero_t1} <span className="b">{t.hero_t2}</span> &<br/>{t.hero_t3} <span className="g">{t.hero_t4}</span></h1>
          <p className="hero-desc">{t.hero_desc}</p>
          <div className="hero-btns">
            <button className="btn btn-blue" onClick={()=>nav("services")}><i className="fa-solid fa-rocket"/> {t.hero_btn1}</button>
            <button className="btn btn-outline" onClick={()=>nav("contact")}><i className="fa-solid fa-envelope"/> {t.hero_btn2}</button>
          </div>
        </div>
        <div className="hero-stats">
          {[["150+",t.hero_s1],["8",t.hero_s2],["2",t.hero_s3]].map(([n,l])=>(
            <div className="stat" key={l}><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
          ))}
        </div>
      </div>
      <div className="home-sections">
        <div className="home-about">
          <div className="about-text">
            <div className="page-tag" style={{marginBottom:12}}><i className="fa-solid fa-circle-info"/> {t.about_tag}</div>
            <h2>{t.about_title}</h2>
            <p>{t.about_p1}</p>
            <p>{t.about_p2}</p>
            <button className="btn btn-blue" style={{marginTop:18}} onClick={()=>nav("services")}><i className="fa-solid fa-arrow-right"/> {t.about_btn}</button>
          </div>
          <div className="about-cards">
            {[
              {icon:"fa-laptop-code",   bg:"rgba(42,82,201,0.1)",  col:"var(--blue-l)", title:t.about_c1, desc:t.about_c1d},
              {icon:"fa-brain",         bg:"rgba(46,163,18,0.1)",  col:"var(--green)",  title:t.about_c2, desc:t.about_c2d},
              {icon:"fa-users",         bg:"rgba(217,119,6,0.1)",  col:"#d97706",       title:t.about_c3, desc:t.about_c3d},
              {icon:"fa-shield-halved", bg:"rgba(42,82,201,0.08)", col:"var(--blue-l)", title:t.about_c4, desc:t.about_c4d},
            ].map(c=>(
              <div className="about-card" key={c.title}>
                <div className="about-card-icon" style={{background:c.bg,color:c.col}}><i className={`fa-solid ${c.icon}`}/></div>
                <div><h4>{c.title}</h4><p>{c.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesPage({ lang }) {
  const t = T[lang];
  const [openTech, setOpenTech] = useState(null);
  const [openAi, setOpenAi] = useState(null);

  const tech = lang==="fr" ? [
    { titre:"Développement web & applications mobiles", details:["Sites vitrine et e-commerce","Applications mobiles iOS et Android","Interfaces modernes et responsive","Intégration API et bases de données"] },
    { titre:"Infrastructure réseau & cloud", details:["Installation et configuration de réseaux","Hébergement cloud sécurisé","Virtualisation et serveurs","Sauvegarde et reprise après sinistre"] },
    { titre:"Cybersécurité & protection des données", details:["Audit de sécurité informatique","Protection contre les cyberattaques","Chiffrement et sécurisation des données","Formation à la cybersécurité"] },
    { titre:"Maintenance et support technique", details:["Support technique 24/7","Maintenance préventive et corrective","Mise à jour des systèmes","Assistance à distance et sur site"] },
    { titre:"Conseil et audit informatique", details:["Audit du système d'information","Conseil en transformation digitale","Optimisation des processus","Accompagnement stratégique IT"] },
  ] : [
    { titre:"Web development & mobile apps", details:["Showcase and e-commerce sites","iOS and Android apps","Modern responsive interfaces","API and database integration"] },
    { titre:"Network infrastructure & cloud", details:["Network installation","Secure cloud hosting","Virtualization and servers","Backup and disaster recovery"] },
    { titre:"Cybersecurity & data protection", details:["IT security audit","Protection against cyberattacks","Data encryption","Cybersecurity training"] },
    { titre:"Maintenance and technical support", details:["24/7 technical support","Preventive maintenance","System updates","Remote and on-site assistance"] },
    { titre:"IT consulting and audit", details:["Information system audit","Digital transformation consulting","Process optimization","Strategic IT support"] },
  ];

  const ai = lang==="fr" ? [
    { titre:"Développement de solutions IA", details:["Conception d'algorithmes ML","Intégration de modèles IA","Solutions IA sur mesure","Déploiement et maintenance des modèles"] },
    { titre:"Analyse et traitement de données", details:["Collecte et nettoyage de données","Analyse statistique avancée","Visualisation de données","Big Data et entrepôts de données"] },
    { titre:"Automatisation des processus", details:["Automatisation RPA","Optimisation des flux de travail","Réduction des tâches répétitives","Intégration de systèmes intelligents"] },
    { titre:"Chatbots et assistants virtuels", details:["Conception de chatbots intelligents","Intégration WhatsApp, Messenger, Web","Traitement du langage naturel (NLP)","Support client automatisé 24/7"] },
    { titre:"Machine Learning & prédiction", details:["Modèles prédictifs personnalisés","Analyse de sentiment","Détection d'anomalies","Recommandations intelligentes"] },
  ] : [
    { titre:"AI solution development", details:["ML algorithm design","AI model integration","Custom AI solutions","Model deployment and maintenance"] },
    { titre:"Data analysis and processing", details:["Data collection and cleaning","Advanced statistical analysis","Data visualization","Big Data and data warehouses"] },
    { titre:"Process automation", details:["RPA automation","Workflow optimization","Reduction of repetitive tasks","Intelligent system integration"] },
    { titre:"Chatbots and virtual assistants", details:["Intelligent chatbot design","WhatsApp, Messenger, Web integration","Natural language processing (NLP)","Automated 24/7 customer support"] },
    { titre:"Machine Learning & prediction", details:["Custom predictive models","Sentiment analysis","Anomaly detection","Smart recommendations"] },
  ];

  return (
    <div>
      <PH tag={t.svc_tag} ticon="fa-briefcase" title={t.svc_title} sub={t.svc_sub}/>
      <div className="svc-grid">
        <div className="svc-panel tech">
          <div className="svc-icon"><i className="fa-solid fa-laptop-code"/></div>
          <h3>{t.svc_tech_title}</h3>
          <p>{t.svc_tech_desc}</p>
          <ul className="svc-list">
            {tech.map((s,i)=>(
              <li key={i} style={{flexDirection:"column",alignItems:"flex-start",gap:0}}>
                <div style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer",width:"100%",padding:"6px 0"}} onClick={()=>setOpenTech(openTech===i?null:i)}>
                  <i className="fa-solid fa-circle-check" style={{color:"var(--blue-l)",fontSize:"0.72rem",flexShrink:0}}/>
                  <span style={{flex:1}}>{s.titre}</span>
                  <i className={`fa-solid fa-chevron-${openTech===i?"up":"down"}`} style={{fontSize:"0.7rem",color:"var(--gray)"}}/>
                </div>
                {openTech===i && <ul style={{listStyle:"none",paddingLeft:22,marginTop:6,marginBottom:6,display:"flex",flexDirection:"column",gap:5}}>
                  {s.details.map((d,j)=>(
                    <li key={j} style={{fontSize:"0.8rem",color:"var(--text2)",display:"flex",alignItems:"center",gap:7}}>
                      <i className="fa-solid fa-arrow-right" style={{color:"var(--blue-g)",fontSize:"0.65rem",flexShrink:0}}/>{d}
                    </li>
                  ))}
                </ul>}
              </li>
            ))}
          </ul>
        </div>
        <div className="svc-panel ai">
          <div className="svc-icon"><i className="fa-solid fa-brain"/></div>
          <h3>{t.svc_ai_title}</h3>
          <p>{t.svc_ai_desc}</p>
          <ul className="svc-list">
            {ai.map((s,i)=>(
              <li key={i} style={{flexDirection:"column",alignItems:"flex-start",gap:0}}>
                <div style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer",width:"100%",padding:"6px 0"}} onClick={()=>setOpenAi(openAi===i?null:i)}>
                  <i className="fa-solid fa-circle-check" style={{color:"var(--green)",fontSize:"0.72rem",flexShrink:0}}/>
                  <span style={{flex:1}}>{s.titre}</span>
                  <i className={`fa-solid fa-chevron-${openAi===i?"up":"down"}`} style={{fontSize:"0.7rem",color:"var(--gray)"}}/>
                </div>
                {openAi===i && <ul style={{listStyle:"none",paddingLeft:22,marginTop:6,marginBottom:6,display:"flex",flexDirection:"column",gap:5}}>
                  {s.details.map((d,j)=>(
                    <li key={j} style={{fontSize:"0.8rem",color:"var(--text2)",display:"flex",alignItems:"center",gap:7}}>
                      <i className="fa-solid fa-arrow-right" style={{color:"var(--green-l)",fontSize:"0.65rem",flexShrink:0}}/>{d}
                    </li>
                  ))}
                </ul>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ActualitesPage({ lang, onArticleClick }) {
  const t = T[lang];
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtre, setFiltre] = useState("Tout");
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");

  const SUPABASE_URL = "https://upmwjlgqzjjhotoahwaa.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwbXdqbGdxempqaG90b2Fod2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3OTE3MjksImV4cCI6MjA5NjM2NzcyOX0.KnFffTUZlVNd5okLFGGL2Mx7uB22DOgm6aa8nigoxSg";

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/actualites?select=*&order=created_at.desc`, {
      headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
    })
    .then(r => r.json())
    .then(data => { setArticles(data || []); setLoading(false); })
    .catch(() => setLoading(false));
  }, []);

  const filtres = lang==="fr" ? ["Tout","Informatique","IA & Data","Entreprise"] : ["All","IT","AI & Data","Company"];
  const articlesFiltres = filtre==="Tout"||filtre==="All" ? articles : articles.filter(a=>a.categorie===filtre);

  const catStyle = {
    "Informatique": { col:"var(--blue-l)", bg:"rgba(42,82,201,0.08)", icon:"fa-microchip" },
    "IA & Data":    { col:"var(--green)",  bg:"rgba(46,163,18,0.08)",  icon:"fa-brain" },
    "Entreprise":   { col:"#d97706",       bg:"rgba(217,119,6,0.08)",  icon:"fa-trophy" },
  };

  const handleAbonner = async () => {
    if (!email) return;
    setSending(true);
    try {
      const res = await fetch(`${API}/api/abonner`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({email}) });
      const data = await res.json();
      setMsg(data.message); setMsgType(data.success?"success":"error");
      if (data.success) setEmail("");
    } catch { setMsg("Erreur"); setMsgType("error"); }
    setSending(false);
  };

  return (
    <div>
      <PH tag={t.news_tag} ticon="fa-newspaper" title={t.news_title} sub={t.news_sub}/>
      <div className="news-bar">
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {filtres.map(f=>(
            <button key={f} className={`btn ${filtre===f?"btn-blue":"btn-outline"}`} style={{padding:"7px 14px",fontSize:"0.81rem"}} onClick={()=>setFiltre(f)}>{f}</button>
          ))}
        </div>
        <button className="btn btn-blue" style={{fontSize:"0.81rem"}} onClick={()=>setShowNewsletter(true)}>
          <i className="fa-solid fa-rss"/> {t.news_subscribe}
        </button>
      </div>
      {loading && <div style={{textAlign:"center",padding:"40px",color:"var(--gray)"}}><i className="fa-solid fa-spinner fa-spin" style={{fontSize:"2rem",marginBottom:12,display:"block"}}/>Chargement...</div>}
      {!loading && articlesFiltres.length===0 && <div style={{textAlign:"center",padding:"40px",color:"var(--gray)"}}><i className="fa-solid fa-newspaper" style={{fontSize:"2rem",marginBottom:12,display:"block"}}/>{t.news_empty}</div>}
      <div className="news-grid">
        {articlesFiltres.map(a=>{
          const st = catStyle[a.categorie]||catStyle["Entreprise"];
          return (
            <div className="news-card" key={a.id}>
              <div className="news-thumb" style={{background:a.image_url?"none":`linear-gradient(135deg,${st.bg},rgba(13,24,41,0.1))`,backgroundImage:a.image_url?`url(${a.image_url})`:"none",backgroundSize:"cover",backgroundPosition:"center"}}>
                {!a.image_url && <i className={`fa-solid ${st.icon}`} style={{fontSize:"2.5rem",color:st.col}}/>}
              </div>
              <div className="news-body">
                <span className="cat" style={{color:st.col,background:st.bg}}><i className={`fa-solid ${st.icon}`}/>{a.categorie}</span>
                <h3 className="news-title">{a.titre}</h3>
                <p className="news-excerpt">{a.contenu?.slice(0,120)}{a.contenu?.length>120?"...":""}</p>
                {a.contenu?.length>120 && (
                  <button style={{background:"none",border:"none",cursor:"pointer",color:"var(--blue-l)",fontSize:"0.82rem",fontWeight:600,padding:"4px 0",display:"flex",alignItems:"center",gap:5}} onClick={()=>onArticleClick(a)}>
                    <i className="fa-solid fa-chevron-down" style={{fontSize:"0.7rem"}}/>{lang==="fr"?"Voir plus":"Read more"}
                  </button>
                )}
                {a.lien_externe && (
                  <a href={a.lien_externe} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,color:"var(--green)",fontSize:"0.82rem",fontWeight:600,textDecoration:"none",marginTop:6}}>
                    <i className="fa-solid fa-arrow-up-right-from-square" style={{fontSize:"0.72rem"}}/>{lang==="fr"?"Visiter le site":"Visit website"}
                  </a>
                )}
                <p className="news-date"><i className="fa-regular fa-calendar"/>{new Date(a.date_pub||a.created_at).toLocaleDateString(lang==="fr"?"fr-FR":"en-US")}</p>
              </div>
            </div>
          );
        })}
      </div>
      {showNewsletter && (
        <div className="overlay" onClick={e=>e.target===e.currentTarget&&setShowNewsletter(false)}>
          <div className="newsletter-modal">
            <button className="modal-x" onClick={()=>setShowNewsletter(false)}><i className="fa-solid fa-xmark"/></button>
            <h3><i className="fa-solid fa-rss" style={{color:"var(--blue-l)",marginRight:8}}/>{t.newsletter_title}</h3>
            <p>{t.newsletter_desc}</p>
            <FG label={t.newsletter_email} icon="fa-envelope"><input type="email" placeholder="email@exemple.com" value={email} onChange={e=>setEmail(e.target.value)}/></FG>
            <button className="btn btn-blue btn-full" onClick={handleAbonner} disabled={sending}>
              <i className="fa-solid fa-paper-plane"/>{sending?t.newsletter_sending:t.newsletter_btn}
            </button>
            <Alert type={msgType} msg={msg}/>
          </div>
        </div>
      )}
    </div>
  );
}

function PartenariatsPage({ lang }) {
  const t = T[lang];
  const [onglet, setOnglet] = useState("partenaires");
  const [partenaires, setPartenaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("comm");
  const [form, setForm] = useState({ organisation:"", contact:"", email:"", proposition:"" });
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");

  const SUPABASE_URL = "https://upmwjlgqzjjhotoahwaa.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwbXdqbGdxempqaG90b2Fod2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3OTE3MjksImV4cCI6MjA5NjM2NzcyOX0.KnFffTUZlVNd5okLFGGL2Mx7uB22DOgm6aa8nigoxSg";

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/partenaires?select=*&order=created_at.desc`, {
      headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
    })
    .then(r => r.json())
    .then(data => { setPartenaires(data||[]); setLoading(false); })
    .catch(() => setLoading(false));
  }, []);

  const typeOpts = [
    {value:"comm",  icon:"fa-store",            label:t.collab_p1},
    {value:"tech",  icon:"fa-microchip",        label:t.collab_p2},
    {value:"inst",  icon:"fa-building-columns", label:t.collab_p3},
    {value:"inv",   icon:"fa-chart-line",       label:t.collab_p4},
    {value:"autre", icon:"fa-ellipsis",         label:lang==="fr"?"Autre":"Other"},
  ];

  const handlePartner = async () => {
    if (!form.organisation||!form.email) { setMsg(lang==="fr"?"Champs obligatoires.":"Required fields."); setMsgType("error"); return; }
    setSending(true);
    try {
      const res = await fetch(`${API}/api/contact`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ nom:form.contact, email:form.email, service:`Partnership — ${typeOpts.find(t=>t.value===type)?.label}`, message:`Org: ${form.organisation}\n\n${form.proposition}` })
      });
      const data = await res.json();
      setMsg(data.success?(lang==="fr"?"Proposition envoyée !":"Proposal sent!"):data.message);
      setMsgType(data.success?"success":"error");
      if (data.success) setForm({organisation:"",contact:"",email:"",proposition:""});
    } catch { setMsg(lang==="fr"?"Erreur.":"Error."); setMsgType("error"); }
    setSending(false);
  };

  return (
    <div>
      <PH tag={t.part_tag} ticon="fa-handshake" title={t.part_title} sub={t.part_sub}/>
      <div style={{display:"flex",gap:8,marginBottom:36}}>
        <button className={`btn ${onglet==="partenaires"?"btn-blue":"btn-outline"}`} onClick={()=>setOnglet("partenaires")} style={{fontSize:"0.88rem"}}><i className="fa-solid fa-star"/>{t.part_tab1}</button>
        <button className={`btn ${onglet==="collaborons"?"btn-blue":"btn-outline"}`} onClick={()=>setOnglet("collaborons")} style={{fontSize:"0.88rem"}}><i className="fa-solid fa-handshake"/>{t.part_tab2}</button>
      </div>
      {onglet==="partenaires" && (
        <div>
          {loading && <div style={{textAlign:"center",padding:"40px",color:"var(--gray)"}}><i className="fa-solid fa-spinner fa-spin" style={{fontSize:"2rem",display:"block",marginBottom:12}}/>Chargement...</div>}
          {!loading && partenaires.length===0 && (
            <div style={{textAlign:"center",padding:"60px 20px",color:"var(--gray)"}}>
              <i className="fa-solid fa-handshake" style={{fontSize:"3rem",marginBottom:16,display:"block",opacity:0.3}}/>
              <p style={{fontSize:"1rem",fontWeight:600,color:"var(--text)",marginBottom:8}}>{t.part_empty}</p>
              <p style={{fontSize:"0.88rem"}}>{t.part_become}</p>
              <button className="btn btn-blue" style={{marginTop:20}} onClick={()=>setOnglet("collaborons")}><i className="fa-solid fa-handshake"/>{t.part_propose_btn}</button>
            </div>
          )}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16}}>
            {partenaires.map(p=>(
              <div key={p.id} style={{background:"var(--card)",borderRadius:16,padding:"20px",border:"1px solid var(--border)",boxShadow:"0 4px 20px rgba(26,58,143,0.06)",textAlign:"center",transition:"all 0.3s"}}>
                {p.logo_url ? <img src={p.logo_url} alt={p.nom} style={{width:70,height:70,objectFit:"contain",borderRadius:10,marginBottom:12,padding:6}}/> : <div style={{width:70,height:70,borderRadius:10,background:"var(--bg2)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontSize:"1.6rem",color:"var(--gray)"}}><i className="fa-solid fa-building"/></div>}
                <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"0.95rem",fontWeight:700,color:"var(--text)",marginBottom:6}}>{p.nom}</h3>
                {p.description && <p style={{fontSize:"0.8rem",color:"var(--text2)",lineHeight:1.6,marginBottom:10}}>{p.description}</p>}
                {p.site_web && <a href={p.site_web} target="_blank" rel="noreferrer" className="btn btn-outline" style={{fontSize:"0.75rem",padding:"6px 12px",display:"inline-flex"}}><i className="fa-solid fa-arrow-up-right-from-square"/>{t.part_visit}</a>}
              </div>
            ))}
          </div>
        </div>
      )}
      {onglet==="collaborons" && (
        <div className="partner-grid">
          <div>
            <p style={{color:"var(--text2)",fontSize:"0.93rem",lineHeight:1.75,marginBottom:8}}>{lang==="fr"?"Nous croyons en la force des alliances stratégiques.":"We believe in the power of strategic alliances."}</p>
            <div className="benefits">
              {[
                {icon:"fa-store",            title:t.collab_p1, desc:t.collab_d1},
                {icon:"fa-microchip",        title:t.collab_p2, desc:t.collab_d2},
                {icon:"fa-building-columns", title:t.collab_p3, desc:t.collab_d3},
                {icon:"fa-chart-line",       title:t.collab_p4, desc:t.collab_d4},
              ].map(b=>(
                <div className="benefit" key={b.title}><div className="ben-icon"><i className={`fa-solid ${b.icon}`}/></div><div className="ben-text"><h4>{b.title}</h4><p>{b.desc}</p></div></div>
              ))}
            </div>
          </div>
          <div className="form-box" style={{margin:0}}>
            <h3><i className="fa-solid fa-handshake" style={{color:"var(--green)",marginRight:9}}/>{t.part_form_title}</h3>
            <p className="sub">{t.part_form_sub}</p>
            <FG label={t.part_org} icon="fa-building"><input type="text" placeholder={lang==="fr"?"Votre entreprise":"Your organization"} value={form.organisation} onChange={e=>setForm({...form,organisation:e.target.value})}/></FG>
            <div className="frow">
              <FG label={t.part_contact} icon="fa-user"><input type="text" placeholder={lang==="fr"?"Nom & prénom":"Full name"} value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})}/></FG>
              <FG label={t.part_email} icon="fa-envelope"><input type="email" placeholder="contact@org.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></FG>
            </div>
            <FG label={t.part_type} icon="fa-tags"><CustomSelect options={typeOpts} value={type} onChange={setType}/></FG>
            <FG label={t.part_prop} icon="fa-pen-to-square"><textarea placeholder={lang==="fr"?"Présentez votre proposition...":"Present your proposal..."} value={form.proposition} onChange={e=>setForm({...form,proposition:e.target.value})}/></FG>
            <button className="btn btn-green btn-full" onClick={handlePartner} disabled={sending}><i className="fa-solid fa-paper-plane"/>{sending?t.part_sending:t.part_send}</button>
            <Alert type={msgType} msg={msg}/>
          </div>
        </div>
      )}
    </div>
  );
}

function ContactPage({ lang }) {
  const t = T[lang];
  const [service, setService] = useState("info");
  const [form, setForm] = useState({ prenom:"", nom:"", email:"", message:"" });
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");

  const serviceOpts = [
    {value:"info",  icon:"fa-laptop-code", label:lang==="fr"?"Informatique & Digital":"IT & Digital"},
    {value:"ai",    icon:"fa-brain",       label:lang==="fr"?"Intelligence Artificielle":"Artificial Intelligence"},
    {value:"part",  icon:"fa-handshake",   label:lang==="fr"?"Partenariat":"Partnership"},
    {value:"autre", icon:"fa-ellipsis",    label:lang==="fr"?"Autre":"Other"},
  ];

  const handleContact = async () => {
    if (!form.nom||!form.email||!form.message) { setMsg(lang==="fr"?"Champs obligatoires.":"Required fields."); setMsgType("error"); return; }
    setSending(true);
    try {
      const res = await fetch(`${API}/api/contact`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ nom:`${form.prenom} ${form.nom}`, email:form.email, service:serviceOpts.find(s=>s.value===service)?.label, message:form.message })
      });
      const data = await res.json();
      setMsg(data.message); setMsgType(data.success?"success":"error");
      if (data.success) setForm({prenom:"",nom:"",email:"",message:""});
    } catch { setMsg(lang==="fr"?"Erreur.":"Error."); setMsgType("error"); }
    setSending(false);
  };

  return (
    <div>
      <PH tag={t.contact_tag} ticon="fa-headset" title={t.contact_title} sub={t.contact_sub}/>
      <div className="contact-layout">
        <div>
          <p style={{color:"var(--text2)",fontSize:"0.93rem",lineHeight:1.75,marginBottom:4}}>{t.contact_desc}</p>
          <div className="contact-cards">
            {[
              {icon:"fa-location-dot",fab:false,lbl:t.contact_addr, val:t.contact_addr_val,href:null},
              {icon:"fa-phone",       fab:false,lbl:t.contact_phone,val:"+XXX XX XX XX XX",href:"tel:+XXX"},
              {icon:"fa-envelope",    fab:false,lbl:t.contact_email,val:"contact@inestid.com",href:"mailto:contact@inestid.com"},
              {icon:"fa-whatsapp",    fab:true, lbl:t.contact_hours,val:t.contact_hours_val,href:"https://wa.me/XXX"},
            ].map(c=>(
              <div className="ccard" key={c.lbl}>
                <div className="ccard-icon"><i className={`${c.fab?"fa-brands":"fa-solid"} ${c.icon}`}/></div>
                <div>
                  <div className="ccard-lbl">{c.lbl}</div>
                  {c.href ? <a href={c.href} style={{color:"var(--blue-l)",fontWeight:500,fontSize:"0.91rem",textDecoration:"none"}}>{c.val}</a> : <div className="ccard-val">{c.val}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="form-box" style={{margin:0}}>
          <h3><i className="fa-solid fa-comment-dots" style={{color:"var(--blue-l)",marginRight:9}}/>{t.contact_form_title}</h3>
          <p className="sub"> </p>
          <div className="frow">
            <FG label={t.contact_fn} icon="fa-user"><input type="text" placeholder={lang==="fr"?"Jean":"John"} value={form.prenom} onChange={e=>setForm({...form,prenom:e.target.value})}/></FG>
            <FG label={t.contact_ln} icon="fa-user"><input type="text" placeholder={lang==="fr"?"Dupont":"Doe"} value={form.nom} onChange={e=>setForm({...form,nom:e.target.value})}/></FG>
          </div>
          <FG label={t.contact_em} icon="fa-envelope"><input type="email" placeholder="email@exemple.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></FG>
          <FG label={t.contact_service} icon="fa-tags"><CustomSelect options={serviceOpts} value={service} onChange={setService}/></FG>
          <FG label={t.contact_msg} icon="fa-pen"><textarea placeholder={lang==="fr"?"Décrivez votre besoin...":"Describe your need..."} value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></FG>
          <button className="btn btn-blue btn-full" onClick={handleContact} disabled={sending}><i className="fa-solid fa-paper-plane"/>{sending?t.contact_sending:t.contact_send}</button>
          <Alert type={msgType} msg={msg}/>
        </div>
      </div>
    </div>
  );
}

function PromoteurPage({ lang }) {
  const t = T[lang];
  return (
    <div>
      <PH tag={t.promo_tag} ticon="fa-user-tie" title={t.promo_title} sub={t.promo_sub}/>
      <div className="promo-layout">
        <div className="promo-card">
          <div className="promo-photo-wrap">
            <img src={PHOTO} alt="YOLOU ATEKEYOLLO MATHIEU PATIENT"/>
            <div className="promo-photo-overlay"/>
            <div className="promo-photo-name">
              <h3>YOLOU A. MATHIEU PATIENT</h3>
              <span><i className="fa-solid fa-briefcase"/>{t.promo_role}</span>
            </div>
          </div>
          <div className="promo-card-body">
            <div className="promo-quote">
              <p>« Recherche, innovation et développement pour une Afrique forte. »</p>
              — YOLOU MATHIEU PATIENT
            </div>
            <div className="promo-socials">
              {[["fa-linkedin-in"],["fa-x-twitter"],["fa-facebook-f"]].map(([ic])=>(
                <a key={ic} href="/" className="promo-soc"><i className={`fa-brands ${ic}`}/></a>
              ))}
            </div>
          </div>
        </div>
        <div className="promo-content">
          <div className="promo-mots">
            <p>« Recherche, innovation et développement pour une Afrique forte. »</p>
            YOLOU ATEKEYOLLO MATHIEU PATIENT — {t.promo_role}, INESTID
          </div>
          <div className="promo-section">
            <div className="promo-section-title"><i className="fa-solid fa-id-card"/>{t.promo_bio_title}</div>
            <div className="promo-bio"><p>{t.promo_bio1}</p><p>{t.promo_bio2}</p><p>{t.promo_bio3}</p><p>{t.promo_bio4}</p></div>
          </div>
          <div className="promo-section">
            <div className="promo-section-title"><i className="fa-solid fa-timeline"/>{t.promo_parcours}</div>
            <div className="promo-timeline">
              {[
                {icon:"fa-graduation-cap",year:t.promo_t1,title:t.promo_t1t,desc:t.promo_t1d},
                {icon:"fa-lightbulb",     year:t.promo_t2,title:t.promo_t2t,desc:t.promo_t2d},
                {icon:"fa-rocket",        year:t.promo_t3,title:t.promo_t3t,desc:t.promo_t3d},
                {icon:"fa-trophy",        year:t.promo_t4,title:t.promo_t4t,desc:t.promo_t4d},
              ].map(item=>(
                <div className="timeline-item" key={item.title}>
                  <div className="timeline-dot"><i className={`fa-solid ${item.icon}`}/></div>
                  <div className="timeline-body"><div className="timeline-year">{item.year}</div><div className="timeline-title">{item.title}</div><div className="timeline-desc">{item.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="promo-section">
            <div className="promo-section-title"><i className="fa-solid fa-star"/>{t.promo_values}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[
                {icon:"fa-magnifying-glass",col:"var(--blue-l)",bg:"rgba(42,82,201,0.08)",title:t.promo_v1,desc:t.promo_v1d},
                {icon:"fa-lightbulb",       col:"#d97706",       bg:"rgba(217,119,6,0.08)",title:t.promo_v2,desc:t.promo_v2d},
                {icon:"fa-chart-line",      col:"var(--green)",  bg:"rgba(46,163,18,0.08)",title:t.promo_v3,desc:t.promo_v3d},
                {icon:"fa-shield-halved",   col:"var(--blue-l)",bg:"rgba(42,82,201,0.08)",title:t.promo_v4,desc:t.promo_v4d},
              ].map(v=>(
                <div key={v.title} style={{background:v.bg,borderRadius:14,padding:"16px"}}>
                  <div style={{width:36,height:36,borderRadius:10,background:"white",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
                    <i className={`fa-solid ${v.icon}`} style={{color:v.col,fontSize:"0.9rem"}}/>
                  </div>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"0.88rem",color:"var(--text)",marginBottom:3}}>{v.title}</div>
                  <div style={{fontSize:"0.78rem",color:"var(--text2)",lineHeight:1.5}}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MentionsPage({ lang }) {
  const t = T[lang]||T["fr"];
  return (
    <div>
      <PH tag={t.legal_tag} ticon="fa-scale-balanced" title={t.mentions_title} sub={t.mentions_sub}/>
      <div className="legal-content">
        <div className="legal-alert"><i className="fa-solid fa-circle-info"/>{t.mentions_alert}</div>
        {[
          {icon:"fa-building",  title:t.editeur,    content:<><p><strong>{lang==="fr"?"Raison sociale":"Company"} :</strong> INESTID</p><p><strong>Email :</strong> contact@inestid.com</p><p><strong>{lang==="fr"?"Siège social":"HQ"} :</strong> {lang==="fr"?"À compléter":"To be completed"}</p></>},
          {icon:"fa-server",    title:t.hebergement, content:<p>{lang==="fr"?"Ce site est hébergé par Vercel.":"This site is hosted by Vercel."}</p>},
          {icon:"fa-copyright", title:t.propriete,   content:<p>{lang==="fr"?"L'ensemble du contenu est la propriété exclusive d'INESTID.":"All content is the exclusive property of INESTID."}</p>},
          {icon:"fa-gavel",     title:t.droit_app,   content:<p>{lang==="fr"?"Les présentes mentions sont soumises au droit applicable.":"These notices are subject to applicable law."}</p>},
        ].map(s=>(
          <div className="legal-section" key={s.title}><h3><i className={`fa-solid ${s.icon}`}/>{s.title}</h3>{s.content}</div>
        ))}
      </div>
    </div>
  );
}

function ConfidentialitePage({ lang }) {
  const t = T[lang]||T["fr"];
  return (
    <div>
      <PH tag={t.legal_tag} ticon="fa-shield-halved" title={t.confidentialite_title} sub={t.confidentialite_sub}/>
      <div className="legal-content">
        <div className="legal-alert"><i className="fa-solid fa-lock"/>{t.confidentialite_alert}</div>
        {[
          {icon:"fa-database",           title:t.donnees,   items:lang==="fr"?["Nom, prénom, email, téléphone","Données de navigation","Informations des formulaires"]:["Name, email, phone","Navigation data","Form information"]},
          {icon:"fa-bullseye",           title:t.finalites,  items:lang==="fr"?["Traitement des demandes","Amélioration des services","Newsletters (avec consentement)"]:["Processing requests","Improving services","Newsletters (with consent)"]},
          {icon:"fa-user-shield",        title:t.droits,    items:lang==="fr"?["Droit d'accès","Droit de rectification","Droit à l'effacement","Droit d'opposition"]:["Right of access","Right of rectification","Right to erasure","Right to object"]},
          {icon:"fa-envelope-open-text", title:t.dpo,       items:["contact@inestid.com",lang==="fr"?"Délai : 30 jours max":"Response: 30 days max"]},
        ].map(s=>(
          <div className="legal-section" key={s.title}><h3><i className={`fa-solid ${s.icon}`}/>{s.title}</h3><ul>{s.items.map(i=><li key={i}><i className="fa-solid fa-circle-check"/>{i}</li>)}</ul></div>
        ))}
      </div>
    </div>
  );
}

function CguPage({ lang }) {
  const t = T[lang]||T["fr"];
  return (
    <div>
      <PH tag={t.legal_tag} ticon="fa-file-lines" title={t.cgu_title} sub={t.cgu_sub}/>
      <div className="legal-content">
        <div className="legal-alert"><i className="fa-solid fa-circle-exclamation"/>{t.cgu_alert}</div>
        {[
          {icon:"fa-globe",        title:t.objet,   content:<p>{t.objet_text}</p>},
          {icon:"fa-check-circle", title:t.acces,   content:<p>{t.acces_text}</p>},
          {icon:"fa-ban",          title:t.interdit, items:lang==="fr"?["Utilisation frauduleuse","Contenus illégaux","Tentative de piratage","Reproduction non autorisée"]:["Fraudulent use","Illegal content","Hacking attempts","Unauthorized reproduction"]},
          {icon:"fa-pen-to-square",title:t.modif,   content:<p>{t.modif_text}</p>},
        ].map(s=>(
          <div className="legal-section" key={s.title}><h3><i className={`fa-solid ${s.icon}`}/>{s.title}</h3>{s.content||null}{s.items&&<ul>{s.items.map(i=><li key={i}><i className="fa-solid fa-xmark" style={{color:"#ef4444"}}/>{i}</li>)}</ul>}</div>
        ))}
        <p style={{color:"var(--gray)",fontSize:"0.8rem",marginTop:20}}><i className="fa-regular fa-calendar" style={{marginRight:6}}/>{t.last_update} : {lang==="fr"?"Juin 2026":"June 2026"}</p>
      </div>
    </div>
  );
}

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [loginForm, setLoginForm] = useState({ email:"", password:"" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("actualites");
  const [actualites, setActualites] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [candidatures, setCandidatures] = useState([]);
  const [abonnes, setAbonnes] = useState([]);
  const [partenaires, setPartenaires] = useState([]);
  const [newArticle, setNewArticle] = useState({ titre:"", contenu:"", categorie:"Informatique", image_url:"", lien_externe:"" });
  const [articleMsg, setArticleMsg] = useState("");
  const [newPartenaire, setNewPartenaire] = useState({ nom:"", description:"", logo_url:"", site_web:"" });
  const [partenaireMsg, setPartenaireMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const SUPABASE_URL = "https://upmwjlgqzjjhotoahwaa.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwbXdqbGdxempqaG90b2Fod2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3OTE3MjksImV4cCI6MjA5NjM2NzcyOX0.KnFffTUZlVNd5okLFGGL2Mx7uB22DOgm6aa8nigoxSg";

  const sbFetch = async (table, method="GET", body=null, id=null) => {
    const url = method==="GET" ? `${SUPABASE_URL}/rest/v1/${table}?select=*&order=created_at.desc` : `${SUPABASE_URL}/rest/v1/${table}${id?`?id=eq.${id}`:""}`;
    const res = await fetch(url, { method, headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json","Prefer":method==="POST"?"return=minimal":""}, body:body?JSON.stringify(body):null });
    if (method==="GET") return await res.json();
    return res;
  };

  const handleLogin = async () => {
    setLoginLoading(true); setLoginError("");
    try {
      const data = await sbFetch(`admins?email=eq.${loginForm.email}&password=eq.${loginForm.password}&select=*`);
      if (data&&data.length>0) { setAuthed(true); loadData(); }
      else setLoginError("Email ou mot de passe incorrect.");
    } catch { setLoginError("Erreur de connexion."); }
    setLoginLoading(false);
  };

  const loadData = async () => {
    setLoading(true);
    const [a,c,ca,ab,pt] = await Promise.all([sbFetch("actualites"),sbFetch("contacts"),sbFetch("candidatures"),sbFetch("abonnes"),sbFetch("partenaires")]);
    setActualites(a||[]); setContacts(c||[]); setCandidatures(ca||[]); setAbonnes(ab||[]); setPartenaires(pt||[]);
    setLoading(false);
  };

  const handleDelete = async (table, id) => { await sbFetch(table,"DELETE",null,id); loadData(); };

  if (!authed) return (
    <div style={{minHeight:"calc(100vh - 88px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div className="form-box" style={{maxWidth:400,width:"100%",margin:0}}>
        <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"1.4rem",fontWeight:800,color:"var(--text)",marginBottom:6}}>
          <i className="fa-solid fa-lock" style={{color:"var(--blue-l)",marginRight:10}}/>Administration
        </h3>
        <p className="sub">Accès réservé — INESTID</p>
        <FG label="Email" icon="fa-envelope"><input type="email" placeholder="votre@email.com" value={loginForm.email} onChange={e=>setLoginForm({...loginForm,email:e.target.value})}/></FG>
        <FG label="Mot de passe" icon="fa-lock"><input type="password" placeholder="••••••••" value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})}/></FG>
        {loginError && <div className="alert alert-error"><i className="fa-solid fa-circle-exclamation"/>{loginError}</div>}
        <button className="btn btn-blue btn-full" style={{marginTop:8}} onClick={handleLogin} disabled={loginLoading}>
          <i className="fa-solid fa-right-to-bracket"/>{loginLoading?"Connexion...":"Se connecter"}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{padding:"20px 0"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
        <div>
          <div className="page-tag"><i className="fa-solid fa-gauge"/>Tableau de bord</div>
          <h1 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:800,color:"var(--text)"}}>Administration</h1>
        </div>
        <button className="btn btn-outline" onClick={()=>setAuthed(false)} style={{fontSize:"0.82rem"}}><i className="fa-solid fa-right-from-bracket"/>Déconnexion</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14,marginBottom:28}}>
        {[
          {icon:"fa-newspaper", col:"var(--blue-l)",bg:"rgba(42,82,201,0.1)",label:"Actualités",  val:actualites.length},
          {icon:"fa-envelope",  col:"var(--blue-l)",bg:"rgba(42,82,201,0.1)",label:"Messages",    val:contacts.length},
          {icon:"fa-users",     col:"var(--green)", bg:"rgba(46,163,18,0.1)",label:"Candidatures",val:candidatures.length},
          {icon:"fa-rss",       col:"var(--green)", bg:"rgba(46,163,18,0.1)",label:"Abonnés",     val:abonnes.length},
          {icon:"fa-handshake", col:"var(--blue-l)",bg:"rgba(42,82,201,0.1)",label:"Partenaires", val:partenaires.length},
        ].map(s=>(
          <div key={s.label} style={{background:"var(--card)",borderRadius:16,padding:"18px",border:"1px solid var(--border)",textAlign:"center"}}>
            <div style={{width:40,height:40,borderRadius:11,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px"}}><i className={`fa-solid ${s.icon}`} style={{color:s.col}}/></div>
            <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"1.6rem",fontWeight:800,color:"var(--text)"}}>{s.val}</div>
            <div style={{fontSize:"0.75rem",color:"var(--gray)"}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
        {[
          {id:"actualites",  icon:"fa-newspaper", label:"Actualités"},
          {id:"contacts",    icon:"fa-envelope",  label:"Messages"},
          {id:"candidatures",icon:"fa-users",      label:"Candidatures"},
          {id:"abonnes",     icon:"fa-rss",        label:"Abonnés"},
          {id:"partenaires", icon:"fa-handshake",  label:"Partenaires"},
        ].map(tab=>(
          <button key={tab.id} className={`btn ${activeTab===tab.id?"btn-blue":"btn-outline"}`} style={{fontSize:"0.82rem",padding:"8px 16px"}} onClick={()=>setActiveTab(tab.id)}>
            <i className={`fa-solid ${tab.icon}`}/>{tab.label}
          </button>
        ))}
      </div>
      {loading && <p style={{color:"var(--gray)",textAlign:"center"}}><i className="fa-solid fa-spinner fa-spin"/> Chargement...</p>}

      {activeTab==="actualites" && (
        <div>
          <div className="form-box" style={{marginBottom:24}}>
            <h3><i className="fa-solid fa-plus" style={{color:"var(--blue-l)",marginRight:9}}/>Publier un article</h3>
            <p className="sub">Ajoutez une nouvelle actualité.</p>
            <FG label="Titre" icon="fa-heading"><input type="text" placeholder="Titre" value={newArticle.titre} onChange={e=>setNewArticle({...newArticle,titre:e.target.value})}/></FG>
            <FG label="Catégorie" icon="fa-tags">
              <CustomSelect options={[{value:"Informatique",icon:"fa-laptop-code",label:"Informatique"},{value:"IA & Data",icon:"fa-brain",label:"IA & Data"},{value:"Entreprise",icon:"fa-building",label:"Entreprise"}]} value={newArticle.categorie} onChange={v=>setNewArticle({...newArticle,categorie:v})}/>
            </FG>
            <FG label="Contenu" icon="fa-pen"><textarea placeholder="Contenu..." value={newArticle.contenu} onChange={e=>setNewArticle({...newArticle,contenu:e.target.value})} style={{minHeight:140}}/></FG>
            <FG label="Image URL" icon="fa-image"><input type="text" placeholder="https://..." value={newArticle.image_url} onChange={e=>setNewArticle({...newArticle,image_url:e.target.value})}/></FG>
            <div className="upload" onClick={()=>document.getElementById("img-upload").click()} style={{marginBottom:13}}>
              <input type="file" id="img-upload" accept="image/*" style={{display:"none"}} onChange={async(e)=>{
                const file=e.target.files[0]; if(!file) return;
                const filename=`${Date.now()}-${file.name}`;
                const res=await fetch(`${SUPABASE_URL}/storage/v1/object/images/${filename}`,{method:"POST",headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`,"Content-Type":file.type},body:file});
                if(res.ok){const url=`${SUPABASE_URL}/storage/v1/object/public/images/${filename}`;setNewArticle(prev=>({...prev,image_url:url}));setArticleMsg("Image uploadée !");}
              }}/>
              <i className="fa-solid fa-cloud-arrow-up"/><p><span>Uploader une image</span></p>
            </div>
            <FG label="Lien externe (optionnel)" icon="fa-link"><input type="text" placeholder="https://..." value={newArticle.lien_externe||""} onChange={e=>setNewArticle({...newArticle,lien_externe:e.target.value})}/></FG>
            {articleMsg && <div className="alert alert-success"><i className="fa-solid fa-circle-check"/>{articleMsg}</div>}
            <button className="btn btn-blue btn-full" onClick={async()=>{
              if(!newArticle.titre||!newArticle.contenu){setArticleMsg("Titre et contenu obligatoires.");return;}
              await sbFetch("actualites","POST",{...newArticle,date_pub:new Date().toISOString()});
              setArticleMsg("Article publié !"); setNewArticle({titre:"",contenu:"",categorie:"Informatique",image_url:"",lien_externe:""}); loadData();
            }}><i className="fa-solid fa-paper-plane"/>Publier</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {actualites.length===0&&<p style={{color:"var(--gray)"}}>Aucun article.</p>}
            {actualites.map(a=>(
              <div key={a.id} style={{background:"var(--card)",borderRadius:14,padding:"18px 20px",border:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
                <div>
                  <div style={{fontSize:"0.7rem",fontWeight:700,color:"var(--blue-l)",textTransform:"uppercase",marginBottom:4}}>{a.categorie}</div>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,color:"var(--text)",marginBottom:4}}>{a.titre}</div>
                  <div style={{fontSize:"0.8rem",color:"var(--gray)"}}>{a.contenu?.slice(0,80)}...</div>
                </div>
                <button className="btn btn-outline" style={{fontSize:"0.78rem",padding:"7px 12px",flexShrink:0,color:"#ef4444",borderColor:"rgba(239,68,68,0.3)"}} onClick={()=>handleDelete("actualites",a.id)}><i className="fa-solid fa-trash"/></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab==="contacts" && (
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {contacts.length===0&&<p style={{color:"var(--gray)"}}>Aucun message.</p>}
          {contacts.map(c=>(
            <div key={c.id} style={{background:"var(--card)",borderRadius:14,padding:"18px 20px",border:"1px solid var(--border)"}}>
              <div style={{display:"flex",justifyContent:"space-between",gap:12}}>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,color:"var(--text)",marginBottom:4}}>{c.nom}</div>
                  <div style={{fontSize:"0.8rem",color:"var(--blue-l)",marginBottom:6}}>{c.email} · {c.service}</div>
                  <div style={{fontSize:"0.85rem",color:"var(--text2)",lineHeight:1.6}}>{c.message}</div>
                  <div style={{fontSize:"0.72rem",color:"var(--gray)",marginTop:8}}><i className="fa-regular fa-calendar" style={{marginRight:5}}/>{new Date(c.created_at).toLocaleDateString("fr-FR")}</div>
                </div>
                <button className="btn btn-outline" style={{fontSize:"0.78rem",padding:"7px 12px",flexShrink:0,color:"#ef4444",borderColor:"rgba(239,68,68,0.3)"}} onClick={()=>handleDelete("contacts",c.id)}><i className="fa-solid fa-trash"/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="candidatures" && (
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {candidatures.length===0&&<p style={{color:"var(--gray)"}}>Aucune candidature.</p>}
          {candidatures.map(c=>(
            <div key={c.id} style={{background:"var(--card)",borderRadius:14,padding:"18px 20px",border:"1px solid var(--border)"}}>
              <div style={{display:"flex",justifyContent:"space-between",gap:12}}>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,color:"var(--text)",marginBottom:4}}>{c.prenom} {c.nom}</div>
                  <div style={{fontSize:"0.8rem",color:"var(--blue-l)",marginBottom:4}}>{c.email} · {c.telephone}</div>
                  <div style={{fontSize:"0.8rem",color:"var(--gray)",marginBottom:6}}>{c.poste} · {c.domaine}</div>
                  <div style={{fontSize:"0.83rem",color:"var(--text2)"}}>{c.motivation}</div>
                  <div style={{fontSize:"0.72rem",color:"var(--gray)",marginTop:8}}><i className="fa-regular fa-calendar" style={{marginRight:5}}/>{new Date(c.created_at).toLocaleDateString("fr-FR")}</div>
                </div>
                <button className="btn btn-outline" style={{fontSize:"0.78rem",padding:"7px 12px",flexShrink:0,color:"#ef4444",borderColor:"rgba(239,68,68,0.3)"}} onClick={()=>handleDelete("candidatures",c.id)}><i className="fa-solid fa-trash"/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="abonnes" && (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {abonnes.length===0&&<p style={{color:"var(--gray)"}}>Aucun abonné.</p>}
          {abonnes.map(a=>(
            <div key={a.id} style={{background:"var(--card)",borderRadius:12,padding:"14px 18px",border:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
              <div>
                <div style={{fontWeight:500,color:"var(--text)"}}>{a.email}</div>
                <div style={{fontSize:"0.72rem",color:"var(--gray)",marginTop:3}}><i className="fa-regular fa-calendar" style={{marginRight:5}}/>{new Date(a.created_at).toLocaleDateString("fr-FR")}</div>
              </div>
              <button className="btn btn-outline" style={{fontSize:"0.78rem",padding:"7px 12px",flexShrink:0,color:"#ef4444",borderColor:"rgba(239,68,68,0.3)"}} onClick={()=>handleDelete("abonnes",a.id)}><i className="fa-solid fa-trash"/></button>
            </div>
          ))}
        </div>
      )}

      {activeTab==="partenaires" && (
        <div>
          <div className="form-box" style={{marginBottom:24}}>
            <h3><i className="fa-solid fa-plus" style={{color:"var(--blue-l)",marginRight:9}}/>Ajouter un partenaire</h3>
            <p className="sub">Ajoutez un partenaire.</p>
            <FG label="Nom *" icon="fa-building"><input type="text" placeholder="Nom" value={newPartenaire.nom} onChange={e=>setNewPartenaire({...newPartenaire,nom:e.target.value})}/></FG>
            <FG label="Description" icon="fa-pen"><textarea placeholder="Description..." value={newPartenaire.description} onChange={e=>setNewPartenaire({...newPartenaire,description:e.target.value})} style={{minHeight:80}}/></FG>
            <FG label="Site web" icon="fa-globe"><input type="text" placeholder="https://..." value={newPartenaire.site_web} onChange={e=>setNewPartenaire({...newPartenaire,site_web:e.target.value})}/></FG>
            <FG label="Logo URL" icon="fa-image"><input type="text" placeholder="https://..." value={newPartenaire.logo_url} onChange={e=>setNewPartenaire({...newPartenaire,logo_url:e.target.value})}/></FG>
            <div className="upload" onClick={()=>document.getElementById("logo-upload").click()} style={{marginBottom:13}}>
              <input type="file" id="logo-upload" accept="image/*" style={{display:"none"}} onChange={async(e)=>{
                const file=e.target.files[0]; if(!file) return;
                const filename=`${Date.now()}-${file.name}`;
                const res=await fetch(`${SUPABASE_URL}/storage/v1/object/images/${filename}`,{method:"POST",headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`,"Content-Type":file.type},body:file});
                if(res.ok){const url=`${SUPABASE_URL}/storage/v1/object/public/images/${filename}`;setNewPartenaire(prev=>({...prev,logo_url:url}));setPartenaireMsg("Logo uploadé !");}
              }}/>
              <i className="fa-solid fa-cloud-arrow-up"/><p><span>Uploader le logo</span></p>
            </div>
            {partenaireMsg&&<div className="alert alert-success"><i className="fa-solid fa-circle-check"/>{partenaireMsg}</div>}
            <button className="btn btn-blue btn-full" onClick={async()=>{
              if(!newPartenaire.nom){setPartenaireMsg("Nom obligatoire.");return;}
              await sbFetch("partenaires","POST",{...newPartenaire});
              setPartenaireMsg("Partenaire ajouté !"); setNewPartenaire({nom:"",description:"",logo_url:"",site_web:""}); loadData();
            }}><i className="fa-solid fa-plus"/>Ajouter</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {partenaires.length===0&&<p style={{color:"var(--gray)"}}>Aucun partenaire.</p>}
            {partenaires.map(p=>(
              <div key={p.id} style={{background:"var(--card)",borderRadius:14,padding:"18px 20px",border:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
                <div style={{display:"flex",alignItems:"center",gap:14}}>
                  {p.logo_url?<img src={p.logo_url} alt={p.nom} style={{width:50,height:50,objectFit:"contain",borderRadius:8,padding:4}}/>:<div style={{width:50,height:50,borderRadius:8,background:"var(--bg2)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--gray)"}}><i className="fa-solid fa-building"/></div>}
                  <div>
                    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,color:"var(--text)"}}>{p.nom}</div>
                    {p.site_web&&<div style={{fontSize:"0.78rem",color:"var(--blue-l)"}}>{p.site_web}</div>}
                  </div>
                </div>
                <button className="btn btn-outline" style={{fontSize:"0.78rem",padding:"7px 12px",flexShrink:0,color:"#ef4444",borderColor:"rgba(239,68,68,0.3)"}} onClick={()=>handleDelete("partenaires",p.id)}><i className="fa-solid fa-trash"/></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Footer({ nav, lang }) {
  const t = T[lang]||T["fr"];
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="logo" onClick={()=>nav("accueil")} style={{cursor:"pointer"}}>
            <img src="/logo1.png" alt="INESTID" style={{height:70,width:"auto",objectFit:"contain"}}/>
          </div>
          <p className="footer-desc">{t.footer_desc}</p>
        </div>
        <div className="footer-col">
          <h4>{t.footer_services}</h4>
          <ul>
            <li><button onClick={()=>nav("services")}><i className="fa-solid fa-laptop-code"/>{lang==="fr"?"Informatique":"IT & Digital"}</button></li>
            <li><button onClick={()=>nav("services")}><i className="fa-solid fa-brain"/>{lang==="fr"?"Intelligence Artificielle":"Artificial Intelligence"}</button></li>
            <li><button onClick={()=>nav("actualites")}><i className="fa-solid fa-newspaper"/>{lang==="fr"?"Actualités":"News"}</button></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>{t.footer_company}</h4>
          <ul>
            <li><button onClick={()=>nav("accueil")}><i className="fa-solid fa-circle-info"/>{t.footer_about}</button></li>
            <li><button onClick={()=>nav("partenariats")}><i className="fa-solid fa-handshake"/>{t.footer_partner}</button></li>
            <li><button onClick={()=>nav("promoteur")}><i className="fa-solid fa-user-tie"/>{t.footer_promoter}</button></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>{t.footer_legal}</h4>
          <ul>
            <li><button onClick={()=>nav("mentions")}><i className="fa-solid fa-scale-balanced"/>{t.footer_mentions}</button></li>
            <li><button onClick={()=>nav("confidentialite")}><i className="fa-solid fa-shield-halved"/>{t.footer_privacy}</button></li>
            <li><button onClick={()=>nav("cgu")}><i className="fa-solid fa-file-lines"/>{t.footer_cgu}</button></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 INESTID. {t.footer_rights}</span>
        <div className="socials">
          {["fa-linkedin-in","fa-facebook-f","fa-x-twitter","fa-youtube"].map(ic=>(
            <a key={ic} href="/" className="soc"><i className={`fa-brands ${ic}`}/></a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [offline, setOffline] = useState(!navigator.onLine);
  const [page, setPage] = useState("accueil");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("fr");
  const [articleModal, setArticleModal] = useState(null);
  const [showBot, setShowBot] = useState(false);

  useEffect(() => { injectAssets(); }, []);

  useEffect(() => {
    const goOffline = () => setOffline(true);
    const goOnline = () => setOffline(false);
    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    return () => { window.removeEventListener('offline', goOffline); window.removeEventListener('online', goOnline); };
  }, []);

  useEffect(() => {
    const theme = dark ? DARK : LIGHT;
    Object.entries(theme).forEach(([k,v]) => document.documentElement.style.setProperty(k,v));
  }, [dark]);

  useEffect(() => {
    const handle = (e) => {
      if (menuOpen && !e.target.closest('.mob-menu') && !e.target.closest('.hamburger')) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handle);
    document.addEventListener('touchstart', handle);
    return () => { document.removeEventListener('mousedown', handle); document.removeEventListener('touchstart', handle); };
  }, [menuOpen]);

  const nav = (p) => { setPage(p); setMenuOpen(false); };
  const t = T[lang];
  const NAV = NAV_ITEMS(t);

  const renderPage = (p) => {
    switch(p) {
      case "accueil":         return <><HomePage nav={nav} lang={lang}/><Footer nav={nav} lang={lang}/></>;
      case "services":        return <><ServicesPage lang={lang}/><Footer nav={nav} lang={lang}/></>;
      case "actualites":      return <><ActualitesPage lang={lang} onArticleClick={setArticleModal}/><Footer nav={nav} lang={lang}/></>;
      case "partenariats":    return <><PartenariatsPage lang={lang}/><Footer nav={nav} lang={lang}/></>;
      case "contact":         return <><ContactPage lang={lang}/><Footer nav={nav} lang={lang}/></>;
      case "promoteur":       return <><PromoteurPage lang={lang}/><Footer nav={nav} lang={lang}/></>;
      case "mentions":        return <><MentionsPage lang={lang}/><Footer nav={nav} lang={lang}/></>;
      case "confidentialite": return <><ConfidentialitePage lang={lang}/><Footer nav={nav} lang={lang}/></>;
      case "cgu":             return <><CguPage lang={lang}/><Footer nav={nav} lang={lang}/></>;
      case "admin":           return <AdminPage nav={nav}/>;
      default: return null;
    }
  };

  if (offline) return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16,padding:"20px",background:"var(--bg)",textAlign:"center"}}>
      <style>{CSS}</style>
      <div style={{width:80,height:80,borderRadius:"50%",background:"rgba(239,68,68,0.1)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:8}}>
        <i className="fa-solid fa-wifi" style={{fontSize:"2rem",color:"#ef4444"}}/>
      </div>
      <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"1.5rem",fontWeight:800,color:"var(--text)"}}>
        {lang==="fr"?"Vous êtes hors ligne":"You are offline"}
      </h2>
      <p style={{color:"var(--text2)",fontSize:"0.95rem",maxWidth:320}}>
        {lang==="fr"?"Vérifiez votre connexion internet et réessayez.":"Please check your internet connection and try again."}
      </p>
      <button className="btn btn-blue" onClick={()=>window.location.reload()}>
        <i className="fa-solid fa-rotate-right"/>{lang==="fr"?"Réessayer":"Try again"}
      </button>
      <img src="/logo.png" alt="INESTID" style={{height:50,objectFit:"contain",marginTop:8}}/>
    </div>
  );

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="logo" onClick={()=>{
          const now=Date.now();
          if(!window._clicks) window._clicks=[];
          window._clicks=window._clicks.filter(t=>now-t<2000);
          window._clicks.push(now);
          if(window._clicks.length>=5){window._clicks=[];nav("admin");}
          else nav("accueil");
        }}>
          <img src={dark?"/logo1.png":"/logo.png"} alt="INESTID" className="logo-img"/>
        </div>
        <ul className="nav-links">
          {NAV.map(n=>(
            <li key={n.id}>
              <button className={page===n.id?"active":""} onClick={()=>nav(n.id)}>
                <i className={`fa-solid ${n.icon}`}/> {n.label}
              </button>
            </li>
          ))}
          <li><button className="cta" onClick={()=>nav("contact")}><i className="fa-solid fa-envelope"/>{t.nav_contact}</button></li>
        </ul>
        <div className="nav-right">
          <div className="theme-toggle">
            <i className={`fa-solid fa-sun t-icon${!dark?" active":""}`}/>
            <div className={`toggle-track${dark?" dark":""}`} onClick={()=>setDark(!dark)}>
              <div className="toggle-thumb"/>
            </div>
            <i className={`fa-solid fa-moon t-icon${dark?" active":""}`}/>
          </div>
          <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mob-menu${menuOpen?" open":""}`}>
        {NAV.map(n=>(
          <button key={n.id} className={page===n.id?"active":""} onClick={()=>nav(n.id)}>
            <i className={`fa-solid ${n.icon}`}/>{n.label}
          </button>
        ))}
        <button onClick={()=>nav("contact")}><i className="fa-solid fa-envelope"/>{t.nav_contact}</button>
        <div className="mob-menu-divider"/>
        <button onClick={()=>nav("promoteur")}><i className="fa-solid fa-user-tie"/>{t.footer_promoter}</button>
        <div className="mob-menu-divider"/>

        {/* BOT BUTTON */}
        <button className="bot-btn" onClick={()=>{ setShowBot(true); setMenuOpen(false); }}>
          <i className="fa-solid fa-robot"/>
          {t.bot_start}
          <span className="bot-btn-dot"/>
        </button>

        <div className="mob-menu-divider"/>
        <LangSelector lang={lang} setLang={setLang} t={t}/>
      </div>

      {/* PAGES */}
      <div className="pages">
        {PAGES_LIST.map(p=>(
          <div key={p} className={`page${page===p?" active":""}`}>
            {page===p && renderPage(p)}
          </div>
        ))}
      </div>

      {/* ARTICLE MODAL */}
      {articleModal && (
        <div className="overlay" onClick={e=>e.target===e.currentTarget&&setArticleModal(null)}>
          <div className="modal" style={{maxWidth:600,maxHeight:"85vh",overflowY:"auto"}}>
            <button className="modal-x" onClick={()=>setArticleModal(null)}><i className="fa-solid fa-xmark"/></button>
            <div style={{marginBottom:12}}>
              <span className="cat" style={{
                color:articleModal.categorie==="IA & Data"?"var(--green)":articleModal.categorie==="Entreprise"?"#d97706":"var(--blue-l)",
                background:articleModal.categorie==="IA & Data"?"rgba(46,163,18,0.08)":articleModal.categorie==="Entreprise"?"rgba(217,119,6,0.08)":"rgba(42,82,201,0.08)"
              }}>
                <i className={`fa-solid ${articleModal.categorie==="IA & Data"?"fa-brain":articleModal.categorie==="Entreprise"?"fa-trophy":"fa-microchip"}`}/>
                {articleModal.categorie}
              </span>
            </div>
            <h3 style={{marginBottom:12}}>{articleModal.titre}</h3>
            <p style={{color:"var(--gray)",fontSize:"0.78rem",marginBottom:16}}>
              <i className="fa-regular fa-calendar" style={{marginRight:5}}/>
              {new Date(articleModal.date_pub||articleModal.created_at).toLocaleDateString(lang==="fr"?"fr-FR":"en-US")}
            </p>
            {articleModal.image_url && <img src={articleModal.image_url} alt={articleModal.titre} style={{width:"100%",borderRadius:12,marginBottom:16,objectFit:"cover",maxHeight:200}}/>}
            <div style={{color:"var(--text2)",fontSize:"0.92rem",lineHeight:1.8,paddingRight:4}}>{articleModal.contenu}</div>
            {articleModal.lien_externe && (
              <a href={articleModal.lien_externe} target="_blank" rel="noreferrer" className="btn btn-blue btn-full" style={{marginTop:16}}>
                <i className="fa-solid fa-arrow-up-right-from-square"/>{lang==="fr"?"Visiter le site":"Visit website"}
              </a>
            )}
          </div>
        </div>
      )}

      {/* BOT IA */}
      {showBot && <BotIA lang={lang} onClose={()=>setShowBot(false)}/>}
    </>
  );
}