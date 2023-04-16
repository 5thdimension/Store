export type TelegramType = {
  WebApp: WebApp;
};
export type WebApp = {
  /** A string with raw data transferred to the Web App, convenient for [validating data](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app).
   *
   * **WARNING:** [Validate data](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app) from this field before using it on the bot's server. */
  initData: string;

  /**
   * An object with input data transferred to the Web App.
   *
   * **WARNING:** Data from this field should not be trusted. You should only use data from initData on the bot's server and only after it has been [validated](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app).
   */
  initDataUnsafe: WebAppInitData;

  /** The color scheme currently used in the Telegram app. */
  colorScheme: "light" | "dark";

  /** An object containing the current theme settings used in the Telegram app. */
  themeParams: ThemeParams;

  /**
   * _True_ if the Web App is expanded to the maximum available height. _False_, if the Web App occupies part of the screen and can be expanded to the full height using the **expand()** method.
   *
   * @see expand
   */
  isExpanded: boolean;

  /**
   * The current height of the visible area of the Web App.
   *
   * The application can display just the top part of the Web App, with its lower part remaining outside the screen area. From this position, the user can “pull” the Web App to its maximum height, while the bot can do the same by calling the **expand()** method. As the position of the Web App changes, the current height value of the visible area will be updated in real time.
   *
   * Please note that the refresh rate of this value is not sufficient to smoothly follow the lower border of the window. It should not be used to pin interface elements to the bottom of the visible area. It's more appropriate to use the value of the `viewportStableHeight` field for this purpose.
   */
  viewportHeight: number;

  /**
   * The height of the visible area of the Web App in its last stable state.
   *
   * Unlike the value of `viewportHeight`, the value of `viewportStableHeight` does not change as the position of the Web App changes with user gestures or during animations. The value of `viewportStableHeight` will be updated after all gestures and animations are completed and the Web App reaches its final size.
   */
  viewportStableHeight: number;

  /** An object for controlling the main button, which is displayed at the bottom of the Web App in the Telegram interface. */
  MainButton: MainButton;

  /**
   * Occurs whenever theme settings are changed in the user's Telegram app (including switching to night mode).
   *
   * @param event The name of the event.
   * @param eventHandler The callback to execute. Receives no parameters, new theme settings and color scheme can be received via `this.themeParams` and `this.colorScheme` respectively.
   */
  onEvent(
    event: "themeChanged",
    eventHandler: EventHandler<"themeChanged">
  ): void;

  /**
   * Occurs when the visible section of the Web App is changed.
   * @param event The name of the event.
   * @param eventHandler The callback to execute. Receives an object with the single field `isStateStable`. If `isStateStable` = true, the resizing of the Web App is finished. If it is false, the resizing is ongoing (the user is expanding or collapsing the Web App or an animated object is playing). The current value of the visible section’s height is available in `this.viewportHeight`.
   */
  onEvent(
    event: "viewportChanged",
    eventHandler: EventHandler<"viewPortChanged">
  ): void;

  /**
   * Occurs when the {@link MainButton main button} is pressed.
   * @param event The name of the event.
   * @param eventHandler The callback to execute. Receives no parameters.
   */
  onEvent(
    event: "mainButtonClicked",
    eventHandler: EventHandler<"mainButtonClicked">
  ): void;

  /** A method that deletes a previously set event handler. */
  offEvent(
    event: "themeChanged" | "viewportChanged" | "mainButtonClicked",
    eventHandler: EventHandler<
      "themeChanged" | "viewportChanged" | "mainButtonClicked"
    >
  ): void;

  /**
   * A method used to send data to the bot. When this method is called, a service message is sent to the bot containing the data `data` of the length up to 4096 bytes, and the Web App is closed. See the field `web_app_data` in the class [Message](https://core.telegram.org/bots/api#message).
   *
   * _This method is only available for Web Apps launched via a [Keyboard button](https://core.telegram.org/bots/webapps#keyboard-button-web-apps)._
   */
  sendData(data: any): void;

  /**
   * A method that informs the Telegram app that the Web App is ready to be displayed.
   *
   * It is recommended to call this method as early as possible, as soon as all essential interface elements are loaded. Once this method is called, the loading placeholder is hidden and the Web App is shown.
   *
   * If the method is not called, the placeholder will be hidden only when the page is fully loaded.
   */
  ready(): void;

  /**
   * A method that expands the Web App to the maximum available height.
   *
   * @see isExpanded
   */
  expand(): void;

  /** A method that closes the Web App. */
  close(): void;
};

