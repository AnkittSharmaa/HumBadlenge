const happyBtn = document.querySelector('.happy')
const sadBtn = document.querySelector('.sad')
const form = document.querySelector('.interaction-form')
const feeling = document.querySelector('.feeling')
// console.log(happyBtn, sadBtn)
happyBtn.addEventListener('click', () => {
    window.location.replace("/q/h");
})
form.addEventListener('submit', (e) => {
    e.preventDefault();
})
sadBtn.addEventListener('click', () => {
    feeling.remove();
    const div = document.createElement('div');
    div.classList.add('reason', "d-flex", "flex-column", "align-items-center");
    const label = document.createElement('label');
    label.innerText = "Why are you feeling sad ?";
    label.classList.add('display-1')
    const btns = document.createElement('div');
    btns.classList.add('btns', "mt-2");
    const depressionBtn = document.createElement('button')
    depressionBtn.innerText = "Depression";
    const hrBtn = document.createElement('button')
    hrBtn.innerText = "Harassment"
    depressionBtn.classList.add('btn', 'btn-secondary', "m-3", "btn-lg")
    hrBtn.classList.add('btn', "btn-danger", "m-3", "btn-lg");
    depressionBtn.addEventListener('click', () => {
        window.location.replace("/q/s/d");
    })
    hrBtn.addEventListener('click', () => {
        div.remove()
        const div1 = document.createElement('div');
        div1.classList.add('reason', "d-flex", "flex-column", "align-items-center");
        const label1 = document.createElement('label');
        label1.innerText = "Why are you feeling harassed ?";
        label1.classList.add('display-2')
        const btns1 = document.createElement('div');
        btns1.classList.add('btns', "mt-2");
        const etBtn = document.createElement('button')
        etBtn.innerText = "Eve teasing";
        const btBtn = document.createElement('button')
        btBtn.innerText = "Bad touch"
        const mBtn = document.createElement('button')
        mBtn.innerText = "Molestation"
        const bsBtn = document.createElement('div')
        bsBtn.innerText = "Being Stalked"
        bsBtn.classList.add('btn', 'btn-danger', "m-3", "btn-lg");
        etBtn.classList.add('btn', 'btn-danger', "m-3", "btn-lg");
        btBtn.classList.add('btn', "btn-danger", "m-3", "btn-lg");
        mBtn.classList.add('btn', "btn-danger", "m-3", "btn-lg");
        bsBtn.addEventListener('click', () => {
            window.location.replace("/q/s/h/bs");
        })
        btBtn.addEventListener('click', () => {
            window.location.replace("/q/s/h/bt");
        })
        etBtn.addEventListener('click', () => {
            window.location.replace("/q/s/h/et");
        })
        btns1.append(etBtn, btBtn, bsBtn, mBtn);
        div1.append(label1);
        div1.append(btns1)
        form.append(div1)
    })
    btns.append(depressionBtn, hrBtn);
    div.append(label);
    div.append(btns)
    form.append(div)
})