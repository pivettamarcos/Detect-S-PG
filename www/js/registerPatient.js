class Patient{
    constructor(name,birthDate,age,hospital,unit,observation){
        this.name = name;
        this.birthDate = birthDate;
        this.age = age;
        this.hospital = hospital;
        this.unit = unit;
        this.observation = observation;
        this.questionnaire = undefined;
    }
}

function registerPatient(){
    console.log($('#sample1')[0].value);
    console.log($('#sample2')[0].value);
    console.log($('#sample3')[0].value);
    console.log($('#sample4')[0].value);
    console.log($('#sample5')[0].value);

    localStorage.patients = JSON.stringify([], null, 2);;

    let parsedPatients = JSON.parse(localStorage.patients); 

    parsedPatients.push(new Patient($('#sample1')[0].value, $('#sample2')[0].value, $('#sample3')[0].value, $('#sample4')[0].value, $('#sample5')[0].value, $('#sample6')[0].value));

    console.log(parsedPatients);
}