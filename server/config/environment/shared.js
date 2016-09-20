'use strict';

exports = module.exports = {
  // List of user roles
  userRoles:['user'],
  timeZones:[{'zoneId':1,'countryCode':'AD','zoneName':'Europe/Andorra'},{'zoneId':2,'countryCode':'AE','zoneName':'Asia/Dubai'},{'zoneId':3,'countryCode':'AF','zoneName':'Asia/Kabul'},{'zoneId':4,'countryCode':'AG','zoneName':'America/Antigua'},{'zoneId':5,'countryCode':'AI','zoneName':'America/Anguilla'},{'zoneId':6,'countryCode':'AL','zoneName':'Europe/Tirane'},{'zoneId':7,'countryCode':'AM','zoneName':'Asia/Yerevan'},{'zoneId':8,'countryCode':'AO','zoneName':'Africa/Luanda'},{'zoneId':9,'countryCode':'AQ','zoneName':'Antarctica/McMurdo'},{'zoneId':10,'countryCode':'AQ','zoneName':'Antarctica/Casey'},{'zoneId':11,'countryCode':'AQ','zoneName':'Antarctica/Davis'},{'zoneId':12,'countryCode':'AQ','zoneName':'Antarctica/DumontDUrville'},{'zoneId':13,'countryCode':'AQ','zoneName':'Antarctica/Mawson'},{'zoneId':14,'countryCode':'AQ','zoneName':'Antarctica/Palmer'},{'zoneId':15,'countryCode':'AQ','zoneName':'Antarctica/Rothera'},{'zoneId':16,'countryCode':'AQ','zoneName':'Antarctica/Syowa'},{'zoneId':17,'countryCode':'AQ','zoneName':'Antarctica/Troll'},{'zoneId':18,'countryCode':'AQ','zoneName':'Antarctica/Vostok'},{'zoneId':19,'countryCode':'AR','zoneName':'America/Argentina/Buenos_Aires'},{'zoneId':20,'countryCode':'AR','zoneName':'America/Argentina/Cordoba'},{'zoneId':21,'countryCode':'AR','zoneName':'America/Argentina/Salta'},{'zoneId':22,'countryCode':'AR','zoneName':'America/Argentina/Jujuy'},{'zoneId':23,'countryCode':'AR','zoneName':'America/Argentina/Tucuman'},{'zoneId':24,'countryCode':'AR','zoneName':'America/Argentina/Catamarca'},{'zoneId':25,'countryCode':'AR','zoneName':'America/Argentina/La_Rioja'},{'zoneId':26,'countryCode':'AR','zoneName':'America/Argentina/San_Juan'},{'zoneId':27,'countryCode':'AR','zoneName':'America/Argentina/Mendoza'},{'zoneId':28,'countryCode':'AR','zoneName':'America/Argentina/San_Luis'},{'zoneId':29,'countryCode':'AR','zoneName':'America/Argentina/Rio_Gallegos'},{'zoneId':30,'countryCode':'AR','zoneName':'America/Argentina/Ushuaia'},{'zoneId':31,'countryCode':'AS','zoneName':'Pacific/Pago_Pago'},{'zoneId':32,'countryCode':'AT','zoneName':'Europe/Vienna'},{'zoneId':33,'countryCode':'AU','zoneName':'Australia/Lord_Howe'},{'zoneId':34,'countryCode':'AU','zoneName':'Antarctica/Macquarie'},{'zoneId':35,'countryCode':'AU','zoneName':'Australia/Hobart'},{'zoneId':36,'countryCode':'AU','zoneName':'Australia/Currie'},{'zoneId':37,'countryCode':'AU','zoneName':'Australia/Melbourne'},{'zoneId':38,'countryCode':'AU','zoneName':'Australia/Sydney'},{'zoneId':39,'countryCode':'AU','zoneName':'Australia/Broken_Hill'},{'zoneId':40,'countryCode':'AU','zoneName':'Australia/Brisbane'},{'zoneId':41,'countryCode':'AU','zoneName':'Australia/Lindeman'},{'zoneId':42,'countryCode':'AU','zoneName':'Australia/Adelaide'},{'zoneId':43,'countryCode':'AU','zoneName':'Australia/Darwin'},{'zoneId':44,'countryCode':'AU','zoneName':'Australia/Perth'},{'zoneId':45,'countryCode':'AU','zoneName':'Australia/Eucla'},{'zoneId':46,'countryCode':'AW','zoneName':'America/Aruba'},{'zoneId':47,'countryCode':'AX','zoneName':'Europe/Mariehamn'},{'zoneId':48,'countryCode':'AZ','zoneName':'Asia/Baku'},{'zoneId':49,'countryCode':'BA','zoneName':'Europe/Sarajevo'},{'zoneId':50,'countryCode':'BB','zoneName':'America/Barbados'},{'zoneId':51,'countryCode':'BD','zoneName':'Asia/Dhaka'},{'zoneId':52,'countryCode':'BE','zoneName':'Europe/Brussels'},{'zoneId':53,'countryCode':'BF','zoneName':'Africa/Ouagadougou'},{'zoneId':54,'countryCode':'BG','zoneName':'Europe/Sofia'},{'zoneId':55,'countryCode':'BH','zoneName':'Asia/Bahrain'},{'zoneId':56,'countryCode':'BI','zoneName':'Africa/Bujumbura'},{'zoneId':57,'countryCode':'BJ','zoneName':'Africa/Porto-Novo'},{'zoneId':58,'countryCode':'BL','zoneName':'America/St_Barthelemy'},{'zoneId':59,'countryCode':'BM','zoneName':'Atlantic/Bermuda'},{'zoneId':60,'countryCode':'BN','zoneName':'Asia/Brunei'},{'zoneId':61,'countryCode':'BO','zoneName':'America/La_Paz'},{'zoneId':62,'countryCode':'BQ','zoneName':'America/Kralendijk'},{'zoneId':63,'countryCode':'BR','zoneName':'America/Noronha'},{'zoneId':64,'countryCode':'BR','zoneName':'America/Belem'},{'zoneId':65,'countryCode':'BR','zoneName':'America/Fortaleza'},{'zoneId':66,'countryCode':'BR','zoneName':'America/Recife'},{'zoneId':67,'countryCode':'BR','zoneName':'America/Araguaina'},{'zoneId':68,'countryCode':'BR','zoneName':'America/Maceio'},{'zoneId':69,'countryCode':'BR','zoneName':'America/Bahia'},{'zoneId':70,'countryCode':'BR','zoneName':'America/Sao_Paulo'},{'zoneId':71,'countryCode':'BR','zoneName':'America/Campo_Grande'},{'zoneId':72,'countryCode':'BR','zoneName':'America/Cuiaba'},{'zoneId':73,'countryCode':'BR','zoneName':'America/Santarem'},{'zoneId':74,'countryCode':'BR','zoneName':'America/Porto_Velho'},{'zoneId':75,'countryCode':'BR','zoneName':'America/Boa_Vista'},{'zoneId':76,'countryCode':'BR','zoneName':'America/Manaus'},{'zoneId':77,'countryCode':'BR','zoneName':'America/Eirunepe'},{'zoneId':78,'countryCode':'BR','zoneName':'America/Rio_Branco'},{'zoneId':79,'countryCode':'BS','zoneName':'America/Nassau'},{'zoneId':80,'countryCode':'BT','zoneName':'Asia/Thimphu'},{'zoneId':81,'countryCode':'BW','zoneName':'Africa/Gaborone'},{'zoneId':82,'countryCode':'BY','zoneName':'Europe/Minsk'},{'zoneId':83,'countryCode':'BZ','zoneName':'America/Belize'},{'zoneId':84,'countryCode':'CA','zoneName':'America/St_Johns'},{'zoneId':85,'countryCode':'CA','zoneName':'America/Halifax'},{'zoneId':86,'countryCode':'CA','zoneName':'America/Glace_Bay'},{'zoneId':87,'countryCode':'CA','zoneName':'America/Moncton'},{'zoneId':88,'countryCode':'CA','zoneName':'America/Goose_Bay'},{'zoneId':89,'countryCode':'CA','zoneName':'America/Blanc-Sablon'},{'zoneId':90,'countryCode':'CA','zoneName':'America/Toronto'},{'zoneId':91,'countryCode':'CA','zoneName':'America/Nipigon'},{'zoneId':92,'countryCode':'CA','zoneName':'America/Thunder_Bay'},{'zoneId':93,'countryCode':'CA','zoneName':'America/Iqaluit'},{'zoneId':94,'countryCode':'CA','zoneName':'America/Pangnirtung'},{'zoneId':95,'countryCode':'CA','zoneName':'America/Atikokan'},{'zoneId':96,'countryCode':'CA','zoneName':'America/Winnipeg'},{'zoneId':97,'countryCode':'CA','zoneName':'America/Rainy_River'},{'zoneId':98,'countryCode':'CA','zoneName':'America/Resolute'},{'zoneId':99,'countryCode':'CA','zoneName':'America/Rankin_Inlet'},{'zoneId':100,'countryCode':'CA','zoneName':'America/Regina'},{'zoneId':101,'countryCode':'CA','zoneName':'America/Swift_Current'},{'zoneId':102,'countryCode':'CA','zoneName':'America/Edmonton'},{'zoneId':103,'countryCode':'CA','zoneName':'America/Cambridge_Bay'},{'zoneId':104,'countryCode':'CA','zoneName':'America/Yellowknife'},{'zoneId':105,'countryCode':'CA','zoneName':'America/Inuvik'},{'zoneId':106,'countryCode':'CA','zoneName':'America/Creston'},{'zoneId':107,'countryCode':'CA','zoneName':'America/Dawson_Creek'},{'zoneId':108,'countryCode':'CA','zoneName':'America/Fort_Nelson'},{'zoneId':109,'countryCode':'CA','zoneName':'America/Vancouver'},{'zoneId':110,'countryCode':'CA','zoneName':'America/Whitehorse'},{'zoneId':111,'countryCode':'CA','zoneName':'America/Dawson'},{'zoneId':112,'countryCode':'CC','zoneName':'Indian/Cocos'},{'zoneId':113,'countryCode':'CD','zoneName':'Africa/Kinshasa'},{'zoneId':114,'countryCode':'CD','zoneName':'Africa/Lubumbashi'},{'zoneId':115,'countryCode':'CF','zoneName':'Africa/Bangui'},{'zoneId':116,'countryCode':'CG','zoneName':'Africa/Brazzaville'},{'zoneId':117,'countryCode':'CH','zoneName':'Europe/Zurich'},{'zoneId':118,'countryCode':'CI','zoneName':'Africa/Abidjan'},{'zoneId':119,'countryCode':'CK','zoneName':'Pacific/Rarotonga'},{'zoneId':120,'countryCode':'CL','zoneName':'America/Santiago'},{'zoneId':121,'countryCode':'CL','zoneName':'Pacific/Easter'},{'zoneId':122,'countryCode':'CM','zoneName':'Africa/Douala'},{'zoneId':123,'countryCode':'CN','zoneName':'Asia/Shanghai'},{'zoneId':124,'countryCode':'CN','zoneName':'Asia/Urumqi'},{'zoneId':125,'countryCode':'CO','zoneName':'America/Bogota'},{'zoneId':126,'countryCode':'CR','zoneName':'America/Costa_Rica'},{'zoneId':127,'countryCode':'CU','zoneName':'America/Havana'},{'zoneId':128,'countryCode':'CV','zoneName':'Atlantic/Cape_Verde'},{'zoneId':129,'countryCode':'CW','zoneName':'America/Curacao'},{'zoneId':130,'countryCode':'CX','zoneName':'Indian/Christmas'},{'zoneId':131,'countryCode':'CY','zoneName':'Asia/Nicosia'},{'zoneId':132,'countryCode':'CZ','zoneName':'Europe/Prague'},{'zoneId':133,'countryCode':'DE','zoneName':'Europe/Berlin'},{'zoneId':134,'countryCode':'DE','zoneName':'Europe/Busingen'},{'zoneId':135,'countryCode':'DJ','zoneName':'Africa/Djibouti'},{'zoneId':136,'countryCode':'DK','zoneName':'Europe/Copenhagen'},{'zoneId':137,'countryCode':'DM','zoneName':'America/Dominica'},{'zoneId':138,'countryCode':'DO','zoneName':'America/Santo_Domingo'},{'zoneId':139,'countryCode':'DZ','zoneName':'Africa/Algiers'},{'zoneId':140,'countryCode':'EC','zoneName':'America/Guayaquil'},{'zoneId':141,'countryCode':'EC','zoneName':'Pacific/Galapagos'},{'zoneId':142,'countryCode':'EE','zoneName':'Europe/Tallinn'},{'zoneId':143,'countryCode':'EG','zoneName':'Africa/Cairo'},{'zoneId':144,'countryCode':'EH','zoneName':'Africa/El_Aaiun'},{'zoneId':145,'countryCode':'ER','zoneName':'Africa/Asmara'},{'zoneId':146,'countryCode':'ES','zoneName':'Europe/Madrid'},{'zoneId':147,'countryCode':'ES','zoneName':'Africa/Ceuta'},{'zoneId':148,'countryCode':'ES','zoneName':'Atlantic/Canary'},{'zoneId':149,'countryCode':'ET','zoneName':'Africa/Addis_Ababa'},{'zoneId':150,'countryCode':'FI','zoneName':'Europe/Helsinki'},{'zoneId':151,'countryCode':'FJ','zoneName':'Pacific/Fiji'},{'zoneId':152,'countryCode':'FK','zoneName':'Atlantic/Stanley'},{'zoneId':153,'countryCode':'FM','zoneName':'Pacific/Chuuk'},{'zoneId':154,'countryCode':'FM','zoneName':'Pacific/Pohnpei'},{'zoneId':155,'countryCode':'FM','zoneName':'Pacific/Kosrae'},{'zoneId':156,'countryCode':'FO','zoneName':'Atlantic/Faroe'},{'zoneId':157,'countryCode':'FR','zoneName':'Europe/Paris'},{'zoneId':158,'countryCode':'GA','zoneName':'Africa/Libreville'},{'zoneId':159,'countryCode':'GB','zoneName':'Europe/London'},{'zoneId':160,'countryCode':'GD','zoneName':'America/Grenada'},{'zoneId':161,'countryCode':'GE','zoneName':'Asia/Tbilisi'},{'zoneId':162,'countryCode':'GF','zoneName':'America/Cayenne'},{'zoneId':163,'countryCode':'GG','zoneName':'Europe/Guernsey'},{'zoneId':164,'countryCode':'GH','zoneName':'Africa/Accra'},{'zoneId':165,'countryCode':'GI','zoneName':'Europe/Gibraltar'},{'zoneId':166,'countryCode':'GL','zoneName':'America/Godthab'},{'zoneId':167,'countryCode':'GL','zoneName':'America/Danmarkshavn'},{'zoneId':168,'countryCode':'GL','zoneName':'America/Scoresbysund'},{'zoneId':169,'countryCode':'GL','zoneName':'America/Thule'},{'zoneId':170,'countryCode':'GM','zoneName':'Africa/Banjul'},{'zoneId':171,'countryCode':'GN','zoneName':'Africa/Conakry'},{'zoneId':172,'countryCode':'GP','zoneName':'America/Guadeloupe'},{'zoneId':173,'countryCode':'GQ','zoneName':'Africa/Malabo'},{'zoneId':174,'countryCode':'GR','zoneName':'Europe/Athens'},{'zoneId':175,'countryCode':'GS','zoneName':'Atlantic/South_Georgia'},{'zoneId':176,'countryCode':'GT','zoneName':'America/Guatemala'},{'zoneId':177,'countryCode':'GU','zoneName':'Pacific/Guam'},{'zoneId':178,'countryCode':'GW','zoneName':'Africa/Bissau'},{'zoneId':179,'countryCode':'GY','zoneName':'America/Guyana'},{'zoneId':180,'countryCode':'HK','zoneName':'Asia/Hong_Kong'},{'zoneId':181,'countryCode':'HN','zoneName':'America/Tegucigalpa'},{'zoneId':182,'countryCode':'HR','zoneName':'Europe/Zagreb'},{'zoneId':183,'countryCode':'HT','zoneName':'America/Port-au-Prince'},{'zoneId':184,'countryCode':'HU','zoneName':'Europe/Budapest'},{'zoneId':185,'countryCode':'ID','zoneName':'Asia/Jakarta'},{'zoneId':186,'countryCode':'ID','zoneName':'Asia/Pontianak'},{'zoneId':187,'countryCode':'ID','zoneName':'Asia/Makassar'},{'zoneId':188,'countryCode':'ID','zoneName':'Asia/Jayapura'},{'zoneId':189,'countryCode':'IE','zoneName':'Europe/Dublin'},{'zoneId':190,'countryCode':'IL','zoneName':'Asia/Jerusalem'},{'zoneId':191,'countryCode':'IM','zoneName':'Europe/Isle_of_Man'},{'zoneId':192,'countryCode':'IN','zoneName':'Asia/Kolkata'},{'zoneId':193,'countryCode':'IO','zoneName':'Indian/Chagos'},{'zoneId':194,'countryCode':'IQ','zoneName':'Asia/Baghdad'},{'zoneId':195,'countryCode':'IR','zoneName':'Asia/Tehran'},{'zoneId':196,'countryCode':'IS','zoneName':'Atlantic/Reykjavik'},{'zoneId':197,'countryCode':'IT','zoneName':'Europe/Rome'},{'zoneId':198,'countryCode':'JE','zoneName':'Europe/Jersey'},{'zoneId':199,'countryCode':'JM','zoneName':'America/Jamaica'},{'zoneId':200,'countryCode':'JO','zoneName':'Asia/Amman'},{'zoneId':201,'countryCode':'JP','zoneName':'Asia/Tokyo'},{'zoneId':202,'countryCode':'KE','zoneName':'Africa/Nairobi'},{'zoneId':203,'countryCode':'KG','zoneName':'Asia/Bishkek'},{'zoneId':204,'countryCode':'KH','zoneName':'Asia/Phnom_Penh'},{'zoneId':205,'countryCode':'KI','zoneName':'Pacific/Tarawa'},{'zoneId':206,'countryCode':'KI','zoneName':'Pacific/Enderbury'},{'zoneId':207,'countryCode':'KI','zoneName':'Pacific/Kiritimati'},{'zoneId':208,'countryCode':'KM','zoneName':'Indian/Comoro'},{'zoneId':209,'countryCode':'KN','zoneName':'America/St_Kitts'},{'zoneId':210,'countryCode':'KP','zoneName':'Asia/Pyongyang'},{'zoneId':211,'countryCode':'KR','zoneName':'Asia/Seoul'},{'zoneId':212,'countryCode':'KW','zoneName':'Asia/Kuwait'},{'zoneId':213,'countryCode':'KY','zoneName':'America/Cayman'},{'zoneId':214,'countryCode':'KZ','zoneName':'Asia/Almaty'},{'zoneId':215,'countryCode':'KZ','zoneName':'Asia/Qyzylorda'},{'zoneId':216,'countryCode':'KZ','zoneName':'Asia/Aqtobe'},{'zoneId':217,'countryCode':'KZ','zoneName':'Asia/Aqtau'},{'zoneId':218,'countryCode':'KZ','zoneName':'Asia/Oral'},{'zoneId':219,'countryCode':'LA','zoneName':'Asia/Vientiane'},{'zoneId':220,'countryCode':'LB','zoneName':'Asia/Beirut'},{'zoneId':221,'countryCode':'LC','zoneName':'America/St_Lucia'},{'zoneId':222,'countryCode':'LI','zoneName':'Europe/Vaduz'},{'zoneId':223,'countryCode':'LK','zoneName':'Asia/Colombo'},{'zoneId':224,'countryCode':'LR','zoneName':'Africa/Monrovia'},{'zoneId':225,'countryCode':'LS','zoneName':'Africa/Maseru'},{'zoneId':226,'countryCode':'LT','zoneName':'Europe/Vilnius'},{'zoneId':227,'countryCode':'LU','zoneName':'Europe/Luxembourg'},{'zoneId':228,'countryCode':'LV','zoneName':'Europe/Riga'},{'zoneId':229,'countryCode':'LY','zoneName':'Africa/Tripoli'},{'zoneId':230,'countryCode':'MA','zoneName':'Africa/Casablanca'},{'zoneId':231,'countryCode':'MC','zoneName':'Europe/Monaco'},{'zoneId':232,'countryCode':'MD','zoneName':'Europe/Chisinau'},{'zoneId':233,'countryCode':'ME','zoneName':'Europe/Podgorica'},{'zoneId':234,'countryCode':'MF','zoneName':'America/Marigot'},{'zoneId':235,'countryCode':'MG','zoneName':'Indian/Antananarivo'},{'zoneId':236,'countryCode':'MH','zoneName':'Pacific/Majuro'},{'zoneId':237,'countryCode':'MH','zoneName':'Pacific/Kwajalein'},{'zoneId':238,'countryCode':'MK','zoneName':'Europe/Skopje'},{'zoneId':239,'countryCode':'ML','zoneName':'Africa/Bamako'},{'zoneId':240,'countryCode':'MM','zoneName':'Asia/Rangoon'},{'zoneId':241,'countryCode':'MN','zoneName':'Asia/Ulaanbaatar'},{'zoneId':242,'countryCode':'MN','zoneName':'Asia/Hovd'},{'zoneId':243,'countryCode':'MN','zoneName':'Asia/Choibalsan'},{'zoneId':244,'countryCode':'MO','zoneName':'Asia/Macau'},{'zoneId':245,'countryCode':'MP','zoneName':'Pacific/Saipan'},{'zoneId':246,'countryCode':'MQ','zoneName':'America/Martinique'},{'zoneId':247,'countryCode':'MR','zoneName':'Africa/Nouakchott'},{'zoneId':248,'countryCode':'MS','zoneName':'America/Montserrat'},{'zoneId':249,'countryCode':'MT','zoneName':'Europe/Malta'},{'zoneId':250,'countryCode':'MU','zoneName':'Indian/Mauritius'},{'zoneId':251,'countryCode':'MV','zoneName':'Indian/Maldives'},{'zoneId':252,'countryCode':'MW','zoneName':'Africa/Blantyre'},{'zoneId':253,'countryCode':'MX','zoneName':'America/Mexico_City'},{'zoneId':254,'countryCode':'MX','zoneName':'America/Cancun'},{'zoneId':255,'countryCode':'MX','zoneName':'America/Merida'},{'zoneId':256,'countryCode':'MX','zoneName':'America/Monterrey'},{'zoneId':257,'countryCode':'MX','zoneName':'America/Matamoros'},{'zoneId':258,'countryCode':'MX','zoneName':'America/Mazatlan'},{'zoneId':259,'countryCode':'MX','zoneName':'America/Chihuahua'},{'zoneId':260,'countryCode':'MX','zoneName':'America/Ojinaga'},{'zoneId':261,'countryCode':'MX','zoneName':'America/Hermosillo'},{'zoneId':262,'countryCode':'MX','zoneName':'America/Tijuana'},{'zoneId':263,'countryCode':'MX','zoneName':'America/Bahia_Banderas'},{'zoneId':264,'countryCode':'MY','zoneName':'Asia/Kuala_Lumpur'},{'zoneId':265,'countryCode':'MY','zoneName':'Asia/Kuching'},{'zoneId':266,'countryCode':'MZ','zoneName':'Africa/Maputo'},{'zoneId':267,'countryCode':'NA','zoneName':'Africa/Windhoek'},{'zoneId':268,'countryCode':'NC','zoneName':'Pacific/Noumea'},{'zoneId':269,'countryCode':'NE','zoneName':'Africa/Niamey'},{'zoneId':270,'countryCode':'NF','zoneName':'Pacific/Norfolk'},{'zoneId':271,'countryCode':'NG','zoneName':'Africa/Lagos'},{'zoneId':272,'countryCode':'NI','zoneName':'America/Managua'},{'zoneId':273,'countryCode':'NL','zoneName':'Europe/Amsterdam'},{'zoneId':274,'countryCode':'NO','zoneName':'Europe/Oslo'},{'zoneId':275,'countryCode':'NP','zoneName':'Asia/Kathmandu'},{'zoneId':276,'countryCode':'NR','zoneName':'Pacific/Nauru'},{'zoneId':277,'countryCode':'NU','zoneName':'Pacific/Niue'},{'zoneId':278,'countryCode':'NZ','zoneName':'Pacific/Auckland'},{'zoneId':279,'countryCode':'NZ','zoneName':'Pacific/Chatham'},{'zoneId':280,'countryCode':'OM','zoneName':'Asia/Muscat'},{'zoneId':281,'countryCode':'PA','zoneName':'America/Panama'},{'zoneId':282,'countryCode':'PE','zoneName':'America/Lima'},{'zoneId':283,'countryCode':'PF','zoneName':'Pacific/Tahiti'},{'zoneId':284,'countryCode':'PF','zoneName':'Pacific/Marquesas'},{'zoneId':285,'countryCode':'PF','zoneName':'Pacific/Gambier'},{'zoneId':286,'countryCode':'PG','zoneName':'Pacific/Port_Moresby'},{'zoneId':287,'countryCode':'PG','zoneName':'Pacific/Bougainville'},{'zoneId':288,'countryCode':'PH','zoneName':'Asia/Manila'},{'zoneId':289,'countryCode':'PK','zoneName':'Asia/Karachi'},{'zoneId':290,'countryCode':'PL','zoneName':'Europe/Warsaw'},{'zoneId':291,'countryCode':'PM','zoneName':'America/Miquelon'},{'zoneId':292,'countryCode':'PN','zoneName':'Pacific/Pitcairn'},{'zoneId':293,'countryCode':'PR','zoneName':'America/Puerto_Rico'},{'zoneId':294,'countryCode':'PS','zoneName':'Asia/Gaza'},{'zoneId':295,'countryCode':'PS','zoneName':'Asia/Hebron'},{'zoneId':296,'countryCode':'PT','zoneName':'Europe/Lisbon'},{'zoneId':297,'countryCode':'PT','zoneName':'Atlantic/Madeira'},{'zoneId':298,'countryCode':'PT','zoneName':'Atlantic/Azores'},{'zoneId':299,'countryCode':'PW','zoneName':'Pacific/Palau'},{'zoneId':300,'countryCode':'PY','zoneName':'America/Asuncion'},{'zoneId':301,'countryCode':'QA','zoneName':'Asia/Qatar'},{'zoneId':302,'countryCode':'RE','zoneName':'Indian/Reunion'},{'zoneId':303,'countryCode':'RO','zoneName':'Europe/Bucharest'},{'zoneId':304,'countryCode':'RS','zoneName':'Europe/Belgrade'},{'zoneId':305,'countryCode':'RU','zoneName':'Europe/Kaliningrad'},{'zoneId':306,'countryCode':'RU','zoneName':'Europe/Moscow'},{'zoneId':307,'countryCode':'RU','zoneName':'Europe/Simferopol'},{'zoneId':308,'countryCode':'RU','zoneName':'Europe/Volgograd'},{'zoneId':309,'countryCode':'RU','zoneName':'Europe/Kirov'},{'zoneId':310,'countryCode':'RU','zoneName':'Europe/Astrakhan'},{'zoneId':311,'countryCode':'RU','zoneName':'Europe/Samara'},{'zoneId':312,'countryCode':'RU','zoneName':'Europe/Ulyanovsk'},{'zoneId':313,'countryCode':'RU','zoneName':'Asia/Yekaterinburg'},{'zoneId':314,'countryCode':'RU','zoneName':'Asia/Omsk'},{'zoneId':315,'countryCode':'RU','zoneName':'Asia/Novosibirsk'},{'zoneId':316,'countryCode':'RU','zoneName':'Asia/Barnaul'},{'zoneId':317,'countryCode':'RU','zoneName':'Asia/Tomsk'},{'zoneId':318,'countryCode':'RU','zoneName':'Asia/Novokuznetsk'},{'zoneId':319,'countryCode':'RU','zoneName':'Asia/Krasnoyarsk'},{'zoneId':320,'countryCode':'RU','zoneName':'Asia/Irkutsk'},{'zoneId':321,'countryCode':'RU','zoneName':'Asia/Chita'},{'zoneId':322,'countryCode':'RU','zoneName':'Asia/Yakutsk'},{'zoneId':323,'countryCode':'RU','zoneName':'Asia/Khandyga'},{'zoneId':324,'countryCode':'RU','zoneName':'Asia/Vladivostok'},{'zoneId':325,'countryCode':'RU','zoneName':'Asia/Ust-Nera'},{'zoneId':326,'countryCode':'RU','zoneName':'Asia/Magadan'},{'zoneId':327,'countryCode':'RU','zoneName':'Asia/Sakhalin'},{'zoneId':328,'countryCode':'RU','zoneName':'Asia/Srednekolymsk'},{'zoneId':329,'countryCode':'RU','zoneName':'Asia/Kamchatka'},{'zoneId':330,'countryCode':'RU','zoneName':'Asia/Anadyr'},{'zoneId':331,'countryCode':'RW','zoneName':'Africa/Kigali'},{'zoneId':332,'countryCode':'SA','zoneName':'Asia/Riyadh'},{'zoneId':333,'countryCode':'SB','zoneName':'Pacific/Guadalcanal'},{'zoneId':334,'countryCode':'SC','zoneName':'Indian/Mahe'},{'zoneId':335,'countryCode':'SD','zoneName':'Africa/Khartoum'},{'zoneId':336,'countryCode':'SE','zoneName':'Europe/Stockholm'},{'zoneId':337,'countryCode':'SG','zoneName':'Asia/Singapore'},{'zoneId':338,'countryCode':'SH','zoneName':'Atlantic/St_Helena'},{'zoneId':339,'countryCode':'SI','zoneName':'Europe/Ljubljana'},{'zoneId':340,'countryCode':'SJ','zoneName':'Arctic/Longyearbyen'},{'zoneId':341,'countryCode':'SK','zoneName':'Europe/Bratislava'},{'zoneId':342,'countryCode':'SL','zoneName':'Africa/Freetown'},{'zoneId':343,'countryCode':'SM','zoneName':'Europe/San_Marino'},{'zoneId':344,'countryCode':'SN','zoneName':'Africa/Dakar'},{'zoneId':345,'countryCode':'SO','zoneName':'Africa/Mogadishu'},{'zoneId':346,'countryCode':'SR','zoneName':'America/Paramaribo'},{'zoneId':347,'countryCode':'SS','zoneName':'Africa/Juba'},{'zoneId':348,'countryCode':'ST','zoneName':'Africa/Sao_Tome'},{'zoneId':349,'countryCode':'SV','zoneName':'America/El_Salvador'},{'zoneId':350,'countryCode':'SX','zoneName':'America/Lower_Princes'},{'zoneId':351,'countryCode':'SY','zoneName':'Asia/Damascus'},{'zoneId':352,'countryCode':'SZ','zoneName':'Africa/Mbabane'},{'zoneId':353,'countryCode':'TC','zoneName':'America/Grand_Turk'},{'zoneId':354,'countryCode':'TD','zoneName':'Africa/Ndjamena'},{'zoneId':355,'countryCode':'TF','zoneName':'Indian/Kerguelen'},{'zoneId':356,'countryCode':'TG','zoneName':'Africa/Lome'},{'zoneId':357,'countryCode':'TH','zoneName':'Asia/Bangkok'},{'zoneId':358,'countryCode':'TJ','zoneName':'Asia/Dushanbe'},{'zoneId':359,'countryCode':'TK','zoneName':'Pacific/Fakaofo'},{'zoneId':360,'countryCode':'TL','zoneName':'Asia/Dili'},{'zoneId':361,'countryCode':'TM','zoneName':'Asia/Ashgabat'},{'zoneId':362,'countryCode':'TN','zoneName':'Africa/Tunis'},{'zoneId':363,'countryCode':'TO','zoneName':'Pacific/Tongatapu'},{'zoneId':364,'countryCode':'TR','zoneName':'Europe/Istanbul'},{'zoneId':365,'countryCode':'TT','zoneName':'America/Port_of_Spain'},{'zoneId':366,'countryCode':'TV','zoneName':'Pacific/Funafuti'},{'zoneId':367,'countryCode':'TW','zoneName':'Asia/Taipei'},{'zoneId':368,'countryCode':'TZ','zoneName':'Africa/Dar_es_Salaam'},{'zoneId':369,'countryCode':'UA','zoneName':'Europe/Kiev'},{'zoneId':370,'countryCode':'UA','zoneName':'Europe/Uzhgorod'},{'zoneId':371,'countryCode':'UA','zoneName':'Europe/Zaporozhye'},{'zoneId':372,'countryCode':'UG','zoneName':'Africa/Kampala'},{'zoneId':373,'countryCode':'UM','zoneName':'Pacific/Johnston'},{'zoneId':374,'countryCode':'UM','zoneName':'Pacific/Midway'},{'zoneId':375,'countryCode':'UM','zoneName':'Pacific/Wake'},{'zoneId':376,'countryCode':'US','zoneName':'America/New_York'},{'zoneId':377,'countryCode':'US','zoneName':'America/Detroit'},{'zoneId':378,'countryCode':'US','zoneName':'America/Kentucky/Louisville'},{'zoneId':379,'countryCode':'US','zoneName':'America/Kentucky/Monticello'},{'zoneId':380,'countryCode':'US','zoneName':'America/Indiana/Indianapolis'},{'zoneId':381,'countryCode':'US','zoneName':'America/Indiana/Vincennes'},{'zoneId':382,'countryCode':'US','zoneName':'America/Indiana/Winamac'},{'zoneId':383,'countryCode':'US','zoneName':'America/Indiana/Marengo'},{'zoneId':384,'countryCode':'US','zoneName':'America/Indiana/Petersburg'},{'zoneId':385,'countryCode':'US','zoneName':'America/Indiana/Vevay'},{'zoneId':386,'countryCode':'US','zoneName':'America/Chicago'},{'zoneId':387,'countryCode':'US','zoneName':'America/Indiana/Tell_City'},{'zoneId':388,'countryCode':'US','zoneName':'America/Indiana/Knox'},{'zoneId':389,'countryCode':'US','zoneName':'America/Menominee'},{'zoneId':390,'countryCode':'US','zoneName':'America/North_Dakota/Center'},{'zoneId':391,'countryCode':'US','zoneName':'America/North_Dakota/New_Salem'},{'zoneId':392,'countryCode':'US','zoneName':'America/North_Dakota/Beulah'},{'zoneId':393,'countryCode':'US','zoneName':'America/Denver'},{'zoneId':394,'countryCode':'US','zoneName':'America/Boise'},{'zoneId':395,'countryCode':'US','zoneName':'America/Phoenix'},{'zoneId':396,'countryCode':'US','zoneName':'America/Los_Angeles'},{'zoneId':397,'countryCode':'US','zoneName':'America/Anchorage'},{'zoneId':398,'countryCode':'US','zoneName':'America/Juneau'},{'zoneId':399,'countryCode':'US','zoneName':'America/Sitka'},{'zoneId':400,'countryCode':'US','zoneName':'America/Metlakatla'},{'zoneId':401,'countryCode':'US','zoneName':'America/Yakutat'},{'zoneId':402,'countryCode':'US','zoneName':'America/Nome'},{'zoneId':403,'countryCode':'US','zoneName':'America/Adak'},{'zoneId':404,'countryCode':'US','zoneName':'Pacific/Honolulu'},{'zoneId':405,'countryCode':'UY','zoneName':'America/Montevideo'},{'zoneId':406,'countryCode':'UZ','zoneName':'Asia/Samarkand'},{'zoneId':407,'countryCode':'UZ','zoneName':'Asia/Tashkent'},{'zoneId':408,'countryCode':'VA','zoneName':'Europe/Vatican'},{'zoneId':409,'countryCode':'VC','zoneName':'America/St_Vincent'},{'zoneId':410,'countryCode':'VE','zoneName':'America/Caracas'},{'zoneId':411,'countryCode':'VG','zoneName':'America/Tortola'},{'zoneId':412,'countryCode':'VI','zoneName':'America/St_Thomas'},{'zoneId':413,'countryCode':'VN','zoneName':'Asia/Ho_Chi_Minh'},{'zoneId':414,'countryCode':'VU','zoneName':'Pacific/Efate'},{'zoneId':415,'countryCode':'WF','zoneName':'Pacific/Wallis'},{'zoneId':416,'countryCode':'WS','zoneName':'Pacific/Apia'},{'zoneId':417,'countryCode':'YE','zoneName':'Asia/Aden'},{'zoneId':418,'countryCode':'YT','zoneName':'Indian/Mayotte'},{'zoneId':419,'countryCode':'ZA','zoneName':'Africa/Johannesburg'},{'zoneId':420,'countryCode':'ZM','zoneName':'Africa/Lusaka'},{'zoneId':421,'countryCode':'ZW','zoneName':'Africa/Harare'} ]
};