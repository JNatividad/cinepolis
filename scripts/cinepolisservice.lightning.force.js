$Lightning.use("c:CinepolisService_WebCase",
function() {
    $Lightning.createComponent(
        "c:CinepolisService_Main",
        null,
        "caseContainer"
    );
},
'https://cinepolisservicecommunity.force.com'
);