/**
 * 引数で受け取った日付が同じ日付の場合はtrue、それ以外はfalseを返す。
 *
 * @param {Date} [date1] - 日付
 * @param {Date} [date2] - 日付
 * @returns {boolean}
 */
function isSameDate(date1, date2) {
  if (date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()) {
    return true;
  }
  return false;
}

/**
 * 引数で受け取った日付が営業日（平日かつ祝日でない）の場合はtrue、それ以外はfalseを返す。
 *
 * @param {Date} [date] - 日付
 * @returns {boolean}
 */
function isBusinessDay(date) {
  if (isWeekday(date) && !isPublicHoliday(date) && !isNewYearHoliday(date)) {
    return true;
  }
  return false;
}

/**
 * 引数で受け取った日付が平日ならtrue、それ以外はfalseを返す。
 *
 * @param {Date} [date] - 日付
 * @returns {boolean}
 */
function isWeekday(date) {
  if (date.getDay() === 0 || date.getDay() === 6) {
    return false;
  }
  return true;
}

/**
 * 引数で受け取った日付が日本の祝日ならtrue、それ以外はfalseを返す。
 *
 * @param {Date} [date] - 日付
 * @returns {boolean}
 */
function isPublicHoliday(date) {
  const japaneseHolidayCalendar = CalendarApp.getCalendarById(Props.JAPANESE_HOLIDAY_CALENDAR_ID);
  const eventsForDay = japaneseHolidayCalendar.getEventsForDay(date);
  if (eventsForDay.length > 0) {
    return true;
  }
  return false;
}

/**
 * 引数で受け取った日付が年末年始休みならtrue、それ以外はfalseを返す。
 *
 * @param {Date} [date] - 日付
 * @returns {boolean}
 */
function isNewYearHoliday(date) {
  const newYearHolidayCalendar = CalendarApp.getCalendarById(Props.NEW_YEAR_HOLIDAY_CALENDAR_ID);
  const eventsForDay = newYearHolidayCalendar.getEventsForDay(date);
  if (eventsForDay.length > 0) {
    return true;
  }
  return false;
}

/**
 * 実行日が第N営業日ならtrue、それ以外はfalseを返す。
 *
 * @param {Number} [businessDayAfter] - 第N営業日のN
 * @returns {boolean}
*/
function isNthBusinessDay(businessDayAfter) {
  const today = new Date();
  const nthBusinessDay = getNthBusinessDay(businessDayAfter);

  if (isSameDate(today, nthBusinessDay)) {
    Logger.log(`第${businessDayAfter}営業日です。`);
    return true;
  } else {
    Logger.log(`第${businessDayAfter}営業日ではありません。`);
    return false;
  }
}

/**
 * 実行日が月末から第N営業日ならtrue、それ以外はfalseを返す。
 *
 * @param {Number} [businessDayBefore] - 月末から第N営業日のN
 * @returns {boolean}
*/
function isNthLastBusinessDay(businessDayBefore) {
  const today = new Date();
  const nthLastBusinessDay = getNthLastBusinessDay(businessDayBefore);

  if (isSameDate(today, nthLastBusinessDay)) {
    Logger.log(`月末${businessDayBefore}営業日前です。`);
    return true;
  } else {
    Logger.log(`月末${businessDayBefore}営業日前ではありません。`);
    return false;
  }
}

/**
 * `businessDayAfter`をNとして、実行日付の月の第N営業日を返す。
 *
 * @param {Number} [businessDayAfter] - 第N営業日のN
 * @returns {Date}
*/
function getNthBusinessDay(businessDayAfter) {
  const today = new Date();
  let businessDayCount = 0;
  let dayCount = 0;

  while (businessDayCount < businessDayAfter) {
    const date = new Date(today.getFullYear(), today.getMonth(), 1 + dayCount);
    if (isBusinessDay(date)) {
      businessDayCount++;
    }
    dayCount++;
  }

  const nthBusinessDay = new Date(today.getFullYear(), today.getMonth(), dayCount);

  Logger.log(`実行日付: ${today}`);
  Logger.log(`第${businessDayAfter}営業日: ${nthBusinessDay}`);

  return nthBusinessDay;
}

/**
 * `businessDayBefore`をNとして、実行日付の月の月末から第N営業日を返す。
 *
 * @param {Number} [businessDayBefore] - 月末から第N営業日のN
 * @returns {Date}
*/
function getNthLastBusinessDay(businessDayBefore) {
  const today = new Date();
  const lastDateOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  let dayCount = 0;
  let businessDayCount = 0;

  while (businessDayCount < businessDayBefore) {
    const date = new Date(lastDateOfMonth.getFullYear(), lastDateOfMonth.getMonth(), lastDateOfMonth.getDate() - dayCount);
    if (isBusinessDay(date)) {
      businessDayCount++;
    }
    dayCount++;
  }

  const nthLastBusinessDay = new Date(lastDateOfMonth.getFullYear(), lastDateOfMonth.getMonth(), lastDateOfMonth.getDate() - dayCount);

  Logger.log(`実行日付: ${today}`);
  Logger.log(`月末${businessDayBefore}営業日前: ${nthLastBusinessDay}`);

  return nthLastBusinessDay;
}

/**
 * 実行日を起算日として最初に見つかった営業日を返す（実行日が営業日の場合は実行日を返す）。
 * 返却されるDate型オブジェクトの時間、分、秒、ミリ秒には0が設定される。
 * 週ベースのタイマーで、その週の第一営業日を取得するために使用されることを想定する。
 *
 * @returns {Date}
 */
function getFirstBusinessDay() {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  while (!isBusinessDay(today)) {
    today.setDate(today.getDate() + 1);
  }

  return today;
}
