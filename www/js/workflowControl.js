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

    if (parseInt(localStorage.currentSectionNumber) == workingQuestionnaire.sections.length - 1 && parseInt(localStorage.currentQuestionNumber) == workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions.length-1)
        $('#finishButton')[0].style.display = 'block';
    else
        $('#finishButton')[0].style.display = 'none';

    $('#questionText')[0].innerHTML =  workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].questionText;

    if(workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative != -1){
        $('#forwardButton')[0].disabled = false;            
        console.log("vdddd");
    }else{
        console.log(workingQuestionnaire);
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
                alternativeButton.style.border = "1px solid #eeee00";
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

   console.log(workingQuestionnaire.sections[localStorage.currentSectionNumber].questions);

    if(workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative != -1){
        console.log($('#alternatives')[0].children[workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative]);
        $('#alternatives')[0].children[workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative].style.backgroundColor = "#d5d5a5";        
        $('#alternatives')[0].children[workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative].children[1].children[0].style.fontWeight = 'bold';
        $('#alternatives')[0].children[workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative].children[0].style.backgroundColor = $('#alternatives')[0].children[workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative].children[0].dataset.color;
    }
}   

function alternativeClick(event){
    console.log(event);
    let workingQuestionnaire = JSON.parse(localStorage.workingQuestionnaire); 

    workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative = event.target.dataset.contAlternative;

    $('#alternatives')[0].children[workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative].style.backgroundColor = "#d5d5a5";
    $('#alternatives')[0].children[workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative].children[1].children[0].style.fontWeight = 'bold';
    $('#alternatives')[0].children[workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative].children[0].style.backgroundColor = workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions[parseInt(localStorage.currentQuestionNumber)].selectedAlternative.color;

    localStorage.workingQuestionnaire = JSON.stringify(workingQuestionnaire,null,2);
    workingQuestionnaire = JSON.parse(localStorage.workingQuestionnaire); 
    console.log(workingQuestionnaire);

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
    
    console.log(workingQuestionnaire);
        

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
}

function forwardButtonClick(){
    let workingQuestionnaire = JSON.parse(localStorage.workingQuestionnaire); 

    if(parseInt(localStorage.currentQuestionNumber) + 1 > workingQuestionnaire.sections[parseInt(localStorage.currentSectionNumber)].questions.length-1){
        console.log("SECTION OVER IS"+ localStorage.currentSectionNumber);

        localStorage.overallScore = 0;
        let sectionCount = 0;
        for(let i = 0; i < workingQuestionnaire.sections[localStorage.currentSectionNumber].questions.length; i++){
            sectionCount = workingQuestionnaire.sections[localStorage.currentSectionNumber].questions[i].questionAlternatives[workingQuestionnaire.sections[localStorage.currentSectionNumber].questions[i].selectedAlternative].score;
        }
        localStorage.overallScore = sectionCount;

        if(localStorage.currentSectionNumber == 0){
            if (parseInt(localStorage.overallScore) == 0) {
                console.log("especial");
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
        
    
    console.log(workingQuestionnaire);
        

    $('#alternatives')[0].innerHTML = "";
    changeLayoutToCurrentQuestion(localStorage.currentQuestionNumber);
}

