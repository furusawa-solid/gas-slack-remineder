/**
 * 本日が当月の最終営業日から3営業日前であればSlackに勤怠ファイルチェックのリマインドを送る。
 *
 * @returns {undefined}
 */
function reminedAttendanceFileCheckOnFourthLastBusinessDay() {
  if (isNthLastBusinessDay(3)) {
    notifyAttendanceFileCheck();
  }
}

/**
 * 本日が当月第1営業日であればSlackに事務書類提出のリマインドを送る。
 *
 * @returns {undefined}
 */
function reminedOfficeworkOnFirstBusinessDay() {
  if (isNthBusinessDay(1)) {
    notifyOfficework();
  }
}

/**
 * 本日が当月の最終営業日であればSlackにTeamSpiritの承認申請のリマインドを送る。
 *
 * @returns {undefined}
 */
function reminedTeamSpiritApplicationOnLastBusinessDay() {
  if (isNthLastBusinessDay(0)) {
    notifyTeamSpiritApplication();
  }
}

/**
 * 本日が当月第1営業日であればSlackにTeamSpiritの勤怠書類提出のリマインドを送る。
 *
 * @returns {undefined}
 */
function reminedTeamSpiritAttendanceDocumentsOnFirstBusinessDay() {
  if (isNthBusinessDay(1)) {
    notifyTeamSpiritAttendanceDocuments();
  }
}
