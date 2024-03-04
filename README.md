# ProjectAgile

## Modifications apportées pour la structure

-   Ajout de AuthContext
-   Création d'un contexte global pour englober tous les contextes créés. Il suffi de rajouter les nouveaux contextes dans le fichier context/index.tsx
-   Supression des flèches dans les listes

-   Creation du dossier api pour centraliser toutes les requetes et
-   Suppression des services
    Les requetes api se font via les fonctions dans le fichier axios (voir les exemple dans le code)
-   création du composant de notification centralisé
    pour faire une notif (quelque soit le composant) : 1. `js const {showNotification} = useContext(NotificationContext); ` 2. `js showNotification = (title : string, message: string, type: string)`
    les types disponibles : info, error, success, warning

-   Centralisation des types dans types/index pour éviter de recréer les memes types sauf pour evaluations(conflits de nommages)

-   Retrait de" filtrer par " pour les champs de filtre

-   Suppression du reload lors du login

-   Ajout de formattage du code automatique avec prettier pour le rendre lisible . Pour formatter il suffi d'exécuter npm run format en ligne de commande.

# Nb :Tips Pour la team design, la sidebar et le header doivent etre communues à toute l'app et non dans chaque fichier
