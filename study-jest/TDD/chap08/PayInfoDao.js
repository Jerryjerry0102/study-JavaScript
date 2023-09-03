module.exports = class PayInfoDao {
  list = [];
  insert(payInfo) {
    this.list.push(payInfo);
  }
};