export type ThemeParams = {
  /** Background color in the `#RRGGBB` format */
  bg_color?: string;

  /** Main text color in the `#RRGGBB` format */
  text_color?: string;

  /** Hint text color in the `#RRGGBB` format */
  hint_color?: string;

  /** Link color in the `#RRGGBB` format */
  link_color?: string;

  /** Button color in the `#RRGGBB` format */
  button_color?: string;

  /** Button text color in the `#RRGGBB` format */
  button_text_color?: string;
};

export type MainButton = {
  /** Current button text. Set to `CONTINUE` by default. */
  text: string;

  /** Current button color. Set to `themeParams.button_color` by default. */
  color: string;

  /** Current button text color. Set to `themeParams.button_text_color` by default. */
  text_color: string;

  /** Shows whether the button is visible. Set to `false` by default */
  isVisible: boolean;

  /** Shows whether the button is active. Set to `true` by default */
  isActive: boolean;

  /** @readonly Shows whether the button is displaying a loading indicator */
  isLoading: boolean;

  /**
   * A method to set the button text.
   *
   * @param text New button text.
   */
  setText(this: MainButton, text: string): void;

  /** A method that sets the button press event handler
   *
   * An alias for {@link WebApp.onEvent WebApp.onEvent with `mainButtonClicked` event}.
   */
  onClick(this: MainButton, handler: EventHandler<"mainButtonClicked">): void;

  /**
   * A method to make the button visible.
   *
   * _Note that opening the Web App from the [attachment menu](https://core.telegram.org/bots/webapps#launching-web-apps-from-the-attachment-menu) hides the main button until the user interacts with the Web App interface._
   */
  show(this: MainButton): void;

  /** A method to hide the button. */
  hide(this: MainButton): void;

  /** A method to enable the button. */
  enable(this: MainButton): void;

  /** A method to disable the button. */
  disable(this: MainButton): void;

  /**
   * A method to show a loading indicator on the button.
   *
   * It is recommended to display loading progress if the action tied to the button may take a long time.
   *
   * @param leaveActive If `true`, the button remains enabled while the action in progress. Set to `false` by default.
   */
  showProgress(this: MainButton, leaveActive: boolean = false): void;

  /** A method to hide the loading indicator on the button. */
  hideProgress(this: MainButton): void;

  /**
   * A method to set the button parameters.
   * @param params An object containing one or several fields that need to be changed.
   */
  setParams(
    this: MainButton,
    params: {
      /** Current button text. */
      text?: string;

      /** Current button color. */
      color?: string;

      /** Current button text color. */
      text_color?: string;

      /** Shows whether the button is visible. */
      is_visible?: boolean;

      /** Shows whether the button is active. */
      is_active?: boolean;
    }
  ): void;
};

export type WebAppInitData = {
  /** A unique identifier for the Web App session, required for sending messages via the [answerWebAppQuery](https://core.telegram.org/bots/api#answerwebappquery) method. */
  query_id?: string;

  /** An object containing data about the current user. */
  user?: WebAppUser;

  /** An object containing data about the chat partner of the current user in the chat where the bot was launched via the attachment menu. Returned only for Web Apps launched via the attachment menu. */
  receiver?: WebAppUser;

  /**
   * The value of the `startattach` parameter, passed via link. Only returned for Web Apps when launched from the attachment menu via link.
   *
   * The value of the `start_param` parameter will also be returned in the {@link useStartParam}, so the Web App can load the correct interface right away.
   *
   * @see useStartParam
   */
  start_param?: string;

  /** Unix time when the form was opened. */
  auth_date: number;

  /** A hash of all passed parameters, which the bot server can use to [check their validity](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app). */
  hash: string;
};

