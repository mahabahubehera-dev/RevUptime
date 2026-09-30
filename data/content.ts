export const industries = [
 {name:'Steel & Metals',href:'/industries/steel',tag:'HIGH-DUTY OPERATIONS',description:'Keep watch over motors, ID fans, pumps and rolling-mill auxiliaries across demanding production cycles.'},
 {name:'Mining & Minerals',href:'/industries/mining',tag:'FROM EXTRACTION TO PROCESSING',description:'Bring condition visibility to crushers, conveyors and pumps that keep material moving.'},
 {name:'Sponge Iron & Ferroalloys',href:'/industries/steel',tag:'CONTINUOUS PRODUCTION',description:'Track kiln-drive motors, cooling fans and material-handling equipment between inspection rounds.'},
 {name:'Cement',href:'/industries/manufacturing',tag:'CRITICAL ROTATING ASSETS',description:'Follow the health of mill auxiliaries, fans, gearboxes and conveyors through changing operating loads.'},
 {name:'Power',href:'/industries/manufacturing',tag:'PLANT & CAPTIVE POWER',description:'Monitor pumps, fans and supporting rotating equipment to help maintenance teams prioritise checks.'},
 {name:'Ports & Material Handling',href:'/industries/mining',tag:'EVERY MOVEMENT MATTERS',description:'Understand the condition of conveyor drives, gearboxes and material-handling motors.'},
];
export const assets = [
 {name:'Motors',detail:'Drive-end bearings · Vibration · Temperature',icon:'motor'},
 {name:'Pumps',detail:'Operating trends · Bearings · Mounting',icon:'pump'},
 {name:'Gearboxes',detail:'Housing vibration · Heat · Condition history',icon:'gear'},
 {name:'Fans & Blowers',detail:'Motor condition · Vibration · Baselines',icon:'fan'},
 {name:'Conveyors',detail:'Drive motors · Gearboxes · Trends',icon:'conveyor'},
 {name:'Crushers',detail:'Drive condition · Bearings · Operating loads',icon:'crusher'},
];
export const machines = [
 {name:'Kiln Drive Motor',id:'M-101',status:'good',vibration:1.8,temp:54,health:94,type:'Electric motor',note:'Readings are within this machine’s normal operating range.'},
 {name:'ID Fan',id:'M-104',status:'watch',vibration:4.2,temp:68,health:72,type:'Fan motor',note:'Vibration has stayed above its 2.1 mm/s baseline for 3.4 hours. Review bearing condition and mounting.'},
 {name:'Slurry Pump',id:'P-012',status:'critical',vibration:7.9,temp:81,health:38,type:'Process pump',note:'Vibration and temperature are above configured limits. Arrange an engineering review using the plant’s safety procedures.'},
 {name:'Conveyor Drive',id:'C-008',status:'good',vibration:2.0,temp:49,health:96,type:'Conveyor motor',note:'The recent operating trend is stable. Continue normal monitoring.'},
];
