class WorkflowControl{
    constructor(){
        this.workingQuestionnaire = {content: undefined, currentQuestion: 0, currentSection: 0};
    }
}

WorkflowControl.prototype.setWorkingQuestionnaire = function(questionnaire, firstQuestion){
    this.workingQuestionnaire = {content: questionnaire, currentQuestion : firstQuestion};
}

function changeLayoutToCurrentQuestion (currentQuestionNumber){
    let workingQuestionnaire = JSON.parse(localStorage.workingQuestionnaire); 
    $('#sectionNumber')[0].innerText = "Seção "+ (parseInt(localStorage.currentSectionNumber)+1);    
    $('#questionNumber')[0].innerText = "Questão " + (parseInt(localStorage.currentQuestionNumber) + 1);
    $('#questionIndicator')[0].innerText = (parseInt(localStorage.currentQuestionNumber) + 1) + "/" + workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions.length;

    if (parseInt(localStorage.currentSectionNumber) == workingQuestionnaire.sections.length - 1 && parseInt(localStorage.currentQuestionNumber) == workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions.length-1){
        $('#forwardButton')[0].style.display = 'none';

        let finalScore = 0;
        let unansweredQuestions = [];
        
        if (localStorage.specialCase == '-1') {
            let workingQuestionnaire = JSON.parse(localStorage.workingQuestionnaire); 
    
            for(let i = 0; i < workingQuestionnaire.sections.length; i++){
                for(let z = 0; z < workingQuestionnaire.sections[i].questions.length; z++){
                    console.log(z + " " + i + " ");
                    if(workingQuestionnaire.sections[i].questions[z].selectedAlternative != -1)
                        finalScore += workingQuestionnaire.sections[i].questions[z].questionAlternatives[workingQuestionnaire.sections[i].questions[z].selectedAlternative].score;
                    else
                        unansweredQuestions.push({section: z, question: i});
                }
            }
                
        }else{
            for(let i = 0; i < workingQuestionnaire.sections.length; i++){
                if(i != 1){
                    for(let z = 0; z < workingQuestionnaire.sections[i].questions.length; z++){
                        if(workingQuestionnaire.sections[i].questions[z].selectedAlternative != -1)
                            finalScore += workingQuestionnaire.sections[i].questions[z].questionAlternatives[workingQuestionnaire.sections[i].questions[z].selectedAlternative].score;
                        else
                            unansweredQuestions.push({section: z, question: i});
                    }
                }
            }
        }

        if(unansweredQuestions.length == 0){
            $('#finishButton')[0].style.display = 'block';
            $('#errorMissing')[0].style.display = 'none';                     
        }else{
            $('#errorMissing')[0].style.display = 'block';     
            $('#errorMissing')[0].innerText = "Responda a esta questão para finalizar o questionário"
            $('#finishButton')[0].style.display = 'none';              
        }

    }else{
        $('#forwardButton')[0].style.display = 'inline';        
        $('#errorMissing')[0].style.display = 'none';       
        $('#finishButton')[0].style.display = 'none';
    }

    $('#questionText')[0].innerHTML =  workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].questionText;

    if(workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative != -1){
        $('#forwardButton')[0].disabled = false;            
    }else{
        $('#forwardButton')[0].disabled = true;            
    }


    if(workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)-1]){
        if(workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)-1].selectedAlternative != -1){
            $('#returnButton')[0].disabled = false;
        }else{
            //$('#returnButton')[0].disabled = true;
        }
    } else {
        if(workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)-1]){
            $('#returnButton')[0].disabled = false;
        } else {
            $('#returnButton')[0].disabled = true;
        }
        
    }

    let contAlternative = 0;
    for(alternative of workingQuestionnaire.sections[localStorage.currentSectionNumber].questions[localStorage.currentQuestionNumber].questionAlternatives){
        let divAlternative = document.createElement("div");

        let textDiv = document.createElement("div");
        textDiv.id = 'textDiv';
        let alternativeText = document.createElement("h6");
        alternativeText.innerText = alternative.alternativeText;    
        textDiv.appendChild(alternativeText);

        let alternativeButton = document.createElement("button");
        alternativeButton.dataset.score = alternative.score;
        alternativeButton.dataset.contAlternative = contAlternative;
        alternativeButton.className = 'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored';
        
        switch(alternative.buttonColor){
            case 'red':
                alternativeButton.style.border = "1px solid #bb0000";
                alternativeButton.dataset.color = "#bb0000";
                break;
            case 'yellow':
                alternativeButton.style.border = "1px solid #999900";
                alternativeButton.dataset.color = "#eeee00";
                break;
            case 'green':
                alternativeButton.style.border = "1px solid #00aa00";
                alternativeButton.dataset.color ="#00aa00";
        }

        alternativeButton.addEventListener('click', alternativeClick, false);


        divAlternative.appendChild(alternativeButton);
        divAlternative.appendChild(textDiv);
        
        
        $('#alternatives')[0].appendChild(divAlternative);
        contAlternative++;
   }

    if(workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative != -1){
        $('#alternatives')[0].children[workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative].style.backgroundColor = "#e0e05f"; 
        $('#alternatives')[0].children[workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative].children[1].children[0].style.fontWeight = 'bold';
        $('#alternatives')[0].children[workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative].children[0].style.backgroundColor = $('#alternatives')[0].children[workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative].children[0].dataset.color;
    }

    if(localStorage.currentQuestionNumber == 0 && localStorage.currentSectionNumber == 0){
        $('#returnButton')[0].style.display = 'none';
    }else{
        $('#returnButton')[0].style.display = 'inline';
    }
}   

