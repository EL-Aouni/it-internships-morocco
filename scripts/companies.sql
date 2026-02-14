-- SQL Seed File for IT Internships Morocco Platform
-- 94 companies across 18 Moroccan cities and 15 IT specialties
-- Generated: 2025

USE cyber_internships;

-- Clear existing data
TRUNCATE TABLE companies;

-- Insert companies data
INSERT INTO companies (name, city, speciality, email, phone, website, priority, description) VALUES


-- Casablanca - Major IT Hub
('Capgemini Morocco', 'Casablanca', 'Software Engineering', 'recrutement.maroc@capgemini.com', '+212 522 95 00 00', 'https://www.capgemini.com/ma', 'high', 'Leader mondial du conseil, des services technologiques et de la transformation numérique'),
('Accenture Maroc', 'Casablanca', 'Cloud Computing', 'careers.morocco@accenture.com', '+212 522 48 20 00', 'https://www.accenture.com/ma-en', 'high', 'Services de conseil en stratégie, conseil technologique et opérationnel'),
('IBM Maroc', 'Casablanca', 'AI/Machine Learning', 'hr@ma.ibm.com', '+212 522 77 73 73', 'https://www.ibm.com/ma-en', 'high', 'Solutions technologiques et services de conseil en innovation'),
('Sopra Steria Morocco', 'Casablanca', 'DevOps', 'recruitment.morocco@soprasteria.com', '+212 522 36 80 00', 'https://www.soprasteria.com/ma', 'high', 'Transformation numérique et développement logiciel'),
('CGI Maroc', 'Casablanca', 'Web Development', 'jobs.morocco@cgi.com', '+212 522 99 70 00', 'https://www.cgi.com/morocco', 'medium', 'Services-conseils en technologie de l\'information'),
('Atos Morocco', 'Casablanca', 'Cybersecurity', 'hr.morocco@atos.net', '+212 522 48 48 00', 'https://atos.net/morocco', 'high', 'Leader en services numériques et cybersécurité'),
('Orange Business Services Maroc', 'Casablanca', 'Network Engineering', 'recruitment@orange.ma', '+212 520 11 11 11', 'https://www.orange.ma', 'medium', 'Services de télécommunications et solutions digitales'),
('Intelcia IT Solutions', 'Casablanca', 'Data Science', 'careers@intelcia.com', '+212 522 58 18 00', 'https://www.intelcia.com', 'medium', 'Externalisation de processus et solutions IT'),
('HPS Morocco', 'Casablanca', 'Software Engineering', 'jobs@hps-worldwide.com', '+212 522 67 00 00', 'https://www.hps-worldwide.com', 'high', 'Solutions de paiement électronique'),
('Umanis Maroc', 'Casablanca', 'Database Administration', 'recrutement.maroc@umanis.com', '+212 522 36 70 00', 'https://www.umanis.com', 'medium', 'Conseil et expertise en données et digital'),
('Blockchain Labs Morocco', 'Casablanca', 'Blockchain', 'info@blockchainlabs.ma', '+212 522 89 00 00', 'https://www.blockchainlabs.ma', 'high', 'Solutions blockchain et crypto'),
('IoT Solutions Maroc', 'Casablanca', 'IoT', 'careers@iotsolutions.ma', '+212 522 77 80 00', 'https://www.iotsolutions.ma', 'high', 'Internet des objets et systèmes connectés'),
('CyberDefense Pro', 'Casablanca', 'Cybersecurity', 'careers@cyberdefense.ma', '+212 522 94 50 00', 'https://www.cyberdefense.ma', 'high', 'Défense cybernétique et SOC'),
('MobileFirst Dev', 'Casablanca', 'Mobile Development', 'info@mobilefirst.ma', '+212 522 86 70 00', 'https://www.mobilefirst.ma', 'medium', 'Applications mobiles natives'),
('DevOps Masters', 'Casablanca', 'DevOps', 'contact@devopsmasters.ma', '+212 522 95 70 00', 'https://www.devopsmasters.ma', 'high', 'CI/CD et infrastructure as code'),
('Database Experts', 'Casablanca', 'Database Administration', 'careers@dbexperts.ma', '+212 522 48 60 00', 'https://www.dbexperts.ma', 'medium', 'Administration et optimisation BDD'),
('Gaming Studios Morocco', 'Casablanca', 'Game Development', 'jobs@gamingstudios.ma', '+212 522 77 90 00', 'https://www.gamingstudios.ma', 'low', 'Studio de développement de jeux'),
('QualityFirst Testing', 'Casablanca', 'Quality Assurance', 'careers@qualityfirst.ma', '+212 522 36 90 00', 'https://www.qualityfirst.ma', 'low', 'Tests automatisés et manuels'),
('SmartCloud Africa', 'Casablanca', 'Cloud Computing', 'jobs@smartcloud.ma', '+212 522 98 50 00', 'https://www.smartcloud.ma', 'high', 'Solutions cloud africaines'),
('Full Stack Solutions', 'Casablanca', 'Web Development', 'contact@fullstacksolutions.ma', '+212 522 99 80 00', 'https://www.fullstacksolutions.ma', 'medium', 'Développement full-stack'),
('Network Infrastructure Co', 'Casablanca', 'Network Engineering', 'jobs@networkinfra.ma', '+212 522 36 80 00', 'https://www.networkinfra.ma', 'medium', 'Infrastructure réseau entreprise'),
('Design Lab Morocco', 'Casablanca', 'UI/UX Design', 'contact@designlab.ma', '+212 522 77 70 00', 'https://www.designlab.ma', 'medium', 'Studio de design UX/UI'),
('CodeFactory Morocco', 'Casablanca', 'Software Engineering', 'jobs@codefactory.ma', '+212 522 95 80 00', 'https://www.codefactory.ma', 'medium', 'Factory de développement logiciel'),

