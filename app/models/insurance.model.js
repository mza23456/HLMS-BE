// module.exports = (sequelize, Datatype) => {
//     const Insurance = sequelize.define("insurance", {
//         insurance_id: { //ประกัน
//             type: Datatype.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primaryKey: true
//         },
//         gender: {
//             type: Datatype.STRING,
//             allowNull: false
//         },
//         age: {
//             type: Datatype.INTEGER
//         },
//         insured_period: {//ระยะเวลาเอาประกัน
//             type: Datatype.INTEGER,
//             allowNull: false
//         },
//         insured_premium: { //ค่าเบี้ยประกัน
//             type: Datatype.FLOAT,
//             allowNull: false
//         },
        
//     });
//     return Insurance;
// };