function alternativeClick(event){
    let workingQuestionnaire = JSON.parse(localStorage.workingQuestionnaire); 

    workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative = event.target.dataset.contAlternative;

    $('#alternatives')[0].children[workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative].style.backgroundColor = "#e0e05f";
    $('#alternatives')[0].children[workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative].children[1].children[0].style.fontWeight = 'bold';
    $('#alternatives')[0].children[workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative].children[0].style.backgroundColor = workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative.color;

    localStorage.workingQuestionnaire = JSON.stringify(workingQuestionnaire,null,2);
    workingQuestionnaire = JSON.parse(localStorage.workingQuestionnaire); 

        /*if(parseInt(localStorage.currentQuestionNumber) + 1 > workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions.length-1){
            console.log("section over");
            if(parseInt(localStorage.currentSectionNumber) + 1 > workingQuestionnaire.sections.length - 1){
                console.log("quest over");
            }else{
                localStorage.currentSectionNumber = parseInt(localStorage.currentSectionNumber) + 1;
                localStorage.currentQuestionNumber = 0;
            }
        }else{
            localStorage.currentQuestionNumber = parseInt(localStorage.currentQuestionNumber) + 1; 
        }
        */
            

    $('#alternatives')[0].innerHTML = "";
    changeLayoutToCurrentQuestion(localStorage.currentQuestionNumber);


    stateChange();
}

function stateChange() {
    setTimeout(function(){
        forwardButtonClick();
    }, 500);
}

function returnButtonClick(){
    if($('#pageQuestion')[0]){
        let workingQuestionnaire = JSON.parse(localStorage.workingQuestionnaire); 
        
        if (parseInt(localStorage.currentQuestionNumber) - 1 >= 0) {
            localStorage.currentQuestionNumber = parseInt(localStorage.currentQuestionNumber) - 1;
        } else {
            if (parseInt(localStorage.currentSectionNumber) - 1 >= 0) {
                if (localStorage.specialCase == '-1') 
                    localStorage.currentSectionNumber = parseInt(localStorage.currentSectionNumber) - 1;
                else
                    localStorage.currentSectionNumber = 0;

                localStorage.currentQuestionNumber = workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions.length - 1;
            } else {

            }
        }

        $('#alternatives')[0].innerHTML = "";
        changeLayoutToCurrentQuestion(localStorage.currentQuestionNumber);
    }else if($('#pageResult')[0]){
        $('#body')[0].style.display = 'block';
        $('#body2')[0].style.display = 'none';
        $('#returnButton')[0].style.display = 'none';
        $('#forwardButton')[0].style.display = 'block';
    }
}

