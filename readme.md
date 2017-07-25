# Hot Module Replacement

HMR - механизм, позволяющий добавлять или удалять модули в запущенном приложении без перезагрузки страницы.

Для включения HMR необходимо добавить плагин HotModuleReplacementPlugin или запустить webpack с ключом hot.

```js
plugins: [ new webpack.HotModuleReplacementPlugin() ]
```
или
```
webpack --hot
```

В bundle будет добавлен модуль [HMR runtime](https://github.com/webpack/webpack/blob/master/lib/HotModuleReplacement.runtime.js), который предоставляет api для проверки наличия обновлений и их загрузки.

## Как HMR runtime определяет что есть обновления?

Если запустить webpack в режиме watch и HMR, то на каждое обновление исходных файлов, помимо пересборки bundle, будет создаваться update manifest и по одному js файлу на каждый обновленный chunk. Эти js файлы будут содержать только обновленные модули.

Update manifest представляет из себя json файл, содержащий новый compilation hash и список обновленных файлов. Сompilation hash формируется во время сборки bundle и передается в HMR runtime.

К примеру, допустим что после запуска сборки compilation hash равен 2d7d6cde68808f45114b, тогда после обновления файлов, webpack создаст файл 2d7d6cde68808f45114b.hot-update.json со следующим содержимым:
```json
{"h":"4498fb6e327faa0693e8","c":{"0":true}}
```
- "h" - hash, содержит новый compilation hash;
- "c" - chunks, содержит список обновленных chunk'ов.

В данном случае был обновлен chunk с id=0, поэтому будет создан файл ```0.2d7d6cde68808f45114b.hot-update.js```, содержащий все модули, которые были обновлены. При необходимости также будет создан файл содержащий source map для обновленных модулей.

Теперь, если в запущенном приложении вызвать module.hot.check, например по нажатия на кнопку "Check update", будет отправлен запрос на ```http://localhost:9000/2d7d6cde68808f45114b.hot-update.json```, если будет получен ответ с кодом 200, значит обновления есть. После этого можно запустить механизм применения обновлений module.hot.apply.

## Обновление модулей

Для обновления модулей используется метод module.hot.accept.

- module.hot.accept([errHandler]) - модуль сам себя обновляет, подходит для модулей, которые ничего не экспортируют.
- module.hot.accept(dependencies: string[], callback: (updatedDependencies) => void) - обновление зависимостей, в dependencies указываются модули, обновление которых нас интересует.

Если в модуле нет вызововы module.hot.accept(), то событие о его обновлении пробрасывается его родителю (update bubbles up).

Таким образом событие обновления модуля поднимается вверх по цепочке до тех пор, пока не будет найден обработчик.
Если же обработчик так и не был найден бросается exception. В таком случае можно просто обновить страницу.

### Пример

```
 └── index.html
     |
     ├── firstChunk.js
     │    |
     |    └── firstChunkData.js
     │      
     └── secondChunk.js 
 ```

 При обновлении firstChunkData, проверяется наличие вызова ```module.hot.accept()```, т.к. его нет, событие пробрасывается parent модулю. В модуле firstChunk есть обработчки для обновления firstChunkData ```module.hot.accept('./firstChunkData', callback)```.

 Модуль secondChunk самостоятельно себя обновляет. Он подписывается на событие dispose ```module.hot.dispose(callback)```. Удаляет свой div и при обновлении снова его отрисовывает.

### Источники

- https://webpack.js.org/configuration/dev-server/
- https://webpack.js.org/concepts/hot-module-replacement/
- https://habrahabr.ru/company/Voximplant/blog/270593/
- https://webpack.github.io/docs/hot-module-replacement.html
