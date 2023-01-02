/**
 * `functionName`の関数を`date`の時間に実行するトリガーをセットする。
 *
 * @param {string} [functionName] 実行する関数名
 * @param {date} [date] 実行日時(JST)
 * @returns {undefined}
 */
function setTriggerAt(functionName, date) {
  ScriptApp.newTrigger(functionName)
    .timeBased()
    .at(date)
    .create();
}

/**
 * 週ベースで実行するトリガーをセットする。
 *
 * @returns {undefined}
 */
function setTriggersForThisWeek() {
  const firstBusinessDayOnThisWeek = getFirstBusinessDay();
  firstBusinessDayOnThisWeek.setHours(10);
  firstBusinessDayOnThisWeek.setMinutes(0);
  setTriggerAt('notifyGaroonWebAttendace', firstBusinessDayOnThisWeek);
}