function forwardButtonClick(){
    if($('#pageQuestion')[0]){
        let workingQuestionnaire = JSON.parse(localStorage.workingQuestionnaire); 

        if(parseInt(localStorage.currentQuestionNumber) + 1 > workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions.length-1){
            localStorage.overallScore = 0;
            let sectionCount = 0;
            for(let i = 0; i < workingQuestionnaire.sections[localStorage.currentSectionNumber].questions.length; i++){
                sectionCount += workingQuestionnaire.sections[localStorage.currentSectionNumber].questions[i].questionAlternatives[workingQuestionnaire.sections[localStorage.currentSectionNumber].questions[i].selectedAlternative].score;
            }

            if(localStorage.currentSectionNumber == 0){
                if (sectionCount == 0) {
                    localStorage.specialCase = 1;
                    localStorage.currentSectionNumber = 2;
                    localStorage.currentQuestionNumber = 0;
                } else {
                    localStorage.specialCase = -1;
                }
            }

            
            if(parseInt(localStorage.currentSectionNumber) + 1 > workingQuestionnaire.sections.length - 1){
            /* for(let i = 0; i < workingQuestionnaire.sections[localStorage.currentSectionNumber].questions.length; i++){
                    localStorage.overallScore =  parseInt(localStorage.overallScore) + workingQuestionnaire.sections[localStorage.currentSectionNumber].questions[i].questionAlternatives[workingQuestionnaire.sections[localStorage.currentSectionNumber].questions[i].selectedAlternative].score;
                }

                console.log(    localStorage.overallScore        );*/
            } else {
                if (localStorage.specialCase = -1) {
                    localStorage.currentSectionNumber = parseInt(localStorage.currentSectionNumber) + 1;
                    localStorage.currentQuestionNumber = 0;
                }
            }
        }else{
            localStorage.currentQuestionNumber = parseInt(localStorage.currentQuestionNumber) + 1;
        }        

        $('#alternatives')[0].innerHTML = "";
        changeLayoutToCurrentQuestion(localStorage.currentQuestionNumber);
    }else if($('#pageResult')[0]){
        $('#body')[0].style.display = 'none';
        $('#body2')[0].style.display = 'block';
        $('#returnButton')[0].style.display = 'block';
        $('#forwardButton')[0].style.display = 'none';
    }
}

function finishQuestionnaire(){
    let finalScore = 0;
    let unansweredQuestions = [];
    let workingQuestionnaire = JSON.parse(localStorage.workingQuestionnaire); 

    if (localStorage.specialCase == '-1') {
        for(let i = 0; i < workingQuestionnaire.sections.length; i++){
            for(let z = 0; z < workingQuestionnaire.sections[i].questions.length; z++){
                console.log(z + " " + i + " ");
                if(workingQuestionnaire.sections[i].questions[z].selectedAlternative != -1)
                    finalScore += workingQuestionnaire.sections[i].questions[z].questionAlternatives[workingQuestionnaire.sections[i].questions[z].selectedAlternative].score;
                else
                    unansweredQuestions.push({section: z, question: i});
            }
        }
            
    }else{
        for(let i = 0; i < workingQuestionnaire.sections.length; i++){
            if(i != 1){
                for(let z = 0; z < workingQuestionnaire.sections[i].questions.length; z++){
                    if(workingQuestionnaire.sections[i].questions[z].selectedAlternative != -1)
                        finalScore += workingQuestionnaire.sections[i].questions[z].questionAlternatives[workingQuestionnaire.sections[i].questions[z].selectedAlternative].score;
                    else
                        unansweredQuestions.push({section: z, question: i});
                }
            }
        }
    }

    console.log(finalScore, unansweredQuestions);
    $('#returnButton')[0].style.display = 'none';
    localStorage.overallScore = finalScore;
    window.location="questionnaireResult.html";
}

function updateResultScreen(){
    $('#resultColor')[0].innerText = localStorage.overallScore;
    scoreInt = parseInt(localStorage.overallScore);

    if (localStorage.specialCase == '-1') {
        if(scoreInt == 0){
            $('#avaluation')[0].innerText = "Nenhum risco";
            $('#resultColor')[0].style.backgroundColor = '#0000ee';
        }else if(scoreInt <= 16){
            $('#avaluation')[0].innerText = "Baixo risco";
            $('#resultColor')[0].style.backgroundColor = '#00aa00';
        }else if(scoreInt <= 32){
            $('#avaluation')[0].innerText = "Risco moderado";
            $('#resultColor')[0].style.backgroundColor = '#eeee00';
        }else if(scoreInt <= 48){
            $('#avaluation')[0].innerText = "Alto Risco";
            $('#resultColor')[0].style.backgroundColor = '#ee0000';
        }
    }else{
        if(scoreInt == 0){
            $('#avaluation')[0].innerText = "Nenhum risco";
            $('#resultColor')[0].style.backgroundColor = '#0000ee';
        }else if(scoreInt <= 2){
            $('#avaluation')[0].innerText = "Baixo risco";
            $('#resultColor')[0].style.backgroundColor = '#00aa00';
        }else if(scoreInt <= 4){
            $('#avaluation')[0].innerText = "Risco moderado";
            $('#resultColor')[0].style.backgroundColor = '#eeee00';
        }else if(scoreInt <= 6){
            $('#avaluation')[0].innerText = "Alto Risco";
            $('#resultColor')[0].style.backgroundColor = '#ee0000';
        }
    }
}

