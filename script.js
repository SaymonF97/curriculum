/* ================= ADICIONAR EXPERIÊNCIA ================= */

function adicionarExperiencia() {

    const container = document.getElementById("experienciasForm");

    const div = document.createElement("div");
    div.classList.add("experiencia-item");

    div.innerHTML = `
        <input type="text" class="empresa" placeholder="Nome da empresa">
        <input type="text" class="cargo" placeholder="Cargo">
        <input type="text" class="funcao" placeholder="Função">

        <label>Período</label>

        <input 
            type="text" 
            class="anoInicio" 
            placeholder="Ano Início (ex: 2020)"
            maxlength="4"
            inputmode="numeric"
            oninput="this.value = this.value.replace(/[^0-9]/g, '')"
        >

        <input 
            type="text" 
            class="anoFim" 
            placeholder="Ano Fim (ou deixe vazio se atual)"
            maxlength="4"
            inputmode="numeric"
            oninput="this.value = this.value.replace(/[^0-9]/g, '')"
        >
        <hr>
    `;

    container.appendChild(div);
}


/* ================= ADICIONAR HABILIDADE ================= */

function adicionarHabilidade() {

    const container = document.getElementById("habilidadesForm");

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("habilidade-item");
    input.placeholder = "Digite uma habilidade";

    container.appendChild(input);
}


/* ================= GERAR / ATUALIZAR CURRÍCULO ================= */

function gerarCurriculo() {

    /* ===== DADOS PRINCIPAIS ===== */

    document.getElementById("previewNome").innerText =
        document.getElementById("nome").value;

    document.getElementById("previewCargo").innerText =
        document.getElementById("cargo").value;

    document.getElementById("previewResumo").innerText =
        document.getElementById("resumo").value;

    document.getElementById("previewInfoPessoais").innerHTML =
        `
        <span class="info-item">📧 ${document.getElementById("email").value}</span>
        <span class="info-item">📱 ${document.getElementById("telefone").value}</span>
        `;


    /* ================= EXPERIÊNCIAS ================= */

    const previewExp = document.getElementById("previewExperiencias");
    previewExp.innerHTML = "";

    const experiencias = document.querySelectorAll(".experiencia-item");
    const anoAtual = new Date().getFullYear();

    for (let exp of experiencias) {

        const empresa = exp.querySelector(".empresa").value.trim();
        const cargo = exp.querySelector(".cargo").value.trim();
        const funcao = exp.querySelector(".funcao").value.trim();
        const anoInicio = exp.querySelector(".anoInicio").value.trim();
        const anoFim = exp.querySelector(".anoFim").value.trim();

        if (!empresa && !cargo && !funcao && !anoInicio && !anoFim) {
            continue;
        }

        /* ===== VALIDAÇÕES ===== */

        if (anoInicio && anoInicio.length !== 4) {
            alert("Ano de início deve ter 4 dígitos.");
            return;
        }

        if (anoFim && anoFim.length !== 4) {
            alert("Ano de fim deve ter 4 dígitos.");
            return;
        }

        if (anoInicio && parseInt(anoInicio) > anoAtual) {
            alert("Ano de início não pode ser maior que o ano atual.");
            return;
        }

        if (anoFim && parseInt(anoFim) > anoAtual) {
            alert("Ano de fim não pode ser maior que o ano atual.");
            return;
        }

        if (anoInicio && anoFim && parseInt(anoFim) < parseInt(anoInicio)) {
            alert("Ano de fim não pode ser menor que o ano de início.");
            return;
        }

        let periodoFinal = "";

        if (anoInicio && anoFim) {
            periodoFinal = `${anoInicio} - ${anoFim}`;
        } else if (anoInicio && !anoFim) {
            periodoFinal = `${anoInicio} - Atual`;
        }

        const div = document.createElement("div");
        div.style.marginBottom = "15px";

        div.innerHTML = `
            <strong>${empresa}</strong><br>
            <b>Cargo:</b> ${cargo}<br>
            <b>Função:</b> ${funcao}<br>
            <b>Período:</b> ${periodoFinal}
        `;

        previewExp.appendChild(div);
    }


    /* ================= HABILIDADES ================= */

    const previewHab = document.getElementById("previewHabilidades");
    previewHab.innerHTML = "";

    const habilidades = document.querySelectorAll(".habilidade-item");

    habilidades.forEach(hab => {
        if (hab.value.trim() !== "") {
            const li = document.createElement("li");
            li.innerText = hab.value;
            previewHab.appendChild(li);
        }
    });


    /* ================= FOTO ================= */

    const inputFoto = document.getElementById("foto");
    const previewFoto = document.getElementById("previewFoto");
    const icone = document.getElementById("fotoIcone");

    if (inputFoto.files && inputFoto.files[0]) {

        const reader = new FileReader();

        reader.onload = function (e) {
            previewFoto.src = e.target.result;
            previewFoto.style.display = "block";
            icone.style.display = "none";
        };

        reader.readAsDataURL(inputFoto.files[0]);
    }
}


/* ================= GERAR PDF ================= */

function gerarPDF() {

    gerarCurriculo(); // Atualiza antes de gerar

    const element = document.querySelector(".preview");

    const opt = {
        margin: 0.5,
        filename: 'curriculo.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}