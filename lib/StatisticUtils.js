const getTimeStampUtil = (timeStamp) => {
  const localDate = new Date(timeStamp).toLocaleString();
  return localDate;
};

const getUtcDates = () => {
  const set1 = new Date().removeDays(7).toISOString();
  const set2 = new Date().removeDays(14).toISOString();
  const set3 = new Date().removeDays(21).toISOString();
  const set4 = new Date().removeDays(28).toISOString();
  const set5 = new Date().removeDays(35).toISOString();
  const set6 = new Date().removeDays(42).toISOString();
  const set7 = new Date().removeDays(30).toISOString();
  const set8 = new Date().removeDays(60).toISOString();
  const set9 = new Date().removeDays(90).toISOString();
  const set10 = new Date().removeDays(120).toISOString();
  const set11 = new Date().removeDays(150).toISOString();
  const set12 = new Date().removeDays(180).toISOString();

  const postsData = {
    stamp1: set1,
    stamp2: set2,
    stamp3: set3,
    stamp4: set4,
    stamp5: set5,
    stamp6: set6,
    stamp7: set7,
    stamp8: set8,
    stamp9: set9,
    stamp10: set10,
    stamp11: set11,
    stamp12: set12,
  };

  return postsData;
};

Date.prototype.addDays = function (days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
};

Date.prototype.removeDays = function (days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() - days);
  return dat;
};

const getRange = (start, end, data) => {
  const arr = [];
  data.forEach((element) => {
    if (element >= start && element <= end) {
      console.log(
        "test logic",
        start + "==========" + element + "==========" + end
      );
      arr.push(element);
    }
  });
  // for(dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
  //     arr.push(new Date(dt));
  // }
  return arr.length;
};

const getWeekly = (data) => {
  const set1 = getRange(new Date().removeDays(7), new Date(), data);
  const set2 = getRange(new Date().removeDays(14), new Date(7), data);
  const set3 = getRange(new Date().removeDays(21), new Date(14), data);
  const set4 = getRange(new Date().removeDays(28), new Date(21), data);
  const set5 = getRange(new Date().removeDays(21), new Date(28), data);
  const set6 = getRange(new Date().removeDays(28), new Date(35), data);
  return [set1, set2, set3, set4, set5, set6];
};

const getMonthly = (data) => {
  const set1 = getRange(new Date().removeDays(30), new Date(), data);
  const set2 = getRange(new Date().removeDays(60), new Date(30), data);
  const set3 = getRange(new Date().removeDays(90), new Date(120), data);
  const set4 = getRange(new Date().removeDays(150), new Date(120), data);
  const set5 = getRange(new Date().removeDays(180), new Date(150), data);
  const set6 = getRange(new Date().removeDays(210), new Date(180), data);
  return [set1, set2, set3, set4, set5, set6];
};

const getReports = (data) => {
  return [getWeekly(data), getMonthly(data)];
};

export { getReports, getUtcDates };
