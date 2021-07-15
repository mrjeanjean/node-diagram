export const createSelect = (
    defaultValue: string,
    optionsList:  {[key: string]: string},
    onInput: Function,
    prefix: string): {$select: HTMLElement, close: Function} => {

    const $controlWrapper = document.createElement("div");
    $controlWrapper.classList.add("node-control", "node-control--select__wrapper");

    const $select = document.createElement("div");
    $select.classList.add("node-control--select");

    const $options = document.createElement("div");
    $options.classList.add("node-control--options");

    const updateSelect = (key:string)=>{
        $select.innerHTML = `<span><i class="fas fa-filter"></i></span>` + optionsList[key];
    }

    $select.addEventListener("click", ()=>{
        $select.classList.toggle("active");
    });

    const close = ()=>{
        $select.classList.remove("active");
    }

    Object.entries(optionsList).forEach(entry => {
        const $controlThemedOption = document.createElement("div");
        $controlThemedOption.innerText = entry[1];
        $controlThemedOption.addEventListener("click", ()=>{
            updateSelect(entry[0]);
            onInput(entry[0]);
            $select.classList.remove("active");
        })
        $options.appendChild($controlThemedOption);
    })

    $controlWrapper.appendChild($select);
    $controlWrapper.appendChild($options);

    updateSelect(defaultValue);

    return {
        $select: $controlWrapper,
        close
    };
}
