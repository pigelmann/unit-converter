const convertBtn = document.querySelector("#convert-btn")
const unitInput = document.querySelector("#unit-input")
const lengthEl = document.querySelector("#length")
const volumeEl = document.querySelector("#volume")
const massEl = document.querySelector("#mass")
const initWidth = Number(window.getComputedStyle(unitInput, null).getPropertyValue("width").slice(0,-2))
const inputLabel = document.querySelector(".input-label")


unitInput.addEventListener("click", () => {
    if (unitInput.value === "") {
        unitInput.style.width = initWidth + "px"
        unitInput.value = ""
        inputLabel.classList.add("focused")
    }
})

unitInput.addEventListener("focusout", () => {
    if (unitInput.value === "") {
        inputLabel.classList.remove("focused")
    }
})

unitInput.addEventListener("input", () => {
    let input = unitInput.value
    if (!Number(input) && Number(input) !== 0) {
        unitInput.value = ""
    }
    if (input === ""){
        inputLabel.classList.remove("focused")
        unitInput.style.width = initWidth + "px"
    }
    let len = input.length
    if (len > 2) {
        if (len <= 7) {
            let width = initWidth + (( len-2 ) * 38)
            unitInput.style.width = width + "px"
        }
        else {
            unitInput.value = input.slice(0, -1)
        }
    }
})

convertBtn.addEventListener("click", () => {
    let input = Number(unitInput.value)
    if (input) {
        lengthEl.innerHTML = renderUnits(input, "length")
        volumeEl.innerHTML = renderUnits(input, "volume")
        massEl.innerHTML = renderUnits(input, "mass")
    }

    function renderUnits(input, type) {
        let k = []
        switch (type) {
            case "length": {
                k = ["feet", "meters", 3.28084, 0.3048]
                break
            }
            case "volume": {
                k = ["gallons", "liters", 0.264172, 3.78541]
                break
            }
            case "mass": {
                k = ["pounds", "kilos", 2.20462, 0.453592]
                break
            }
        }
        let digits = 1000
        let n1 = input * k[2]
        let n2 = input * k[3]
        let n1Round = Math.round(n1 * digits) / digits
        let n2Round = Math.round(n2 * digits) / digits
        let threshold = 0.000001
        let equal1 = (Math.abs(n1 - n1Round) < threshold) ? "=" : "&#8776" // equal or approximately equal to
        let equal2 = (Math.abs(n2 - n2Round) < threshold) ? "=" : "&#8776"
        return `${input} ${k[1]} ${equal1} <span class="unit" id="${type}1">${n1Round}</span> ${k[0]}&#8195;<span class="delimiter">|</span>&#8195;${input} ${k[0]} ${equal2} <span class="unit" id="${type}1">${n2Round}</span> ${k[1]}`
    }
})

