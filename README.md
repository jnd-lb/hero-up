<h1>Example of generating model </h1>
npm run model:generate -- --name Pillar --attributes name:string,image:string,user_id:integer


npm run model:generate -- --name Mission --attributes name:string,image:string,user_id:integer,goal_id:integer,start_date:dateonly,state:string,type:enum:{'reoccuring,once'},measurement:enum:{'time,count'},to_achieve:double,achieved:double



https://medium.com/@andrewoons/how-to-define-sequelize-associations-using-migrations-de4333bf75a7