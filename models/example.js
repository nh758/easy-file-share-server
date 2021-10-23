module.exports = ( sequelize , Sequelize ) => {
    const example = sequelize.define(
      'example',
      {
          id: { type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true, field: 'id' },
          name: { type: Sequelize.STRING(50), allowNull: false, field: 'name' },
          age: { type: Sequelize.INTEGER(11), allowNull: false, field: 'age' },
          position: { type: Sequelize.STRING(50), allowNull: false, field: 'position' },
      },
      {
          tableName: 'example' 
      }
    );
    
    return example;
  }