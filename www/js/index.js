var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        console.log("device ready");
    }
};




$('#btnApplyQuestionnaire').click(function() {
    console.log("ola");
    //window.name.workflowControl.setWorkingQuestionnaire(createDefaultQuestionnaire(), 0);
    

    localStorage.patients = JSON.stringify({}, null, 2);;
    localStorage.workingQuestionnaire = JSON.stringify(createDefaultQuestionnaire(0), null, 2);
    localStorage.currentQuestionNumber = 0;
    localStorage.currentSectionNumber = 0;
    localStorage.overallScore = 0;
    localStorage.specialCase = '-1';
    

    window.location="question.html";

});


$(document).ready(function() {
    if($('#pageQuestion')[0]){
        changeLayoutToCurrentQuestion(0);
    };

    if($('#pageResult')[0]){
        updateResultScreen();
    }

});

window.location.hash="no-back-button";
window.location.hash="Again-No-back-button";//again because google chrome don't insert first hash into history
window.onhashchange=function(){window.location.hash="no-back-button";}


