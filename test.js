function convertStreamToJson(reader, callback) {
    var result = '';
    function readChunk() {
        reader.read().then(function (resultObj) {
            var done = resultObj.done,
                value = resultObj.value;

            if (done) {
                callback(null, JSON.parse(result));
            } else {
                result += new TextDecoder().decode(value);
                readChunk();
            }
        }).catch(function (error) {
            callback(error, null);
        });
    }
    readChunk();
}
// let corsProxyUrl='https://cors-anywhere.herokuapp.com/';
let apiUrl = `https://api.postcode.eu/nl/v1/addresses/postcode/${data.postCode}/${value}`;
const username = "Qz1KD7ahVhNCVIDvC5yjaHt7jd0Kcxddls1b6a0ILtC";
const psswrd = "59MUCjaocHor22Xgsmrn2YlRrYWfsqalBn29O6g2odF1RxDbob";
const credentials = btoa(`${username}:${psswrd}`);
if (data.postCode && value) {
    fetch(apiUrl,
        {
            method: "GET",
            headers: {
                Authorization: `Basic ${credentials}`
            }
        })
        .then((res) => {
            const rStream = res.body;
            const reader = rStream.getReader();
            convertStreamToJson(reader, function (error, jsonData) {
                if (error) {
                    console.error("An error occurred:", error);
                } else {
                    // console.log(jsonData);
                    data.street = jsonData.street;
                    data.city = jsonData.city;
                    data.street0 = jsonData.street;
                    data.city0 = jsonData.city;
                }
            });
        })
        .catch((er) => {
            console.log(er.message)
        })
}


// async function handleNext(data) {
//     let dob = formatDate(data.submission.data.dateOfBirth);
//     try {
//         const res = await axios.post('/testdate',
//             {
//                 "Input": {
//                     "Date": dob
//                 }
//             },
//             {
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });
//         if (res.status === 200 && res.data.Result !== "true") {
//             toast.error('Age is Under 18');
//             // nav('/home');
//         }
//         else {

//         }
//     }
//     catch (er) {
//         console.log(er.message);
//     }
// }


