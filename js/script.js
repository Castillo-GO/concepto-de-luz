
const VEL_ONDA = 1.2;
const $ = id => document.getElementById(id);


/* ===== ONDAS ANIMADAS DE LA PORTADA ===== */

(function () {
    const c = $('c-onda');
    if (!c) return;

    const x = c.getContext('2d');
    let t = 0;

    function animar() {
        c.width = c.clientWidth;
        c.height = c.clientHeight;

        x.clearRect(0, 0, c.width, c.height);

        for (let k = 0; k < 4; k++) {
            x.beginPath();
            x.strokeStyle = `hsla(${220 + k * 30},90%,65%,.5)`;

            for (let i = 0; i <= c.width; i += 6) {
                const y = c.height / 2 +
                    Math.sin(i / (60 + k * 25) + t * (1 + k * .3)) *
                    (40 + k * 15);

                i ? x.lineTo(i, y) : x.moveTo(i, y);
            }

            x.stroke();
        }

        t += .02 * VEL_ONDA;
        requestAnimationFrame(animar);
    }

    animar();
})();


/*LABORATORIO: COLOR DE LOS OBJETOS*/

const OBJETOS = {
    manzana: {
        nombre: 'manzana roja',
        canal: 'roja',
        base: '#dc1e1e'
    },

    hoja: {
        nombre: 'hoja verde',
        canal: 'verde',
        base: '#28a03c'
    },

    camiseta: {
        nombre: 'camiseta azul',
        canal: 'azul',
        base: '#2850dc'
    }
};

const FONDOS = {
    blanca: '#3a3a52',
    roja: '#5a1010',
    verde: '#0f4a1c',
    azul: '#10205a'
};

let luzSel = 'blanca';
let objSel = 'manzana';


/*DIBUJAR LOS OBJETOS*/

function dibujar(o, c) {

    if (o === 'manzana') {
        return `
            <svg width="150" height="150" viewBox="0 0 100 100">
                <circle cx="50" cy="58" r="34" fill="${c}"/>
                <path d="M50 24 Q52 10 62 8"
                    stroke="#6b4423" stroke-width="4" fill="none"/>
            </svg>
        `;
    }

    if (o === 'hoja') {
        return `
            <svg width="150" height="150" viewBox="0 0 100 100">
                <path d="M15 85 Q10 20 85 15 Q90 80 15 85Z" fill="${c}"/>
                <path d="M15 85 L70 30" stroke="#0004" stroke-width="3"/>
            </svg>
        `;
    }

    return `
        <svg width="150" height="150" viewBox="0 0 100 100">
            <path d="M30 15 L10 32 L22 46 L30 40 L30 88 L70 88 L70 40 L78 46 L90 32 L70 15 Q50 28 30 15Z"
                fill="${c}"/>
        </svg>
    `;
}


/*ACTUALIZAR EL EXPERIMENTO */

function objetos() {
    const O = OBJETOS[objSel];

    const vista = $('obj-vista');
    const texto = $('t-obj');

    if (!O || !vista || !texto) return;

    let color;
    let mensaje;

    if (luzSel === 'blanca') {
        color = O.base;

        mensaje = `La luz blanca contiene todos los colores. La ${O.nombre} refleja principalmente la luz ${O.canal}, por eso la ves de ese color.`;

    } else if (luzSel === O.canal) {
        color = O.base;

        mensaje = `La luz ${luzSel} coincide con el color que refleja la ${O.nombre}, por eso conserva su color.`;

    } else {
        color = '#111111';

        mensaje = `La luz ${luzSel} no contiene luz ${O.canal}. La ${O.nombre} refleja muy poca luz y por eso se ve oscura.`;
    }

    vista.style.background = FONDOS[luzSel];
    vista.innerHTML = dibujar(objSel, color);

    texto.textContent = mensaje;

    document.querySelectorAll('[data-luz]').forEach(b => {
        b.classList.toggle('activo', b.dataset.luz === luzSel);
    });

    document.querySelectorAll('[data-obj]').forEach(b => {
        b.classList.toggle('activo', b.dataset.obj === objSel);
    });
}


/*BOTONES DE LUZ */

document.querySelectorAll('[data-luz]').forEach(b => {
    b.addEventListener('click', () => {
        luzSel = b.dataset.luz;
        objetos();
    });
});


/*BOTONES DE OBJETOS */

document.querySelectorAll('[data-obj]').forEach(b => {
    b.addEventListener('click', () => {
        objSel = b.dataset.obj;
        objetos();
    });
});

/*INICIAR LABORATORIO  */

objetos();