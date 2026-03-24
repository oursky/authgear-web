import PageScripts from '@/components/PageScripts';

const pageScripts: string[] = [
  `(function () {
  // ── Pricing data ──────────────────────────────────────────
  var AG_DATA = [{"iso":"BR","country":"Brazil","sms_price":0.0599,"whatsapp_price":0.0268,"popular":true},{"iso":"DE","country":"Germany","sms_price":0.112,"whatsapp_price":0.075,"popular":true},{"iso":"HK","country":"Hong Kong","sms_price":0.0682,"whatsapp_price":0.0313,"popular":true},{"iso":"IN","country":"India","sms_price":0.0832,"whatsapp_price":0.0214,"popular":true},{"iso":"NG","country":"Nigeria","sms_price":0.3868,"whatsapp_price":0.0267,"popular":true},{"iso":"SG","country":"Singapore","sms_price":0.0591,"whatsapp_price":0.0313,"popular":true},{"iso":"GB","country":"United Kingdom","sms_price":0.0524,"whatsapp_price":0.042,"popular":true},{"iso":"US","country":"United States","sms_price":0.0083,"whatsapp_price":0.0083,"popular":false},{"iso":"AF","country":"Afghanistan","sms_price":0.3756,"whatsapp_price":0.0313,"popular":false},{"iso":"AL","country":"Albania","sms_price":0.1101,"whatsapp_price":0.0412,"popular":false},{"iso":"DZ","country":"Algeria","sms_price":0.2575,"whatsapp_price":0.024,"popular":false},{"iso":"AS","country":"American Samoa","sms_price":0.1881,"whatsapp_price":0.0234,"popular":false},{"iso":"AD","country":"Andorra","sms_price":0.1464,"whatsapp_price":0.0371,"popular":false},{"iso":"AO","country":"Angola","sms_price":0.2588,"whatsapp_price":0.024,"popular":false},{"iso":"AI","country":"Anguilla","sms_price":0.22,"whatsapp_price":0.0313,"popular":false},{"iso":"AG","country":"Antigua and Barbuda","sms_price":0.2025,"whatsapp_price":0.0313,"popular":false},{"iso":"AR","country":"Argentina","sms_price":0.0935,"whatsapp_price":0.046,"popular":false},{"iso":"AM","country":"Armenia","sms_price":0.2528,"whatsapp_price":0.0412,"popular":false},{"iso":"AW","country":"Aruba","sms_price":0.2297,"whatsapp_price":0.0313,"popular":false},{"iso":"AU","country":"Australia","sms_price":0.0515,"whatsapp_price":0.0313,"popular":false},{"iso":"AT","country":"Austria","sms_price":0.0979,"whatsapp_price":0.0371,"popular":false},{"iso":"AZ","country":"Azerbaijan","sms_price":0.3877,"whatsapp_price":0.0277,"popular":false},{"iso":"BS","country":"Bahamas","sms_price":0.0904,"whatsapp_price":0.0313,"popular":false},{"iso":"BH","country":"Bahrain","sms_price":0.0364,"whatsapp_price":0.0291,"popular":false},{"iso":"BD","country":"Bangladesh","sms_price":0.3869,"whatsapp_price":0.0313,"popular":false},{"iso":"BB","country":"Barbados","sms_price":0.2624,"whatsapp_price":0.0313,"popular":false},{"iso":"BY","country":"Belarus","sms_price":0.2521,"whatsapp_price":0.0412,"popular":false},{"iso":"BE","country":"Belgium","sms_price":0.105,"whatsapp_price":0.0371,"popular":false},{"iso":"BZ","country":"Belize","sms_price":0.2738,"whatsapp_price":0.0313,"popular":false},{"iso":"BJ","country":"Benin","sms_price":0.2985,"whatsapp_price":0.024,"popular":false},{"iso":"BM","country":"Bermuda","sms_price":0.2316,"whatsapp_price":0.0313,"popular":false},{"iso":"BT","country":"Bhutan","sms_price":0.4007,"whatsapp_price":0.0313,"popular":false},{"iso":"BO","country":"Bolivia","sms_price":0.2215,"whatsapp_price":0.0313,"popular":false},{"iso":"BA","country":"Bosnia and Herzegovina","sms_price":0.511,"whatsapp_price":0.0412,"popular":false},{"iso":"BW","country":"Botswana","sms_price":0.158,"whatsapp_price":0.024,"popular":false},{"iso":"BN","country":"Brunei","sms_price":0.065,"whatsapp_price":0.0313,"popular":false},{"iso":"BG","country":"Bulgaria","sms_price":0.1466,"whatsapp_price":0.0412,"popular":false},{"iso":"BF","country":"Burkina Faso","sms_price":0.2233,"whatsapp_price":0.024,"popular":false},{"iso":"BI","country":"Burundi","sms_price":0.463,"whatsapp_price":0.024,"popular":false},{"iso":"KH","country":"Cambodia","sms_price":0.4418,"whatsapp_price":0.0313,"popular":false},{"iso":"CM","country":"Cameroon","sms_price":0.2545,"whatsapp_price":0.024,"popular":false},{"iso":"CA","country":"Canada","sms_price":0.0083,"whatsapp_price":0.0083,"popular":false},{"iso":"CV","country":"Cape Verde","sms_price":0.2239,"whatsapp_price":0.024,"popular":false},{"iso":"KY","country":"Cayman Islands","sms_price":0.2476,"whatsapp_price":0.0313,"popular":false},{"iso":"CF","country":"Central Africa","sms_price":0.4518,"whatsapp_price":0.024,"popular":false},{"iso":"TD","country":"Chad","sms_price":0.3458,"whatsapp_price":0.024,"popular":false},{"iso":"CL","country":"Chile","sms_price":0.0742,"whatsapp_price":0.04,"popular":false},{"iso":"CN","country":"China","sms_price":0.1082,"whatsapp_price":0.0313,"popular":false},{"iso":"CO","country":"Colombia","sms_price":0.0592,"whatsapp_price":0.0208,"popular":false},{"iso":"KM","country":"Comoros","sms_price":0.4175,"whatsapp_price":0.024,"popular":false},{"iso":"CG","country":"Congo","sms_price":0.282,"whatsapp_price":0.024,"popular":false},{"iso":"CK","country":"Cook Islands","sms_price":0.1396,"whatsapp_price":0.0277,"popular":false},{"iso":"CR","country":"Costa Rica","sms_price":0.0623,"whatsapp_price":0.0313,"popular":false},{"iso":"HR","country":"Croatia","sms_price":0.1379,"whatsapp_price":0.0412,"popular":false},{"iso":"CY","country":"Cyprus","sms_price":0.0864,"whatsapp_price":0.0412,"popular":false},{"iso":"CZ","country":"Czech Republic","sms_price":0.0666,"whatsapp_price":0.0412,"popular":false},{"iso":"CD","country":"DR Congo","sms_price":0.2291,"whatsapp_price":0.024,"popular":false},{"iso":"DK","country":"Denmark","sms_price":0.0592,"whatsapp_price":0.0371,"popular":false},{"iso":"DJ","country":"Djibouti","sms_price":0.1624,"whatsapp_price":0.024,"popular":false},{"iso":"DM","country":"Dominica","sms_price":0.2288,"whatsapp_price":0.0313,"popular":false},{"iso":"DO","country":"Dominican Republic","sms_price":0.1014,"whatsapp_price":0.0313,"popular":false},{"iso":"TL","country":"East Timor","sms_price":0.203,"whatsapp_price":0.0313,"popular":false},{"iso":"EC","country":"Ecuador","sms_price":0.3135,"whatsapp_price":0.0313,"popular":false},{"iso":"EG","country":"Egypt","sms_price":0.3959,"whatsapp_price":0.0236,"popular":false},{"iso":"SV","country":"El Salvador","sms_price":0.2377,"whatsapp_price":0.0313,"popular":false},{"iso":"GQ","country":"Equatorial Guinea","sms_price":0.2705,"whatsapp_price":0.024,"popular":false},{"iso":"ER","country":"Eritrea","sms_price":0.1166,"whatsapp_price":0.024,"popular":false},{"iso":"EE","country":"Estonia","sms_price":0.0958,"whatsapp_price":0.0412,"popular":false},{"iso":"ET","country":"Ethiopia","sms_price":0.3425,"whatsapp_price":0.024,"popular":false},{"iso":"FK","country":"Falkland Islands","sms_price":0.1672,"whatsapp_price":0.0313,"popular":false},{"iso":"FO","country":"Faroe Islands","sms_price":0.0676,"whatsapp_price":0.0277,"popular":false},{"iso":"FJ","country":"Fiji","sms_price":0.22,"whatsapp_price":0.0313,"popular":false},{"iso":"FI","country":"Finland","sms_price":0.0861,"whatsapp_price":0.0371,"popular":false},{"iso":"FR","country":"France","sms_price":0.0798,"whatsapp_price":0.05,"popular":false},{"iso":"GF","country":"French Guiana","sms_price":0.1842,"whatsapp_price":0.0313,"popular":false},{"iso":"PF","country":"French Polynesia","sms_price":0.1797,"whatsapp_price":0.0277,"popular":false},{"iso":"GA","country":"Gabon","sms_price":0.3146,"whatsapp_price":0.024,"popular":false},{"iso":"GM","country":"Gambia","sms_price":0.2606,"whatsapp_price":0.024,"popular":false},{"iso":"GE","country":"Georgia","sms_price":0.1589,"whatsapp_price":0.0412,"popular":false},{"iso":"GH","country":"Ghana","sms_price":0.3741,"whatsapp_price":0.024,"popular":false},{"iso":"GI","country":"Gibraltar","sms_price":0.1091,"whatsapp_price":0.0371,"popular":false},{"iso":"GR","country":"Greece","sms_price":0.062,"whatsapp_price":0.0412,"popular":false},{"iso":"GL","country":"Greenland","sms_price":0.041,"whatsapp_price":0.0277,"popular":false},{"iso":"GD","country":"Grenada","sms_price":0.2462,"whatsapp_price":0.0313,"popular":false},{"iso":"GP","country":"Guadeloupe","sms_price":0.1866,"whatsapp_price":0.0313,"popular":false},{"iso":"GU","country":"Guam","sms_price":0.0687,"whatsapp_price":0.0234,"popular":false},{"iso":"GT","country":"Guatemala","sms_price":0.2498,"whatsapp_price":0.0313,"popular":false},{"iso":"GN","country":"Guinea","sms_price":0.2361,"whatsapp_price":0.024,"popular":false},{"iso":"GW","country":"Guinea-Bissau","sms_price":0.4722,"whatsapp_price":0.024,"popular":false},{"iso":"GY","country":"Guyana","sms_price":0.3366,"whatsapp_price":0.0313,"popular":false},{"iso":"HT","country":"Haiti","sms_price":0.2637,"whatsapp_price":0.0313,"popular":false},{"iso":"HN","country":"Honduras","sms_price":0.246,"whatsapp_price":0.0313,"popular":false},{"iso":"HU","country":"Hungary","sms_price":0.091,"whatsapp_price":0.0412,"popular":false},{"iso":"IS","country":"Iceland","sms_price":0.0661,"whatsapp_price":0.0371,"popular":false},{"iso":"ID","country":"Indonesia","sms_price":0.4414,"whatsapp_price":0.045,"popular":false},{"iso":"IQ","country":"Iraq","sms_price":0.4491,"whatsapp_price":0.0291,"popular":false},{"iso":"IE","country":"Ireland","sms_price":0.0735,"whatsapp_price":0.0371,"popular":false},{"iso":"IL","country":"Israel","sms_price":0.2575,"whatsapp_price":0.0253,"popular":false},{"iso":"IT","country":"Italy","sms_price":0.0927,"whatsapp_price":0.05,"popular":false},{"iso":"CI","country":"Ivory Coast","sms_price":0.4397,"whatsapp_price":0.024,"popular":false},{"iso":"JM","country":"Jamaica","sms_price":0.2819,"whatsapp_price":0.0313,"popular":false},{"iso":"JP","country":"Japan","sms_price":0.084,"whatsapp_price":0.0313,"popular":false},{"iso":"JO","country":"Jordan","sms_price":0.3884,"whatsapp_price":0.0291,"popular":false},{"iso":"KZ","country":"Kazakhstan","sms_price":0.3382,"whatsapp_price":0.0313,"popular":false},{"iso":"KE","country":"Kenya","sms_price":0.2336,"whatsapp_price":0.024,"popular":false},{"iso":"KI","country":"Kiribati","sms_price":0.1455,"whatsapp_price":0.0313,"popular":false},{"iso":"KR","country":"Korea Republic of","sms_price":0.0494,"whatsapp_price":0.0313,"popular":false},{"iso":"KW","country":"Kuwait","sms_price":0.3164,"whatsapp_price":0.0291,"popular":false},{"iso":"KG","country":"Kyrgyzstan","sms_price":0.3852,"whatsapp_price":0.0313,"popular":false},{"iso":"LA","country":"Laos PDR","sms_price":0.2868,"whatsapp_price":0.0313,"popular":false},{"iso":"LV","country":"Latvia","sms_price":0.0801,"whatsapp_price":0.0412,"popular":false},{"iso":"LB","country":"Lebanon","sms_price":0.3619,"whatsapp_price":0.0291,"popular":false},{"iso":"LS","country":"Lesotho","sms_price":0.4123,"whatsapp_price":0.024,"popular":false},{"iso":"LR","country":"Liberia","sms_price":0.2406,"whatsapp_price":0.024,"popular":false},{"iso":"LY","country":"Libya","sms_price":0.3984,"whatsapp_price":0.024,"popular":false},{"iso":"LI","country":"Liechtenstein","sms_price":0.0334,"whatsapp_price":0.0334,"popular":false},{"iso":"LT","country":"Lithuania","sms_price":0.0545,"whatsapp_price":0.0412,"popular":false},{"iso":"LU","country":"Luxembourg","sms_price":0.0818,"whatsapp_price":0.0371,"popular":false},{"iso":"MO","country":"Macao","sms_price":0.059,"whatsapp_price":0.0313,"popular":false},{"iso":"MK","country":"Macedonia","sms_price":0.2012,"whatsapp_price":0.0412,"popular":false},{"iso":"MG","country":"Madagascar","sms_price":0.5267,"whatsapp_price":0.024,"popular":false},{"iso":"MW","country":"Malawi","sms_price":0.3307,"whatsapp_price":0.024,"popular":false},{"iso":"MY","country":"Malaysia","sms_price":0.2594,"whatsapp_price":0.034,"popular":false},{"iso":"MV","country":"Maldives","sms_price":0.3581,"whatsapp_price":0.0313,"popular":false},{"iso":"ML","country":"Mali","sms_price":0.3288,"whatsapp_price":0.024,"popular":false},{"iso":"MT","country":"Malta","sms_price":0.065,"whatsapp_price":0.0371,"popular":false},{"iso":"MH","country":"Marshall Islands","sms_price":0.1589,"whatsapp_price":0.0313,"popular":false},{"iso":"MQ","country":"Martinique","sms_price":0.1897,"whatsapp_price":0.0313,"popular":false},{"iso":"MR","country":"Mauritania","sms_price":0.2583,"whatsapp_price":0.024,"popular":false},{"iso":"MU","country":"Mauritius","sms_price":0.1896,"whatsapp_price":0.024,"popular":false},{"iso":"MX","country":"Mexico","sms_price":0.1819,"whatsapp_price":0.0285,"popular":false},{"iso":"FM","country":"Micronesia","sms_price":0.0735,"whatsapp_price":0.0313,"popular":false},{"iso":"MD","country":"Moldova","sms_price":0.1304,"whatsapp_price":0.0412,"popular":false},{"iso":"MC","country":"Monaco","sms_price":0.1856,"whatsapp_price":0.0371,"popular":false},{"iso":"MN","country":"Mongolia","sms_price":0.279,"whatsapp_price":0.0313,"popular":false},{"iso":"ME","country":"Montenegro","sms_price":0.1721,"whatsapp_price":0.0412,"popular":false},{"iso":"MS","country":"Montserrat","sms_price":0.2371,"whatsapp_price":0.0313,"popular":false},{"iso":"MA","country":"Morocco","sms_price":0.2244,"whatsapp_price":0.024,"popular":false},{"iso":"MZ","country":"Mozambique","sms_price":0.417,"whatsapp_price":0.024,"popular":false},{"iso":"MM","country":"Myanmar","sms_price":0.3358,"whatsapp_price":0.0313,"popular":false},{"iso":"NA","country":"Namibia","sms_price":0.1041,"whatsapp_price":0.024,"popular":false},{"iso":"NP","country":"Nepal","sms_price":0.3022,"whatsapp_price":0.0313,"popular":false},{"iso":"NL","country":"Netherlands","sms_price":0.12091,"whatsapp_price":0.07,"popular":false},{"iso":"NC","country":"New Caledonia","sms_price":0.1761,"whatsapp_price":0.0313,"popular":false},{"iso":"NZ","country":"New Zealand","sms_price":0.105,"whatsapp_price":0.0313,"popular":false},{"iso":"NI","country":"Nicaragua","sms_price":0.1274,"whatsapp_price":0.0313,"popular":false},{"iso":"NE","country":"Niger","sms_price":0.3652,"whatsapp_price":0.024,"popular":false},{"iso":"NU","country":"Niue","sms_price":0.2335,"whatsapp_price":0.0277,"popular":false},{"iso":"NF","country":"Norfolk Island","sms_price":0.02817,"whatsapp_price":0.0277,"popular":false},{"iso":"NO","country":"Norway","sms_price":0.0651,"whatsapp_price":0.0371,"popular":false},{"iso":"OM","country":"Oman","sms_price":0.1707,"whatsapp_price":0.0291,"popular":false},{"iso":"PK","country":"Pakistan","sms_price":0.4734,"whatsapp_price":0.0254,"popular":false},{"iso":"PW","country":"Palau","sms_price":0.0998,"whatsapp_price":0.0313,"popular":false},{"iso":"PS","country":"Palestinian Territory","sms_price":0.3869,"whatsapp_price":0.0291,"popular":false},{"iso":"PA","country":"Panama","sms_price":0.1732,"whatsapp_price":0.0313,"popular":false},{"iso":"PG","country":"Papua New Guinea","sms_price":0.7544,"whatsapp_price":0.0313,"popular":false},{"iso":"PY","country":"Paraguay","sms_price":0.1208,"whatsapp_price":0.0313,"popular":false},{"iso":"PE","country":"Peru","sms_price":0.2476,"whatsapp_price":0.04,"popular":false},{"iso":"PH","country":"Philippines","sms_price":0.2001,"whatsapp_price":0.0313,"popular":false},{"iso":"PL","country":"Poland","sms_price":0.0431,"whatsapp_price":0.0412,"popular":false},{"iso":"PT","country":"Portugal","sms_price":0.0473,"whatsapp_price":0.0371,"popular":false},{"iso":"PR","country":"Puerto Rico","sms_price":0.054,"whatsapp_price":0.0313,"popular":false},{"iso":"QA","country":"Qatar","sms_price":0.2634,"whatsapp_price":0.0291,"popular":false},{"iso":"RE","country":"Reunion/Mayotte","sms_price":0.1911,"whatsapp_price":0.024,"popular":false},{"iso":"RO","country":"Romania","sms_price":0.0737,"whatsapp_price":0.0412,"popular":false},{"iso":"RU","country":"Russia","sms_price":0.7096,"whatsapp_price":0.06,"popular":false},{"iso":"RW","country":"Rwanda","sms_price":0.2627,"whatsapp_price":0.024,"popular":false},{"iso":"WS","country":"Samoa","sms_price":0.2369,"whatsapp_price":0.0313,"popular":false},{"iso":"SM","country":"San Marino","sms_price":0.1256,"whatsapp_price":0.0371,"popular":false},{"iso":"ST","country":"Sao Tome and Principe","sms_price":0.1307,"whatsapp_price":0.024,"popular":false},{"iso":"SA","country":"Saudi Arabia","sms_price":0.1949,"whatsapp_price":0.0307,"popular":false},{"iso":"SN","country":"Senegal","sms_price":0.4411,"whatsapp_price":0.024,"popular":false},{"iso":"RS","country":"Serbia","sms_price":0.4098,"whatsapp_price":0.0412,"popular":false},{"iso":"SC","country":"Seychelles","sms_price":0.3077,"whatsapp_price":0.024,"popular":false},{"iso":"SL","country":"Sierra Leone","sms_price":0.3898,"whatsapp_price":0.024,"popular":false},{"iso":"SK","country":"Slovakia","sms_price":0.0883,"whatsapp_price":0.0412,"popular":false},{"iso":"SI","country":"Slovenia","sms_price":0.1935,"whatsapp_price":0.0412,"popular":false},{"iso":"SB","country":"Solomon Islands","sms_price":0.1194,"whatsapp_price":0.0313,"popular":false},{"iso":"SO","country":"Somalia","sms_price":0.3482,"whatsapp_price":0.024,"popular":false},{"iso":"ZA","country":"South Africa","sms_price":0.1089,"whatsapp_price":0.0276,"popular":false},{"iso":"SS","country":"South Sudan","sms_price":0.2399,"whatsapp_price":0.024,"popular":false},{"iso":"ES","country":"Spain","sms_price":0.0875,"whatsapp_price":0.04,"popular":false},{"iso":"LK","country":"Sri Lanka","sms_price":0.3962,"whatsapp_price":0.0313,"popular":false},{"iso":"KN","country":"St Kitts and Nevis","sms_price":0.2272,"whatsapp_price":0.0313,"popular":false},{"iso":"LC","country":"St Lucia","sms_price":0.2343,"whatsapp_price":0.0313,"popular":false},{"iso":"PM","country":"St Pierre and Miquelon","sms_price":0.1507,"whatsapp_price":0.0313,"popular":false},{"iso":"VC","country":"St Vincent Grenadines","sms_price":0.2585,"whatsapp_price":0.0313,"popular":false},{"iso":"SD","country":"Sudan","sms_price":0.4749,"whatsapp_price":0.024,"popular":false},{"iso":"SR","country":"Suriname","sms_price":0.3172,"whatsapp_price":0.0313,"popular":false},{"iso":"SZ","country":"Swaziland","sms_price":0.2235,"whatsapp_price":0.024,"popular":false},{"iso":"SE","country":"Sweden","sms_price":0.0609,"whatsapp_price":0.0371,"popular":false},{"iso":"CH","country":"Switzerland","sms_price":0.0725,"whatsapp_price":0.0371,"popular":false},{"iso":"TW","country":"Taiwan","sms_price":0.0842,"whatsapp_price":0.0277,"popular":false},{"iso":"TJ","country":"Tajikistan","sms_price":0.4505,"whatsapp_price":0.0313,"popular":false},{"iso":"TZ","country":"Tanzania","sms_price":0.4336,"whatsapp_price":0.024,"popular":false},{"iso":"TH","country":"Thailand","sms_price":0.0305,"whatsapp_price":0.0305,"popular":false},{"iso":"TG","country":"Togo","sms_price":0.4416,"whatsapp_price":0.024,"popular":false},{"iso":"TO","country":"Tonga","sms_price":0.2177,"whatsapp_price":0.0313,"popular":false},{"iso":"TT","country":"Trinidad and Tobago","sms_price":0.2992,"whatsapp_price":0.0313,"popular":false},{"iso":"TN","country":"Tunisia","sms_price":0.5379,"whatsapp_price":0.024,"popular":false},{"iso":"TR","country":"Turkey","sms_price":0.0305,"whatsapp_price":0.0253,"popular":false},{"iso":"TM","country":"Turkmenistan","sms_price":0.3233,"whatsapp_price":0.0313,"popular":false},{"iso":"TC","country":"Turks and Caicos Islands","sms_price":0.2302,"whatsapp_price":0.0313,"popular":false},{"iso":"TV","country":"Tuvalu","sms_price":0.2959,"whatsapp_price":0.0313,"popular":false},{"iso":"UG","country":"Uganda","sms_price":0.3289,"whatsapp_price":0.024,"popular":false},{"iso":"UA","country":"Ukraine","sms_price":0.2268,"whatsapp_price":0.0412,"popular":false},{"iso":"AE","country":"United Arab Emirates","sms_price":0.1092,"whatsapp_price":0.0357,"popular":false},{"iso":"UY","country":"Uruguay","sms_price":0.0852,"whatsapp_price":0.0313,"popular":false},{"iso":"UZ","country":"Uzbekistan","sms_price":0.4571,"whatsapp_price":0.0313,"popular":false},{"iso":"VU","country":"Vanuatu","sms_price":0.2067,"whatsapp_price":0.0313,"popular":false},{"iso":"VE","country":"Venezuela","sms_price":0.1987,"whatsapp_price":0.0313,"popular":false},{"iso":"VN","country":"Vietnam","sms_price":0.2269,"whatsapp_price":0.0313,"popular":false},{"iso":"VG","country":"Virgin Islands, British","sms_price":0.308,"whatsapp_price":0.0313,"popular":false},{"iso":"VI","country":"Virgin Islands, U.S.","sms_price":0.1987,"whatsapp_price":0.0313,"popular":false},{"iso":"WF","country":"Wallis and Futuna","sms_price":0.11,"whatsapp_price":0.0277,"popular":false},{"iso":"YE","country":"Yemen","sms_price":0.2391,"whatsapp_price":0.0291,"popular":false},{"iso":"ZM","country":"Zambia","sms_price":0.3942,"whatsapp_price":0.024,"popular":false},{"iso":"ZW","country":"Zimbabwe","sms_price":0.2481,"whatsapp_price":0.024,"popular":false}];
  // ── Element refs ─────────────────────────────────────────
  var searchInput  = document.getElementById('ag-country-search');
  var dropdown     = document.getElementById('ag-dropdown');
  var volumeInput  = document.getElementById('ag-volume-input');
  var presetBtns   = document.querySelectorAll('.ag-preset-btn');
  var waSlider     = document.getElementById('ag-wa-slider');
  var waVal        = document.getElementById('ag-wa-val');
  var pumpSlider   = document.getElementById('ag-pump-slider');
  var pumpVal      = document.getElementById('ag-pump-val');
  var bioSlider    = document.getElementById('ag-bio-slider');
  var bioVal       = document.getElementById('ag-bio-val');
  var selectedCountry = null;
  // ── Helpers ──────────────────────────────────────────────
  function fmt(n) {
    if (n >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M';
    if (n >= 1000)    return '$' + Math.round(n).toLocaleString('en-US');
    return '$' + n.toFixed(0);
  }
  // ── Dropdown ─────────────────────────────────────────────
  function buildOption(item) {
    var div = document.createElement('div');
    div.className = 'ag-option';
    div.dataset.iso = item.iso;
    div.innerHTML = item.country;
    div.addEventListener('mousedown', function (e) {
      e.preventDefault();
      selectCountry(item);
    });
    return div;
  }
  function renderDropdown(query) {
    dropdown.innerHTML = '';
    var q = (query || '').toLowerCase();
    var popular = AG_DATA.filter(function (d) { return d.popular && (!q || d.country.toLowerCase().indexOf(q) !== -1); });
    var others  = AG_DATA.filter(function (d) { return !d.popular && (!q || d.country.toLowerCase().indexOf(q) !== -1); });
    if (!q) {
      popular.forEach(function (item) { dropdown.appendChild(buildOption(item)); });
      if (popular.length && others.length) {
        var hr = document.createElement('hr');
        hr.className = 'ag-divider';
        dropdown.appendChild(hr);
      }
      others.forEach(function (item) { dropdown.appendChild(buildOption(item)); });
    } else {
      popular.concat(others).forEach(function (item) { dropdown.appendChild(buildOption(item)); });
    }
    if (!dropdown.children.length) {
      dropdown.innerHTML = '<div class="ag-option" style="color:#8888aa">No results</div>';
    }
    dropdown.classList.add('open');
  }
  function selectCountry(item) {
    selectedCountry = item;
    searchInput.value = item.country;
    dropdown.classList.remove('open');
    recalculate();
  }
  searchInput.addEventListener('focus', function () { renderDropdown(''); });
  searchInput.addEventListener('input', function () { renderDropdown(searchInput.value); });
  searchInput.addEventListener('blur', function () {
    setTimeout(function () { dropdown.classList.remove('open'); }, 150);
  });
  // ── Volume presets ───────────────────────────────────────
  presetBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      volumeInput.value = btn.dataset.val;
      presetBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      recalculate();
    });
  });
  volumeInput.addEventListener('input', function () {
    var val = parseInt(volumeInput.value, 10);
    presetBtns.forEach(function (b) {
      b.classList.toggle('active', parseInt(b.dataset.val, 10) === val);
    });
    recalculate();
  });
  // ── Slider ───────────────────────────────────────────────
  function updateSliderTrack() {
    var pct = ((waSlider.value - waSlider.min) / (waSlider.max - waSlider.min)) * 100;
    waSlider.style.setProperty('--val', pct + '%');
    waVal.textContent = waSlider.value + '%';
  }
  function updatePumpSliderTrack() {
    var pct = ((pumpSlider.value - pumpSlider.min) / (pumpSlider.max - pumpSlider.min)) * 100;
    pumpSlider.style.setProperty('--val', pct + '%');
    pumpVal.textContent = pumpSlider.value + '%';
  }
  function updateBioSliderTrack() {
    var pct = ((bioSlider.value - bioSlider.min) / (bioSlider.max - bioSlider.min)) * 100;
    bioSlider.style.setProperty('--val', pct + '%');
    bioVal.textContent = bioSlider.value + '%';
  }
  waSlider.addEventListener('input', function () { updateSliderTrack(); recalculate(); });
  pumpSlider.addEventListener('input', function () { updatePumpSliderTrack(); recalculate(); });
  bioSlider.addEventListener('input', function () { updateBioSliderTrack(); recalculate(); });
  updateSliderTrack();
  updatePumpSliderTrack();
  updateBioSliderTrack();
  // ── Calculation ──────────────────────────────────────────
  function recalculate() {
    if (!selectedCountry) return;
    var volume   = Math.max(0, parseInt(volumeInput.value, 10) || 0);
    var waRate   = parseInt(waSlider.value, 10) / 100;
    var pumpRate = parseInt(pumpSlider.value, 10) / 100;
    var bioRate  = parseInt(bioSlider.value, 10) / 100;
    var fraudBlocked = pumpRate * 0.20;
    var effectiveVolume = volume * (1 - fraudBlocked);
    var smsPx    = selectedCountry.sms_price;
    var waPx     = selectedCountry.whatsapp_price;
    var smsCost      = volume * smsPx;
    var blendedCost  = (effectiveVolume * waRate * waPx) + (effectiveVolume * (1 - waRate) * smsPx);
    var savings      = smsCost - blendedCost;
    var savingsPct   = smsCost > 0 ? (savings / smsCost) * 100 : 0;
    var annualSavings = savings * 12;
    var projectedCost = blendedCost * (1 - bioRate);
    var projectedSavings = smsCost - projectedCost;
    var bioPct = Math.round(bioRate * 100);
    document.getElementById('ag-out-sms').textContent      = fmt(smsCost) + '/mo';
    document.getElementById('ag-out-wa').textContent       = fmt(blendedCost) + '/mo';
    document.getElementById('ag-out-monthly-sub').textContent = 'saving ' + fmt(savings) + ' / mo';
    document.getElementById('ag-out-annual').textContent   = fmt(annualSavings);
    document.getElementById('ag-out-annual-pct').textContent = savingsPct.toFixed(0) + '% savings vs. SMS-only';
    document.getElementById('ag-out-projected').textContent = fmt(projectedCost) + '/mo';
    document.getElementById('ag-out-projected-sub').textContent = 'After ' + bioPct + '% biometric adoption';
    document.getElementById('ag-out-projected-saving-sub').textContent = 'saving ' + fmt(projectedSavings) + ' / mo';
    document.getElementById('ag-savings-bar').style.width  = Math.min(savingsPct, 100).toFixed(1) + '%';
    document.getElementById('ag-bar-pct-label').textContent = savingsPct.toFixed(0) + '% saved';
  }
  // ── Init ─────────────────────────────────────────────────
  var hk = AG_DATA.filter(function (d) { return d.iso === 'HK'; })[0];
  if (hk) selectCountry(hk);
})();`,
];