{ "display": "form", "components": [{ "label": "License Plate", "labelPosition": "top", "placeholder": "Enter Licence Number", "description": "", "tooltip": "", "prefix": "", "suffix": "", "widget": { "type": "input" }, "inputMask": "", "displayMask": "", "applyMaskOn": "change", "allowMultipleMasks": false, "customClass": "", "tabindex": "", "autocomplete": "", "hidden": false, "hideLabel": false, "showWordCount": false, "showCharCount": false, "mask": false, "autofocus": false, "spellcheck": true, "disabled": false, "tableView": true, "modalEdit": false, "multiple": false, "persistent": true, "inputFormat": "plain", "protected": false, "dbIndex": false, "case": "", "truncateMultipleSpaces": false, "encrypted": false, "redrawOn": "", "clearOnHide": true, "customDefaultValue": "", "calculateValue": "", "calculateServer": false, "allowCalculateOverride": false, "validateOn": "change", "validate": { "required": true, "pattern": "", "customMessage": "Invalid Number", "custom": "", "customPrivate": false, "json": "", "minLength": "", "maxLength": "", "strictDateValidation": false, "multiple": false, "unique": false }, "unique": false, "errorLabel": "", "errors": "", "key": "licence", "tags": [], "properties": {}, "conditional": { "show": null, "when": null, "eq": "", "json": "" }, "customConditional": "", "logic": [], "attributes": {}, "overlay": { "style": "", "page": "", "left": "", "top": "", "width": "", "height": "" }, "type": "textfield", "input": true, "refreshOn": "", "dataGridLabel": false, "addons": [], "inputType": "text", "id": "eqcler", "defaultValue": "" }, { "label": "Brand", "placeholder": "Enter Brand", "applyMaskOn": "change", "tableView": true, "validate": { "required": true, "custom": "", "customPrivate": false, "strictDateValidation": false, "multiple": false, "unique": false, "minLength": "", "maxLength": "", "pattern": "" }, "key": "brand", "type": "textfield", "input": true, "id": "e96r4qf", "prefix": "", "customClass": "", "suffix": "", "multiple": false, "defaultValue": null, "protected": false, "unique": false, "persistent": true, "hidden": false, "clearOnHide": true, "refreshOn": "", "redrawOn": "", "modalEdit": false, "dataGridLabel": false, "labelPosition": "top", "description": "", "errorLabel": "", "tooltip": "", "hideLabel": false, "tabindex": "", "disabled": false, "autofocus": false, "dbIndex": false, "customDefaultValue": "", "calculateValue": "", "calculateServer": false, "widget": { "type": "input" }, "attributes": {}, "validateOn": "change", "conditional": { "show": null, "when": null, "eq": "" }, "overlay": { "style": "", "left": "", "top": "", "width": "", "height": "" }, "allowCalculateOverride": false, "encrypted": false, "showCharCount": false, "showWordCount": false, "properties": {}, "allowMultipleMasks": false, "addons": [], "mask": false, "inputType": "text", "inputFormat": "plain", "inputMask": "", "displayMask": "", "spellcheck": true, "truncateMultipleSpaces": false }, { "label": "Type", "placeholder": "Enter Type", "applyMaskOn": "change", "tableView": true, "validate": { "required": true, "custom": "", "customPrivate": false, "strictDateValidation": false, "multiple": false, "unique": false, "minLength": "", "maxLength": "", "pattern": "" }, "key": "type", "type": "textfield", "input": true, "id": "erv7k9n", "prefix": "", "customClass": "", "suffix": "", "multiple": false, "defaultValue": null, "protected": false, "unique": false, "persistent": true, "hidden": false, "clearOnHide": true, "refreshOn": "", "redrawOn": "", "modalEdit": false, "dataGridLabel": false, "labelPosition": "top", "description": "", "errorLabel": "", "tooltip": "", "hideLabel": false, "tabindex": "", "disabled": false, "autofocus": false, "dbIndex": false, "customDefaultValue": "", "calculateValue": "", "calculateServer": false, "widget": { "type": "input" }, "attributes": {}, "validateOn": "change", "conditional": { "show": null, "when": null, "eq": "" }, "overlay": { "style": "", "left": "", "top": "", "width": "", "height": "" }, "allowCalculateOverride": false, "encrypted": false, "showCharCount": false, "showWordCount": false, "properties": {}, "allowMultipleMasks": false, "addons": [], "mask": false, "inputType": "text", "inputFormat": "plain", "inputMask": "", "displayMask": "", "spellcheck": true, "truncateMultipleSpaces": false }, { "label": "Current Price", "labelPosition": "top", "placeholder": "Enter Price", "description": "", "tooltip": "", "prefix": "", "suffix": "", "widget": { "type": "input" }, "displayMask": "", "applyMaskOn": "change", "customClass": "", "tabindex": "", "autocomplete": "", "hidden": false, "hideLabel": false, "mask": false, "autofocus": false, "spellcheck": false, "disabled": false, "tableView": false, "modalEdit": false, "multiple": false, "defaultValue": "", "persistent": true, "currency": "EUR", "inputFormat": "plain", "protected": false, "dbIndex": false, "case": "", "truncateMultipleSpaces": false, "encrypted": false, "redrawOn": "", "clearOnHide": true, "customDefaultValue": "", "calculateValue": "", "calculateServer": false, "allowCalculateOverride": false, "validateOn": "change", "validate": { "required": true, "customMessage": "", "custom": "", "customPrivate": false, "json": "", "strictDateValidation": false, "multiple": false, "unique": false, "min": "", "max": "", "step": "any", "integer": "" }, "unique": false, "errorLabel": "", "errors": "", "key": "p", "tags": [], "properties": {}, "conditional": { "show": null, "when": null, "eq": "", "json": "" }, "customConditional": "", "logic": [], "attributes": {}, "overlay": { "style": "", "page": "", "left": "", "top": "", "width": "", "height": "" }, "type": "currency", "input": true, "delimiter": true, "refreshOn": "", "dataGridLabel": false, "showCharCount": false, "showWordCount": false, "allowMultipleMasks": false, "addons": [], "id": "eaxpqv" }, { "label": "Previous", "action": "event", "showValidations": false, "theme": "primary", "size": "md", "block": false, "leftIcon": "", "rightIcon": "", "shortcut": "", "description": "", "tooltip": "", "customClass": "", "tabindex": "", "disableOnInvalid": false, "hidden": false, "autofocus": false, "disabled": false, "tableView": false, "modalEdit": false, "key": "prev", "tags": [], "properties": {}, "conditional": { "show": null, "when": null, "eq": "", "json": "" }, "customConditional": "", "logic": [], "attributes": {}, "overlay": { "style": "", "page": "", "left": "", "top": "", "width": "", "height": "" }, "type": "button", "input": true, "placeholder": "", "prefix": "", "suffix": "", "multiple": false, "defaultValue": null, "protected": false, "unique": false, "persistent": false, "clearOnHide": true, "refreshOn": "", "redrawOn": "", "dataGridLabel": true, "labelPosition": "top", "errorLabel": "", "hideLabel": false, "dbIndex": false, "customDefaultValue": "", "calculateValue": "", "calculateServer": false, "widget": { "type": "input" }, "validateOn": "change", "validate": { "required": false, "custom": "", "customPrivate": false, "strictDateValidation": false, "multiple": false, "unique": false }, "allowCalculateOverride": false, "encrypted": false, "showCharCount": false, "showWordCount": false, "allowMultipleMasks": false, "addons": [], "id": "e33dwri", "event": "previous" }, { "label": "Next", "action": "submit", "showValidations": false, "theme": "primary", "size": "md", "block": false, "leftIcon": "", "rightIcon": "", "shortcut": "", "description": "", "tooltip": "", "customClass": "", "tabindex": "", "disableOnInvalid": false, "hidden": false, "autofocus": false, "disabled": false, "tableView": false, "modalEdit": false, "key": "submit", "tags": [], "properties": {}, "conditional": { "show": null, "when": null, "eq": "", "json": "" }, "customConditional": "", "logic": [], "attributes": {}, "overlay": { "style": "", "page": "", "left": "", "top": "", "width": "", "height": "" }, "type": "button", "input": true, "placeholder": "", "prefix": "", "suffix": "", "multiple": false, "defaultValue": null, "protected": false, "unique": false, "persistent": false, "clearOnHide": true, "refreshOn": "", "redrawOn": "", "dataGridLabel": true, "labelPosition": "top", "errorLabel": "", "hideLabel": false, "dbIndex": false, "customDefaultValue": "", "calculateValue": "", "calculateServer": false, "widget": { "type": "input" }, "validateOn": "change", "validate": { "required": false, "custom": "", "customPrivate": false, "strictDateValidation": false, "multiple": false, "unique": false }, "allowCalculateOverride": false, "encrypted": false, "showCharCount": false, "showWordCount": false, "allowMultipleMasks": false, "addons": [], "id": "e2bctmv", "saveOnEnter": false }] }