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
function setWeeklyTriggers() {
  setGaroonWebAttendanceReminderOnWeeklyFirstBusinessDay();
}

/**
 * 月ベースで実行するトリガーをセットする。
 *
 * @returns {undefined}
 */
function setMonthlyTriggers() {
  setAttendanceFileCheckReminderOnFourthLastBusinessDay();
  setOfficeworkReminederOnFirstBusinessDay();
  setTeamSpiritApplicationReminderOnLastBusinessDay();
  setTeamSpiritAttendanceDocumentsReminderOnFirstBusinessDay();
}

/**
 * ガルーンの週次勤怠提出のリマインダーを週の第1営業日にセットする。
 *
 * @returns {undefined}
 */
function setGaroonWebAttendanceReminderOnWeeklyFirstBusinessDay() {
  const firstBusinessDayOnThisWeek = getFirstBusinessDay();
  firstBusinessDayOnThisWeek.setHours(10);
  firstBusinessDayOnThisWeek.setMinutes(0);
  setTriggerAt('notifyGaroonWebAttendace', firstBusinessDayOnThisWeek);
}

/**
 * 勤怠ファイルチェックのリマインダーを当月の最終営業日から3営業日前にセットする。
 *
 * @returns {undefined}
 */
function setAttendanceFileCheckReminderOnFourthLastBusinessDay() {
  const thirdLastBusinessDay = getNthLastBusinessDay(3);
  thirdLastBusinessDay.setHours(10);
  thirdLastBusinessDay.setMinutes(0);
  setTriggerAt('notifyAttendanceFileCheck', thirdLastBusinessDay);
}

/**
 * 事務書類提出のリマインダーを当月の第1営業日にセットする。
 *
 * @returns {undefined}
 */
function setOfficeworkReminederOnFirstBusinessDay() {
  const firstBusinessDay = getNthBusinessDay(1);
  firstBusinessDay.setHours(10);
  firstBusinessDay.setMinutes(0);
  setTriggerAt('notifyOfficework', firstBusinessDay);
}

/**
 * TeamSpiritの承認申請のリマインダーを当月の最終営業日にセットする。
 *
 * @returns {undefined}
 */
function setTeamSpiritApplicationReminderOnLastBusinessDay() {
  const lastBusinessDay = getNthLastBusinessDay(0);
  lastBusinessDay.setHours(18);
  lastBusinessDay.setMinutes(30);
  setTriggerAt('notifyTeamSpiritApplication', lastBusinessDay);
}

/**
 * TeamSpiritの勤怠書類提出のリマインダーを当月第1営業日にセットする。
 *
 * @returns {undefined}
 */
function setTeamSpiritAttendanceDocumentsReminderOnFirstBusinessDay() {
  const firstBusinessDay = getNthBusinessDay(1);
  firstBusinessDay.setHours(10);
  firstBusinessDay.setMinutes(0);
  setTriggerAt('notifyTeamSpiritAttendanceDocuments', firstBusinessDay);
}
