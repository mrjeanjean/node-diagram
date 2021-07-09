export const createToggle = (defaultValue: boolean, onChange: Function):HTMLElement=>{
    const $controlWrapper = document.createElement("label");
    $controlWrapper.classList.add("node-control--toggle__wrapper");

    const $controlSwitch = document.createElement("input");
    $controlSwitch.type = "checkbox";

    const $controlSwitchSpan = document.createElement("span");
    $controlSwitchSpan.classList.add("node-control--toggle");

    const toggleSwitch = ()=>{
        $controlSwitch.checked = defaultValue;
    }

    $controlSwitch.addEventListener("change", ()=>{
        defaultValue = !defaultValue;
        toggleSwitch();
        onChange(defaultValue);
    });

    $controlWrapper.addEventListener("mousedown", (e) => {
        e.stopPropagation();
    });

    toggleSwitch();

    $controlWrapper.appendChild($controlSwitch);
    $controlWrapper.appendChild($controlSwitchSpan);

    return $controlWrapper;
}
