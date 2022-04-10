import { Model, DataTypes } from 'sequelize';

export default (sequelize: any) => {
  class Book extends Model {
    declare id: number;
    declare book_title: string;
    declare book_image: string;
    declare book_writer: string | null;
    declare book_publisher: string | null;
    declare book_publish_date: Date | null;
    declare book_category: number;
    declare book_info: string | null;
    declare book_rating: number;
    declare book_like_count: number;
    declare comments_count: number;

    static associate(db: any) {

    }
  }

  Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      book_title: {
        type: DataTypes.STRING,
      },
      book_image: {
        type: DataTypes.STRING,
      },
      book_writer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      book_publisher: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      book_publish_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      book_category: {
        type: DataTypes.INTEGER,
      },
      book_info: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      book_rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      book_like_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      comments_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'Books',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    }
  );
};