-- Rabat - Government & Tech Center
('Majorel Morocco', 'Rabat', 'Web Development', 'careers.morocco@majorel.com', '+212 537 56 90 00', 'https://www.majorel.com', 'medium', 'Services clients et solutions digitales'),
('Netapsys Maroc', 'Rabat', 'Cybersecurity', 'rh@netapsys.ma', '+212 537 71 77 77', 'https://www.netapsys.ma', 'high', 'Intégration de solutions IT et cybersécurité'),
('Devoteam Morocco', 'Rabat', 'Cloud Computing', 'morocco@devoteam.com', '+212 537 57 30 00', 'https://www.devoteam.com', 'high', 'Conseil en transformation digitale et Cloud'),
('OpenSky Data Systems', 'Rabat', 'Data Science', 'contact@openskyds.com', '+212 537 75 15 15', 'https://www.openskyds.com', 'medium', 'Solutions Big Data et BI'),
('Norsys Afrique', 'Rabat', 'DevOps', 'recrutement@norsys-afrique.com', '+212 537 77 88 00', 'https://www.norsys-afrique.com', 'medium', 'Services et conseil en ingénierie informatique'),
('SII Maroc', 'Rabat', 'Mobile Development', 'careers.morocco@sii-group.com', '+212 537 71 71 00', 'https://www.sii-group.com/morocco', 'medium', 'Ingénierie et conseil en technologies'),
('Delta Holding IT', 'Rabat', 'Software Engineering', 'jobs@deltaholding.ma', '+212 537 56 56 00', 'https://www.deltaholding.ma', 'low', 'Développement de solutions métier'),
('SQLI Morocco', 'Rabat', 'UI/UX Design', 'maroc@sqli.com', '+212 537 71 90 00', 'https://www.sqli.com', 'medium', 'Transformation digitale et expérience utilisateur'),
('GameDev Morocco', 'Rabat', 'Game Development', 'jobs@gamedev.ma', '+212 537 75 90 00', 'https://www.gamedev.ma', 'medium', 'Développement de jeux vidéo'),
('QA Experts Morocco', 'Rabat', 'Quality Assurance', 'jobs@qaexperts.ma', '+212 537 68 40 00', 'https://www.qaexperts.ma', 'medium', 'Tests et assurance qualité logicielle'),
('DataMining Corp', 'Rabat', 'Data Science', 'jobs@datamining.ma', '+212 537 72 30 00', 'https://www.datamining.ma', 'medium', 'Extraction et analyse de données'),
('CloudMasters', 'Rabat', 'Cloud Computing', 'contact@cloudmasters.ma', '+212 537 76 20 00', 'https://www.cloudmasters.ma', 'high', 'Architecture et migration cloud'),
('Blockchain Ventures', 'Rabat', 'Blockchain', 'info@blockchainventures.ma', '+212 537 71 50 00', 'https://www.blockchainventures.ma', 'medium', 'Développement blockchain et DApps'),
('IoT Connect', 'Rabat', 'IoT', 'contact@iotconnect.ma', '+212 537 75 40 00', 'https://www.iotconnect.ma', 'medium', 'Solutions IoT industrielles'),
('AI Research Lab', 'Rabat', 'AI/Machine Learning', 'careers@airesearch.ma', '+212 537 77 90 00', 'https://www.airesearch.ma', 'high', 'Recherche en intelligence artificielle'),
('DevOps Automation', 'Rabat', 'DevOps', 'info@devopsauto.ma', '+212 537 71 60 00', 'https://www.devopsauto.ma', 'high', 'Automatisation DevOps'),
('Database Solutions', 'Rabat', 'Database Administration', 'careers@dbsolutions.ma', '+212 537 75 80 00', 'https://www.dbsolutions.ma', 'medium', 'Gestion de bases de données'),
('QA Solutions Pro', 'Rabat', 'Quality Assurance', 'careers@qasolutions.ma', '+212 537 68 50 00', 'https://www.qasolutions.ma', 'medium', 'Solutions QA professionnelles'),

