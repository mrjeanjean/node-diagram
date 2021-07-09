export const createSpinner = (
    defaultValue: number = 0,
    onInput: Function,
): {$controlWrapper:HTMLElement, setValue:Function} => {
    const $controlWrapper = document.createElement("div");
    const $controlInput = document.createElement("input");
    $controlWrapper.classList.add("node-control", "node-control--spinner");
    $controlInput.classList.add("spinner__input");

    const $controlButtonPlus = document.createElement("button");
    $controlButtonPlus.classList.add("spinner__button");
    $controlButtonPlus.innerText = "+";

    const $controlButtonMinus = document.createElement("button");
    $controlButtonMinus.classList.add("spinner__button");
    $controlButtonMinus.innerText = "-";

    $controlButtonPlus.addEventListener("click", () => {
        defaultValue += 1;
        updateValue();
    });

    $controlButtonMinus.addEventListener("click", () => {
        defaultValue -= 1;
        defaultValue = defaultValue < 0 ? 0 : defaultValue;
        updateValue();
    });

    const updateValue = () => {
        onInput(defaultValue);
        $controlInput.value = "" + defaultValue;
    }

    $controlInput.readOnly = true;
    $controlInput.value = "" + defaultValue;

    $controlInput.addEventListener("input", (e) => {
        onInput(parseInt($controlInput.value));
    })

    $controlWrapper.appendChild($controlInput);
    $controlWrapper.appendChild($controlButtonMinus);
    $controlWrapper.appendChild($controlButtonPlus);

    return {
        $controlWrapper,
        setValue: (value: number)=>{
            defaultValue = value;
            $controlInput.value = "" + defaultValue;
        }
    };
}
