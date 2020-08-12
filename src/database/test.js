const database = require('./db');
const createProffy = require('./createProffy');

database.then(async (db) => {

    //inserir dados

    proffyValue = {
        name: 'gustavo',
        avatar: "https://www.torredevigilancia.com/wp-content/uploads/2019/10/coringa-55.jpg",
        whatsapp: '51464654',
        bio: "Instrutor de educação física"
    }

    classValue = {
        subject: 'quimica',
        cost: '20'
    }

    classScheduleValues = [
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },

        {
            weekday: 2,
            time_from: 700,
            time_to: 1220
        }
    ]

  //  await createProffy(db, { proffyValue, classValue, classScheduleValues });


  //consultar dados

   const selectProffys = await db.all("SELECT * FROM proffys");

   const selectClassesAndProffys = await db.all(`

   SELECT classes.*, proffys.* 
   FROM proffys 
   JOIN classes ON (classes.proffy_id = proffys.id)
   WHERE classes.proffy_id = 1;

   `);


   const selectClassesSchedules = await db.all(`

   SELECT class_schedule.* 
   FROM class_schedule
   WHERE class_schedule.class_id = 1
   AND class_schedule.weekday = "1"
   AND class_schedule.time_from <= "720"
   AND class_schedule.time_to > "720"

   `);
});