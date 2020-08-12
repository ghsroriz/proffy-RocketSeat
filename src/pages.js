const { subjects, weekdays, getSubject, convert } = require("./utils/format");
const database = require('./database/db');



//para renderizar massa vamos adicionar objetos no html
const pageLanding = (request, response) => {
    return response.render("index.html");
};

const pageStudy = async (request, response) => {
    const filters = request.query;

    if (!filters.subject || !filters.weekday || !filters.time) {
        return response.render("study.html", { filters, subjects, weekdays });
    }

    //converter horas em minutos
    const timeToMinutes = convert(filters.time);

    const query = `

            SELECT classes.*, proffys.* 
            FROM proffys 
            JOIN classes ON (classes.proffy_id = proffys.id)
            WHERE EXISTS(
                  SELECT class_schedule.* 
                  FROM class_schedule
                  WHERE class_schedule.class_id = classes.id
                  AND class_schedule.weekday = ${filters.weekday}
                  AND class_schedule.time_from <= ${timeToMinutes}
                  AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
 
    `;

    try {

        const db = await database;
        const proffys = await db.all(query);

        proffys.map(proffy => {
            proffy.subject = getSubject(proffy.subject);
        });

        return response.render("study.html", { proffys, filters, subjects, weekdays });

    } catch (e) {
        console.log(e)
    }

};

const pageGiveClasses = (request, response) => {

    return response.render("give-classes.html", { subjects, weekdays });
};




const saveClasses = async (request, response) => {
    const createProffy = require('./database/createProffy');

    const proffyValue = {
        name: request.body.name,
        avatar: request.body.avatar,
        whatsapp: request.body.whatsapp,
        bio: request.body.bio
    }

    const classValue = {
        subject: request.body.subject,
        cost: request.body.cost
    }

    const classScheduleValues = request.body.weekday.map((weekday, i) => {
        return {
            weekday,
            time_from: convert(request.body.time_from[i]),
            time_to: convert(request.body.time_to[i])
        }
    });



    try {
        const db = await database;
        await createProffy(db, { proffyValue, classValue, classScheduleValues });

        //redireciona ja mostrando o artigo criado
        let queryString = "?subject=" + request.body.subject;
        queryString += "&weekday=" + request.body.weekday[0];
        queryString += "&time=" + request.body.time_from[0];

        return response.redirect("/study" + queryString);
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}
