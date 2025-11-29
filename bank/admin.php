<?php
require __DIR__ . '/db.php';
$db = get_db();

$errors = [];
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = [
        'amount_display'   => trim($_POST['amount_display'] ?? ''),
        'beneficiary'      => trim($_POST['beneficiary'] ?? ''),
        'montant_recu'     => trim($_POST['montant_recu'] ?? ''),
        'statut'           => trim($_POST['statut'] ?? ''),
        'frais'            => trim($_POST['frais'] ?? ''),
        'datetime_display' => trim($_POST['datetime_display'] ?? ''),
        'nouveau_solde'    => trim($_POST['nouveau_solde'] ?? ''),
        'transaction_id'   => trim($_POST['transaction_id'] ?? ''),
    ];

    foreach ($data as $k => $v) {
        if ($v === '') { $errors[] = "Le champ $k est requis."; }
    }

    if (!$errors) {
        insert_transaction($db, $data);
        $success = true;
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Admin — Mise à jour transaction</title>
  <link rel="stylesheet" href="styles.css" />
  <style>
    .admin-wrap { max-width: 720px; margin: 24px auto; background: #fff; padding: 16px; border-radius: 12px; box-shadow: 0 2px 8px rgba(17,24,39,0.06); }
    form .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    form label { display: block; font-size: 12px; color: #374151; margin-bottom: 6px; }
    form input { width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; }
    .actions { margin-top: 16px; display: flex; gap: 12px; }
    .btn-primary { background: #2563eb; color: #fff; border: none; padding: 10px 16px; border-radius: 8px; cursor: pointer; }
    .msg { margin: 12px 0; font-size: 14px; }
    .msg.error { color: #b91c1c; }
    .msg.success { color: #166534; }
    .links { display:flex; gap:12px; margin-bottom:10px; }
    .links a { color:#2563eb; text-decoration:none; }
  </style>
</head>
<body>
  <div class="admin-wrap">
    <div class="links">
      <a href="/index.php">Voir l’aperçu</a>
      <a href="/admin.php">Admin</a>
    </div>

    <h2>Mise à jour des données affichées</h2>
    <p class="note">Chaque envoi crée un nouvel enregistrement. La page d’aperçu affiche toujours la plus récente.</p>

    <?php if ($success): ?>
      <div class="msg success">Enregistré avec succès. <a href="/index.php">Voir la page</a></div>
    <?php endif; ?>

    <?php if ($errors): ?>
      <div class="msg error">
        <?php foreach ($errors as $e): ?>
          <div>• <?php echo htmlspecialchars($e); ?></div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>

    <form method="post">
      <div class="grid">
        <div>
          <label>Montant affiché (ex: -30.300F)</label>
          <input name="amount_display" required />
        </div>
        <div>
          <label>Montant reçu (ex: 30.000F)</label>
          <input name="montant_recu" required />
        </div>
        <div>
          <label>Bénéficiaire</label>
          <input name="beneficiary" required />
        </div>
        <div>
          <label>Statut</label>
          <input name="statut" value="Effectué" required />
        </div>
        <div>
          <label>Frais</label>
          <input name="frais" required />
        </div>
        <div>
          <label>Date et heure</label>
          <input name="datetime_display" placeholder="23 nov. 2025 11:45 AM" required />
        </div>
        <div>
          <label>Nouveau solde</label>
          <input name="nouveau_solde" required />
        </div>
        <div>
          <label>ID de transaction</label>
          <input name="transaction_id" required />
        </div>
      </div>
      <div class="actions">
        <button class="btn-primary" type="submit">Enregistrer</button>
        <a class="btn-primary" style="background:#6b7280" href="/index.php">Retour à l’aperçu</a>
      </div>
    </form>
  </div>
</body>
</html>