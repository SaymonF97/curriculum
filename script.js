function adicionarExperiencia() {
    const container = document.getElementById("experienciasForm");

    const div = document.createElement("div");
    div.classList.add("experiencia-item");

    div.innerHTML = `
        <input type="text" class="empresa" placeholder="Nome da empresa">
        <input type="text" class="cargo" placeholder="Cargo">
        <textarea class="funcao" placeholder="Descrição das atividades"></textarea>

        <label><strong>Período</strong></label>
        <input type="number" class="inicio" placeholder="Ano início">
        <input type="number" class="fim" placeholder="Ano fim (ou deixe vazio se atual)">

        <button type="button" onclick="this.parentElement.remove()">Remover</button>
        <hr>
    `;

    container.appendChild(div);
}

function adicionarHabilidade() {
    const container = document.getElementById("habilidadesForm");

    const div = document.createElement("div");

    div.innerHTML = `
        <input type="text" class="habilidade" placeholder="Habilidade">
        <button type="button" onclick="this.parentElement.remove()">Remover</button>
    `;

    container.appendChild(div);
}

function gerarCurriculo() {

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

    let previewExp = document.getElementById("previewExperiencias");
    previewExp.innerHTML = "";

    let experiencias = document.querySelectorAll(".experiencia-item");

    experiencias.forEach(exp => {

        let empresa = exp.querySelector(".empresa").value;
        let cargo = exp.querySelector(".cargo").value;
        let funcao = exp.querySelector(".funcao").value;
        let periodo = exp.querySelector(".periodo").value;

        if (empresa || cargo || funcao || periodo) {

            let div = document.createElement("div");
            div.style.marginBottom = "15px";

            div.innerHTML = `
                <strong>${empresa}</strong><br>
                <b>Cargo:</b> ${cargo}<br>
                <b>Função:</b> ${funcao}<br>
                <b>Período:</b> ${periodo}
            `;

            previewExp.appendChild(div);
        }
    });

    /* ================= HABILIDADES ================= */

    let previewHab = document.getElementById("previewHabilidades");
    previewHab.innerHTML = "";

    let habilidades = document.querySelectorAll(".habilidade-item");

    habilidades.forEach(hab => {
        if (hab.value.trim() !== "") {
            let li = document.createElement("li");
            li.innerText = hab.value;
            previewHab.appendChild(li);
        }
    });

    /* ================= FOTO ================= */

    let inputFoto = document.getElementById("foto");
    let previewFoto = document.getElementById("previewFoto");
    let icone = document.getElementById("fotoIcone");

    if (inputFoto.files && inputFoto.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            previewFoto.src = e.target.result;
            previewFoto.style.display = "block";
            icone.style.display = "none";
        };
        reader.readAsDataURL(inputFoto.files[0]);
    }
}


// GERAR PDF
function gerarPDF() {
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