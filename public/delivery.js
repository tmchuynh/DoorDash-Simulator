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
        }, { order_value: 0 }
    )
    console.log(payload);
    return payload;
}

async function getFee() {
    const paylod = getFormValues();

    const finalPayload = JSON.stringify(paylod);

    const formInput = document.querySelector("form");

    if (formInput.checkValidity()) {
        const response = await fetch("/get-delivery-rate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: finalPayload
        })
            .then((response) => {
                let resp = response.json();
                return resp;
            })
            .catch((error) => {
                console.log(error);
            })

        const deliveryFee = document.getElementById("fee");
        const clothingTotal = document.getElementById("price");
        const orderTotal = document.getElementById("total");

        clothingTotal.textContent = `$${(window.menuItems / 100).toFixed(2)}`;
        deliveryFee.textContent = `$${(response.data.fee / 100).toFixed(2)}`;
        orderTotal.textContent = `$${((Number(window.menuItems) + response.data.fee) / 100).toFixed(2)}`;
    } else {
        console.log("Form is not valid");
    }
}

async function createDelivery() {
    const paylod = getFormValues();

    const finalPayload = JSON.stringify(paylod);

    const formInput = document.querySelector("form");

    const menuBoxes = document.querySelectorAll("input[type=checkbox]:checked");

    if (formInput.checkValidity() && menuBoxes.length > 0) {
        const response = await fetch("/create-delivery", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: finalPayload
        })
            .then((response) => {
                const resp = response.text();
                return resp;
            })
            .catch((error) => {
                console.log(error);
            })

        if (response) {
            document.documentElement.innerHTML = response;
        }
    } else if (formInput.checkValidity() && menuBoxes.length === 0) {
        alert("Please select at least one item");
    } else {
        return;
    }
}