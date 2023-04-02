import { InferAttributes, InferCreationAttributes, Model, INTEGER, STRING } from 'sequelize';
import db from '.';

export default class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
  declare id: number;
  declare teamName: string;
}
Team.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'Team',
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});
