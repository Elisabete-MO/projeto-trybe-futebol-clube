import { Model, INTEGER, BOOLEAN, Sequelize } from 'sequelize';
import Team from './team.model';
import db from '.';

class Match extends Model {
  public id!: number;
  public homeTeamId!: number;
  public homeTeamGoals!: number;
  public awayTeamId!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;

  public readonly homeTeam?: Team;
  public readonly awayTeam?: Team;
}
Match.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeamId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: 'matches',
    timestamps: false,
    underscored: true,
    paranoid: true,
    modelName: 'Match',
  },
);

Match.belongsTo(Team, {
  as: 'homeTeam',
  foreignKey: 'homeTeamId',
});
Match.belongsTo(Team, {
  as: 'awayTeam',
  foreignKey: 'awayTeamId',
});

export default Match;