-- Marrakech - Growing Tech Hub
('Webhelp Marrakech', 'Marrakech', 'Web Development', 'recruitment.marrakech@webhelp.com', '+212 524 33 90 00', 'https://www.webhelp.com', 'medium', 'Services digitaux et développement web'),
('Sitel Morocco', 'Marrakech', 'Quality Assurance', 'careers.morocco@sitel.com', '+212 524 42 00 00', 'https://www.sitel.com', 'low', 'Solutions de service client et QA'),
('Tech Innovation Marrakech', 'Marrakech', 'AI/Machine Learning', 'info@techinnovation.ma', '+212 524 38 75 00', 'https://www.techinnovation.ma', 'medium', 'IA et innovation technologique'),
('Cloud Atlas Morocco', 'Marrakech', 'Cloud Computing', 'jobs@cloudatlas.ma', '+212 524 45 67 00', 'https://www.cloudatlas.ma', 'medium', 'Solutions Cloud et infrastructure'),
('Digitalica Marrakech', 'Marrakech', 'Mobile Development', 'contact@digitalica.ma', '+212 524 33 88 00', 'https://www.digitalica.ma', 'low', 'Applications mobiles et web'),
('FullStack Academy Maroc', 'Marrakech', 'Web Development', 'contact@fullstack.ma', '+212 524 39 60 00', 'https://www.fullstack.ma', 'low', 'Formation et développement full-stack'),
('UX Design Studio', 'Marrakech', 'UI/UX Design', 'jobs@uxstudio.ma', '+212 524 33 90 00', 'https://www.uxstudio.ma', 'medium', 'Design d\'expérience utilisateur'),
('DataScience Hub', 'Marrakech', 'Data Science', 'info@datasciencehub.ma', '+212 524 38 90 00', 'https://www.datasciencehub.ma', 'medium', 'Analytics et machine learning'),
('Blockchain Tech', 'Marrakech', 'Blockchain', 'jobs@blockchaintech.ma', '+212 524 39 70 00', 'https://www.blockchaintech.ma', 'medium', 'Technologies blockchain'),
('WebPro Solutions', 'Marrakech', 'Web Development', 'info@webpro.ma', '+212 524 33 80 00', 'https://www.webpro.ma', 'low', 'Solutions web professionnelles'),

-- Fès - Educational & Tech Center
('DataXperts Fès', 'Fès', 'Data Science', 'careers@dataxperts.ma', '+212 535 94 00 00', 'https://www.dataxperts.ma', 'medium', 'Analytics et science des données'),
('SecureTech Fès', 'Fès', 'Cybersecurity', 'jobs@securetech.ma', '+212 535 73 50 00', 'https://www.securetech.ma', 'high', 'Sécurité informatique et audit'),
('DevFactory Fès', 'Fès', 'Software Engineering', 'recruitment@devfactory.ma', '+212 535 65 00 00', 'https://www.devfactory.ma', 'medium', 'Développement logiciel sur mesure'),
('NetworkPro Fès', 'Fès', 'Network Engineering', 'contact@networkpro.ma', '+212 535 62 40 00', 'https://www.networkpro.ma', 'low', 'Infrastructure réseau et télécom'),
('AI Innovations', 'Fès', 'AI/Machine Learning', 'careers@aiinnovations.ma', '+212 535 94 80 00', 'https://www.aiinnovations.ma', 'high', 'IA et apprentissage automatique'),
('SoftwareHouse Maroc', 'Fès', 'Software Engineering', 'info@softwarehouse.ma', '+212 535 73 80 00', 'https://www.softwarehouse.ma', 'medium', 'Développement logiciel sur mesure'),
('Mobile Apps Factory', 'Fès', 'Mobile Development', 'jobs@mobileapps.ma', '+212 535 65 70 00', 'https://www.mobileapps.ma', 'medium', 'Factory d\'applications mobiles'),
('GameStudio Maroc', 'Fès', 'Game Development', 'info@gamestudio.ma', '+212 535 73 90 00', 'https://www.gamestudio.ma', 'low', 'Studio de jeux vidéo'),

