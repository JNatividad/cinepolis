var initESW = function(gslbBaseURL) {
    embedded_svc.settings.displayHelpButton = true;
    embedded_svc.settings.language = 'en';
    embedded_svc.settings.defaultMinimizedText = 'Empezar chat';
    embedded_svc.settings.disabledMinimizedText = 'No hay agentes disponibles';
    embedded_svc.settings.loadingText = 'Cargando'; 
    embedded_svc.settings.enabledFeatures = ['LiveAgent'];
    embedded_svc.settings.entryFeature = 'LiveAgent';

    embedded_svc.settings.enabledFeatures = ['LiveAgent'];
    embedded_svc.settings.entryFeature = 'LiveAgent';

    embedded_svc.init(
    'https://cinepolisservice.my.salesforce.com',
    'https://cinepolisservicecommunity.force.com',
    gslbBaseURL,
    '00D1U000000DAC8',
    'Live_Agent_Deployment',
    {
        baseLiveAgentContentURL: 'https://c.la2-c1-ph2.salesforceliveagent.com/content',
        deploymentId: '5721U000000VCSd',
        buttonId: '5731U000000VEBC',
        baseLiveAgentURL: 'https://d.la2-c1-ph2.salesforceliveagent.com/chat',
        eswLiveAgentDevName: 'EmbeddedServiceLiveAgent_Parent04I1U000000TV6CUAW_16b0aead60d',
        isOfflineSupportEnabled: false
    }
);
};

if (!window.embedded_svc) {
    var s = document.createElement('script');
    s.setAttribute('src', 'https://cinepolisstage--stage.my.salesforce.com/embeddedservice/5.0/esw.min.js');
    s.onload = function() {
        initESW(null);
    };
    document.body.appendChild(s);
} else {
    initESW('https://service.force.com');
}