interface Props {
  locale: string;
}

export default function ReduceSmsOtpCostPage(_props: Props) {
  return (
    <>
      <div className="featurespage__hero_v2 featurespage__hero_bg mt-80 enterprise-hero">
          <div className="features-hero-wrapper-new">
            <div className="split-content features-hero-left">
              <h1 className="title features-hero-v2 text-white">Cut SMS OTP Costs<br />by <span className="text-span-50" >50–90%</span></h1>
              <p className="features-hero-description text-white">Immediate savings with WhatsApp OTP. Long-term savings with biometric login. Both live in days.</p>
              <div className="features-hero-cta-wrapper">
                <a href="#Saving-Calculator" className="button-primary feature-hero-btn-v2 plausible-event-name--signup-calculator w-button">Calculate My Savings</a>
                <a href="https://portal.authgear.com/?utm_source=solutions-enterprise-sso&utm_medium=link&utm_campaign=sign-up" className="features-sign-up-cta link-white plausible-event-name--signup-hero">Get Started Free →</a>
              </div>
              <div className="banner-efficiency">
                <div className="w-layout-vflex banner-efficiency-content">
                  <div className="banner-efficiency-number">87%</div>
                  <div className="banner-efficiency-text">Average savings <br />worldwide</div>
                </div>
                <div className="w-layout-vflex banner-efficiency-content">
                  <div className="banner-efficiency-number">219</div>
                  <div className="banner-efficiency-text">Countries <br />covered</div>
                </div>
                <div className="w-layout-vflex banner-efficiency-content">
                  <div className="banner-efficiency-number">0</div>
                  <div className="banner-efficiency-text">Fraud surprise <br />bills</div>
                </div>
              </div>
            </div><img src="/images/solutions_sms-cost2x.webp" sizes="(max-width: 479px) 100vw, 624px" width="624" alt="" srcSet="/images/solutions_sms-cost2x-p-500.webp 500w, /images/solutions_sms-cost2x-p-800.webp 800w, /images/solutions_sms-cost2x-p-1080.webp 1080w, /images/solutions_sms-cost2x.webp 1248w" className="image features-hero-image-v2" />
          </div>
        </div>
        <div>
          <div className="container-default">
            <div className="container-default-inner px-0">
              <div className="top-content flex-column align-left mobile-center">
                <div className="seection-title-label">Why Authgear</div>
                <h2 className="top-content-title ibm-plex-sans color-2e2e2e size-40 mobile-center">The complete solution that scales<br /> with you</h2>
                <div className="top-content-description ibm-plex-sans mobile-center">Not just cheaper OTPs: a full identity platform that cuts costs while improving security and UX.</div>
              </div>
              <div className="_3-card-grid">
                <div className="svg-card">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M23.6872 6.27344H33.6162C34.4104 6.27344 34.9658 7.05886 34.7012 7.80762L30.3102 18.1131C30.0456 18.8618 30.601 19.6473 31.3952 19.6473H40.7706C41.7596 19.6473 42.2878 20.8124 41.6362 21.5562L23.8346 41.8752C23.0324 42.7908 21.5436 41.9966 21.8572 40.8204L25.2508 28.0944C25.4456 27.3638 24.895 26.6472 24.1388 26.6472H16.2806C15.4807 26.6472 14.9248 25.851 15.2003 25.1002L18.9036 16.064" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M10.2452 42.24L12.7744 35.9232H6.07422L8.77252 29.6406" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="svg-card-content-container">
                    <div className="svg-card-content-title ibm-plex-sans color-2b2b2b">Immediate Cost Reduction of Up to 90%</div>
                    <div className="svg-card-content-description m-sm">WhatsApp OTP with automatic SMS fallback. WhatsApp costs a fraction of SMS. Users with WhatsApp get their code there. Everyone else gets SMS. No friction, instant savings.</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path opacity="0.4" fillRule="evenodd" clipRule="evenodd" d="M28.6831 27.0472C27.9011 26.2652 26.6371 26.2672 25.8551 27.0452L20.0411 32.8512L7.413 20.2272C6.633 19.4451 5.367 19.4451 4.585 20.2272C3.805 21.0072 3.805 22.2732 4.585 23.0552L18.625 37.0932C19.407 37.8752 20.6711 37.8732 21.4531 37.0952L27.2691 31.2872L37.9031 41.9152C38.2951 42.3052 38.8071 42.5012 39.3171 42.5012C39.8291 42.5012 40.3431 42.3052 40.7331 41.9152C41.5131 41.1332 41.5131 39.8652 40.7311 39.0872L28.6831 27.0472Z" fill="#0043E0"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M43.4351 16.526C42.6631 15.734 41.3991 15.716 40.6051 16.486L37.7131 19.304V7.5C37.7131 6.396 36.8171 5.5 35.7131 5.5C34.6091 5.5 33.7131 6.396 33.7131 7.5V19.3L30.8251 16.486C30.0311 15.716 28.7691 15.734 27.9951 16.526C27.2271 17.318 27.2431 18.582 28.0331 19.354L34.2971 25.452L34.3031 25.456L34.3191 25.474C34.3791 25.532 34.4571 25.554 34.5211 25.604C34.6611 25.71 34.7951 25.82 34.9591 25.888C35.1891 25.982 35.4331 26.028 35.6771 26.032C35.6891 26.032 35.7011 26.04 35.7131 26.04C35.9711 26.04 36.2311 25.986 36.4731 25.886C36.5991 25.836 36.6951 25.746 36.8051 25.672C36.9071 25.604 37.0211 25.562 37.1111 25.474L43.3971 19.354C44.1871 18.582 44.2051 17.318 43.4351 16.526Z" fill="#31B7FF"></path>
                      </svg></div>
                  </div>
                  <div className="svg-card-content-container">
                    <div className="svg-card-content-title ibm-plex-sans color-2b2b2b">Costs Shrink Every Month with Biometrics</div>
                    <div className="svg-card-content-description m-sm">Mobile biometric login and passkeys mean returning users authenticate with face or fingerprint. No OTP sent. The longer your users stay, the fewer OTPs you send.</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M38.6435 27.2568C38.6435 39.4832 23.9955 43.918 23.9955 43.918C23.9955 43.918 9.34947 39.4852 9.34947 27.2568C9.34947 15.0284 8.81547 14.073 9.99147 12.8976C11.1695 11.7203 22.0755 7.91797 23.9955 7.91797C25.9175 7.91797 36.8215 11.7106 37.9995 12.8976C39.1755 14.0827 38.6435 15.0304 38.6435 27.2568Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M26.4163 25.0042C27.4263 24.2588 28.0883 23.0718 28.0883 21.7212C28.0883 19.46 26.2563 17.6289 23.9963 17.6289C21.7363 17.6289 19.9043 19.46 19.9043 21.7212C19.9043 23.0718 20.5663 24.2588 21.5763 25.0042L20.3103 28.8162C19.9363 29.939 20.7703 31.0968 21.9543 31.0968H26.0363C27.2203 31.0968 28.0563 29.939 27.6823 28.8162L26.4163 25.0042Z" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="svg-card-content-container">
                    <div className="svg-card-content-title ibm-plex-sans color-2b2b2b">No Surprise Fraud Bills</div>
                    <div className="svg-card-content-description m-sm">SMS pumping attacks can generate thousands of fraudulent OTPs overnight. Authgear's device fingerprinting and risk-scoring block them before they hit your bill.</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M27.3176 41.0686C22.764 42.1234 17.9537 40.9538 14.3906 37.957" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M33.8008 15.3867C37.6674 18.8057 39.448 23.9994 38.5956 29.0102" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M9.63281 22.6094C10.9347 17.9217 14.4821 14.1699 19.0337 12.5703" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M29.3269 11.7367C29.3269 14.6011 27.0035 16.9246 24.1391 16.9246C21.2727 16.9246 18.9492 14.6011 18.9492 11.7367C18.9492 8.87034 21.2727 6.54688 24.1391 6.54688" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M11.1898 39.0554C14.0543 39.0554 16.3777 36.732 16.3777 33.8656C16.3777 30.9992 14.0543 28.6758 11.1898 28.6758C8.32346 28.6758 6 30.9992 6 33.8656" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M36.8109 39.0554C33.9447 39.0554 31.6211 36.732 31.6211 33.8656C31.6211 30.9992 33.9447 28.6758 36.8109 28.6758C39.6755 28.6758 41.9989 30.9992 41.9989 33.8656" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="svg-card-content-container">
                    <div className="svg-card-content-title ibm-plex-sans color-2b2b2b">Single Sign-On Across Your Apps</div>
                    <div className="svg-card-content-description m-sm">Users log in once and stay logged in across all your properties. Launch companion apps without login friction. One identity, one consent, one customer view.</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M24.5 27.2031V31.2031" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M16.2969 19.3742V14.0802C16.3689 9.63422 19.9689 6.07222 24.3968 6.01622C28.9328 5.96222 32.6588 9.58222 32.7148 14.1182V19.3742" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M24.4996 42.015C17.4197 42.015 11.6797 36.275 11.6797 29.195C11.6797 22.115 17.4197 16.375 24.4996 16.375C31.5796 16.375 37.3196 22.115 37.3196 29.195C37.3196 33.6296 35.0678 37.5384 31.6454 39.8404" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="svg-card-content-container">
                    <div className="svg-card-content-title ibm-plex-sans color-2b2b2b">Enterprise-Grade Security Out of the Box</div>
                    <div className="svg-card-content-description m-sm">User audit logs, account lockout, rate limiting, breach detection, and OWASP best practices, already built and maintained by us. Your team ships features instead.</div>
                  </div>
                </div>
                <div className="svg-card svg-card-alternative">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M24 42C14.0582 42 6 33.9418 6 24C6 14.0582 14.0582 6 24 6C33.9418 6 42 14.0582 42 24C42 33.9418 33.9418 42 24 42Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M34.7668 38.1958C34.7668 38.1958 30.4116 26.1912 41.9998 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M40.2257 16.1764C38.3537 16.046 34.9445 16.6065 29.9433 20.2025C23.9887 24.4915 22.6207 15.4272 24.5121 6.02637" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M23.1907 42.0003C23.1907 42.0003 24.4167 36.9273 20.9081 34.1835C17.3996 31.4415 14.7784 31.6421 14.3426 28.1549C13.9067 24.6677 18.2111 24.0821 15.0626 18.8922C12.9843 15.4654 10.6375 13.3209 10.725 11.9023" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="svg-card-content-container">
                    <div className="svg-card-content-title ibm-plex-sans color-white">Works in 219 Countries</div>
                    <div className="svg-card-content-description m-sm color-cee9ff">WhatsApp has 2+ billion users globally. 215 of 219 markets show savings, from 33% in Germany to 94% in Egypt and 93% in Nigeria. Your global expansion doesn't have to cost more.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="Saving-Calculator">
          <div className="container-default">
            <div className="container-default-inner px-0 gap-0">
              <div className="top-content flex-column align-left mobile-center">
                <div className="seection-title-label">Savings Calculator</div>
                <h2 className="top-content-title ibm-plex-sans color-2e2e2e size-40 mobile-center">See your savings in real time</h2>
                <div className="top-content-description ibm-plex-sans mobile-center">Adjust the inputs below to calculate your projected cost reduction using real Twilio SMS pricing data.</div>
              </div>
              <div className="w-embed w-script">
                
                
                
                <div className="ag-calc">
                  <div className="ag-card">
                    <div className="ag-body">
                      
                      <div className="ag-inputs">
                        <p className="ag-col-title">Your Details</p>
                        <div className="ag-form-group">
                          <label className="ag-label" htmlFor="ag-country-search">Country / Market</label>
                          <div className="ag-country-wrap" id="ag-country-wrap">
                            <input type="text" id="ag-country-search" className="ag-country-input" placeholder="Search country…" autoComplete="off" aria-label="Search country" />
                            <div className="ag-dropdown" id="ag-dropdown"></div>
                          </div>
                        </div>
                        <div className="ag-form-group">
                          <label className="ag-label" htmlFor="ag-volume-input">Monthly OTP Volume</label>
                          <div className="ag-volume-wrap">
                            <input type="number" id="ag-volume-input" className="ag-volume-input" defaultValue="100000" min={1} max={100000000} />
                            <span className="ag-volume-unit">OTPs / mo</span>
                          </div>
                          <div className="ag-presets">
                            <button className="ag-preset-btn plausible-event-name--calculator-preset">10K</button>
                            <button className="ag-preset-btn plausible-event-name--calculator-preset active">100K</button>
                            <button className="ag-preset-btn plausible-event-name--calculator-preset">500K</button>
                            <button className="ag-preset-btn plausible-event-name--calculator-preset">1M</button>
                          </div>
                        </div>
                        <div className="ag-form-group">
                          <label className="ag-label">WhatsApp Adoption Rate</label>
                          <div className="ag-slider-wrap">
                            <input type="range" id="ag-wa-slider" className="ag-slider" min={50} max={100} defaultValue="90" />
                            <span className="ag-slider-val" id="ag-wa-val">90%</span>
                          </div>
                          <p className="ag-hint">Users without WhatsApp automatically receive SMS fallback</p>
                        </div>
                        <div className="ag-form-group">
                          <label className="ag-label">SMS Pumping Attack Rate</label>
                          <div className="ag-slider-wrap">
                            <input type="range" id="ag-pump-slider" className="ag-slider" min={0} max={50} defaultValue="10" />
                            <span className="ag-slider-val" id="ag-pump-val">10%</span>
                          </div>
                          <p className="ag-hint">Estimated % of your SMS volume from fraudulent attacks. Authgear's Fraud Protection blocks ~20% of these.</p>
                        </div>
                        <div className="ag-form-group">
                          <label className="ag-label">Biometric Login Adoption Rate in 6 month+</label>
                          <div className="ag-slider-wrap">
                            <input type="range" id="ag-bio-slider" className="ag-slider" min={0} max={100} defaultValue="70" />
                            <span className="ag-slider-val" id="ag-bio-val">70%</span>
                          </div>
                          <p className="ag-hint">Returning users who switch to biometric / passkey login — no OTP sent</p>
                        </div>
                      </div>
                      
                      <div className="ag-outputs">
                        <p className="ag-col-title">Your Projected Savings</p>
                        <div className="ag-annual-box">
                          <div className="ag-annual-label">Annual Savings</div>
                          <div className="ag-annual-val" id="ag-out-annual">$0</div>
                          <div className="ag-annual-sub" id="ag-out-annual-pct">—% savings vs. SMS-only</div>
                        </div>
                        <div className="ag-bar-wrap">
                          <div className="ag-bar-labels">
                            <span>0%</span>
                            <span id="ag-bar-pct-label">0% saved</span>
                            <span>100%</span>
                          </div>
                          <div className="ag-bar-track">
                            <div className="ag-bar-fill" id="ag-savings-bar"></div>
                          </div>
                        </div>
                        <div className="ag-output-row">
                          <span className="ag-output-label">Current SMS cost / mo</span>
                          <span className="ag-output-val" id="ag-out-sms">$0</span>
                        </div>
                        <div className="ag-output-row">
                          <span className="ag-output-label">With Authgear / mo</span>
                          <div style={{textAlign: "right"}}>
                            <div className="ag-output-val" id="ag-out-wa">$0</div>
                            <div style={{fontSize: "20px", fontWeight: "700", color: "#27ae60"}} id="ag-out-monthly-sub">saving $0 / mo</div>
                          </div>
                        </div>
                        <div className="ag-output-row">
                          <span className="ag-output-label">
                            Month 6+ Cost<br />
                            <span style={{fontSize: "11px", fontWeight: "400", color: "#8888aa"}} id="ag-out-projected-sub">After 70% biometric adoption</span>
                          </span>
                          <div style={{textAlign: "right"}}>
                            <div className="ag-output-val" id="ag-out-projected">$0 / mo</div>
                            <div style={{fontSize: "20px", fontWeight: "700", color: "#27ae60"}} id="ag-out-projected-saving-sub">saving $0 / mo</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ag-cta-row">
                      <a className="ag-cta-btn plausible-event-name--signup-calculator" href="https://portal.authgear.com">
                        Start Saving Now — Free to Get Started →
                      </a>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="section-17">
          <div className="container-default">
            <div className="container-default-inner px-0">
              <div className="top-content flex-column align-left mobile-center">
                <div className="seection-title-label">The Problem</div>
                <h2 className="top-content-title ibm-plex-sans color-2e2e2e size-40 mobile-center">Your current options fall short</h2>
                <div className="top-content-description ibm-plex-sans mobile-center">SMS OTP is a tax on growth. Every new user costs you money. <br />The obvious fixes don't actually solve it.</div>
              </div>
              <div className="_3-card-grid">
                <div className="svg-card">
                  <div className="svg-icon-box-red-48">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M23.7363 32.3334C28.6551 34.2994 34.4831 33.297 38.4657 29.3146C42.4617 25.3184 43.4641 19.4632 41.4593 14.5579L34.6599 21.3574C34.0461 21.9692 33.1679 22.2374 32.3171 22.0702L29.1077 21.435C28.0763 21.231 27.2681 20.4248 27.0621 19.3933L26.4211 16.1723C26.2501 15.3195 26.5181 14.4394 27.1321 13.8256L33.9295 7.02814C31.1983 5.92248 28.1825 5.73562 25.3563 6.47218" stroke="#BE2A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M19.1736 10.0234C15.1911 14.0059 14.1887 19.834 16.1663 24.7664L8.03039 32.9024C5.88569 35.049 5.93425 38.5768 8.22273 40.6556C10.3733 42.6098 13.7574 42.3146 15.8127 40.2612L19.7748 36.2982" stroke="#FF6868" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="svg-card-content-container">
                    <div className="svg-card-content-title ibm-plex-sans color-2b2b2b">Build In-House</div>
                    <div className="svg-card-content-description m-sm">Full control, but expensive engineering time and ongoing maintenance. Biometrics and passkeys are hard to build right, and the spec keeps changing.</div>
                  </div>
                  <div className="div-block-35">
                    <div className="svg-card-label-red">Costly & slow</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="svg-icon-box-red-48">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M37.7477 22.9774V13.235C37.7477 9.24 34.5077 6 30.5127 6H19.4811C15.4861 6 12.2461 9.24 12.2461 13.237L12.2481 34.765C12.2481 38.76 15.4881 42 19.4831 42H30.5127C34.5097 42 37.7497 38.76 37.7497 34.763L37.7493 29.381" stroke="#BE2A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M25.0004 34.6612V34.5648M25.0004 34.0586C24.724 34.0586 24.5 34.2826 24.5 34.5582C24.5 34.8346 24.724 35.0586 25.0004 35.0586C25.277 35.0586 25.501 34.8346 25.501 34.5582C25.501 34.2826 25.277 34.0586 25.0004 34.0586Z" stroke="#FF6868" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="svg-card-content-container">
                    <div className="svg-card-content-title ibm-plex-sans color-2b2b2b">Switch to a Cheaper SMS Gateway</div>
                    <div className="svg-card-content-description m-sm">Simple swap of API keys, but you still pay per OTP. Costs still scale linearly with users. No fraud protection, and cheaper gateways often have worse delivery rates.</div>
                  </div>
                  <div className="div-block-35">
                    <div className="svg-card-label-red">Still scales with growth</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="svg-icon-box-red-48">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.8357 10.8184C11.6524 10.9573 12.2018 11.732 12.0629 12.5487C11.9667 13.114 11.958 14.0794 11.9902 16.1462C11.9952 16.4688 12.0011 16.8147 12.0073 17.1859C12.04 19.1164 12.0841 21.7296 12.0841 25.296C12.0841 30.7332 15.3173 34.504 18.7817 36.9992C20.5049 38.2402 22.2377 39.1274 23.5443 39.7044C24.1953 39.992 24.7351 40.2 25.1075 40.3348C25.1487 40.3498 25.1877 40.3638 25.2247 40.3768C25.3285 40.34 25.4491 40.2958 25.5849 40.2446C26.1101 40.0462 26.8591 39.7406 27.7353 39.3176C29.4971 38.4674 31.7279 37.165 33.6919 35.343C34.2991 34.7796 35.2483 34.8152 35.8117 35.4224C36.3751 36.0298 36.3395 36.9788 35.7323 37.5422C33.4781 39.6334 30.9661 41.0894 29.0393 42.0194C28.0713 42.4866 27.2397 42.8264 26.6451 43.051C26.3477 43.1634 26.1089 43.2472 25.9411 43.3038C25.8573 43.3322 25.7911 43.3538 25.7441 43.3688L25.6885 43.3864L25.6719 43.3916L25.6663 43.3934L25.6643 43.394C25.6641 43.394 25.6629 43.3944 25.2261 41.9594C24.7919 43.3952 24.7913 43.395 24.7907 43.3948L24.7849 43.3932L24.7725 43.3894L24.7323 43.3768C24.6985 43.366 24.6513 43.3508 24.5913 43.331C24.4713 43.2914 24.3005 43.2334 24.0863 43.1558C23.6579 43.0006 23.0537 42.7672 22.3323 42.4486C20.8935 41.8132 18.9658 40.8288 17.0285 39.4334C13.1719 36.656 9.08411 32.0952 9.08411 25.296C9.08411 21.757 9.04039 19.1697 9.00779 17.2397C9.00149 16.8669 8.99561 16.5187 8.99053 16.1929C8.96023 14.2462 8.95155 12.9494 9.10537 12.0455C9.24433 11.2288 10.0191 10.6794 10.8357 10.8184ZM25.2261 41.9594L24.7907 43.3948C25.0747 43.4808 25.3805 43.4804 25.6643 43.394L25.2261 41.9594Z" fill="#FF6868"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.94715 8.68152C7.53295 8.09574 8.48269 8.09574 9.06847 8.68152L38.3084 37.9214C38.8942 38.5072 38.8942 39.457 38.3084 40.0428C37.7226 40.6286 36.7728 40.6286 36.187 40.0428L6.94715 10.8028C6.36137 10.2171 6.36137 9.26732 6.94715 8.68152Z" fill="#FF6868"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M22.8445 8.00752C21.5897 8.36818 20.0635 8.86694 18.5501 9.41016C17.7704 9.69004 16.9114 9.28482 16.6316 8.5051C16.3517 7.72538 16.7569 6.86642 17.5366 6.58654C19.0972 6.02642 20.6861 5.50646 22.0157 5.12426C22.6795 4.93344 23.2925 4.773 23.8125 4.65896C24.2975 4.55254 24.8113 4.46094 25.2253 4.46094C25.6425 4.46094 26.1621 4.55362 26.6533 4.66118C27.1797 4.77646 27.8009 4.93846 28.4735 5.13062C29.8211 5.51552 31.4311 6.03724 33.0089 6.59338C34.5861 7.1492 36.1525 7.74696 37.4107 8.28648C38.0381 8.55552 38.6071 8.81784 39.0695 9.05964C39.4777 9.27308 39.9689 9.55306 40.2977 9.88156L40.3077 9.8915C40.7509 10.3426 41.0901 10.8509 41.2799 11.5974C41.4429 12.2394 41.4819 13.016 41.4881 13.9731C41.4931 14.7476 41.4749 15.7414 41.4515 17.0156C41.4453 17.3547 41.4387 17.7135 41.4321 18.0934C41.4005 19.9142 41.3673 22.2552 41.3673 25.298C41.3673 26.5544 41.2293 27.754 40.9667 28.8866C40.7795 29.6936 39.9735 30.196 39.1665 30.009C38.3595 29.8218 37.8571 29.016 38.0441 28.209C38.2535 27.3058 38.3673 26.3338 38.3673 25.298C38.3673 22.2322 38.4007 19.8726 38.4325 18.0413C38.4395 17.6471 38.4461 17.2791 38.4525 16.935C38.4757 15.669 38.4929 14.7261 38.4881 13.9923C38.4821 13.0355 38.4361 12.5879 38.3723 12.3362C38.3363 12.1945 38.3073 12.1383 38.1821 12.009C38.1841 12.0116 38.1785 12.0079 38.1637 11.9981C38.1165 11.9666 37.9747 11.8725 37.6793 11.7181C37.3115 11.5257 36.8195 11.2971 36.2285 11.0437C35.0497 10.5382 33.5487 9.9645 32.0117 9.4228C30.4757 8.88142 28.9251 8.37956 27.6497 8.01526C27.0109 7.83282 26.4549 7.68884 26.0115 7.59174C25.7899 7.54322 25.6073 7.5088 25.4633 7.48704C25.3919 7.47626 25.3353 7.46938 25.2921 7.46534C25.2709 7.46336 25.2545 7.46222 25.2427 7.46158C25.2313 7.46098 25.2257 7.46094 25.2253 7.46094C25.2251 7.46094 25.2199 7.46098 25.2091 7.46154C25.1977 7.46216 25.1817 7.46326 25.1611 7.4652C25.1189 7.46914 25.0635 7.47584 24.9935 7.48642C24.8523 7.50772 24.6729 7.54152 24.4553 7.58928C24.0195 7.68486 23.4729 7.8269 22.8445 8.00752Z" fill="#BE2A2A"></path>
                      </svg></div>
                  </div>
                  <div className="svg-card-content-container">
                    <div className="svg-card-content-title ibm-plex-sans color-2b2b2b">Add a Security Product</div>
                    <div className="svg-card-content-description m-sm">Bot and fraud protection, but high cost, separate from auth, and more integration work. Often overkill for SMS abuse specifically.</div>
                  </div>
                  <div className="div-block-35">
                    <div className="svg-card-label-red">High cost, more complexity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="bg-0e0f28">
          <div className="container-default flex-center gap20 padding48 w-container">
            <div className="w-layout-vflex flex-block-57 color-white">
              <p className="paragraph-large home-hero text-afb7ff ibm-plex-sans new-kv-desc no-margin text-center trused-by">TRUSTED BY</p>
              <h2 className="top-content-title ibm-plex-sans trusted-by-title size-40 mobile-center">Chosen by enterprises across industries</h2>
              <div className="tryst-by-description ibm-plex-sans mobile-center">From transport infrastructure to global hospitality. Teams that can't afford downtime or surprise bills rely on Authgear.</div>
            </div>
            <div className="images-wrapper home-hero">
              <div className="image-wrapper home-hero">
                <div className="home-lottie" data-animation-type="lottie" data-src="../documents/data.json" data-loop="1" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="7.74107409244067"></div><img src="/images/hero-mobile.png" alt="" className="image home-hero sm" />
              </div>
            </div>
            <div className="w-layout-hflex flex-block-85">
              <div className="logo-marquee-viewport">
                <div className="logo-marquee-track">
              <div className="w-layout-hflex logos-container"><img loading="lazy" src="/images/logo-CIMIC2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-HKL2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-hkpc2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-K112x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-MTR2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-outback2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-cornerstone2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-place2x.png" alt="" className="logo" /></div>
              <div className="w-layout-hflex logos-container"><img loading="lazy" src="/images/logo-CIMIC2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-HKL2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-hkpc2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-K112x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-MTR2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-outback2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-cornerstone2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-place2x.png" alt="" className="logo" /></div>
                </div>
              <a href="/customer-stories" target="_blank" className="link-block-7 w-inline-block">
                <div>Read customer story</div><img loading="lazy" src="/images/logo-read-story-arrow.svg" alt="" />
              </a>
              </div>
            </div>
            <div className="w-layout-blockcontainer container-1469 w-container"></div>
            <div className="w-layout-blockcontainer container-1469 left w-container"></div>
          </div>
        </section>
        <div className="footer-form-section form__bg-dark">
          <div className="container-default">
            <div className="container-default-inner px-0">
              <div className="_2-block-flex footer-form">
                <div className="_2-block-flex-content footer-form">
                  <div className="_2-block-flex-content-text-wrap footer-form">
                    <h2 className="form-heading color-white footer-form">Ready to cut your SMS costs?</h2>
                    <div className="footerform__divider-sm"></div>
                    <div className="color-white footer-get-started-text">Get started today! Free trials available.</div>
                  </div>
                </div>
                <div className="_2-block-flex-image footer-form">
                  <div id="wf-form-Authgear-Talk-with-Us" className="form-block w-form">
                    <form id="wf-form-Authgear-Talk-with-Us-2" name="wf-form-Authgear-Talk-with-Us-2" method="post" className="contact-form">
                      <div className="margin-vertical margin-small"><label htmlFor="Name-5" className="getdemo-label">Full Name<span className="text-span-7">*</span></label><input className="getdemo-field w-input" maxLength={256} name="Name" placeholder="" type="text" id="Name-5" required /></div>
                      <div className="margin-vertical margin-small"><label htmlFor="Email-6" className="getdemo-label">Work Email<span className="text-span-8">*</span></label><input className="getdemo-field w-input" maxLength={256} name="Email" placeholder="" type="email" id="Email-6" required /></div>
                      <div className="margin-vertical margin-small"><label htmlFor="Phone-3" className="getdemo-label">Phone Number<span className="text-span-9">*</span></label><input className="getdemo-field w-input" maxLength={256} name="Phone" placeholder="" type="tel" id="Phone-3" required /><input className="text-field w-input" maxLength={256} name="Country" placeholder="" type="text" id="Country-4" required />
                        <div className="html-embed w-embed"><span id="valid-msg" className="hide">Valid number</span>
                          <span id="error-msg" className="hide"></span>
                        </div>
                      </div>
                      <div className="margin-vertical margin-small"><label htmlFor="Company-5" className="getdemo-label">Company Name<span className="text-span-10">*</span></label><input className="getdemo-field w-input" maxLength={256} name="Company" placeholder="" type="text" id="Company-5" required /></div>
                      <div className="margin-vertical margin-small"><label htmlFor="how-hear" className="getdemo-label">How did you hear about us?<span className="text-span-10">*</span></label><select id="how-hear" name="how-hear" required className="getdemo-field w-select">
                          <option value="">Select one</option>
                          <option value="organic-search">Search Engine</option>
                          <option value="llm">AI Tools (e.g. ChatGPT, Gemini, etc)</option>
                          <option value="github">GitHub</option>
                          <option value="others">Others</option>
                        </select></div>
                      <div className="margin-vertical margin-small"><label htmlFor="Use-Case" className="getdemo-label">Anything else?<span className="text-span-10">*</span></label><textarea required placeholder="Tell us more about your project, needs, timeline" maxLength={500} id="Use-Case" name="Use-Case" className="get-demo-form-field w-input"></textarea></div>
                      <div className="w-form-formrecaptcha g-recaptcha g-recaptcha-error g-recaptcha-disabled"></div>
                      <div className="margin-vertical margin-medium"><input type="submit" className="getdemo-submit plausible-event-name--contact-form-submit w-button" value="Submit" /></div>
                    </form>
                    <div className="success-message w-form-done">
                      <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div className="error-message w-form-fail">
                      <div>Oops! Something went wrong while submitting the form.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <PageScripts scripts={pageScripts} />
    </>
  );
}