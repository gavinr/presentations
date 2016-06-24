* update Widget.js
  * uncomment onOpen, onClose
  * don't forget comma
  * code snippet:
    ```
    this.mapClickHandler = on(this.sceneView, 'click', (evt) => {
      console.log('CLICKED', evt);
    });
    ```
  * code snippet:
    ```
    if(this.mapClickHandler) {
      this.mapClickHandler.remove();
    }
    ```