export type WebAppUser = {
  /** A unique identifier for the user or bot. */
  id: number;

  /** `True`, if this user is a bot. Returns in the {@link WebAppInitData.receiver receiver} field only */
  is_bot?: boolean;

  /** First name of the user or bot. */
  first_name: string;

  /** Last name of the user or bot. */
  last_name?: string;

  /** Username of the user or bot. */
  username?: string;

  /** [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) of the user's language. Returns in {@link WebAppInitData.user user} field only */
  language_code?:
  | "af"
  | "af-NA"
  | "af-ZA"
  | "agq"
  | "agq-CM"
  | "ak"
  | "ak-GH"
  | "am"
  | "am-ET"
  | "ar"
  | "ar-001"
  | "ar-AE"
  | "ar-BH"
  | "ar-DJ"
  | "ar-DZ"
  | "ar-EG"
  | "ar-EH"
  | "ar-ER"
  | "ar-IL"
  | "ar-IQ"
  | "ar-JO"
  | "ar-KM"
  | "ar-KW"
  | "ar-LB"
  | "ar-LY"
  | "ar-MA"
  | "ar-MR"
  | "ar-OM"
  | "ar-PS"
  | "ar-QA"
  | "ar-SA"
  | "ar-SD"
  | "ar-SO"
  | "ar-SS"
  | "ar-SY"
  | "ar-TD"
  | "ar-TN"
  | "ar-YE"
  | "as"
  | "as-IN"
  | "asa"
  | "asa-TZ"
  | "ast"
  | "ast-ES"
  | "az"
  | "az-Cyrl"
  | "az-Cyrl-AZ"
  | "az-Latn"
  | "az-Latn-AZ"
  | "bas"
  | "bas-CM"
  | "be"
  | "be-BY"
  | "bem"
  | "bem-ZM"
  | "bez"
  | "bez-TZ"
  | "bg"
  | "bg-BG"
  | "bm"
  | "bm-ML"
  | "bn"
  | "bn-BD"
  | "bn-IN"
  | "bo"
  | "bo-CN"
  | "bo-IN"
  | "br"
  | "br-FR"
  | "brx"
  | "brx-IN"
  | "bs"
  | "bs-Cyrl"
  | "bs-Cyrl-BA"
  | "bs-Latn"
  | "bs-Latn-BA"
  | "ca"
  | "ca-AD"
  | "ca-ES"
  | "ca-ES-VALENCIA"
  | "ca-FR"
  | "ca-IT"
  | "ccp"
  | "ccp-BD"
  | "ccp-IN"
  | "ce"
  | "ce-RU"
  | "ceb"
  | "ceb-PH"
  | "cgg"
  | "cgg-UG"
  | "chr"
  | "chr-US"
  | "ckb"
  | "ckb-IQ"
  | "ckb-IR"
  | "cs"
  | "cs-CZ"
  | "cu"
  | "cu-RU"
  | "cy"
  | "cy-GB"
  | "da"
  | "da-DK"
  | "da-GL"
  | "dav"
  | "dav-KE"
  | "de"
  | "de-AT"
  | "de-BE"
  | "de-CH"
  | "de-DE"
  | "de-IT"
  | "de-LI"
  | "de-LU"
  | "dje"
  | "dje-NE"
  | "dsb"
  | "dsb-DE"
  | "dua"
  | "dua-CM"
  | "dyo"
  | "dyo-SN"
  | "dz"
  | "dz-BT"
  | "ebu"
  | "ebu-KE"
  | "ee"
  | "ee-GH"
  | "ee-TG"
  | "el"
  | "el-CY"
  | "el-GR"
  | "en"
  | "en-001"
  | "en-150"
  | "en-AE"
  | "en-AG"
  | "en-AI"
  | "en-AS"
  | "en-AT"
  | "en-AU"
  | "en-BB"
  | "en-BE"
  | "en-BI"
  | "en-BM"
  | "en-BS"
  | "en-BW"
  | "en-BZ"
  | "en-CA"
  | "en-CC"
  | "en-CH"
  | "en-CK"
  | "en-CM"
  | "en-CX"
  | "en-CY"
  | "en-DE"
  | "en-DG"
  | "en-DK"
  | "en-DM"
  | "en-ER"
  | "en-FI"
  | "en-FJ"
  | "en-FK"
  | "en-FM"
  | "en-GB"
  | "en-GD"
  | "en-GG"
  | "en-GH"
  | "en-GI"
  | "en-GM"
  | "en-GU"
  | "en-GY"
  | "en-HK"
  | "en-IE"
  | "en-IL"
  | "en-IM"
  | "en-IN"
  | "en-IO"
  | "en-JE"
  | "en-JM"
  | "en-KE"
  | "en-KI"
  | "en-KN"
  | "en-KY"
  | "en-LC"
  | "en-LR"
  | "en-LS"
  | "en-MG"
  | "en-MH"
  | "en-MO"
  | "en-MP"
  | "en-MS"
  | "en-MT"
  | "en-MU"
  | "en-MW"
  | "en-MY"
  | "en-NA"
  | "en-NF"
  | "en-NG"
  | "en-NL"
  | "en-NR"
  | "en-NU"
  | "en-NZ"
  | "en-PG"
  | "en-PH"
  | "en-PK"
  | "en-PN"
  | "en-PR"
  | "en-PW"
  | "en-RW"
  | "en-SB"
  | "en-SC"
  | "en-SD"
  | "en-SE"
  | "en-SG"
  | "en-SH"
  | "en-SI"
  | "en-SL"
  | "en-SS"
  | "en-SX"
  | "en-SZ"
  | "en-TC"
  | "en-TK"
  | "en-TO"
  | "en-TT"
  | "en-TV"
  | "en-TZ"
  | "en-UG"
  | "en-UM"
  | "en-US"
  | "en-US-POSIX"
  | "en-VC"
  | "en-VG"
  | "en-VI"
  | "en-VU"
  | "en-WS"
  | "en-ZA"
  | "en-ZM"
  | "en-ZW"
  | "eo"
  | "eo-001"
  | "es"
  | "es-419"
  | "es-AR"
  | "es-BO"
  | "es-BR"
  | "es-BZ"
  | "es-CL"
  | "es-CO"
  | "es-CR"
  | "es-CU"
  | "es-DO"
  | "es-EA"
  | "es-EC"
  | "es-ES"
  | "es-GQ"
  | "es-GT"
  | "es-HN"
  | "es-IC"
  | "es-MX"
  | "es-NI"
  | "es-PA"
  | "es-PE"
  | "es-PH"
  | "es-PR"
  | "es-PY"
  | "es-SV"
  | "es-US"
  | "es-UY"
  | "es-VE"
  | "et"
  | "et-EE"
  | "eu"
  | "eu-ES"
  | "ewo"
  | "ewo-CM"
  | "fa"
  | "fa-AF"
  | "fa-IR"
  | "ff"
  | "ff-Adlm"
  | "ff-Adlm-BF"
  | "ff-Adlm-CM"
  | "ff-Adlm-GH"
  | "ff-Adlm-GM"
  | "ff-Adlm-GN"
  | "ff-Adlm-GW"
  | "ff-Adlm-LR"
  | "ff-Adlm-MR"
  | "ff-Adlm-NE"
  | "ff-Adlm-NG"
  | "ff-Adlm-SL"
  | "ff-Adlm-SN"
  | "ff-Latn"
  | "ff-Latn-BF"
  | "ff-Latn-CM"
  | "ff-Latn-GH"
  | "ff-Latn-GM"
  | "ff-Latn-GN"
  | "ff-Latn-GW"
  | "ff-Latn-LR"
  | "ff-Latn-MR"
  | "ff-Latn-NE"
  | "ff-Latn-NG"
  | "ff-Latn-SL"
  | "ff-Latn-SN"
  | "fi"
  | "fi-FI"
  | "fil"
  | "fil-PH"
  | "fo"
  | "fo-DK"
  | "fo-FO"
  | "fr"
  | "fr-BE"
  | "fr-BF"
  | "fr-BI"
  | "fr-BJ"
  | "fr-BL"
  | "fr-CA"
  | "fr-CD"
  | "fr-CF"
  | "fr-CG"
  | "fr-CH"
  | "fr-CI"
  | "fr-CM"
  | "fr-DJ"
  | "fr-DZ"
  | "fr-FR"
  | "fr-GA"
  | "fr-GF"
  | "fr-GN"
  | "fr-GP"
  | "fr-GQ"
  | "fr-HT"
  | "fr-KM"
  | "fr-LU"
  | "fr-MA"
  | "fr-MC"
  | "fr-MF"
  | "fr-MG"
  | "fr-ML"
  | "fr-MQ"
  | "fr-MR"
  | "fr-MU"
  | "fr-NC"
  | "fr-NE"
  | "fr-PF"
  | "fr-PM"
  | "fr-RE"
  | "fr-RW"
  | "fr-SC"
  | "fr-SN"
  | "fr-SY"
  | "fr-TD"
  | "fr-TG"
  | "fr-TN"
  | "fr-VU"
  | "fr-WF"
  | "fr-YT"
  | "fur"
  | "fur-IT"
  | "fy"
  | "fy-NL"
  | "ga"
  | "ga-GB"
  | "ga-IE"
  | "gd"
  | "gd-GB"
  | "gl"
  | "gl-ES"
  | "gsw"
  | "gsw-CH"
  | "gsw-FR"
  | "gsw-LI"
  | "gu"
  | "gu-IN"
  | "guz"
  | "guz-KE"
  | "gv"
  | "gv-IM"
  | "ha"
  | "ha-GH"
  | "ha-NE"
  | "ha-NG"
  | "haw"
  | "haw-US"
  | "he"
  | "he-IL"
  | "hi"
  | "hi-IN"
  | "hr"
  | "hr-BA"
  | "hr-HR"
  | "hsb"
  | "hsb-DE"
  | "hu"
  | "hu-HU"
  | "hy"
  | "hy-AM"
  | "ia"
  | "ia-001"
  | "id"
  | "id-ID"
  | "ig"
  | "ig-NG"
  | "ii"
  | "ii-CN"
  | "is"
  | "is-IS"
  | "it"
  | "it-CH"
  | "it-IT"
  | "it-SM"
  | "it-VA"
  | "ja"
  | "ja-JP"
  | "jgo"
  | "jgo-CM"
  | "jmc"
  | "jmc-TZ"
  | "jv"
  | "jv-ID"
  | "ka"
  | "ka-GE"
  | "kab"
  | "kab-DZ"
  | "kam"
  | "kam-KE"
  | "kde"
  | "kde-TZ"
  | "kea"
  | "kea-CV"
  | "khq"
  | "khq-ML"
  | "ki"
  | "ki-KE"
  | "kk"
  | "kk-KZ"
  | "kkj"
  | "kkj-CM"
  | "kl"
  | "kl-GL"
  | "kln"
  | "kln-KE"
  | "km"
  | "km-KH"
  | "kn"
  | "kn-IN"
  | "ko"
  | "ko-KP"
  | "ko-KR"
  | "kok"
  | "kok-IN"
  | "ks"
  | "ks-Arab"
  | "ks-Arab-IN"
  | "ksb"
  | "ksb-TZ"
  | "ksf"
  | "ksf-CM"
  | "ksh"
  | "ksh-DE"
  | "ku"
  | "ku-TR"
  | "kw"
  | "kw-GB"
  | "ky"
  | "ky-KG"
  | "lag"
  | "lag-TZ"
  | "lb"
  | "lb-LU"
  | "lg"
  | "lg-UG"
  | "lkt"
  | "lkt-US"
  | "ln"
  | "ln-AO"
  | "ln-CD"
  | "ln-CF"
  | "ln-CG"
  | "lo"
  | "lo-LA"
  | "lrc"
  | "lrc-IQ"
  | "lrc-IR"
  | "lt"
  | "lt-LT"
  | "lu"
  | "lu-CD"
  | "luo"
  | "luo-KE"
  | "luy"
  | "luy-KE"
  | "lv"
  | "lv-LV"
  | "mai"
  | "mai-IN"
  | "mas"
  | "mas-KE"
  | "mas-TZ"
  | "mer"
  | "mer-KE"
  | "mfe"
  | "mfe-MU"
  | "mg"
  | "mg-MG"
  | "mgh"
  | "mgh-MZ"
  | "mgo"
  | "mgo-CM"
  | "mi"
  | "mi-NZ"
  | "mk"
  | "mk-MK"
  | "ml"
  | "ml-IN"
  | "mn"
  | "mn-MN"
  | "mni"
  | "mni-Beng"
  | "mni-Beng-IN"
  | "mr"
  | "mr-IN"
  | "ms"
  | "ms-BN"
  | "ms-ID"
  | "ms-MY"
  | "ms-SG"
  | "mt"
  | "mt-MT"
  | "mua"
  | "mua-CM"
  | "my"
  | "my-MM"
  | "mzn"
  | "mzn-IR"
  | "naq"
  | "naq-NA"
  | "nb"
  | "nb-NO"
  | "nb-SJ"
  | "nd"
  | "nd-ZW"
  | "nds"
  | "nds-DE"
  | "nds-NL"
  | "ne"
  | "ne-IN"
  | "ne-NP"
  | "nl"
  | "nl-AW"
  | "nl-BE"
  | "nl-BQ"
  | "nl-CW"
  | "nl-NL"
  | "nl-SR"
  | "nl-SX"
  | "nmg"
  | "nmg-CM"
  | "nn"
  | "nn-NO"
  | "nnh"
  | "nnh-CM"
  | "nus"
  | "nus-SS"
  | "nyn"
  | "nyn-UG"
  | "om"
  | "om-ET"
  | "om-KE"
  | "or"
  | "or-IN"
  | "os"
  | "os-GE"
  | "os-RU"
  | "pa"
  | "pa-Arab"
  | "pa-Arab-PK"
  | "pa-Guru"
  | "pa-Guru-IN"
  | "pcm"
  | "pcm-NG"
  | "pl"
  | "pl-PL"
  | "prg"
  | "prg-001"
  | "ps"
  | "ps-AF"
  | "ps-PK"
  | "pt"
  | "pt-AO"
  | "pt-BR"
  | "pt-CH"
  | "pt-CV"
  | "pt-GQ"
  | "pt-GW"
  | "pt-LU"
  | "pt-MO"
  | "pt-MZ"
  | "pt-PT"
  | "pt-ST"
  | "pt-TL"
  | "qu"
  | "qu-BO"
  | "qu-EC"
  | "qu-PE"
  | "rm"
  | "rm-CH"
  | "rn"
  | "rn-BI"
  | "ro"
  | "ro-MD"
  | "ro-RO"
  | "rof"
  | "rof-TZ"
  | "root"
  | "ru"
  | "ru-BY"
  | "ru-KG"
  | "ru-KZ"
  | "ru-MD"
  | "ru-RU"
  | "ru-UA"
  | "rw"
  | "rw-RW"
  | "rwk"
  | "rwk-TZ"
  | "sah"
  | "sah-RU"
  | "saq"
  | "saq-KE"
  | "sat"
  | "sat-Olck"
  | "sat-Olck-IN"
  | "sbp"
  | "sbp-TZ"
  | "sd"
  | "sd-Arab"
  | "sd-Arab-PK"
  | "sd-Deva"
  | "sd-Deva-IN"
  | "se"
  | "se-FI"
  | "se-NO"
  | "se-SE"
  | "seh"
  | "seh-MZ"
  | "ses"
  | "ses-ML"
  | "sg"
  | "sg-CF"
  | "shi"
  | "shi-Latn"
  | "shi-Latn-MA"
  | "shi-Tfng"
  | "shi-Tfng-MA"
  | "si"
  | "si-LK"
  | "sk"
  | "sk-SK"
  | "sl"
  | "sl-SI"
  | "smn"
  | "smn-FI"
  | "sn"
  | "sn-ZW"
  | "so"
  | "so-DJ"
  | "so-ET"
  | "so-KE"
  | "so-SO"
  | "sq"
  | "sq-AL"
  | "sq-MK"
  | "sq-XK"
  | "sr"
  | "sr-Cyrl"
  | "sr-Cyrl-BA"
  | "sr-Cyrl-ME"
  | "sr-Cyrl-RS"
  | "sr-Cyrl-XK"
  | "sr-Latn"
  | "sr-Latn-BA"
  | "sr-Latn-ME"
  | "sr-Latn-RS"
  | "sr-Latn-XK"
  | "su"
  | "su-Latn"
  | "su-Latn-ID"
  | "sv"
  | "sv-AX"
  | "sv-FI"
  | "sv-SE"
  | "sw"
  | "sw-CD"
  | "sw-KE"
  | "sw-TZ"
  | "sw-UG"
  | "ta"
  | "ta-IN"
  | "ta-LK"
  | "ta-MY"
  | "ta-SG"
  | "te"
  | "te-IN"
  | "teo"
  | "teo-KE"
  | "teo-UG"
  | "tg"
  | "tg-TJ"
  | "th"
  | "th-TH"
  | "ti"
  | "ti-ER"
  | "ti-ET"
  | "tk"
  | "tk-TM"
  | "to"
  | "to-TO"
  | "tr"
  | "tr-CY"
  | "tr-TR"
  | "tt"
  | "tt-RU"
  | "twq"
  | "twq-NE"
  | "tzm"
  | "tzm-MA"
  | "ug"
  | "ug-CN"
  | "uk"
  | "uk-UA"
  | "ur"
  | "ur-IN"
  | "ur-PK"
  | "uz"
  | "uz-Arab"
  | "uz-Arab-AF"
  | "uz-Cyrl"
  | "uz-Cyrl-UZ"
  | "uz-Latn"
  | "uz-Latn-UZ"
  | "vai"
  | "vai-Latn"
  | "vai-Latn-LR"
  | "vai-Vaii"
  | "vai-Vaii-LR"
  | "vi"
  | "vi-VN"
  | "vo"
  | "vo-001"
  | "vun"
  | "vun-TZ"
  | "wae"
  | "wae-CH"
  | "wo"
  | "wo-SN"
  | "xh"
  | "xh-ZA"
  | "xog"
  | "xog-UG"
  | "yav"
  | "yav-CM"
  | "yi"
  | "yi-001"
  | "yo"
  | "yo-BJ"
  | "yo-NG"
  | "yue"
  | "yue-Hans"
  | "yue-Hans-CN"
  | "yue-Hant"
  | "yue-Hant-HK"
  | "zgh"
  | "zgh-MA"
  | "zh"
  | "zh-Hans"
  | "zh-Hans-CN"
  | "zh-Hans-HK"
  | "zh-Hans-MO"
  | "zh-Hans-SG"
  | "zh-Hant"
  | "zh-Hant-HK"
  | "zh-Hant-MO"
  | "zh-Hant-TW"
  | "zu"
  | string;

  /**
   * URL of the user’s profile photo. The photo can be in `.jpeg` or `.svg` formats.
   *
   * Only returned for Web Apps launched from the attachment menu.
   */
  photo_url?: string;
};