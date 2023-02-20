function getFormValues() {
    const inputContainer = document.getElementById("order-details");

    const fieldList = inputContainer.querySelectorAll("input");
    const fieldArray = Array.from(fieldList);

    /* Taking the fieldArray and reducing it to a single object. */
    const payload = fieldArray.reduce(
        (obj, field) => {
            if (field.name === "items") {
                if (field.checked) {
                    obj["order_value"] += parseInt(field.value);
                }
            } else {
                obj[field.name] = field.value;
            }

            return obj;
        }, {order_value: 0}
    )
    console.log(payload);
    return payload;
}

getFormValues();