<template>
  <div class="payment-container">
    <div class="payment-card">
      <!-- Cabeçalho -->
      <div class="card-header">
        <h1>Estamos quase lá!</h1>
        <p>Finalize o pagamento PIX para confirmar seu pedido</p>
      </div>

      <!-- Conteúdo Principal -->
      <div class="card-content">
        <div class="layout-grid">
          <!-- Coluna do QR Code -->
          <div class="qrcode-section">
            <div class="qrcode-container">
              <!-- QR vindo da API (geramos apenas a imagem a partir da string pixQrCode) -->
              <img v-if="qrCodeURL" :src="qrCodeURL" alt="QR Code PIX" :width="qrCssSize" :height="qrCssSize" />
              <div v-else class="qr-placeholder">Carregando QR Code…</div>
            </div>

            <!-- Código PIX - Apenas no Mobile -->
            <div class="pix-code-section mobile-only" v-if="pixQrCode">
              <h3>📋 Código PIX Copia e Cola</h3>
              <div class="pix-code">{{ pixQrCode }}</div>
              <button class="copy-btn" @click="copyPayload">
                📋 Copiar Código
              </button>
            </div>

            <div class="instructions">
              <h3>📱 Como pagar</h3>
              <ol>
                <li>Abra o app do seu banco</li>
                <li>Acesse a área PIX</li>
                <li>Escolha "Pagar com QR Code"</li>
                <li>Aponte a câmera para o código</li>
                <li>Confirme o pagamento</li>
              </ol>
            </div>
          </div>

          <!-- Coluna das Informações -->
          <div class="info-section">
            <!-- Alerta -->
            <!-- <div class="warning">
              <h3>⚠️ Atenção</h3>
              <p>Não esqueça de enviar o comprovante pelo WhatsApp após o pagamento!</p>
            </div> -->

            <!-- Código PIX - Apenas no Desktop -->
            <div class="pix-code-section desktop-only" v-if="pixQrCode">
              <h3>📋 Código PIX Copia e Cola</h3>
              <div class="pix-code">{{ pixQrCode }}</div>
              <button class="copy-btn" @click="copyPayload">
                📋 Copiar Código
              </button>
            </div>


                        <!-- Número do Pedido -->
            <div class="order-info">
              <div class="order-number">
                <strong>Número do Pedido:</strong>
                <span class="order-chip">#{{ $route.params.buyId }}</span>
              </div>
            </div>

            <!-- Botões de Ação -->
            <!-- <div class="actions">
              <a :href="whattsLink" target="_blank" class="whatsapp-btn">
                💬 Enviar Comprovante via WhatsApp
              </a>
            </div> -->

            <!-- Info extra opcional: só mostra se vier algo -->
            <div class="order-info" style="margin-top:16px" v-if="extraInfoVisible">
              <div v-if="displayAmount"><strong>Valor:</strong> {{ displayAmount }}</div>
              <div v-if="displayPixKey"><strong>Chave PIX:</strong> {{ displayPixKey }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Usa o QRCode (pacote 'qrcode') para gerar apenas a imagem a partir da string vinda da API
import { mapState } from "vuex";
import QRCode from "qrcode";

export default {
  name: "PixPaymentFromApi",
  data() {
    return {
      whattsLink: "",
      qrCodeURL: "",
      qrCssSize: 280, // ajustado dinamicamente no mounted
      // Caso você tenha estes dados na store, pode popular abaixo via mapState ou props
      amount: null,
      pixKey: null
    };
  },
  computed: {
    ...mapState("Layouts", ["layout", "config"]),
    ...mapState("Payment", ["pixQrCode"]), // string EMV vinda da API

    displayAmount() {
      if (this.amount == null || isNaN(Number(this.amount))) return "";
      return Number(this.amount).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    },
    displayPixKey() {
      const v = this.pixKey;
      if (!v) return "";
      const digits = String(v).replace(/\D/g, "");
      if (digits.length === 11) {
        // formata CPF 000.000.000-00
        return `${digits.slice(0,3)}.${digits.slice(3,6)}.${digits.slice(6,9)}-${digits.slice(9,11)}`;
      }
      return String(v);
    },
    extraInfoVisible() {
      return Boolean(this.displayAmount || this.displayPixKey);
    }
  },
  watch: {
    pixQrCode: {
      immediate: true,
      handler(newVal) {
        if (newVal) this.buildQrFromApi(newVal);
      }
    }
  },
  mounted() {
    // Link do WhatsApp com o número do pedido
    this.whattsLink = `https://api.whatsapp.com/send?phone=55019982538387&text=Olá, gostaria de confirmar o pagamento do pedido: ${this.$route.params.buyId}`;

    // Tamanho responsivo do QR
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    this.qrCssSize = isMobile ? 220 : 280;

    // Se já tiver a string na chegada, renderiza
    if (this.pixQrCode) this.buildQrFromApi(this.pixQrCode);
  },
  methods: {
    async buildQrFromApi(payload) {
      try {
        // Gera um DataURL PNG do QR usando a string EMV vinda da API
        const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
        const size = isMobile ? 220 : 280;

        this.qrCodeURL = await QRCode.toDataURL(String(payload), {
          errorCorrectionLevel: "M",
          width: size,
          margin: 1
        });
      } catch (err) {
        console.error("Falha ao gerar QR Code:", err);
        this.qrCodeURL = "";
      }
    },
    async copyPayload() {
      try {
        await navigator.clipboard.writeText(String(this.pixQrCode || ""));
        this.showCopyFeedback();
      } catch {
        this.fallbackCopy();
      }
    },
    showCopyFeedback() {
      const btn = this.$el.querySelector(".copy-btn");
      if (!btn) return;
      const original = btn.innerHTML;
      btn.innerHTML = "✅ Copiado!";
      btn.style.background = "#4caf50";
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = "rgb(225, 4, 133)";
      }, 2000);
    },
    fallbackCopy() {
      const ta = document.createElement("textarea");
      ta.value = String(this.pixQrCode || "");
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      this.showCopyFeedback();
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.payment-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.payment-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 1000px;
  width: 100%;
}

.card-header {
  background: #4e2315;
  color: white;
  padding: 30px;
  text-align: center;
}

.card-header h1 {
  font-size: 2.2rem;
  margin-bottom: 10px;
  font-weight: 700;
}

.card-header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.card-content {
  padding: 40px;
}

.layout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.qrcode-section {
  text-align: center;
}

.qrcode-container {
  background: white;
  padding: 25px;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  min-width: 180px;
  min-height: 180px;
}

.qr-placeholder {
  font-size: 14px;
  color: #666;
  padding: 30px 20px;
}

.instructions {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 12px;
  border-left: 4px solid #1976d2;
  text-align: left;
}

.instructions h3 {
  color: #1976d2;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.instructions ol {
  padding-left: 20px;
}

.instructions li {
  margin-bottom: 12px;
  line-height: 1.5;
}

.pix-code-section {
  background: #f5f5f5;
  height: 334px;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 25px;
}

.pix-code-section h3 {
  color: #1976d2;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.pix-code {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.4;
  word-break: break-all;
}

.copy-btn {
  background: #4e2315;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.copy-btn:hover {
  background: #1565c0;
  transform: translateY(-2px);
}

.order-info {
  background: #e3f2fd;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 25px;
  border: 1px solid #bbdefb;
}

.order-number {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-chip {
  background:#4e2315;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 1.1rem;
}

.actions {
  text-align: center;
}

.whatsapp-btn {
  background: #25d366;
  color: white;
  padding: 18px 30px;
  border-radius: 12px;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
}

.whatsapp-btn:hover {
  background: #128c7e;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
}

.store-btn {
  color: #1976d2;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 2px solid #1976d2;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.store-btn:hover {
  background: #1976d2;
  color: white;
}

.warning {
  background: #4e2315 !important;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  text-align: center;
}

.warning h3 {
  color: #fff;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.warning p {
  color: white;
}

/* Desktop - Mostra apenas na coluna direita */
.desktop-only {
  display: block;
}
.mobile-only {
  display: none;
}

/* Mobile */
@media (max-width: 768px) {
  .payment-container { padding: 0; }
  .layout-grid { grid-template-columns: 1fr; gap: 30px; }
  .card-content { padding: 25px; }
  .card-header h1 { font-size: 1.8rem; }

  /* QR menor no mobile */
  .qrcode-container { padding: 20px; }
  .desktop-only { display: none; }
  .mobile-only { display: block; }
}

/* Ajustes extras */
@media (max-width: 480px) {
  .card-header { padding: 20px; margin-top: 50px; }
  .card-header h1 { font-size: 1.5rem; }
  .pix-code { font-size: 12px; padding: 15px; }
}
</style>
