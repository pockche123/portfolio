
const close = document.getElementById('close')


if (close) {
    close.addEventListener('click', closeInstructions)
}
        function closeInstructions() {
            console.log("close clicked")
            instruction.style.display = 'none';
        }