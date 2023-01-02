const setTrigger = (functionName, date) => {
  ScriptApp.newTrigger(functionName)
    .timeBased()
    .at(date)
    .create();
}

const setTriggersForThisWeek = () => {
  const firstBusinessDayOnThisWeek = getFirstBusinessDay();
  firstBusinessDayOnThisWeek.setHours(10);
  firstBusinessDayOnThisWeek.setMinutes(0);
  setTrigger('notifyGaroonWebAttendace', firstBusinessDayOnThisWeek);
}