-- Tangier - International Hub
('Concentrix Tangier', 'Tangier', 'Web Development', 'careers.tangier@concentrix.com', '+212 539 39 60 00', 'https://www.concentrix.com', 'medium', 'Solutions digitales et développement'),
('Altran Morocco', 'Tangier', 'DevOps', 'morocco.careers@altran.com', '+212 539 94 30 00', 'https://www.altran.com/morocco', 'high', 'Conseil en innovation et engineering'),
('CyberShield Tangier', 'Tangier', 'Cybersecurity', 'jobs@cybershield.ma', '+212 539 37 80 00', 'https://www.cybershield.ma', 'high', 'Sécurité informatique et SOC'),
('MobileTech Tangier', 'Tangier', 'Mobile Development', 'hr@mobiletech.ma', '+212 539 33 70 00', 'https://www.mobiletech.ma', 'medium', 'Applications mobiles iOS et Android'),
('CyberGuard Morocco', 'Tangier', 'Cybersecurity', 'careers@cyberguard.ma', '+212 539 39 80 00', 'https://www.cyberguard.ma', 'high', 'Protection et surveillance cybernétique'),
('Network Solutions Pro', 'Tangier', 'Network Engineering', 'jobs@networksolutions.ma', '+212 539 94 00 00', 'https://www.networksolutions.ma', 'medium', 'Solutions réseau entreprise'),
('IoT Innovations', 'Tangier', 'IoT', 'contact@iotinnovations.ma', '+212 539 94 70 00', 'https://www.iotinnovations.ma', 'medium', 'Innovation IoT'),

-- Agadir
('TechSolutions Agadir', 'Agadir', 'Web Development', 'contact@techsolutions-agadir.ma', '+212 528 84 00 00', 'https://www.techsolutions-agadir.ma', 'low', 'Développement web et e-commerce'),
('CloudFirst Agadir', 'Agadir', 'Cloud Computing', 'jobs@cloudfirst.ma', '+212 528 82 60 00', 'https://www.cloudfirst.ma', 'medium', 'Migration et gestion Cloud'),
('DataHub Agadir', 'Agadir', 'Database Administration', 'careers@datahub-agadir.ma', '+212 528 84 50 00', 'https://www.datahub-agadir.ma', 'low', 'Gestion de bases de données'),
('WebCraft Morocco', 'Agadir', 'Web Development', 'jobs@webcraft.ma', '+212 528 84 70 00', 'https://www.webcraft.ma', 'low', 'Création de sites web professionnels'),
('Mobile Innovation', 'Agadir', 'Mobile Development', 'contact@mobileinnovation.ma', '+212 528 84 90 00', 'https://www.mobileinnovation.ma', 'low', 'Innovation en développement mobile'),

-- Oujda
('TechEast Oujda', 'Oujda', 'Software Engineering', 'info@techeast.ma', '+212 536 68 00 00', 'https://www.techeast.ma', 'medium', 'Solutions logicielles entreprise'),
('SecureNet Oujda', 'Oujda', 'Cybersecurity', 'jobs@securenet-oujda.ma', '+212 536 70 30 00', 'https://www.securenet-oujda.ma', 'high', 'Sécurité réseau et pentesting'),
('DevHub Oujda', 'Oujda', 'Web Development', 'contact@devhub-oujda.ma', '+212 536 71 00 00', 'https://www.devhub-oujda.ma', 'medium', 'Développement web et mobile'),
('TechVision Maroc', 'Oujda', 'AI/Machine Learning', 'contact@techvision.ma', '+212 536 68 90 00', 'https://www.techvision.ma', 'medium', 'Vision par ordinateur et IA'),

-- Meknès
('ITServices Meknès', 'Meknès', 'Network Engineering', 'careers@itservices-meknes.ma', '+212 535 51 00 00', 'https://www.itservices-meknes.ma', 'low', 'Infrastructure IT et réseau'),
('SmartDev Meknès', 'Meknès', 'Mobile Development', 'jobs@smartdev.ma', '+212 535 52 40 00', 'https://www.smartdev.ma', 'medium', 'Applications mobiles intelligentes'),
('AI Lab Meknès', 'Meknès', 'AI/Machine Learning', 'contact@ailab-meknes.ma', '+212 535 53 80 00', 'https://www.ailab-meknes.ma', 'medium', 'Intelligence artificielle et ML'),
('SecureIT Morocco', 'Meknès', 'Cybersecurity', 'careers@secureit.ma', '+212 535 51 80 00', 'https://www.secureit.ma', 'high', 'Solutions de sécurité IT'),

