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
    

    localStorage.workingQuestionnaire = JSON.stringify(createDefaultQuestionnaire(0), null, 2);
    localStorage.currentQuestionNumber = 0;
    localStorage.currentSectionNumber = 0;
    localStorage.overallScore = 0;
    

    window.location="question.html";

});


$(document).ready(function() {
    if($('#pageQuestion')[0]){
        changeLayoutToCurrentQuestion(0);
    }
});



