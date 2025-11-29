<?php
// db.php — Connexion et initialisation SQLite

function get_db(): PDO {
    $path = __DIR__ . DIRECTORY_SEPARATOR . 'data.db';
    $db = new PDO('sqlite:' . $path);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Crée le schéma si nécessaire
    $db->exec('CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount_display TEXT NOT NULL,
        beneficiary TEXT NOT NULL,
        montant_recu TEXT NOT NULL,
        statut TEXT NOT NULL,
        frais TEXT NOT NULL,
        datetime_display TEXT NOT NULL,
        nouveau_solde TEXT NOT NULL,
        transaction_id TEXT NOT NULL,
        created_at TEXT NOT NULL
    )');

    // Seed si vide
    $count = $db->query('SELECT COUNT(*) FROM transactions')->fetchColumn();
    if ((int)$count === 0) {
        $stmt = $db->prepare('INSERT INTO transactions (
            amount_display, beneficiary, montant_recu, statut, frais,
            datetime_display, nouveau_solde, transaction_id, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([
            '-30.300F',
            'À Gnainaikan W S 07 48 13 8593',
            '30.000F',
            'Effectué',
            '300F',
            '23 nov. 2025 11:45 AM',
            '16.525F',
            'TBJCFEZBU4YAFGET7',
            date('c')
        ]);
    }

    return $db;
}

function get_latest_transaction(PDO $db): array {
    $stmt = $db->query('SELECT * FROM transactions ORDER BY id DESC LIMIT 1');
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row ?: [];
}

function insert_transaction(PDO $db, array $data): void {
    $stmt = $db->prepare('INSERT INTO transactions (
        amount_display, beneficiary, montant_recu, statut, frais,
        datetime_display, nouveau_solde, transaction_id, created_at
    ) VALUES (:amount_display, :beneficiary, :montant_recu, :statut, :frais,
        :datetime_display, :nouveau_solde, :transaction_id, :created_at)');

    $data['created_at'] = date('c');
    $stmt->execute($data);
}