# Déployer une application ExpressJS Backend / ReactJS Frontend avec Render

###### `ExpressJS` `ReactJS` `Render` `AlwaysData` `PhpMyAdmin` `CI/CD`

- <https://github.com/alwaysdata/autodeploy-git-hook>
- <https://github.com/alwaysdata/autodeploy-git-hook/blob/master/post-receive>

Voici la documentation du script.

## Partie 1 : Variables de Configuration

Ces variables configurent les paramètres nécessaires pour le déploiement.

```bash
TARGET="/home/madslab/net.madslab/test"
GIT_DIR="/home/madslab/data/test-deploy.git"
BRANCH="production"
RESTART=false
API_KEY=""
ACCOUNT=""
PASSWORD=""
SITE_ID="000000"
NPM_INSTALL_CHECK=false
```

- **TARGET** : Répertoire où les fichiers doivent être déployés. Ce répertoire contiendra le code source déployé.
- **GIT_DIR** : Chemin vers le dépôt Git bare qui reçoit les pushs.
- **BRANCH** : Branche Git à déployer. Par défaut, elle est définie sur `production`.
- **RESTART** : Indicateur boolean (`true` ou `false`) pour savoir si le serveur web doit être redémarré après le déploiement.
- **API_KEY, ACCOUNT, PASSWORD, SITE_ID** : Informations nécessaires pour utiliser l'API Alwaysdata afin de redémarrer le site.
- **NPM_INSTALL_CHECK** : Indicateur boolean (`true` ou `false`) pour savoir si `npm install` doit être exécuté automatiquement si `package.json` a été modifié.

## Partie 2 : Fonction `npm_install_check`

Cette fonction vérifie si le fichier `package.json` a été modifié et exécute `npm install` si c'est le cas.

```bash
npm_install_check() {
    # git diff pour obtenir la liste des fichiers modifiés entre les deux dernières révisions
    changed_files="$(git diff --name-only HEAD^ HEAD)"

    check_run() {
        # Vérifie si le fichier spécifié ($1) a été modifié
        if [ $(echo "$changed_files" | grep "$1") ]; then
            cd $TARGET
            echo "'package.json' has been updated! Running 'npm install' automatically for you..."
            eval "$2"
            cd $GIT_DIR
        fi
    }

    # Exécute `npm install` uniquement si "package.json" a été modifié
    check_run package.json "npm install > /dev/null"
}
```

- **changed_files** : Stocke la liste des fichiers modifiés entre les deux dernières révisions commit (HEAD^ et HEAD).
- **check_run** : Fonction interne qui vérifie si un fichier spécifique (ici `package.json`) a été modifié et exécute une commande (ici `npm install`) si c'est le cas.
- **eval "$2"** : Exécute la commande passée en paramètre (dans ce cas, `npm install`).

## Partie 3 : Boucle principale de traitement des branches

Cette partie du script traite les branches lues depuis l'entrée standard pour effectuer le déploiement.

```bash
while read oldrev newrev ref; do
    if [[ $ref = refs/heads/$BRANCH ]]; then
        echo "Ref '$ref' received."

        if [ ! -d "$TARGET" ]; then
            echo "'${TARGET}' dir is missing, creating it"
            mkdir -p $TARGET
        fi

        echo "Deploying '${BRANCH}' branch to production"
        git --work-tree=$TARGET --git-dir=$GIT_DIR checkout --force $BRANCH

        if [ $NPM_INSTALL_CHECK = true ]; then
            npm_install_check
        fi

        if [ "$RESTART" = true ]; then
            echo "Restarting your web server ..."

            encoded_token=$(echo "$API_KEY account=$ACCOUNT:$PASSWORD" | base64 -w 0)
            status=$(curl --location --request POST "https://api.alwaysdata.com/v1/site/${SITE_ID}/restart/" --header "Authorization: Basic $encoded_token" --write-out '%{http_code}' --silent)

            if [ "$status" = 204 ]; then
                echo "✅ Site successfully restarted!"
            else
                echo "❌ An error occured when restarting your site, try to restart it manually"
                exit 1
            fi
        fi

        exit 0
    else
        echo "🙄 You pushed '$ref' branch,"
        echo "but you set '${BRANCH}' branch as deploy branch."
        echo "Exiting without error."

        exit 0
    fi
done
```

- **Lecture de l'entrée standard** : La boucle `while` lit les anciennes et nouvelles révisions ainsi que la référence de la branche.
- **Condition de branche** : Vérifie si la référence (`$ref`) correspond à la branche à déployer (`$BRANCH`).
- Si oui :
- **Vérification du répertoire de déploiement** : Vérifie si le répertoire `TARGET` existe, sinon le crée.
- **Déploiement** : Utilise `git checkout --force` pour forcer le checkout de la branche spécifiée dans le répertoire `TARGET`.
- **npm install** : Si `NPM_INSTALL_CHECK` est `true`, appelle la fonction `npm_install_check`.
- **Redémarrage du serveur** : Si `RESTART` est `true`, encode les informations d'authentification et appelle l'API Alwaysdata pour redémarrer le site.
- Si non :
- Affiche un message indiquant que la branche poussée n'est pas celle configurée pour le déploiement.

## Conclusion

Ce script automatise le déploiement d'une application à chaque push sur une branche spécifique (ici `production`). Il gère la mise à jour du code, l'installation des dépendances si nécessaire et peut redémarrer le serveur via l'API Alwaysdata. Cela permet d'assurer que la version la plus récente de votre application est déployée et opérationnelle avec le minimum d'intervention manuelle.
