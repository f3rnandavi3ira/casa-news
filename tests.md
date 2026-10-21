# Tests - CasaNews

## 1. Authentification

| Test                                             | Résultat attendu                                                 |Résultat |
| ------------------------------------------------ | ---------------------------------------------------------------- |-------- |
| Création d'un compte                             | Le compte est créé avec succès                                   |PASS     |
| Rejet d'un mot de passe de moins de 6 caractères | Erreur 400 : Le mot de passe doit contenir au moins 6 caractères |PASS     |
| Connexion                                        | L'utilisateur est authentifié                                    |PASS     |
| Connexion avec des identifiants invalides        | La connexion est refusée                                         |PASS     |
| Déconnexion                                      | L'utilisateur est déconnecté                                     |PASS     |

## 2. Articles

| Test                      | Résultat attendu                       | Résultat |
| ------------------------- | -------------------------------------- | -------- |
| Création d'un article     | L'article est créé                     | PASS     |
| Consultation d'un article | Les détails de l'article sont affichés | PASS     |
| Modification d'un article | Les modifications sont enregistrées    | PASS     |
| Suppression d'un article  | L'article est supprimé                 | PASS     |

## 3. Partage des articles

| Test                                      | Résultat attendu                          | Résultat |
| ----------------------------------------- | ----------------------------------------- | -------- |
| Partager un article                       | L'article devient public                  | PASS     |
| Ne plus partager un article               | L'article est retiré des articles publics | PASS     |

## 4. Favoris

| Test                         | Résultat attendu                           | Résultat |
| ---------------------------- | ------------------------------------------ | -------- |
| Ajouter un favori            | Le favori est créé                         | PASS     |
| Consulter les favoris        | Les favoris de l'utilisateur sont affichés | PASS     |
| Modifier la note d'un favori | La note est enregistrée                    | PASS     |
| Supprimer un favori          | Le favori est supprimé                     | PASS     |

## 5. Profil utilisateur

| Test                              | Résultat attendu                                    | Résultat |
| --------------------------------- | --------------------------------------------------- | -------- |
| Consulter le profil               | Les informations de l'utilisateur sont affichées    | PASS     |
| Modifier le profil                | Les informations de l'utilisateur sont mises à jour | PASS     |
| Modifier le mot de passe          | Le mot de passe est modifié                         | PASS     |
| Rejet de mots de passe différents | La modification est bloquée                         | PASS     |
| Supprimer le compte               | Le compte est supprimé                              | PASS     |

## 6. Actualités

| Test                            | Résultat attendu                           | Résultat |
| ------------------------------- | ------------------------------------------ | -------- |
| Chargement de la page d'accueil | Les actualités sont affichées              | PASS     |
| Recherche de « football »       | Les résultats correspondants sont affichés | PASS     |
| Recherche avec un autre mot-clé | Les résultats correspondants sont affichés | PASS     |

## 7. Authentification et autorisation

| Test                                           | Résultat attendu                                 | Résultat |
| ---------------------------------------------- | ------------------------------------------------ | -------- |
| Accéder à une page protégée sans être connecté | L'accès est refusé ou l'utilisateur est redirigé | PASS     |
| Accéder à une API protégée sans token          | HTTP 401 Unauthorized                            | PASS     |
| Modifier l'article d'un autre utilisateur      | HTTP 403 Forbidden                               | PASS     |

## 8. Base de données

| Test                         | Résultat attendu                                                          | Résultat |
| ---------------------------- | ------------------------------------------------------------------------- | -------- |
| Opérations CRUD              | Les opérations fonctionnent correctement                                  | PASS     |
| Suppression d'un utilisateur | Tous les éléments associés à l'utilisateur sont automatiquement supprimés | PASS     |
