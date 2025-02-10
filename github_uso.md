# Clonar (SOLO UNA VEZ PARA TENER EL PROYECTO):
git clone <URL>

# Actualizar rama principal (CADA VEZ QUE SE HAGA UNA FUNCIONALIDAD O CAMBIO):
```sh
git checkout main

git pull origin main
```
# Crear y cambiar a la rama:
```
git checkout -b issue-##-descripcion
```
# Confirmar cambios:
```
git add .
git commit -m "Mensaje de commit"
```
# Subir cambios:
```
git push -u origin issue-##-descripcion
```
# (SOLO PARA JEFE)
## Crear PR (CLI GitHub):
```
gh pr create --title "..." --body "..." --base main --head issue-##-descripcion
```
## Merge PR (CLI GitHub):
```
gh pr merge --merge
```

## Eliminar rama remota y local:
```
git push origin --delete issue-##-descripcion
git branch -d issue-##-descripcion
```