-- Kenitra
('DigitalWorks Kenitra', 'Kenitra', 'Web Development', 'info@digitalworks.ma', '+212 537 37 00 00', 'https://www.digitalworks.ma', 'low', 'Solutions web et digitales'),
('CloudOps Kenitra', 'Kenitra', 'DevOps', 'jobs@cloudops-kenitra.ma', '+212 537 36 50 00', 'https://www.cloudops-kenitra.ma', 'medium', 'DevOps et automatisation'),
('CloudNative Morocco', 'Kenitra', 'Cloud Computing', 'jobs@cloudnative.ma', '+212 537 37 90 00', 'https://www.cloudnative.ma', 'high', 'Applications cloud-native'),

-- Tétouan
('NorthTech Tétouan', 'Tétouan', 'Software Engineering', 'careers@northtech.ma', '+212 539 96 00 00', 'https://www.northtech.ma', 'medium', 'Développement logiciel'),
('WebFactory Tétouan', 'Tétouan', 'UI/UX Design', 'contact@webfactory-tetouan.ma', '+212 539 97 30 00', 'https://www.webfactory-tetouan.ma', 'low', 'Design web et UX'),
('DataLab Morocco', 'Tétouan', 'Data Science', 'info@datalab.ma', '+212 539 96 80 00', 'https://www.datalab.ma', 'medium', 'Laboratoire de data science'),

-- Safi
('TechSafi Solutions', 'Safi', 'Web Development', 'contact@techsafi.ma', '+212 524 61 00 00', 'https://www.techsafi.ma', 'low', 'Développement web et e-commerce'),
('CyberSafi', 'Safi', 'Cybersecurity', 'jobs@cybersafi.ma', '+212 524 62 40 00', 'https://www.cybersafi.ma', 'medium', 'Sécurité informatique'),

-- Temara
('DigitalTemara', 'Temara', 'Software Engineering', 'careers@digitaltemara.ma', '+212 537 64 00 00', 'https://www.digitaltemara.ma', 'low', 'Solutions logicielles'),

-- Mohammedia
('TechMohammedia', 'Mohammedia', 'DevOps', 'info@techmohammedia.ma', '+212 523 32 00 00', 'https://www.techmohammedia.ma', 'medium', 'Infrastructure et DevOps'),

-- Khouribga
('IT Khouribga', 'Khouribga', 'Web Development', 'contact@itkhouribga.ma', '+212 523 56 00 00', 'https://www.itkhouribga.ma', 'low', 'Développement web'),

-- El Jadida
('Coastal Tech', 'El Jadida', 'Mobile Development', 'jobs@coastaltech.ma', '+212 523 34 00 00', 'https://www.coastaltech.ma', 'low', 'Applications mobiles'),

-- Béni Mellal
('Atlas Tech', 'Béni Mellal', 'Cloud Computing', 'careers@atlastech.ma', '+212 523 48 00 00', 'https://www.atlastech.ma', 'medium', 'Solutions cloud'),

-- Nador
('MedTech Nador', 'Nador', 'Software Engineering', 'info@medtech-nador.ma', '+212 536 60 00 00', 'https://www.medtech-nador.ma', 'low', 'Développement logiciel'),

-- Taza
('TechTaza', 'Taza', 'Web Development', 'contact@techtaza.ma', '+212 535 67 00 00', 'https://www.techtaza.ma', 'low', 'Solutions web');

-- Verify insertion
SELECT 
    COUNT(*) as total_companies,
    COUNT(DISTINCT city) as total_cities,
    COUNT(DISTINCT speciality) as total_specialties
FROM companies;

-- Show distribution by city
SELECT city, COUNT(*) as count 
FROM companies 
GROUP BY city 
ORDER BY count DESC;

-- Show distribution by specialty
SELECT speciality, COUNT(*) as count 
FROM companies 
GROUP BY speciality 
ORDER BY count DESC;

-- Show distribution by priority
SELECT priority, COUNT(*) as count 
FROM companies 
GROUP BY priority 
ORDER BY FIELD(priority, 'high', 'medium', 'low');

