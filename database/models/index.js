import User from "./user"
import Pillar from "./pillar"
import Goal from "./goal"
import Mission from "./mission"
import Day from "./day"
import DayMission from "./dayMission"
import DailyLog from "./dailylog"



User.hasMany(Pillar,{   
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Pillar.User = Pillar.belongsTo(User,{   
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Pillar.Goals = Pillar.hasMany(Goal,{
    foreignKey: 'pillar_id',
});

Goal.Pillar = Goal.belongsTo(Pillar,{
    foreignKey: 'pillar_id',
    onDelete: 'CASCADE'
});


// Mission
Mission.Goals = Mission.belongsTo(Goal,{
      foreignKey: 'goal_id',
      onDelete: 'CASCADE'
    });


Goal.Missions = Goal.hasMany(Mission,{
    foreignKey: 'goal_id'
})


Mission.Days =     Mission.belongsToMany(Day,{
      foreignKey: 'mission_id',
      onDelete: 'CASCADE',
      through: 'day_mission' // active days
});
    

Day.Mission = Day.belongsToMany(Mission,{
    foreignKey: 'day_id',
    onDelete: 'CASCADE',
    through: 'day_mission' //active days
});


Mission.DailyLogs = Mission.hasMany(DailyLog,{
    foreignKey: 'mission_id',
    onDelete: 'CASCADE'
})


DailyLog.Mission = DailyLog.belongsTo(Mission,{
    foreignKey: 'mission_id',
    onDelete: 'CASCADE'
})

// DayMission.belongsTo(Day,{
//     foreignKey: 'day_id',
//     onDelete: 'CASCADE'
// })

// DayMission.belongsTo(Mission,{
//     foreignKey: 'mission_id',
//     onDelete: 'CASCADE'
// })

// Goal.hasMany(models.Mission,{
//     foreignKey: 'goal_id',
//     onDelete: 'CASCADE'
// });



export { User, Pillar, Goal,Mission,Day,DayMission ,DailyLog};
//https://techsolutionshere.com/next-js-and-sequelize-with-associations/