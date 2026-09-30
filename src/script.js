// CodeVault - JavaScript principal

document.addEventListener("DOMContentLoaded", () => {
    console.log("CodeVault carregado com sucesso!");

    // Botões de copiar código
    document.querySelectorAll("pre code").forEach((codigo) => {
        const botao = document.createElement("button");

        botao.textContent = "Copiar";
        botao.className = "btn-copiar";

        botao.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(codigo.textContent);
                botao.textContent = "Copiado!";

                setTimeout(() => {
                    botao.textContent = "Copiar";
                }, 1500);
            } catch (erro) {
                console.error("Não foi possível copiar:", erro);
            }
        });

        codigo.parentElement.insertBefore(botao, codigo);
    });

    // Rolagem suave dos links internos
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (evento) => {
            const destino = document.querySelector(link.getAttribute("href"));

            if (destino) {
                evento.preventDefault();

                destino.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
});
// ==========================================
// CODEVAULT - ACESSO E PAINEL
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const elementos = document.querySelectorAll("a, button");

    const criarAcesso = [...elementos].find(el =>
        el.textContent.trim().toLowerCase().includes("criar acesso")
    );

    const acessarPainel = [...elementos].find(el =>
        el.textContent.trim().toLowerCase().includes("acessar painel")
    );

    function abrirTela(titulo, conteudo) {

        const fundo = document.createElement("div");

        fundo.style.cssText = `
            position:fixed;
            inset:0;
            background:rgba(0,0,0,.75);
            display:flex;
            align-items:center;
            justify-content:center;
            z-index:99999;
            padding:20px;
        `;

        const caixa = document.createElement("div");

        caixa.style.cssText = `
            width:100%;
            max-width:430px;
            background:#0d1424;
            color:#fff;
            border:1px solid #26334d;
            border-radius:18px;
            padding:25px;
            box-shadow:0 20px 60px rgba(0,0,0,.5);
        `;

        caixa.innerHTML = `
            <h2 style="margin-top:0">${titulo}</h2>

            ${conteudo}

            <button id="fecharCodeVault"
                style="
                    width:100%;
                    margin-top:15px;
                    padding:12px;
                    border:0;
                    border-radius:10px;
                    cursor:pointer;
                ">
                Fechar
            </button>
        `;

        fundo.appendChild(caixa);
        document.body.appendChild(fundo);

        document
            .getElementById("fecharCodeVault")
            .addEventListener("click", () => fundo.remove());
    }

    if (criarAcesso) {

        criarAcesso.addEventListener("click", (evento) => {

            evento.preventDefault();

            abrirTela(
                "Criar acesso",
                `
                <input id="cvNome"
                    placeholder="Seu nome"
                    style="width:100%;padding:12px;margin:7px 0;box-sizing:border-box;">

                <input id="cvEmail"
                    type="email"
                    placeholder="Seu e-mail"
                    style="width:100%;padding:12px;margin:7px 0;box-sizing:border-box;">

                <input id="cvSenha"
                    type="password"
                    placeholder="Crie uma senha"
                    style="width:100%;padding:12px;margin:7px 0;box-sizing:border-box;">

                <button id="cvCadastrar"
                    style="
                        width:100%;
                        padding:13px;
                        margin-top:10px;
                        border:0;
                        border-radius:10px;
                        cursor:pointer;
                    ">
                    Criar minha conta
                </button>

                <p id="cvMensagem"></p>
                `
            );

            setTimeout(() => {

                document
                    .getElementById("cvCadastrar")
                    .addEventListener("click", () => {

                        const nome =
                            document.getElementById("cvNome").value.trim();

                        const email =
                            document.getElementById("cvEmail").value.trim();

                        const senha =
                            document.getElementById("cvSenha").value;

                        const mensagem =
                            document.getElementById("cvMensagem");

                        if (!nome || !email || !senha) {
                            mensagem.textContent =
                                "Preencha todos os campos.";
                            return;
                        }

                        localStorage.setItem(
                            "codevault_usuario",
                            JSON.stringify({
                                nome: nome,
                                email: email,
                                senha: senha
                            })
                        );

                        mensagem.textContent =
                            "Acesso criado com sucesso!";

                    });

            }, 100);

        });
    }

    if (acessarPainel) {

        acessarPainel.addEventListener("click", (evento) => {

            evento.preventDefault();

            const usuarioSalvo =
                localStorage.getItem("codevault_usuario");

            if (!usuarioSalvo) {

                abrirTela(
                    "Acessar painel",
                    `
                    <p>
                        Você ainda não criou um acesso.
                    </p>

                    <button id="irCadastro"
                        style="
                            width:100%;
                            padding:13px;
                            border:0;
                            border-radius:10px;
                            cursor:pointer;
                        ">
                        Criar acesso
                    </button>
                    `
                );

                return;
            }

            abrirTela(
                "Acessar painel",
                `
                <input id="cvLoginEmail"
                    type="email"
                    placeholder="E-mail"
                    style="width:100%;padding:12px;margin:7px 0;box-sizing:border-box;">

                <input id="cvLoginSenha"
                    type="password"
                    placeholder="Senha"
                    style="width:100%;padding:12px;margin:7px 0;box-sizing:border-box;">

                <button id="cvEntrar"
                    style="
                        width:100%;
                        padding:13px;
                        margin-top:10px;
                        border:0;
                        border-radius:10px;
                        cursor:pointer;
                    ">
                    Entrar
                </button>

                <p id="cvLoginMensagem"></p>
                `
            );

            setTimeout(() => {

                document
                    .getElementById("cvEntrar")
                    .addEventListener("click", () => {

                        const email =
                            document.getElementById("cvLoginEmail").value;

                        const senha =
                            document.getElementById("cvLoginSenha").value;

                        const usuario =
                            JSON.parse(
                                localStorage.getItem("codevault_usuario")
                            );

                        const mensagem =
                            document.getElementById("cvLoginMensagem");

                        if (
                            email === usuario.email &&
                            senha === usuario.senha
                        ) {

                            mensagem.textContent =
                                "Login realizado com sucesso!";

                            setTimeout(() => {

                                document
                                    .querySelectorAll(
                                        "body > div"
                                    )
                                    .forEach(el => el.remove());

                                abrirTela(
                                    "Painel CodeVault",
                                    `
                                    <h3>Olá, ${usuario.nome}!</h3>

                                    <p>
                                        Seu acesso ao CodeVault está ativo.
                                    </p>

                                    <p>
                                        🚀 Projetos<br>
                                        💻 Códigos<br>
                                        🔐 Segurança<br>
                                        📊 Painel
                                    </p>
                                    `
                                );

                            }, 500);

                        } else {

                            mensagem.textContent =
                                "E-mail ou senha incorretos.";

                        }

                    });

            }, 100);

        });
    }

});
