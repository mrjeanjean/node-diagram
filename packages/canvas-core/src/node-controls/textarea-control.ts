export const createTextarea = (
    defaultValue: string | null,
    onInput: Function,
    data: { placeholder ?: string } = {}): HTMLElement => {

    const $controlWrapper = document.createElement("div");
    const $controlInput = document.createElement("textarea");

    $controlInput.classList.add("node-control", "node-control--textarea");
    $controlInput.value = defaultValue ?? "";
    $controlInput.disabled = true;
    $controlInput.placeholder = data.placeholder ?? "";

    const onDisable = () => {
        $controlInput.disabled = true;
        window.getSelection()?.empty();
    }

    const onActive = () => {
        $controlInput.disabled = false;
        $controlInput.focus();
        $controlInput.select();
    }

    $controlWrapper.addEventListener("dblclick", onActive);
    $controlInput.addEventListener("blur", onDisable);

    $controlInput.addEventListener("input", (e) => {
        onInput($controlInput.value);
    })

    $controlInput.addEventListener("wheel", (e)=>{
        if($controlInput.disabled){
            e.preventDefault();
        }else{
            e.stopPropagation();
        }
    })

    $controlWrapper.appendChild($controlInput)

    return $controlWrapper;
}
