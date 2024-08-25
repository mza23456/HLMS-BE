// module.exports = (sequelize, Datatype) => {
//     const Interest = sequelize.define("interest", {
//         interest_id: { //ดอกเบี้ย
//             type: Datatype.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primaryKey: true
//         },
//         type: {
//             type: Datatype.STRING,
//             allowNull: false
//         },
//         product: {
//             type: Datatype.STRING,
//             allowNull: false
//         },
//         interest_rate1: {//อัตราดอกเบี้ยระดับแรก
//             type: Datatype.FLOAT,
//             allowNull: false
//         },
//         interest_rate2: {//อัตราดอกเบี้ยระดับสอง
//             type: Datatype.FLOAT,
//             allowNull: false
//         },
//         Annual_interes_rate: {//อัตราดอกเบี้ยประจำปี
//             type: Datatype.FLOAT,
//             allowNull: false
//         }

//     });
//     return Interest;
// };