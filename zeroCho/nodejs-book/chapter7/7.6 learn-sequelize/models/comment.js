const Sequelize = require("sequelize");

class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init(
      {
        // commenter는 관계 컬럼으로 특별하게 만들어짐
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE, // DateTime, MySQL DATE -> Sequelize DateOnly
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      // 모델에 대한 설정
      {
        sequelize,
        timestamps: false, // true일 경우 -> createAt, updatedAt 자동 생성
        modelName: "Comment",
        tableName: "comments",
        paranoid: false, // true일 경우 deletedAt: true도 생성됨 // soft delete
        charset: "utf8mb4", // 이모티콘 가능
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.User, {
      foreignKey: "commenter",
      targetKey: "id",
    });
  }
  // commenter 컬럼은 belongsTo가 있는 곳에 추가된다.
}

module.exports = Comment;
