import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequelize';


export type NotificationAttributes = {
  id?: number;
  class_id: number;
  teacher_id: number;
  message: string;
  created_at?: string;
};

export type NotificationCreationAttributes = Omit<NotificationAttributes, 'id'>;


export class NotificationModel extends Model<NotificationAttributes, NotificationCreationAttributes> {}

NotificationModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'notifications',
    timestamps: false,
    underscored: true,
  }
);
