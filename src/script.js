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
