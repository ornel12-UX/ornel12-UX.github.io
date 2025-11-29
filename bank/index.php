<?php
require __DIR__ . '/db.php';
$db = get_db();
$tx = get_latest_transaction($db);

// Fallbacks (dev) si vide
$amount_display = $tx['amount_display'] ?? '-30.300F';
$beneficiary    = $tx['beneficiary'] ?? 'À Gnainaikan W S 07 48 13 8593';
$montant_recu   = $tx['montant_recu'] ?? '30.000F';
$statut         = $tx['statut'] ?? 'Effectué';
$frais          = $tx['frais'] ?? '300F';
$datetime_disp  = $tx['datetime_display'] ?? '23 nov. 2025 11:45 AM';
$nouveau_solde  = $tx['nouveau_solde'] ?? '16.525F';
$transaction_id = $tx['transaction_id'] ?? 'TBJCFEZBU4YAFGET7';
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Reçu de transaction</title>
  <style>
    /* Styles inspirés d’un écran mobile léger et épuré */
  :root {
    --bg: #f3f4f6; /* gris très clair */
    --text: #111827; /* gris très sombre */
    --muted: #6b7280; /* gris moyen */
    --card: #ffffff;
    --shadow: 0 2px 8px rgba(17, 24, 39, 0.06);
    --primary: #2563eb; /* bleu avatar */
    --accent: #86B044; /* vert statut */
  }

  * { box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: "Segoe UI", Roboto, Arial, Helvetica, sans-serif;
  }

  .screen {
    max-width: 420px; /* proche d’un mobile */
    min-height: 100vh;
    margin: 0 auto;
    padding: 12px 16px 24px;
    position: relative;
  }

  /* Barre supérieure */
  .topbar {
    display: flex;
    align-items: center;
    height: 40px;
  }
  .icon-btn {
    appearance: none;
    border: none;
    background: transparent;
    padding: 4px;
    cursor: pointer;
  }
  .icon-btn:active { opacity: 0.7; }

  /* Avatar */
  .avatar { display: flex; justify-content: center; margin-top: 4px; }
  .avatar-outer {
    width: 64px; height: 64px;
    border-radius: 16px;
    background: #e5e7eb; /* gris carte icône */
    display: grid; place-items: center;
  }
  .avatar-inner {
    width: 48px; height: 48px;
    border-radius: 50%;
    background: var(--primary);
    display: grid; place-items: center;
  }

  /* Titre et sous-titre */
  .amount {
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    margin: 12px 0 4px;
  }
  .beneficiary {
    text-align: center;
    color: var(--muted);
    font-size: 14px;
    margin: 0 0 14px;
  }

  /* Carte partage */
  .card {
    background: var(--card);
    border-radius: 12px;
    box-shadow: var(--shadow);
  }

  .share-icon {
    width: 40px; height: 40px; border-radius: 20px;
    display: grid; place-items: center; background: #f5f6f8; border: 1px solid #eceef2;
  }
  .share-text { font-weight: 600; }

  /* Carte détails */
  .card.details { padding: 12px 16px; }
  .row {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #f1f3f6;
  }
  .row:last-child { border-bottom: none; }
  .label { color: #4b5563; font-size: 14px; }
  .value { font-size: 14px; color: #374151; }

  .status {
    display: inline-flex; align-items: center; gap: 8px; color: #1f2937; font-weight: 600;
  }
  .status-badge {
    width: 18px; height: 18px;
    background: var(--accent);
    display: inline-flex; align-items: center; justify-content: center;
  }

  /* Note bas de page */
  .note {
    text-align: center;
    color: var(--muted);
    font-size: 12px;
    margin: 14px 0 54px;
  }

  /* Barre de navigation (imitée) */
  .nav {
    position: fixed;
    left: 0; right: 0; bottom: 8px;
    display: flex; justify-content: center; align-items: center; gap: 60px;
  }
  .btn { display: inline-block; background: #cfd4dc; }
  .btn.square { width: 18px; height: 18px; border-radius: 4px; }
  .btn.circle { width: 18px; height: 18px; border-radius: 50%; }
  .btn.triangle {
    width: 0; height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 18px solid #cfd4dc;
  }

  /* Ajustements responsives */
  @media (max-width: 360px) {
    .screen { padding: 10px 12px 24px; }
    .amount { font-size: 24px; }
  }
  </style>
</head>
<body>
  <div class="screen">
    <header class="topbar">
      <button class="icon-btn back" aria-label="Retour">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    </header>

    <div class="avatar">
        <img src="img1.jpg" alt="" style="width: 65px; height: 65px;">
      
    </div>

    <h1 class="amount" style="margin-top: 0px;"><?php echo htmlspecialchars($amount_display); ?></h1>
    <p class="beneficiary"><?php echo htmlspecialchars($beneficiary); ?></p>

    <section class="card" style="padding: 14px 16px; margin-bottom: 16px; ">
      <div class="share" style="text-align: center; aligns-items: center;">
        <div class="share-icon"  style="    margin-left: 130px;">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <path d="M8.59 13.51l6.83 3.98M15.42 6.51L8.59 10.49" />
        </svg>
      </div>
      <div class="share-text">Partager</div>
      </div>
      
    </section>

    <section class="card details">
      <div class="row">
        <span class="label" style="font-weight: 600;">Montant reçu</span>
        <span class="value" style="color: gray;"><?php echo htmlspecialchars($montant_recu); ?></span>
      </div>
      <div class="row">
        <span class="label" style="font-weight: 600;">Statut</span>
        <span class="value status" style="color: gray;">
          <span class="status-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <?php echo htmlspecialchars($statut); ?>
        </span>
      </div>
      <div class="row">
        <span class="label" style="font-weight: 600;">Frais</span>
        <span class="value" style="color: gray;"><?php echo htmlspecialchars($frais); ?></span>
      </div>
      <div class="row">
        <span class="label" style="font-weight: 600;">Date et heure</span>
        <span class="value" style="color: gray;"><?php echo htmlspecialchars($datetime_disp); ?></span>
      </div>
      <div class="row">
        <span class="label" style="font-weight: 600;">Nouveau solde</span>
        <span class="value" style="color: gray;"><?php echo htmlspecialchars($nouveau_solde); ?></span>
      </div>
      <div class="row">
        <span class="label" style="font-weight: 600;">ID de transaction</span>
        <span class="value" style="color: gray;"><?php echo htmlspecialchars($transaction_id); ?></span>
      </div>
    </section>

    <p class="note">En partenariat avec Orabank.</p>

    
  </div>
</body>
</html>