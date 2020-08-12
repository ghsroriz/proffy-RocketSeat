const subjects = [

    "Artes",
    "Biologia",
    "Ciencias",
    "Educação fisica",
    "geografia",
    "historia",
    "matematica",
    "portugues",
    "quimica",

];
const weekdays = [

    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabado",
];

const getSubject = (subjectNumber) => {

    const pos = +subjectNumber - 1;
    return subjects[pos];

};

const convert = hours => {

    const [hour,min] = hours.split(":");

    //colocar Number para fazer o cast da string
    return Number((hour*60) + min);

}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convert
}