# 🔍 Guide de Configuration SonarCloud

Ce guide vous accompagne pas à pas pour configurer SonarCloud sur votre projet TanStack Start.

## 📚 Qu'est-ce que SonarCloud ?

SonarCloud est un service d'analyse de code qui vous aide à :
- ✅ Détecter les bugs et vulnérabilités
- 📊 Mesurer la qualité du code
- 🎯 Identifier les code smells (mauvaises pratiques)
- 📈 Suivre l'évolution de la qualité dans le temps
- 🔐 Détecter les failles de sécurité

## 🚀 Configuration Initiale (À faire une seule fois)

### Étape 1 : Créer un compte SonarCloud

1. Allez sur [https://sonarcloud.io](https://sonarcloud.io)
2. Cliquez sur **"Sign up"** (Inscription)
3. Connectez-vous avec votre compte **GitHub** (recommandé)
4. Autorisez SonarCloud à accéder à votre compte GitHub

### Étape 2 : Créer une organisation

1. Une fois connecté, cliquez sur le **"+"** en haut à droite
2. Sélectionnez **"Create new organization"**
3. Choisissez votre compte GitHub
4. Donnez un nom à votre organisation (ex: `votre-pseudo-github`)
5. Choisissez le plan **Free** (gratuit pour les projets publics)

### Étape 3 : Créer un projet

1. Dans votre organisation, cliquez sur **"Analyze new project"**
2. Sélectionnez le repository **tanstack-shop-template**
3. Cliquez sur **"Set up"**
4. Choisissez **"With GitHub Actions"** (option recommandée)

### Étape 4 : Récupérer votre token

1. SonarCloud va vous afficher un **SONAR_TOKEN**
2. **IMPORTANT** : Copiez ce token, vous en aurez besoin
3. Ne le partagez jamais publiquement !

### Étape 5 : Configurer les secrets GitHub

1. Allez sur votre repository GitHub
2. Allez dans **Settings** → **Secrets and variables** → **Actions**
3. Cliquez sur **"New repository secret"**
4. Nom : `SONAR_TOKEN`
5. Value : Collez le token que vous avez copié
6. Cliquez sur **"Add secret"**

### Étape 6 : Mettre à jour sonar-project.properties

Ouvrez le fichier `sonar-project.properties` et modifiez :

```properties
sonar.projectKey=votre-organisation_tanstack-shop-template
sonar.organization=votre-organisation
```

Remplacez `votre-organisation` par le nom de votre organisation SonarCloud.

**Exemple concret** :
- Si votre pseudo GitHub est `john-doe`
- Et que votre organisation s'appelle `john-doe`
- Alors :
  ```properties
  sonar.projectKey=john-doe_tanstack-shop-template
  sonar.organization=john-doe
  ```

## 🎯 Utilisation

### Analyse automatique (Recommandé)

L'analyse se lance **automatiquement** à chaque fois que vous :
- Pushez du code sur la branche `main` ou `develop`
- Créez ou mettez à jour une Pull Request

Vous pouvez voir les résultats :
1. Sur [SonarCloud.io](https://sonarcloud.io) dans votre projet
2. Dans l'onglet **"Checks"** de votre Pull Request GitHub

### Analyse manuelle locale (Optionnelle)

Si vous voulez analyser votre code en local avant de pusher :

#### Installation du scanner

```bash
# macOS (avec Homebrew)
brew install sonar-scanner

# Ou avec npm (global)
npm install -g sonarqube-scanner
```

#### Lancer l'analyse

```bash
# 1. Définir votre token (à faire une seule fois par session)
export SONAR_TOKEN=votre-token-sonarcloud

# 2. Lancer l'analyse
pnpm sonar:local
```

## 📊 Comprendre les résultats

### Types de problèmes

1. **🐛 Bugs** : Erreurs potentielles qui peuvent causer des dysfonctionnements
2. **🔐 Vulnerabilities** : Failles de sécurité
3. **👃 Code Smells** : Code qui fonctionne mais qui pourrait être amélioré
4. **💯 Coverage** : Pourcentage de code couvert par les tests

### Niveaux de sévérité

- **🔴 Blocker** : À corriger immédiatement
- **🟠 Critical** : À corriger rapidement
- **🟡 Major** : Important mais pas urgent
- **🔵 Minor** : Amélioration mineure
- **⚪ Info** : Suggestion

### Quality Gate (Porte de qualité)

C'est un ensemble de critères que votre code doit respecter. Par défaut :
- ✅ 0 nouveaux bugs
- ✅ 0 nouvelles vulnérabilités
- ✅ Moins de 3% de code dupliqué
- ✅ Au moins 80% de couverture sur le nouveau code

## 💡 Bonnes pratiques

### 1. Consulter régulièrement le dashboard

- Allez sur SonarCloud après chaque push
- Regardez les nouveaux problèmes détectés
- Priorisez les Bugs et Vulnerabilities

### 2. Corriger avant de merger

- Corrigez les problèmes dans vos branches
- Vérifiez que la Quality Gate est verte avant de merger

### 3. Apprendre des analyses

SonarCloud est votre mentor virtuel :
- Lisez les explications des problèmes
- Cliquez sur **"Why is this an issue?"**
- Apprenez des exemples de correction proposés

### 4. Ne pas tout corriger d'un coup

- Commencez par les Bugs et Vulnerabilities
- Progressez graduellement vers les Code Smells
- Utilisez l'option **"Resolve as Won't Fix"** pour les faux positifs

## 🔧 Configuration avancée (Optionnelle)

### Ajouter la couverture de tests

Si vous voulez mesurer la couverture de vos tests :

1. Installez le package de couverture :
```bash
pnpm add -D @vitest/coverage-v8
```

2. Lancez les tests avec couverture :
```bash
pnpm test:coverage
```

3. SonarCloud détectera automatiquement le fichier `coverage/lcov.info`

### Personnaliser les exclusions

Si vous voulez exclure d'autres fichiers, modifiez dans `sonar-project.properties` :

```properties
sonar.exclusions=**/node_modules/**,**/dist/**,**/.vinxi/**,**/.output/**,**/build/**,**/*.config.ts,**/*.config.js,**/routeTree.gen.ts,**/mon-fichier-a-exclure.ts
```

## 🆘 Problèmes courants

### "Quality Gate failed"

- C'est normal au début ! Votre code a des problèmes à corriger
- Consultez la page du projet pour voir les détails
- Corrigez progressivement

### "Analysis failed" dans GitHub Actions

- Vérifiez que le `SONAR_TOKEN` est bien configuré dans les secrets
- Vérifiez que `sonar.projectKey` et `sonar.organization` sont corrects
- Regardez les logs de l'action pour plus de détails

### Trop de Code Smells

- C'est normal pour un nouveau projet
- Fixez-les progressivement
- Concentrez-vous d'abord sur les Major et Critical

## 📚 Ressources

- [Documentation SonarCloud](https://docs.sonarcloud.io/)
- [Règles JavaScript/TypeScript](https://rules.sonarsource.com/javascript)
- [Communauté SonarCloud](https://community.sonarsource.com/)

## 🎓 Pour progresser

1. **Chaque jour** : Regardez 1-2 problèmes détectés et comprenez-les
2. **Chaque semaine** : Corrigez les nouveaux problèmes Blocker/Critical
3. **Chaque mois** : Réduisez votre dette technique globale

Bon courage dans votre apprentissage ! 🚀

---

**Astuce** : Ajoutez le badge SonarCloud dans votre README.md pour montrer la qualité de votre code :

```markdown
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=votre-organisation_tanstack-shop-template&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=votre-organisation_tanstack-shop-template)
```

(N'oubliez pas de remplacer `votre-organisation` par votre vraie organisation !)
