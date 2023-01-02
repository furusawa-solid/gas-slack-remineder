/**
 * 引数で受け取った値を基にSlackへ通知します。
 *
 * @param {string} [message] - Slackに表示されるメッセージ。Truthyでない場合はエラー終了します。
 * @param {string} userName - Slackに表示されるユーザー名。
 * @param {string} icon - Slackに表示されるアイコン。例:「:thiking-face:」
 * @param {string} hoge - hogehoge
 * @returns {undefined}
 */
function notifySlack(message, userName, icon, hoge) {
  if (!message) {
    throw new Error("メッセージは必須です。");
  }

  // TODO: いい感じに送信先切り替えられるようにする
  // gas-testチャンネル
  // const webhookUrl = Props.CHANNEL_FRONT_GAS_TEST_CHANNEL_WEB_HOOK_URL;
  // generalチャンネル
  const webhookUrl = hoge || Props.CHANNEL_FRONT_GENERAL_CHANNEL_WEB_HOOK_URL;

  // username: 通知者の名前
  // icon_emoji: アイコン
  // text: 送信するメッセージ
  const payloadObject = {
    username: userName,
    icon_emoji: icon,
    text: message,
  };

  const payloadJson = JSON.stringify(payloadObject);

  // オプションを設定
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: payloadJson,
  };

  // Slackに通知する
  UrlFetchApp.fetch(webhookUrl, options);

  Logger.log('webhook URL:' + webhookUrl);
  Logger.log('payload:' + payloadObject);
  Logger.log('options:' + options);
}

/**
 * 勤怠ファイルチェックのリマインドをSlackに送信する。
 *
 * @returns {undefined}
 */
function notifyAttendanceFileCheck() {
  const message = `<!channel>\n勤怠ファイルチェックのリマインドです。\n本日の定時までに勤怠ファイルをアップロードしてください。\n<${Props.CHANNEL_FRONT_OFFICE_WORK_FOLDER_URL}|勤怠ファイル置き場>\n\n完了したら:white_check_mark:でリアクションしてください。`;
  const userName = '勤怠ファイルチェックリマインダー';
  const icon = ':male-police-officer:';

  notifySlack(message, userName, icon, null);
}

/**
 * 事務書類提出のリマインドをSlackに送信する。
 *
 * @returns {undefined}
 */
function notifyOfficework() {
  const message = '<!channel>\n事務書類提出のリマインドです。勤怠、通勤手当、交通費、手当システムの提出をお願いします。\n提出が完了したら下記でリアクションしてください。\n:calendar: : 勤怠\n:train: : 通勤手当\n:bus: : 交通費\n:coin: : 手当システム\n';
  const userName = '事務書類提出リマインダー';
  const icon = ':male-police-officer:';

  notifySlack(message, userName, icon, null);
}

/**
 * TeamSpiritの承認申請のリマインドをSlackに送信する。
 *
 * @returns {undefined}
 */
function notifyTeamSpiritApplication() {
  const message = `<@${Props.CHANESO_PJ_USER_ID_FURUSAWA}> <@${Props.CHANESO_PJ_USER_ID_KOBAYASHI}> <@${Props.CHANESO_PJ_USER_ID_SATAKE}>\nTeamSpiritの承認申請のリマインドです。\nTeamsSpiritで勤怠を入力して、承認申請をしてください。\n申請が完了したら:white_check_mark:でリアクションしてください。`;
  const userName = 'TeamsSpirit承認申請リマインダー';
  const icon = ':male-police-officer:';

  notifySlack(message, userName, icon, Props.CHANESO_PJ_WB_SFCC_CHANNNEL_WEB_HOOK_URL);
}

/**
 * TeamSpiritの勤怠書類提出のリマインドをSlackに送信する。
 *
 * @returns {undefined}
 */
function notifyTeamSpiritAttendanceDocuments() {
  const message = `<@${Props.CHANESO_PJ_USER_ID_FURUSAWA}> <@${Props.CHANESO_PJ_USER_ID_KOBAYASHI}> <@${Props.CHANESO_PJ_USER_ID_SATAKE}>\nTeamSpiritの勤怠書類提出のリマインドです。\nTeamSpiritから月次サマリーおよび工数実績表をダウンロードしてリプライ欄に提出をお願いします。\n提出が完了したら:white_check_mark:でリアクションしてください。`;
  const userName = 'TeamSpirit勤怠書類提出リマインダー';
  const icon = ':male-police-officer:';

  notifySlack(message, userName, icon, Props.CHANESO_PJ_WB_SFCC_CHANNNEL_WEB_HOOK_URL);
}


/**
 * GaroonのWEB勤怠提出のリマインドをSlackに送信する。
 *
 * @returns {undefined}
 */
function notifyGaroonWebAttendace() {
  const message = '<!channel>\nGaroonの勤怠提出のリマインドです。先週分のWEB勤怠の提出をお願いします。\n提出が完了したら:white_check_mark:でリアクションしてください。\n';
  const userName = 'Garoon WEB勤怠提出リマインダー';
  const icon = ':male-police-officer:';

  notifySlack(message, userName, icon, null);
}
