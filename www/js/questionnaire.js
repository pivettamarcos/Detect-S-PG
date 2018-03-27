class Questionnaire{
    constructor(sections){
        this.sections = sections;
    }
}

class Section {
    constructor(questions){
        this.questions = questions;
    }
}

class Question {
    constructor(questionText,questionAlternatives, selectedAlternative){
        this.questionText = questionText;
        this.questionAlternatives = questionAlternatives;
        this.selectedAlternative = selectedAlternative;
    }
}

class QuestionAlternatives {
    constructor(buttonColor, alternativeText, score){
        this.buttonColor = buttonColor;
        this.alternativeText = alternativeText;
        this.score = score;
    }
}

function createDefaultQuestionnaire(){
    let questionnaire = new Questionnaire([
    new Section(
        [
            new Question("Como está a sua vontade de viver?", [
                new QuestionAlternatives("green", "Moderada a forte", 0),
                new QuestionAlternatives("yellow", "Fraca", 1),
                new QuestionAlternatives("red", "Nenhuma vontade de viver", 2)
            ], -1), 
            new Question("Como está a sua vontade de morrer?", [
                new QuestionAlternatives("green", "Raramente/ocasionalmente", 0),
                new QuestionAlternatives("yellow", "Frequente (várias vezes)", 1),
                new QuestionAlternatives("red", "Constantemente (diariamente)", 2)
            ], -1), 
            new Question("Como estão suas razões para viver?", [
                new QuestionAlternatives("green", "Tem mais razões para viver", 0),
                new QuestionAlternatives("yellow", "Razões para viver ou morrer são iguais", 1),
                new QuestionAlternatives("red", "Tem mais razões para morrer", 2)
            ], -1), 
            new Question("Se ocorrese algum acidente com você agora e você corresse risco de morte, o que faria?", [
                new QuestionAlternatives("green", "Se salvaria", 0),
                new QuestionAlternatives("yellow", "Deixaria ao acaso", 1),
                new QuestionAlternatives("red", "Evitaria medidas para se salvar", 2)
            ], -1), 
            new Question("Você já teve idealização suicida (pensamentos sobre tirar a própria vida) alguma vez na sua vida?", [
                new QuestionAlternatives("green", "Nunca teve", 0),
                new QuestionAlternatives("red", "Sim, já teve", 2)
            ], -1)
        ]
    ), 
    new Section(
        [
            new Question("Você tem atualmente ou teve ideação suicida (pensamentos sobre tirar sua própria vida) na última semana ?", [
                new QuestionAlternatives("green", "Raramente/ocasionalmente", 0),
                new QuestionAlternatives("yellow", "Frequente (várias vezes)", 1),
                new QuestionAlternatives("red", "Constantemente (diariamente)", 2)
            ], -1),
            new Question("Como você lida com a ideia de se matar?", [
                new QuestionAlternatives("green", "Não aceita", 0),
                new QuestionAlternatives("yellow", "Se sente indiferente", 1),
                new QuestionAlternatives("red", "Aceita", 2)
            ], -1),
            new Question("Você tem intenção de cometer suicídio?", [
                new QuestionAlternatives("green", "Nenhuma itenção", 0),
                new QuestionAlternatives("yellow", "Fraca", 1),
                new QuestionAlternatives("red", "Moderada a forte", 2)
            ], -1),
            new Question("Em um determinado momento, caso sua vontade de cometer suicídio seja intensa, você conseguiria se controlar?", [
                new QuestionAlternatives("green", "Conseguiria se controlar", 0),
                new QuestionAlternatives("yellow", "Não tem certeza se conseguiria", 1),
                new QuestionAlternatives("red", "Não conseguiria se controlar", 2)
            ], -1),
            new Question("Existe algum impedimento para que você cometa suicídio (preocupação com família, amigos, religião, possibilidade de tentativa mal sucedida)?", [
                new QuestionAlternatives("green", "Não se mataria, pois está preocupado(a) com esses motivos", 0),
                new QuestionAlternatives("yellow", "Você está um tanto preocupado a respeito de se matar, por esses motivos", 1),
                new QuestionAlternatives("red", "Você não está preocupado(a) com esses motivos", 2)
            ], -1),
            new Question("Quais as razões que você tem para cometer suicídio?", [
                new QuestionAlternatives("green", "Para manipular o ambiente, ganhar atenção, vingar-se de algo/alguém", 0),
                new QuestionAlternatives("yellow", "Além de manipular o ambiente, ganhar atenção, vingar- se de algo/alguém, mas também para solucionar seus problemas", 1),
                new QuestionAlternatives("red", "Fuga dos seus problemas", 2)
            ], -1),
            new Question("Você tem algum plano atualmente (últimos 30 dias) de como cometer suicídio?", [
                new QuestionAlternatives("green", "Não tem plano específico", 0),
                new QuestionAlternatives("yellow", "Tem vários planos de como se matar, mas não elaborou detalhes", 1),
                new QuestionAlternatives("red", "Tem um plano específico para se matar", 2)
            ], -1),
            new Question("Você teve algum plano no passado de como cometer suicídio?", [
                new QuestionAlternatives("green", "Não tem coragem, nem capacidade", 0),
                new QuestionAlternatives("yellow", "Não tem certeza", 1),
                new QuestionAlternatives("red", "Tem coragem e capacidade", 2)
            ], -1),
            new Question("Você acredita ter coragem ou ser capaz de cometer suicídio?", [
                new QuestionAlternatives("green", "Não espera", 0),
                new QuestionAlternatives("yellow", "Não está certo se fará", 1),
                new QuestionAlternatives("red", "Espera fazer", 2)
            ], -1),
            new Question("Você espera fazer alguma tentativa de suicídio no futuro próximo (de hoje até os próximos dias)?", [
                new QuestionAlternatives("green", "Não fez preparativos", 0),
                new QuestionAlternatives("yellow", "Tem feito alguns preparativos", 1),
                new QuestionAlternatives("red", "Seus preparativos estão quase prontos ou completos", 2)
            ], -1),
            new Question("Você está se preparando para cometer suicídio?", [
                new QuestionAlternatives("green", "Não escreveu", 0),
                new QuestionAlternatives("yellow", "Tem pensado em escrever/começou a escrever", 1),
                new QuestionAlternatives("red", "Tem um bilhete pronto", 2)
            ], -1),
            new Question("Você escreveu um bilhete suicida?", [
                new QuestionAlternatives("green", "Não deixou nada organizado", 0),
                new QuestionAlternatives("yellow", "Tem pensado em organizar algumas coisas", 1),
                new QuestionAlternatives("red", "Já tem tudo organizado", 2)
            ], -1),
            new Question("Você deixou tudo organizado para depois que cometer o suicídio?", [
                new QuestionAlternatives("green", "Não deixou nada organizado", 0),
                new QuestionAlternatives("yellow", "Fraca", 1),
                new QuestionAlternatives("red", "Nenhuma vontade de viver", 2)
            ], -1),
            new Question("Você já comentou com alguém sobre sua intenção/suas ideias de suicídio?", [
                new QuestionAlternatives("green", "Tem comentado", 0),
                new QuestionAlternatives("yellow", "Tem evitado comentar", 1),
                new QuestionAlternatives("red", "Tem tentado não revelar; tenta esconder ou mentir", 2)
            ], -1),
            new Question("Você já tentou suicídio alguma vez na vida?", [
                new QuestionAlternatives("green", "Jamais", 0),
                new QuestionAlternatives("yellow", "Tentou uma vez", 1),
                new QuestionAlternatives("red", "Tentou mais de uma vez", 2)
            ], -1),
            new Question("Você precisou de atendimento médico ou de uma internação hospitalar por causa dessa tentativa de suicídio?", [
                new QuestionAlternatives("green", "Jamais", 0),
                new QuestionAlternatives("red", "Sim", 2)
            ], -1)
        ]
    ), 
    new Section(
        [
            new Question("Como está a sua vontade de viver?", [
                new QuestionAlternatives("green", "Não tem acesso a método, nem oportunidade", 0),
                new QuestionAlternatives("yellow", "Tem acesso ao método, mas não tem oportunidade", 1),
                new QuestionAlternatives("red", "Tem acesso a método e oportunidade", 2)
            ], -1),
            new Question("Como está a sua vontade de viver?", [
                new QuestionAlternatives("green", "Jamais", 0),
                new QuestionAlternatives("red", "Sim", 2)
            ], -1),
            new Question("Como está a sua vontade de viver?", [
                new QuestionAlternatives("green", "Jamais", 0),
                new QuestionAlternatives("red", "Sim", 2)
            ], -1),
        ]
    )]);

    return questionnaire;
}

